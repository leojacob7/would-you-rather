import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class NavBar extends Component {
    onLogout = () => {
        const { setLoggedInUser } = this.props;
        setLoggedInUser(null)
    }

    render() {
        const { avatarURL, name } = this.props;

        return (
			<div className="headerNav">
				<div className="leftNav">
					<Link to="/home">
						<div className="home">Home</div>
					</Link>
					<Link to="/add">
						<div className="newPoll">New Poll</div>
					</Link>
					<Link to="/leaderboard">
						<div className="leaderboard">Leaderboard</div>
					</Link>
				</div>
				<div className="rightNav">
					<img
						src={!_.isNull(avatarURL) && avatarURL}
						className="userName"
					/>
					<div>{name} </div>
					<div className="logout" onClick={this.onLogout}>
						Logout
					</div>
				</div>
			</div>
		);
    }
}

export default NavBar;