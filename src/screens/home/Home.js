import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const styles = theme => ({
    cardsGridList: {
        width: '90%',
    },
    card: {
        maxWidth: 600,
        marginTop: 30,
        marginBottom: 30,
        marginLeft: 5,
    },
    cardHeaderTitle: {
        fontWeight: 'bold',
    },
    cardHeaderSubheader: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    cardImage: {
        height: '100%',
        width: '100%',
    }
});

class Home extends Component {

    constructor() {
        super();
        this.state = {
            userPosts: [],
            userInfo: {},
            filteredUserPosts: [],
            userComments: {},
            likesState: {},
        }
    }

    componentWillMount() {
        let that = this;

        // Get user information from calling REST API on Instagram 
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

        // Get the most recent media published by the logged In user.
        let userPostsInformation = null;
        let xhrUserPosts = new XMLHttpRequest();
        xhrUserPosts.addEventListener('readystatechange', function () {
            if (this.readyState === 4) {
                let likesState = {};
                let userComments = {};
                let data = JSON.parse(this.responseText).data;
                for (let i = 0; i < data.length; i++) {
                    likesState[data[i]['id']] = false
                    userComments[data[i]['id']] = { 'added': [], 'toAdd': '' }
                }
                that.setState({
                    userPosts: data,
                    filteredUserPosts: data,
                    likesState: likesState,
                    userComments: userComments
                });
            }
        });

        xhrUserPosts.open('GET', `${this.props.userMediaRecentUrl}${this.props.accessToken}`);
        xhrUserPosts.send(userPostsInformation);
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

                <div id='cards-grid-list'>
                    <GridList cols={2} cellHeight='auto' className={classes.cardsGridList}>

                        {/* Code to List The Posts on Istagram account with the access-token */}
                        {this.state.filteredUserPosts.map(post => (
                            <GridListTile key={'post' + post.id}>

                                <Card className={classes.card}>
                                    <CardHeader
                                        classes={{
                                            title: classes.cardHeaderTitle,
                                            subheader: classes.cardHeaderSubheader,
                                        }}

                                        // card header - user profile pic of the posting user
                                        avatar={
                                            <Avatar alt='Profile picture' src={post.user.profile_picture} />
                                        }

                                        // card header - username and date time
                                        title={post.user.username}
                                        subheader={post.created_time}
                                    />
                                    <CardContent>
                                    </CardContent>
                                </Card>
                            </GridListTile>
                        ))}
                    </GridList>
                </div>

            </div>
        )
    }
}

export default Home;