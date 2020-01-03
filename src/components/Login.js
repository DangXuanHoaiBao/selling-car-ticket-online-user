/* eslint-disable quotes */

import React from "react";
import {FormGroup, Form, Button, Input, Label, Row, Col, Card, CardBody} from "reactstrap";
import userActions from "../actions/user";
import { connect } from "react-redux";
import { toast, Bounce,ToastContainer } from 'react-toastify';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faFan } from '@fortawesome/free-solid-svg-icons';
import firebase from 'firebase';

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
        this.handleLoginWithFacebook = this.handleLoginWithFacebook.bind(this);
        this.handleLoginWithGoogle = this.handleLoginWithGoogle.bind(this);
        this.notify = this.notify.bind(this);
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
    notify = () => {
        this.toastId = toast('Bạn đã tạo tài khoản này bằng tài khoản Google', {
        transition: Bounce,
        closeButton: true,
        autoClose: 3000,
        position: 'top-center',
        type: 'error',
        newestOnTop: true   
      })};
    

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

    handleLoginWithFacebook(){
        const provider = new firebase.auth.FacebookAuthProvider();
        const { signUp_Login_With_Google_Facebook } = this.props;
        firebase.auth().useDeviceLanguage();
        provider.setCustomParameters({
            'display': 'popup'
        });
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            
            if(user){
                console.log(user);
                signUp_Login_With_Google_Facebook(user.displayName, user.email, '', user.photoURL, 'Facebook');
                console.log("Đã đăng nhập");
            }
          
          }).catch(function(error) {
            this.notify();
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            // ...
            console.log( errorMessage);
          }.bind(this));

    }

    handleLoginWithGoogle(){
        const provider = new firebase.auth.GoogleAuthProvider();
        const { signUp_Login_With_Google_Facebook } = this.props;
        provider.addScope = 'https://www.googleapis.com/auth/admin.directory.userschema.readonly';
        firebase.auth().useDeviceLanguage();
        provider.setCustomParameters({
            'login_hint': 'user@example.com'
        });
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(token);
            console.log(user);
            if(user){
                console.log(user);
                signUp_Login_With_Google_Facebook(user.displayName, user.email, '', user.photoURL, 'Google')
                console.log("Đã đăng nhập");
            }
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(errorCode, errorMessage, email, credential);
            // ...
          });
          

    }
   
    

    render(){
        const {isLogining} = this.props;
        const {email, password, rememberUsername} = this.state;

        return (
          
            <div className="background-img">
                <div className="container" >
                    <Row>
                    <Col md="3" />
                    <Col md="6" className="content-info"><h2>Đăng nhập</h2></Col>
                    <Col md="3" />
                    </Row>
                    <Row >
                    <Col md="4" />
                    <Col md="4">
                        <Card className="main-card mb-3">
                            
                        <CardBody>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup controlId="formBasicEmail">
                                    <Label>Email</Label>
                                    <Input type="email" name="email" value={email} onChange={this.handleChange} required/>
                                </FormGroup>

                                <FormGroup controlId="formBasicPassword">
                                    <Label>Mật Khẩu</Label>
                                    <Input type="password" name="password" value={password} onChange={this.handleChange} required/>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                    <Input type="checkbox" name="rememberUsername"  checked={rememberUsername} onChange={this.handleChange}/>
                                    Nhớ tài khoản
                                    </Label>
                                </FormGroup>
                                <Button className="w-100" variant="primary" type="submit">
                                    Đăng Nhập
                                    {isLogining === true &&
                                        <FontAwesomeIcon className="ml-2 opacity-8" icon={faFan} spin/>
                                    }
                                </Button>
                                <Button className="loginBtn loginBtn--facebook w-100" onClick={this.handleLoginWithFacebook}>
                                    Đăng nhập với Facebook
                                </Button>
                                <Button className="loginBtn loginBtn--google w-100" onClick={this.handleLoginWithGoogle}>
                                    Đăng nhập với Google
                                </Button>
                                
                            </Form>
                        </CardBody>
                        </Card>
                    </Col>
                    <Col md="4" />
                    </Row>
                    <ToastContainer />
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
    logout: userActions.logout,
    signUp_Login_With_Google_Facebook: userActions.signUp_Login_With_Google_Facebook,
}
export default connect(mapStateToProps, actionCreators)(Login);