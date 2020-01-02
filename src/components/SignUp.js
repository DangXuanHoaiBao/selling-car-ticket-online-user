import React from "react";
import {Form, Button} from "react-bootstrap";
import userActions from "../actions/user";
import { connect } from "react-redux";

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            errorEmail: "Bắt buộc",
            errorPassword: "Bắt buộc"
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        const {name, value} = e.target;
        if(name === "email"){
            const errorEmail = (value.length < 1 || value[0] === " ") ? "Email không hợp lệ" : ""
            this.setState({
                errorEmail
            })
        }
        if(name === "password"){
            const errorPassword = (value.length < 1 || value[0] === " ") ? "Password không hợp lệ" : ""
            this.setState({
                errorPassword
            })
        }
        this.setState({
            [name]: value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        const {password, email, errorEmail, errorPassword} = this.state;
        if(errorEmail === "" && errorPassword === ""){
            const {signUp} = this.props;
            signUp(email, password);
        }
    }
  

    render(){

        const {password, email, errorEmail, errorPassword} = this.state;

        return (
            <div>
                <div className="container form-margin-top margin-bottom-10em">
                    <div className="row justify-content-center mt-4 mb-4" >
                        <div className="col-md-6 border border-dark shadow rounded">
                            <div className="row justify-content-center">
                                <div className="col-md-8 mt-5 mb-5">
                                    <h3 className="mb-3">Đăng Ký Tài Khoản</h3>
                                    <Form onSubmit={this.handleSubmit}>

                                        <Form.Group controlId="formFirstName">
                                            <Form.Label>email</Form.Label>
                                            <Form.Control type="text" placeholder="Tên đăng nhập" name="email" value={email} onChange={this.handleChange}/>
                                            <Form.Text className="text-danger">{errorEmail}</Form.Text>
                                        </Form.Group>

                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Nhập password" name="password" value={password} onChange={this.handleChange}/>
                                            <Form.Text className="text-danger">{errorPassword}</Form.Text>
                                        </Form.Group>
                                        <Button className="w-100" variant="primary" type="submit">
                                            Đăng Ký
                                        </Button>
                                    </Form>
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
        );
    }
}
const actionCreators = {
    signUp: userActions.signUp
}
export default connect(null, actionCreators)(SignUp);