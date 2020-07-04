import React, { Component } from 'react';
import { connect } from 'react-redux';
import Result from './Result';
import { getQuestions } from '../../src/redux/actions/questions';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import AnswerQuestion from './AnswerQuestion';

class QuestionCard extends Component {
    componentDidMount() {
							this.props.dispatch(
								getQuestions(this.props.authedUser)
							);
						}

    render() {
        const { formattedQuestion: { question, user }, badPath } = this.props;
        if( !question ) return <div className="spinner">
        <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000}
    />
    </div>
        if ( badPath ) return <div className="flexCenter">Sorry that page does not exist</div>
        if ( question.answered ) return <Result qid={question.id} user={user} />
        return (
            <AnswerQuestion qid={question.id} question={question} user={user} answered={question.answered}/>
        );
    }
}

const mapStateToProps = ( state, ownProps ) =>{
    const { users, questions } = state;
    const { match: { params: { qid } } } = ownProps;
    const badPath = !questions[qid];
    const question = !badPath && questions[ qid ];
    const user = !badPath && users[questions[qid].author];
    return {
        formattedQuestion: { question, user },
        badPath,
        authedUser: state.authedUser,
    }
}

// const mapDispatchToProps = dispatch => ({
//     getQuestionsForAuthedUser: () => dispatch(getQuestionsForAuthedAccount)
// })

export default connect( mapStateToProps )( QuestionCard );