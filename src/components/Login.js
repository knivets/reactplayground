import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom'

class Login extends Component {
  render() {
    return (
			<div className="form-container">
				<h1>Log In</h1>
				<form>
					<div>
						<input type="email" placeholder="Email"/>
					</div>
					<div>
						<input type="password" placeholder="Password"/>
					</div>
					<div className="form-footer">
						<input type="submit" className="btn" value="Log In"/>
						<span>Don’t have an account? <Link to="/signup">Create an account</Link></span>
					</div>
				</form>
			</div>
    );
  }
}

export default Login;
