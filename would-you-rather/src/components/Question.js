import React, { Component } from 'react';
import Result from './Result'
import AnswerQuestion from './AnswerQuestion'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Question extends Component {
	showResults = (answered) => {
		const {
			formattedQuestion: { question, user },
		} = this.props;
		if ( !question.answered ) { return <AnswerQuestion qid={question.id} question={question} user={user} answered={answered}/> }
		else return <Result qid={question.id} user={user} />;
	};

	renderResults = (answered) => (
		<button className="showResults" onClick={(answered) => this.showResults(answered)}>
			{answered ? 'Show Results' : 'AnswerQuestion'}
		</button>
	);

	render() {
		const {
			formattedQuestion: { question, user },
			answered,
		} = this.props;

		return (
			<div className="container">
				<div className="questionContainer">
					<div className="questionAuthor">{`${user.name} asks`}</div>
					<div className="questionWrapper">
						<img
							src={user.avatarURL}
							alt=""
							className="questionuserAvatar"
						/>
						<div className="questionSection">
							<div className="question">Would you rather</div>
							<div className="optionOne">
								{question.optionOne.text}
							</div>
							<div>OR</div>
							<div className="optionTwo">
								{question.optionTwo.text}
							</div>
							{/* <Link
								to={{
									pathname: '/questions',
									hash: question.id,
									state: {
										question,
										user,
										answered: answered,
									},
								}}
							> */}
								{this.renderResults(answered)}
							{/* </Link> */}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ( state, ownProps ) =>{
    const { users } = state;
    const { question } = ownProps;
    return {
        formattedQuestion: {  ...ownProps, user: users[question.author] }
    }
}

export default connect(mapStateToProps)(Question);