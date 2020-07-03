import React, { Component } from 'react';
import { setAuthedUser } from '.././../src/redux/actions/authedusers';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Users extends Component {
    loginandRedirectUser = userData => {
        const { setLoggedInUser } = this.props;
        setLoggedInUser(userData);
    }

    render() {
        const {userData, leo} = this.props;
        const { name, avatarURL } = userData;
        console.log('authedUsers :>> ', leo);
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

function mapStateToProps( store ) {
    return {
        leo: store.authedUser
    }

}

const mapDispatchToProps = dispatch => {
    return {
        setLoggedInUser: (user) => dispatch(setAuthedUser(user))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)( Users );