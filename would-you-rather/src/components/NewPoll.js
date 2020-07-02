import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { saveQuestionAction } from '../../src/redux/actions/questions'

class NewPoll extends Component {

    state = {
        optionOneText: '',
		optionTwoText: '',
		redirect: false,
	}

	renderLoading = () => (
		<Loader
			type="Puff"
			color="#00BFFF"
			height={100}
			width={100}
			timeout={3000} //3 secs
		/>
	);

    formSubmit = e => {
        const { user: { id }, saveQuestionAction } = this.props;
        const { optionOneText, optionTwoText} = this.state;
        e.preventDefault();
		saveQuestionAction({ optionOneText, optionTwoText, author: id });
		this.renderLoading();
		this.setState({redirect: true})
    }

    onChangeOption = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }
    render() {
		if ( this.state.redirect ) return <Redirect to='/home' />;
        return (
			<div className="homePageContainer">
				<div className="homePage">
					<div className="container">
						<div className="questionContainer">
							<div className="questionAuthor">
								Create a new Poll
							</div>
							<div className="questionWrapper" style={{minHeight: '200px'}}>
								<form className="addQuestionContainer" onSubmit={this.formSubmit}>
                                    <div className="label">Would you rather</div>
									<div className="questionSection">
										<label>
											<input
                                                className="inputStyle"
												type="text"
												name="optionOneText"
												onChange={this.onChangeOption}
											/>
										</label>
									</div>
                                    <div className="or">OR</div>
									<div className="radio">
										<label>
											<input
                                                className="inputStyle"
												type="text"
												name="optionTwoText"
												onChange={this.onChangeOption}
											/>
										</label>
									</div>

									<button
										className="btn btn-default"
										type="submit"
									>
										Submit
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
    }
}

const mapStateToProps = state => ({
    user: state.authedUser
});

const mapDispatchToProps = dispatch => ({
    saveQuestionAction: (data) => dispatch(saveQuestionAction(data)),
})

export default connect( mapStateToProps, mapDispatchToProps)( NewPoll );