import React, { Component } from 'react';
import {
	Redirect,
} from 'react-router-dom'
import {
	removeTokens
} from '../tokens';
import '../App.css';

class Logout extends Component {
	constructor(props) {
    super(props);
		this.state = {
			signedOut: false,
		}
	}
	componentDidMount() {
		removeTokens();
		this.props.onLogout(() => this.setState({signedOut: true}))
	}
  render() {
		if (this.state.signedOut) {
			return <Redirect to="/"/>
		}
    return null;
  }
}

export default Logout;
