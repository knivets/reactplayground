import React, { Component } from 'react';
import RetinaImage from 'react-retina-image';
import './App.css';
import './Popup.css';
import {
  BrowserRouter as Router,
  Route,
	Redirect,
  Link
} from 'react-router-dom'

import Popup from 'react-popup';

import {
	Login,
	Signup,
	Logout,
	Main
} from './components/index';

import { apiCall } from './api';

const PrivateRoute = ({ component: Component, ...rest }) => {
	if(rest.loaded === true){
		return <Route {...rest} render={props => (
			rest.user ? (
				<Component {...props}/>
			) : (
				<Redirect to={{
					pathname: '/login',
					state: { from: props.location }
				}}/>
			)
		)}/>
	}
	else
	{
		return <Route {...rest} render={() => <div className="loading-screen">Loading...</div>}/>
	}
}

function User(props){
	if(props.data){
		return (
			<div className="current-user">
				<RetinaImage src={props.data.avatar_url} alt=""/>
				<h2 className="current-user-name">{props.data.name}</h2>
				<Link className="current-user-logout" to="/logout">Log out</Link>
			</div>
		)
	}
	else
	{
		return null
	}
}

class App extends Component {
	constructor(props) {
    super(props);
		this.state = {
			loaded: false,
			user: false
		}
		this.updateUser = this.updateUser.bind(this);
	}
	updateUser(cb){
		apiCall('me', (err, res) => {
			if(err){
				this.setState({user: false}, cb);
			}
			else {
				this.setState({user: res.body}, cb);
			}
		});
	}
	componentDidMount() {
		apiCall('me', (err, res) => {
			if(err){
				this.setState({user: false, loaded: true});
			}
			else {
				this.setState({user: res.body, loaded: true});
			}
		});
	}
  render() {
    return (
			<Router>
				<div className="container">
					<Popup/>
					<aside className="sidebar">
						<div className="logo">
							<Link to="/"><RetinaImage src={process.env.PUBLIC_URL + '/images/IdeaPool_icon.png'} alt=""/></Link>
							<h1 className="site-title">The Idea Pool</h1>
						</div>
						<User data={this.state.user}/>
					</aside>
					<div className="content">
						<PrivateRoute exact path="/" loaded={this.state.loaded} user={this.state.user} component={Main} />
						<Route exact path="/login" render={() => <Login onAuthenticate={this.updateUser}/>} />
						<Route exact path="/signup" render={() => <Signup onAuthenticate={this.updateUser}/>} />
						<Route exact path="/logout" render={() => <Logout onLogout={this.updateUser}/>} />
					</div>
				</div>
			</Router>
    );
  }
}

export default App;
