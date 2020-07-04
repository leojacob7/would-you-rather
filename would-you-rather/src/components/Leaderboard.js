import React, { Component } from 'react';
import { connect } from 'react-redux';

class Leaderboard extends Component {
    renderLeaderBoardTile = (user, index ) => {
        const questionsAnswered = Object.keys(user.answers).length;
        const questionsAsked = user.questions.length;
        return(
            <div className="container" style={{minHeight: '150px'}} key={ index }>
                <div className="questionWrapper" style={{alignItems: 'center'}}>
                    <img
                        src={user.avatarURL}
                        alt=""
                        className="questionuserAvatar"
                    />
                    <div className="answeredWrapper">
                        <div className="name">{ user.name }</div>
                        <div className="questionsAnswered">{ `Questions Answered: ${ questionsAnswered }` }</div>
                        <div className="createdQuestions">{ `Questions Asked: ${ questionsAsked }` }</div>
                    </div>
                    <div className="score">
                        <div className="scoreText">Score</div>
                        <div className="actualScore">{ questionsAnswered + questionsAsked }</div>
                    </div>
                </div>
            </div>
            
        )
    }

    render() {
        const { users = [], } = this.props;

            return (
				<div>
					<div className="homePageContainer flexColumnDirection">
						{users.map((user, index) =>
							this.renderLeaderBoardTile(user, index)
						)}
					</div>
				</div>
			);
    }
}

const mapStateToProps = state => {
    const sortedUserList = Object.values(state.users).sort((a,b) => 
        {
            const objAanswers = Object.keys(a.answers)
            const objAQuestions = Object.keys(a.questions)
            const objBanswers = Object.keys(b.answers)
            const objBQuestions = Object.keys(b.questions)
            return ( objBanswers.length + objBQuestions.length )- ( objAanswers.length + objAQuestions.length )})
    return { users: sortedUserList }
}

export default connect( mapStateToProps )( Leaderboard);