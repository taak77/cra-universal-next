import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Alert, Button, Form, FormGroup, Label, Input, Col} from 'reactstrap';
import {signIn} from "./actions/user";
import userSelector from "./selectors/userSelector";
import styles from './Login.module.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailValid: 0,
            passwordValid: 0
        };
        this.emailInput = React.createRef();
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
            this.props.dispatch(signIn({
                email: this.emailInput.current.value,
                password: this.passwordInput.current.value
            }));
        }
    };

    render() {
        const {user: {user, errorMsg}} = this.props;
        let {emailValid, passwordValid} = this.state;
        return (
            <div className="container">
                {user ? (
                    <div>
                        <h2 className="h3">Log In</h2>
                        <Alert color="primary">
                            You are now logged in.
                        </Alert>
                    </div>
                ) : (
                    <div>
                        <h2 className="h3">Log In</h2>
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
                                    <Button onClick={this.onSubmit}>Log In</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                )}
                <div className={styles.footer}>
                    <span>{`Don't have an account ? `}</span>
                    <Link to="/signup">Sign up here</Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: userSelector(state)
});

export default connect(mapStateToProps)(Login);
