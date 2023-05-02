// компоненты
import React from 'react';
import UserInfo from './userInfo';
import RepositoryInfo from './repositoryInfo';
//https://api.github.com/users/ZiPaXG


class Imba extends React.Component {
    constructor(props) {
        super(props);
        this.sendClickHandler = this.sendClickHandler.bind(this);
        this.setTypeRepos = this.setTypeRepos.bind(this);
        this.setTypeUser = this.setTypeUser.bind(this);
        this.inputUsernameRef = React.createRef();
        this.state = {
            typeRequest: 'none',
            loginUser:'',
            reposName:''
        }
    }
    setTypeRepos(repos) {
        this.setState({
            typeRequest: 'repos',
            reposName:repos
        });
      }
      setTypeUser(userName) {
          this.setState({
              typeRequest: 'userInfo',
              loginUser: userName,
          });
        }

    sendClickHandler(e) {
        this.setTypeUser(this.inputUsernameRef.current.value);
    }
    render() {
        return <div>
            <div className='backImg'></div>
            <div className='header'>
                <h1>Git Api</h1>
                <h2>Find your repository on git</h2>
            </div>
            <div className="inputContainer">
                <div className='mb-3'>
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Application info
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    Это приложение работает с gitApi. Введя имя пользователя в поле ниже
                                    вы можете получить информацию о его профиле.    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mb-3'>
                    <label for="userInput" className="form-label">Username</label>
                    <input ref={this.inputUsernameRef} type="text" className="form-control" id="userInput" />
                </div>
                <button onClick={this.sendClickHandler} className="btn btn-primary">Send</button>
            </div>
            {this.state.typeRequest == 'repos' ?
            <RepositoryInfo loginUser={this.state.loginUser} reposName={this.state.reposName} setTypeUser={this.setTypeUser}/>
                : null}
            {this.state.typeRequest == 'userInfo' ?
            <UserInfo loginUser={this.state.loginUser} setTypeRepos= {this.setTypeRepos} changeUserName={this.setTypeUser}/>
                : null}
            
        </div>
            ;
    }
}

export default Imba;