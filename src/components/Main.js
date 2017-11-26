import React, { Component } from 'react';
import RetinaImage from 'react-retina-image';
import { apiCall } from '../api';
import '../App.css';

function IdeaList(props){
	const items = props.data.map((item) => <Idea key={item.id} data={item}/>)
	return items;
}

function Idea(props){
	return (
		<tr>
			<td>{props.data.content}</td>
			<td>{props.data.impact}</td>
			<td>{props.data.ease}</td>
			<td>{props.data.confidence}</td>
			<td>{props.data.average_score}</td>
			<td>
				<RetinaImage src={process.env.PUBLIC_URL + '/images/pen.png'} alt=""/>
				<RetinaImage src={process.env.PUBLIC_URL + '/images/bin.png'} alt=""/>
			</td>
		</tr>
	)
}

class IdeaForm extends Component {
	constructor(props) {
    super(props);
		var state;
		if(props.data){
			state = props.data;
		}
		else {
			state = {
				content: '',
				impact: 0,
				ease: 0,
				confidence: 0
			}
		}
		this.state = state;
		this.submit = this.submit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	submit(event) {
		event.preventDefault();
		apiCall('ideas', (err, res) => {
			if(!err){
			}
		}, 'post', {
			content: this.state.content,
			impact: this.state.impact,
			ease: this.state.ease,
			confidence: this.state.confidence,
		});
	}
	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}
	render() {
		const options = Array(10).fill().map((_, i) => <option key={i+1} value={i+1}>{i+1}</option>);
		return (
			<tr>
				<td colSpan="6">
					<form onSubmit={this.submit}>
						<table className="table-nested">
							<tbody>
								<tr>
									<td>
										<input type="text" name="content" value={this.state.content} onChange={this.handleInputChange}/>
									</td>
									<td>
										<select name="impact" value={this.state.impact} onChange={this.handleInputChange}>
											{options}
										</select>
									</td>
									<td>
										<select name="ease" value={this.state.ease} onChange={this.handleInputChange}>
											{options}
										</select>
									</td>
									<td>
										<select name="confidence" value={this.state.confidence} onChange={this.handleInputChange}>
											{options}
										</select>
									</td>
									<td>
										<span>10</span>
									</td>
									<td>
										<RetinaImage src={process.env.PUBLIC_URL + '/images/Confirm_V.png'} alt="" onClick={this.submit}/>
										<RetinaImage src={process.env.PUBLIC_URL + '/images/Cancel_X.png'} alt=""/>
									</td>
								</tr>
							</tbody>
						</table>
					</form>
				</td>
			</tr>
		)
	}
}


class Main extends Component {
	constructor(props) {
    super(props);
		this.state = {
			ideas: []
		}
	}
	componentDidMount() {
		apiCall('ideas', (err, res) => {
			if(res && res.status === 200){
				this.setState({ideas: res.body})
			}
		});
	}
  render() {
    return (
			<div className="content-container">
				<header className="page-header">
					<h1 className="page-title">My Ideas</h1>
					<a href="#"><RetinaImage src={process.env.PUBLIC_URL + '/images/btn_addanidea.png'} alt=""/></a>
				</header>
				<div className="results" style={{display: (this.state.ideas.length > 0 ? 'block' : 'none')}}>
					<table>
						<thead>
							<tr>
								<th></th>
								<th>Impact</th>
								<th>Ease</th>
								<th>Confidence</th>
								<th>Avg.</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<IdeaForm data={{content: 'h', impact: 2, ease: 3, confidence: 4}} />
							<IdeaList data={this.state.ideas}/>
						</tbody>
					</table>
				</div>
				<div className="empty-results" style={{display: (this.state.ideas.length === 0 ? 'block' : 'none')}}>
					<div className="empty-results-message">
						<RetinaImage src={process.env.PUBLIC_URL + '/images/bulb.png'} alt=""/>
						<div>Got Ideas?</div>
					</div>
				</div>
			</div>
    );
  }
}

export default Main;
