import React, { Component } from 'react';
import { connect } from 'react-redux';
import Result from './Result'
import AnswerQuestion from './AnswerQuestion'

class QuestionCard extends Component {
    render() {
        return (
            <div>
                qw
            </div>
        );
    }
}

const mapStateToProps = ( state, ownProps ) =>{
    debugger;
    const { users } = state;
    const { question } = ownProps;
    return {
        formattedQuestion: state
    }
}

export default connect( mapStateToProps )( QuestionCard );