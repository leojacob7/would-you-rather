import React, { Component } from 'react';
import { connect } from 'react-redux';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner'

class Result extends Component {
	renderLoading = () => (
		<Loader
			type="Puff"
			color="#00BFFF"
			height={100}
			width={100}
			timeout={3000} //3 secs
		/>
	);

	render() {
		const {
			question: { optionOne, optionTwo },
			selectedValue,
			user,
			loading,
		} = this.props;
		const totalVotes = optionOne.votes.length + optionTwo.votes.length;
		let op1 = optionOne.votes.length;
		let op2 = optionTwo.votes.length;
		const optionOnePercent = Math.floor((op1 / totalVotes) * 100);
		const optionTwoPercent = Math.floor((op2 / totalVotes) * 100);
		const votingIndicator =
			selectedValue === 'optionOne'
				? `You and ${optionOne.votes.length} ${
						optionOne.votes.length > 1 ? 'people' : 'person'
				  } out of ${totalVotes} people voted`
				: `You and ${optionTwo.votes.length} ${
						optionTwo.votes.length > 1 ? 'people' : 'person'
				  } out of ${totalVotes} people voted`;
		if (loading) this.renderLoading();

		return (
			<div>
				<div className="homePageContainer">
					<div className="container">
						<div className="questionAuthor">{`${user.name} asks`}</div>
						<div className="questionWrapper">
							<img
								src={user.avatarURL}
								alt=""
								className="questionuserAvatar"
							/>
							<div className="questionSection flexColumn paddingContainer">
								Results:
								<div className="optionOneSection">
									<div className="optionText">
										{optionOne.text}
									</div>
									<div id="progress">
										<div
											id="bar"
											style={{
												width: `${optionOnePercent}%`,
											}}
										>{`${optionOnePercent} %`}</div>
									</div>
									{selectedValue === 'optionOne'
										? votingIndicator
										: `${op1} of ${totalVotes} people voted this`}
								</div>
								<div className="optionTwoSection">
									<div className="optionText">
										{optionTwo.text}
									</div>
									<div id="progress">
										<div
											id="bar"
											style={{
												width: `${optionTwoPercent}%`,
											}}
										>{`${optionTwoPercent} %`}</div>
									</div>
									{selectedValue === 'optionTwo'
										? votingIndicator
										: `${op2} of ${totalVotes} people voted this`}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ( state, ownProps ) =>{
    const question = state.questions[ownProps.qid];
    console.log('state.questions[ownProps.qid] :>> ', state);
    let selectedValue;
    if (question.answered) {
        selectedValue = question.optionOne.votes.toString().includes(ownProps.user.id) ? 'optionOne' : 'optionTwo';
    }
    return{
		loading: state.loading,
        question: state.questions[ownProps.qid],
        selectedValue : selectedValue,
    }
}

export default connect( mapStateToProps )( Result )