// компоненты
import React from 'react';
import axios from 'axios';


class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.setTypeUser = props.setTypeUser;
        this.state = {
            imgUrl: '',
            login: props.loginUser,
            reposUrl: '',
            reposName: props.reposName,
            reposType: '',
            final: 'false',
            defBranch:'',
            language:'',
            lastUpdate:''
        }
    }

    componentDidMount() {
        this.getRepositoryInfo(this.state.login,this.state.reposName);
    }

    getUserInfo(name) {
        axios.get('https://api.github.com/users/' +
            name
        ).then((response) => {
            this.setState({
                imgUrl: response.data.avatar_url,
                login: name
            });
        })
            .catch((err) => {
                console.log('error: ' + err);
            });
    }
    //https://api.github.com/repos/Vit-Vi/calc
    getRepositoryUser(userLogin,reposName) {
        axios.get('https://api.github.com/repos/' +
        userLogin +
            '/'+reposName
        ).then((response) => {
            this.setState({
                reposUrl:response.data.html_url,
                reposType: response.data.visibility,
                defBranch:response.data.default_branch,
                language:response.data.language??'no language',
                lastUpdate:response.data.updated_at.substring(0,10)
            });
        })
            .catch((err) => {
                console.log('error: ' + err);
            });
    }

    getRepositoryInfo(userLogin,reposName) {
        this.getUserInfo(userLogin);
        this.getRepositoryUser(userLogin,reposName);


        this.setState({
            final: 'true'
        });
    }

    render() {
        return <>
            {this.state.final == 'true' ?
                <div className='container' style={{
                    backgroundImage: 'url(' + this.state.imgUrl + ')'
                }}>
                    <div className='blur'>
                        <div className='imgContainer'>
                            <img src={this.state.imgUrl} onClick={(e) => {
                                this.setTypeUser(this.state.login);
                            }} />
                        </div>
                        <div className='infoContainer'>
                            <p>Owner: <a >{this.state.login}</a></p>
                            <p>Repository name: <a href={this.state.reposUrl}>{this.state.reposName}</a></p>
                            <p>Type: {this.state.reposType}</p>
                            <p>Default branch: {this.state.defBranch}</p>
                            <p>Language: {this.state.language}</p>
                            <p>Last update: {this.state.lastUpdate}</p>
                            <button className='btn btn-primary' onClick={(e) => {
                                this.setTypeUser(this.state.login);
                            }}>Back</button>
                        </div>
                    </div>

                </div>
                : null}
        </>
            ;
    }
}

export default UserInfo;