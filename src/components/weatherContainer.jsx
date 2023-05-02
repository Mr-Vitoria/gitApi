// компоненты
import React from 'react';
import axios from 'axios';
//http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=ba9cdf5be82d608f48890f100e5cd34f
class WeatherContainer extends React.Component {
    constructor(props) {
        super(props);
        this.sendClickHandler = this.sendClickHandler.bind(this);
        this.inputCityRef = React.createRef();
        this.state={
            temp:"",
            fell:"",
            weather:"",
            windSpeed:"",
            weatherDesc:""
        }
    }

    sendClickHandler(e) {
        
        axios.get('https://api.openweathermap.org/data/2.5/forecast?q='+
        this.inputCityRef.current.value+
        '&units=metric' +
        '&lang=ru'+
        '&appid=ba9cdf5be82d608f48890f100e5cd34f')
            .then((response) => {
                console.log(response.data.list[0]);
                var thisDay=response.data.list[0];
                this.setState({
                    temp:thisDay.main.temp,
                    fell:thisDay.main.feels_like,
                    weather:thisDay.weather[0].main,
                    weatherDesc:thisDay.weather[0].description,
                    windSpeed:thisDay.wind.speed
                });
            })
            .catch((err) => {
                console.log('error: ' + err);
               // this.inputAnswerRef.current.value = 'error: ' + err;
            });
    }

    render() {
        return <div style={{
            width: "500px",
            marginTop: "50px",
            padding: "15px",
            borderRadius: "15px",
            boxShadow: "0 0 20px gray",
            backgroundSize: "100px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right bottom",
            backgroundImage: 'url("https://i.pinimg.com/originals/77/13/98/7713983a56238b9ae47f36ad15811af6.jpg")',
            backgroundColor:"white",
            paddingBottom:"100px"
        }} class="container-sm">
            <div class="mb-3">
                <label for="cityInput" class="form-label">City</label>
                <input ref={this.inputCityRef} type="text" class="form-control" id="cityInput" />
            </div>
            <button onClick={this.sendClickHandler} class="btn btn-primary">Send</button>
            <div class="mb-3">
                <label for="tempInput" class="form-label">Температура</label>
                <input readOnly="true" value={this.state.temp} type="text" class="form-control" id="tempInput" />
                <label for="feelInput" class="form-label">Ощущается как</label>
                <input readOnly="true" value={this.state.fell} type="text" class="form-control" id="feelInput" />
                <label for="weatherInput" class="form-label">Погода:</label>
                <input readOnly="true" value={this.state.weather} type="text" class="form-control" id="weatherInput" />
                <label for="weatherInput" class="form-label">Описание погоды:</label>
                <input readOnly="true" value={this.state.weatherDesc} type="text" class="form-control" id="weatherInput" />
                <label for="windSpeedInput" class="form-label">Скорость ветра:</label>
                <input readOnly="true" value={this.state.windSpeed} type="text" class="form-control" id="windSpeedInput" />
            </div>
            
        </div>
            ;
    }
}

export default WeatherContainer;