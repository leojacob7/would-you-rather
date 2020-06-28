import React, { Component } from 'react';
import { saveAnswerAction } from '../../src/redux/actions/questions';
import Result from './Result';
import { connect } from 'react-redux'

class AnswerQuestion extends Component {
    state = {
		selectedValue: '',
		answeredQuestion: false,
    }

    formSubmit = event => {
		const { selectedValue } = this.state;
		event.preventDefault();
		if( selectedValue === '' ) return null;

		const { authedUser, saveAnswer } = this.props;
		const { question } = this.props;
		this.setState({ answeredQuestion: true })
		saveAnswer(authedUser.id, question.id , selectedValue)
    }

    onChangeOption = event => {
        this.setState({
            selectedValue: event.target.name,
        })
	}
	
	renderForm = () => {
		const { question } = this.props;
		const { selectedValue } = this.state;
		return <form onSubmit={this.formSubmit}>
							<div className="questionSection">
								Would you rather
								<label>
									<input
										type="radio"
										name='optionOne'
										value={question.optionOne.text}
										checked={
											selectedValue === 'optionOne'
										}
										onChange={this.onChangeOption}
									/>
									{question.optionOne.text}
								</label>
							</div>
							<div className="radio">
								<label>
									<input
										type="radio"
										name="optionTwo"
										value={question.optionTwo.text}
										checked={
											selectedValue === 'optionTwo'
										}
										onChange={this.onChangeOption}
									/>
									{question.optionTwo.text}
								</label>
							</div>
							<button className="btn btn-default" type="submit">
								Submit
							</button>
						</form>
	}

    render() {
		const { user, question, answered } = this.props;
		const { answeredQuestion } = this.state;

		if( answeredQuestion || answered ) return <Result qid={question.id} user={user} />;

		return (
			<div className="homePageContainer">
					<div className="container">
						<div className="questionAuthor">{`${user.name} asks`}</div>
						<div className="questionWrapper">
							<img
								src={user.avatarURL}
								alt=""
								className="questionuserAvatar"
							/>
							{ this.renderForm() }
						</div>
					</div>
			</div>
		);
    }
}

const mapStateToProps = ( state ) =>{
    return {
        authedUser: state.authedUser,
    }
} 

const mapDispatchToProps = dispatch => {
    return {
		saveAnswer: (authUser, qid, answer) => dispatch(saveAnswerAction(authUser, qid, answer)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AnswerQuestion);