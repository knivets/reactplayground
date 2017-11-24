import React, { Component } from 'react';
import RetinaImage from 'react-retina-image';
import '../App.css';
import {
  Link
} from 'react-router-dom'

class List extends Component {
  render() {
    return (
			<div className="content-container">
				<header className="page-header">
					<h1 className="page-title">My Ideas</h1>
					<a href="#"><RetinaImage src={process.env.PUBLIC_URL + '/images/btn_addanidea.png'} alt=""/></a>
				</header>
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
							<tr>
								<td><input type="text"/></td>
								<td>
									<select><option>10</option></select>
								</td>
								<td>
									<select><option>10</option></select>
								</td>
								<td>
									<select><option>10</option></select>
								</td>
								<td>10</td>
								<td>
									<RetinaImage src={process.env.PUBLIC_URL + '/images/Confirm_V.png'} alt=""/>
									<RetinaImage src={process.env.PUBLIC_URL + '/images/Cancel_X.png'} alt=""/>
								</td>
							</tr>
							<tr>
								<td>- option to pay mentor with beer, not cash.</td>
								<td>10</td>
								<td>10</td>
								<td>10</td>
								<td>10</td>
								<td>
									<RetinaImage src={process.env.PUBLIC_URL + '/images/pen.png'} alt=""/>
									<RetinaImage src={process.env.PUBLIC_URL + '/images/bin.png'} alt=""/>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="empty-results">
					<div className="empty-results-message">
						<RetinaImage src={process.env.PUBLIC_URL + '/images/bulb.png'} alt=""/>
						<div>Got Ideas?</div>
					</div>
				</div>
			</div>
    );
  }
}

export default List;
