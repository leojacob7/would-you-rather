import React, { Component } from 'react';
import { setAuthedUser } from '.././../src/redux/actions/authedusers';
import { connect } from 'react-redux';

class Users extends Component {
    loginandRedirectUser = userData => {
        const { setLoggedInUser } = this.props;
        setLoggedInUser(userData);
    }

    render() {
        const { userData } = this.props;
        const { name, avatarURL } = userData;
        return (
				<div
					className="user"
					onClick={() => this.loginandRedirectUser(userData)}
				>
					<img src={avatarURL} alt="" className="userAvatar" />
					<div className="username">{name}</div>
				</div>
		);
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLoggedInUser: (user) => dispatch(setAuthedUser(user))
    }
};

export default connect(null, mapDispatchToProps)( Users );