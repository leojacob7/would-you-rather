import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginPage from '../src/components/LoginPage';
import LandingPage from './components/LandingPage'
import NewPoll from '../src/components/NewPoll.js'
import Leaderboard from '../src/components/Leaderboard.js'
import QuestionCard from '../src/components/QuestionCard'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { getUsersAction } from '../src/redux/actions/shared';
import { setAuthedUser } from '../src/redux/actions/authedusers';
import NavBar from '../src/components/NavBar'
import './App.css';

class App extends Component {
	componentDidMount() {
		this.props.getUsersAction();
	}

	render() {
		const { users, authedUser, setLoggedInUser } = this.props;
		debugger;
		return (
			<BrowserRouter>
				<div>
					{authedUser === null || !authedUser ? (
						<Route render={() => <LoginPage users={users} />} />
					) : (
						<div>
							<NavBar
								authedUser={authedUser}
								setLoggedInUser={setLoggedInUser}
							/>
							<Switch>
								<Route
									exact
									path="/leaderboard"
									component={() => <Leaderboard />}
								/>
								<Route
									exact
									path="/"
									component={() => <LandingPage />}
								/>
								<Route
									exact
									path="/add"
									component={() => <NewPoll />}
								/>
								<Route
									path="/questions/:qid"
									component={QuestionCard}
								/>
							</Switch>
						</div>
					)}
				</div>
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
