import React, { Component } from 'react';
import '../App.css';
import { setTokens } from '../tokens';
import { guestApiCall } from '../api';
import {
  Redirect,
	Link
} from 'react-router-dom'

class Signup extends Component {
	constructor(props) {
    super(props);
		this.state = {
			name: '',
			email: '',
			password: '',
			created: false
		}
		this.submit = this.submit.bind(this);
	}
	handleChangeFor = (propertyName) => (event) => {
		let state = {
      [propertyName]: event.target.value
    };
    this.setState(state);
  }
	submit(event) {
		event.preventDefault();
		this.setState({errors: ''});
		let self = this;
		guestApiCall('users', (err, res) => {
			if(err){
				self.setState({errors: res.body.reason});
			}
			if(res.status === 201){
				setTokens(res.body);
				this.props.onAuthenticate(() => this.setState({created: true}))
			}
		}, 'post', {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password
		});
	}
  render() {
		if (this.state.created) {
			return <Redirect to="/"/>
		}
    return (
			<div className="form-container">
				<h1>Sign Up</h1>
				<form onSubmit={this.submit}>
					<div className="form-errors">
						{this.state.errors}
					</div>
					<div>
						<input type="text" placeholder="Name" name="name" onChange={this.handleChangeFor('name')} required/>
					</div>
					<div>
						<input type="email" placeholder="Email" name="email" onChange={this.handleChangeFor('email')} required/>
					</div>
					<div>
						<input type="password" placeholder="Password" name="password" onChange={this.handleChangeFor('password')} required/>
					</div>
					<div className="form-footer">
						<input type="submit" className="btn" value="Sign Up"/>
						<span>Already have an account? <Link to="/login">Log in</Link></span>
					</div>
				</form>
			</div>
    );
  }
}

export default Signup;
