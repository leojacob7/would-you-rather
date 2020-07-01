import React, { Component } from 'react';
import { connect } from 'react-redux';
import Result from './Result'
import AnswerQuestion from './AnswerQuestion'

class QuestionCard extends Component {
    render() {
        const { formattedQuestion: { question, user }, badPath } = this.props;
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
    }
}

export default connect( mapStateToProps )( QuestionCard );