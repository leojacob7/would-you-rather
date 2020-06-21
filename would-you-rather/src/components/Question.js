import React, { Component } from 'react';
import AnswerQuestion from './AnswerQuestion';
import Result from './Result'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Question extends Component {
	showResults = () => {
		const {
			formattedQuestion: { question, user },
		} = this.props;
		return <Result qid={question.id} user={user} />;
	};

	renderResults = (answered) => (
		<button className="showResults" onClick={this.showResults}>
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
							<Link
								to={{
									pathname: '/questions',
									hash: question.id,
									state: {
										question,
										user,
										answered: answered,
									},
								}}
							>
								{this.renderResults(answered)}
							</Link>
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