import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import LoginPage from '../src/components/LoginPage';
import LandingPage from './components/LandingPage'
import NewPoll from '../src/components/NewPoll.js'
import Leaderboard from '../src/components/Leaderboard.js'
import AnswerQuestion from '../src/components/AnswerQuestion'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { getUsersAction } from '../src/redux/actions/shared';
import { setAuthedUser } from '../src/redux/actions/authedusers';
import NavBar from '../src/components/NavBar'
import _ from 'lodash';
import './App.css';

class App extends Component {
	componentDidMount() {
		this.props.getUsersAction();
	}

	render() {
		const { users, authedUser, setLoggedInUser } = this.props;
		return (
			<BrowserRouter>
				<Fragment>
					{ !_.isEmpty(authedUser) && <NavBar authedUser={authedUser} setLoggedInUser={ setLoggedInUser } /> }
					<Switch>
						{!_.isEmpty(users) && (
							<Route
								exact
								path="/"
								component={() => <LoginPage users={users} />}
							/>
						)}
						<Route exact path="/home" component={() => <LandingPage />} />
						<Route exact path="/add" component={() => <NewPoll/>} />
						<Route exact path="/leaderboard" component={() => <Leaderboard/>} />
						<Route path="/questions/" component={AnswerQuestion} />
					</Switch>
				</Fragment>
			</BrowserRouter>
		);
	}
}

function mapStateToProps(store) {
	return {
		users: store.users,
		authedUser: store.authedUser,
	};
}

const mapDispatchToProps = dispatch => {
    return {
		getUsersAction: () => dispatch(getUsersAction()),
        setLoggedInUser: (user) => dispatch(setAuthedUser(user))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
