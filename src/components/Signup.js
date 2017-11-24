import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom'

class Signup extends Component {
  render() {
    return (
			<div className="form-container">
				<h1>Sign Up</h1>
				<form>
					<div>
						<input type="text" placeholder="Name" required/>
					</div>
					<div>
						<input type="email" placeholder="Email"/>
					</div>
					<div>
						<input type="password" placeholder="Password"/>
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
