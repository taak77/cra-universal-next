import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Alert, Button, Form, FormGroup, Label, Input, Col} from 'reactstrap';
import {signUp, signOut} from "./actions/user";
import userSelector from "./selectors/userSelector";
import uuid from './utils/uuid';

//import styles from './Signup.module.css';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailValid: 0,
            passwordValid: 0
        };
        this.emailInput = React.createRef();
        this.usernameInput = React.createRef();
        this.passwordInput = React.createRef();
    }

    static propTypes = {
        dispatch: PropTypes.func,
        user: PropTypes.object
    };

    validate() {
        let {emailValid, passwordValid} = this.state;
        let isValid = true;
        console.log('validate', this.emailInput.current.value, this.passwordInput.current.value)
        if (!this.emailInput.current.value) {
            emailValid = -1;
            isValid = false;
        }
        if (!this.passwordInput.current.value) {
            passwordValid = -1;
            isValid = false;
        }
        if (!isValid) {
            this.setState({
                emailValid,
                passwordValid
            });
        }

        return isValid;
    }

    onSubmit = (event) => {
        event.preventDefault();
        if (this.validate()) {
            this.props.dispatch(signUp({
                username: uuid(),
                email: this.emailInput.current.value,
                password: this.passwordInput.current.value
            }));
        }
    };

    onLogout = (event) => {
        event.preventDefault();
        this.props.dispatch(signOut());
    };

    render() {
        const {user: {user, status, errorMsg}} = this.props;
        let {emailValid, passwordValid} = this.state;
        let view = (
            <div>
                <h2 className="h3">Sign Up</h2>
                {errorMsg && (
                    <Alert color="danger">
                        {errorMsg}
                    </Alert>
                )}
                <Form>
                    <FormGroup row>
                        <Label for="email" sm={2}>Email</Label>
                        <Col sm={10}>
                            <Input
                                innerRef={this.emailInput}
                                type="email"
                                name="email"
                                id="email"
                                placeholder=""
                                invalid={emailValid === -1}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="password" sm={2}>Password</Label>
                        <Col sm={10}>
                            <Input
                                innerRef={this.passwordInput}
                                type="password"
                                name="password"
                                id="password"
                                placeholder=""
                                maxLength={6}
                                invalid={passwordValid === -1}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup check row>
                        <Col sm={{size: 10, offset: 2}}>
                            <Button onClick={this.onSubmit}>Sign Up</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
        if (user) {
            if (status === 'signedin') {
                view = (
                    <div>
                        <h2 className="h3">Sign Up</h2>
                        <Alert color="primary">
                            You are already logged in. <a href="#" onClick={this.onClick}>Log out?</a>
                        </Alert>
                    </div>
                );
            } else if (status === 'unconfirmed') {
                view = (
                    <div>
                        <h2 className="h3">Sign Up</h2>
                        <Alert color="success">
                            Please check your email to complete the signup!
                        </Alert>
                    </div>
                );
            }
        }
        return (
            <div className="container">
                {view}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: userSelector(state)
});

export default connect(mapStateToProps)(Signup);
