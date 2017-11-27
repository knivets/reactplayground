import React, { Component } from 'react';
import RetinaImage from 'react-retina-image';
import { apiCall } from '../api';

class IdeaForm extends Component {
	constructor(props) {
    super(props);
		var state;
		if(props.fresh){
			state = {
				id: props.data.id,
				content: '',
				impact: 1,
				ease: 1,
				confidence: 1,
				average_score: '0',
			}
		}
		else {
			state = props.data;
		}
		this.state = state;
		this.submit = this.submit.bind(this);
		this.abort = this.abort.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	create() {
		let record = {
			content: this.state.content,
			impact: this.state.impact,
			ease: this.state.ease,
			confidence: this.state.confidence,
		}
		apiCall('ideas', (err, res) => {
			if(!err){
				// saving old id to locate the view
				record.oldId = this.state.id
				this.setState({
					average_score: res.body.average_score,
					id: res.body.id // fetching newly create object
				}, () => {
					record.average_score = this.state.average_score
					record.id = this.state.id;
					this.props.onCreate(record);
				})
			}
		}, 'post', record);
	}
	update() {
		let record = {
			content: this.state.content,
			impact: this.state.impact,
			ease: this.state.ease,
			confidence: this.state.confidence,
		}
		let url = `ideas/${this.state.id}`
		apiCall(url, (err, res) => {
			if(!err){
				this.setState({average_score: res.body.average_score}, () => {
					record.average_score = this.state.average_score
					record.id = this.state.id;
					this.props.onUpdate(record);
				})
			}
		}, 'put', record);
	}
	abort(event) {
		event.preventDefault();
		this.props.onAbort(this.state.id);
	}
	submit(event) {
		event.preventDefault();
		if(this.props.fresh){
			this.create();
		}
		else {
			this.update();
		}
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
										<span>{this.state.average_score}</span>
									</td>
									<td>
										<RetinaImage src={process.env.PUBLIC_URL + '/images/Confirm_V.png'} alt="" onClick={this.submit}/>
										<RetinaImage src={process.env.PUBLIC_URL + '/images/Cancel_X.png'} alt="" onClick={this.abort}/>
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

export default IdeaForm;
