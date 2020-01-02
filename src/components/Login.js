/* eslint-disable quotes */

import React from "react";
import {Form, Button} from "react-bootstrap";
import userActions from "../actions/user";
import { connect } from "react-redux";
import{ToastContainer} from 'react-toastify';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faFan } from '@fortawesome/free-solid-svg-icons';
import {firebase} from '../config/firebase-config';

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            isLogining: false,
            rememberUsername: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        const { logout } = this.props;
        logout(); 
    }
   
    UNSAFE_componentWillMount(){
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            console.log("Đã thoát");
          }).catch(function(error) {
            // An error happened.
          });
          const username = localStorage.getItem('username');
          if(username){
              this.setState({email: username, rememberUsername: true});
          }
    }
    handleChange(e){
        const {name} = e.target;
        let {value} = e.target;
        if(name === 'rememberUsername'){
            value = e.target.checked
        }
        this.setState({
            [name]: value
        });
    }

    handleSubmit(e){
        e.preventDefault();
        const {email, password, rememberUsername} = this.state;
        const {login} = this.props;
        login(email, password, rememberUsername);
    }

    render(){
        const {isLogining} = this.props;
        const {email, password, rememberUsername} = this.state;

        return (
            <div className="container">
                <div className="row justify-content-center mt-4 mb-4" >
                    <div className="col-md-6 border border-dark shadow rounded">
                        <div className="row justify-content-center">
                            <div className="col-md-8 mt-5 mb-5">
                                <h3 className="mb-3">Đăng Nhập</h3>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" name="email" value={email} onChange={this.handleChange} required/>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Mật Khẩu</Form.Label>
                                        <Form.Control type="password" name="password" value={password} onChange={this.handleChange} required/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" name="rememberUsername"  label="Nhớ tài khoản" checked={rememberUsername} onChange={this.handleChange}/>
                                    </Form.Group>
                                    <Button className="w-100" variant="primary" type="submit">
                                        Đăng Nhập
                                        {isLogining === true &&
                                            <FontAwesomeIcon className="ml-2 opacity-8" icon={faFan} spin/>
                                        }
                                    </Button>
                                   
                                </Form>
                                <ToastContainer />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    isLogining: state.login.isLogining
});
const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
}
export default connect(mapStateToProps, actionCreators)(Login);