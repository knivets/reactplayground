import React, { Component } from 'react';
import RetinaImage from 'react-retina-image';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import {
	Login,
	Signup,
	Logout,
	Main
} from './components/index';

class App extends Component {
  render() {
    return (
			<Router>
				<div className="container">
					<aside className="sidebar">
						<div className="logo">
							<RetinaImage src={process.env.PUBLIC_URL + '/images/IdeaPool_icon.png'} alt=""/>
							<h1 className="site-title">The Idea Pool</h1>
						</div>
						<div className="current-user">
							<RetinaImage src={process.env.PUBLIC_URL + '/images/User_ProfilePic.png'} alt=""/>
							<h2 className="current-user-name">Joyce Lee</h2>
							<h3 className="current-user-logout">Log out</h3>
						</div>
					</aside>
					<div className="content">
						<Route exact path="/" component={Main}/>
						<Route exact path="/login" component={Login}/>
						<Route exact path="/signup" component={Signup}/>
					</div>
				</div>
			</Router>
    );
  }
}

export default App;
