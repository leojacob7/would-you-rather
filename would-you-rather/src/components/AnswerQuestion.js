import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { saveAnswerAction } from '../../src/redux/actions/questions';
import { connect } from 'react-redux'

class AnswerQuestion extends Component {
    state = {
        selectedValue: '',
    }

    formSubmit = event => {
		const { selectedValue } = this.state;
		event.preventDefault();
		if( selectedValue === '' ) return null;

		const { authedUser, saveAnswer } = this.props;
		const { question } = this.props.location.state;

		saveAnswer(authedUser.id, question.id , selectedValue)
    }

    onChangeOption = event => {
        this.setState({
            selectedValue: event.target.name,
        })
    }

    render() {
        const { question, user } = this.props.location.state;
        const { selectedValue } = this.state;

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

						<form onSubmit={this.formSubmit}>
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