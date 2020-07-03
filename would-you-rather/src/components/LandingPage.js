import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../redux/actions/authedusers';
import HomePage from './HomePage';

class LandingPage extends Component {
    render() {
            const { authedUser } = this.props;
            return (
				<div>
					<HomePage authedUser={ authedUser }/>
                    
				</div>
			);
    }
}

const mapStateToProps = store => {
    return {
        authedUser: store.authedUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLoggedInUser: (user) => dispatch(setAuthedUser(user))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);