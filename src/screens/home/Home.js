import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header';

class Home extends Component {

    constructor() {
        super();
        this.state = {
            userInfo: {}
        }
    }

    componentWillMount() {
        let that = this;

        // Retrieve user information
        let userInformation = null;
        let xhrUserInfo = new XMLHttpRequest();
        xhrUserInfo.addEventListener('readystatechange', function () {
            if (this.readyState === 4) {
                that.setState({
                    userInfo: JSON.parse(this.responseText).data
                })
            }
        })

        xhrUserInfo.open('GET', `${this.props.userInfoUrl}${this.props.accessToken}`);
        xhrUserInfo.send(userInformation);
    }

    render() {
        const { classes } = this.props;
        return (
            <div>

                {/* Rendering Header Component and assigning values to props in Header.js to display conditional blocks */}
                <Header
                    showSearchBox={true}
                    showProfilePicture={true}
                    showMyAccountMenu={true}
                    profilePictureUrl={this.state.userInfo.profile_picture}
                />

            </div>
        )
    }
}

export default Home;