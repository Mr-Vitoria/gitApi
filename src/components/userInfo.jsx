// компоненты
import React from 'react';
import axios from 'axios';


class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.getUserByLoginHandler = this.getUserByLoginHandler.bind(this);
        this.setTypeRepos = props.setTypeRepos;
        this.changeUserName = props.changeUserName;
        this.state = {
            imgUrl: '',
            login: props.loginUser,
            profileUrl: '',
            repositories: null,
            followers: null,
            final: 'false'
        }
    }

    componentDidMount()
    {
        this.getUserByLoginHandler(this.state.login);
    }

    getUserInfo(name) {
        axios.get('https://api.github.com/users/' +
        name
        ).then((response) => {
            this.setState({
                imgUrl: response.data.avatar_url,
                login: name,
                profileUrl: response.data.html_url
            });
        })
            .catch((err) => {
                console.log('error: ' + err);
            });
    }
    getFollowersUser(name) {
        axios.get('https://api.github.com/users/' +
        name +
            '/followers'
        ).then((response) => {
            this.setState({
                followers: response.data.map((d) =>
                    <a onClick={(e) => {
                        this.getUserByLoginHandler(d.login);
                        this.changeUserName(d.login);
                     }} className='list-group-item list-group-item-action'>
                        {d.login}
                    </a>
                )
            });
        })
            .catch((err) => {
                console.log('error: ' + err);
            });
    }
    getRepositoriesUser(name) {
        axios.get('https://api.github.com/users/' +
        name +
            '/repos'
        ).then((response) => {
            this.setState({
                repositories: response.data.map((d) =>
                    <a onClick={(e) => {
                        this.setTypeRepos(d.name);
                     }} className='list-group-item list-group-item-action'>
                        {d.name}
                    </a>
                )
            });
        })
            .catch((err) => {
                console.log('error: ' + err);
            });
    }

    getUserByLoginHandler(name){
        this.getUserInfo(name);
        this.getFollowersUser(name);
        this.getRepositoriesUser(name);


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
                            <img src={this.state.imgUrl} />
                        </div>
                        <div className='infoContainer'>
                            <p>Username: <a href={this.state.profileUrl}>{this.state.login}</a></p>
                            <p>Followers:</p>
                            <ul className='list-group'>
                                {this.state.followers}
                            </ul>
                            <p>Repositories:</p>
                            <ul className='list-group'>
                                {this.state.repositories}
                            </ul>
                        </div>
                    </div>

                </div>
                : null}
        </>
            ;
    }
}

export default UserInfo;