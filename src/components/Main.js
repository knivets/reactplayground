import React, { Component } from 'react';
import RetinaImage from 'react-retina-image';
import update from 'immutability-helper';
import shortid from 'shortid';
import IdeaForm from './IdeaForm';
import Idea from './Idea';
import { apiCall } from '../api';
import {
	Prompt
} from 'react-router-dom'

class Main extends Component {
	constructor(props) {
    super(props);
		this.state = {
			ideas: []
		}
		this.newIdea = this.newIdea.bind(this);
		this.editIdea = this.editIdea.bind(this);
		this.createIdea = this.createIdea.bind(this);
		this.updateIdea = this.updateIdea.bind(this);
		this.removeIdea = this.removeIdea.bind(this);
		this.closeForm = this.closeForm.bind(this);
	}
	componentDidMount() {
		apiCall('ideas', (err, res) => {
			if(res && res.status === 200){
				let ideas = res.body.map((e) => ({record: {...e}, _fresh: false, _edit: false}));
				this.setState({ideas: ideas})
			}
		});
	}
	newIdea(event) {
		event.preventDefault();
		const idea = {
			_fresh: true,
			_edit: true,
			record: {
				id: shortid.generate()
			}
		}
		this.setState(prevState => ({
			ideas: [idea, ...prevState.ideas]
		}))
	}
	findIndex(id){
		return this.state.ideas.findIndex((e) => e.record.id === id)
	}
	createIdea(record){
		const index = this.findIndex(record.oldId)
		let cleanedRecord = update(record, {$unset: ['oldId']})

		this.setState({
			ideas: update(this.state.ideas, {[index]: {record: {$set: cleanedRecord}, _edit: {$set: false}, _fresh: {$set: false}}})
		})
	}
	updateIdea(record){
		const index = this.findIndex(record.id)
		this.setState({
			ideas: update(this.state.ideas, {[index]: {record: {$set: record}, _edit: {$set: false}}})
		})
	}
	removeIdea(id){
		const index = this.findIndex(id)
		this.setState({
			ideas: update(this.state.ideas, {$splice: [[index, 1]] })
		})
	}
	closeForm(id){
		const index = this.findIndex(id)
		let record = this.state.ideas[index];
		if(record._fresh){
			// removing object completely
			this.setState({
				ideas: update(this.state.ideas, {$splice: [[index, 1]] })
			})
		}
		else {
			// marking a flag of existing object
			this.setState({
				ideas: update(this.state.ideas, {[index]: {_edit: {$set: false}}})
			})
		}
	}
	editIdea(id){
		const index = this.findIndex(id)
		this.setState({
			ideas: update(this.state.ideas, {[index]: {_edit: {$set: true}}})
		})
	}
  render() {
		const items = this.state.ideas.map((item, i) => {
			if(item._edit){
				return <IdeaForm	
					key={item.record.id}
					data={item.record}
					fresh={item._fresh}
					onAbort={this.closeForm}
					onCreate={this.createIdea}
					onUpdate={this.updateIdea}
				/>
			}
			else {
				return <Idea key={item.record.id} onEdit={this.editIdea} data={item.record}	onRemove={this.removeIdea} />
			}
		})
    return (
			<div className="content-container">
				<header className="page-header">
					<h1 className="page-title">My Ideas</h1>
					<RetinaImage className="add-idea-btn" onClick={this.newIdea} src={process.env.PUBLIC_URL + '/images/btn_addanidea.png'} alt=""/>
				</header>
				<Prompt when={true} message="hello"/>
				{this.state.ideas.length > 0 ? (
					<div className="results">
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
								{items}
							</tbody>
						</table>
					</div>
				) : (
					<div className="empty-results">
						<div className="empty-results-message">
							<RetinaImage src={process.env.PUBLIC_URL + '/images/bulb.png'} alt=""/>
							<div>Got Ideas?</div>
						</div>
					</div>
				)}
			</div>
    );
  }
}
//								<IdeaForm data={{content: 'h', impact: 2, ease: 3, confidence: 4}} />
export default Main;
