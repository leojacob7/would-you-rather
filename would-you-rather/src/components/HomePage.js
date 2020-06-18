import React, { Component } from 'react';
import Question from './Question'
import _ from 'lodash';
import { getQuestions } from '../../src/redux/actions/questions';
import { connect } from 'react-redux';

class HomePage extends Component {
    componentDidMount() {
        this.props.dispatch(getQuestions(this.props.authedUser));
    }
    state = {
        tab: 'unAnswered',
    }

    selectTab = (event) => {
        event.stopPropagation();
        this.setState({
            tab: event.target.className
        })
    }
    
    render() {
        const { tab } = this.state;
        const { answeredQuestions, unansweredQuestions } = this.props;
        

        return (
			<div className="homePageContainer">
				<div className="homePage">
					<div className="tabContainer">
						<div className={ `tab unansweredTab ${ tab === 'unAnswered' ? 'selectedTab' : ''}` }>
							<div className="unAnswered" onClick={ this.selectTab }>Unanswered</div>
						</div>
                        <div className={`tab answeredTab ${ tab === 'answered' ? 'selectedTab' : ''}`}>
						<div className="answered" onClick={ this.selectTab }>Answered</div>
                        </div>
					</div>
                    {
                        tab === 'answered' ? !_.isEmpty(answeredQuestions) && answeredQuestions.map( question =>
                            <Question question={ question} />
                            )
                            : !_.isEmpty(unansweredQuestions) && unansweredQuestions.map( (question, index) =>
                                <Question key={ index } question={ question} />
                                )
                    }
				</div>
			</div>
		);
    }
}

const mapStateToProps = (state) => {
    return {
        answeredQuestions: state.questions.answeredQuestions,
        unansweredQuestions: state.questions.unansweredQuestions,
    };
}

export default connect(mapStateToProps)(HomePage);