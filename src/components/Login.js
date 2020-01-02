
import React from "react";
import {Form, Button} from "react-bootstrap";
import userActions from "../actions/user";
import { connect } from "react-redux";

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            errorEmail: "Bắt buộc",
            errorPassword: "Bắt buộc"
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
   
    handleChange(e){
        const {name, value} = e.target;
        if(name === "email"){
            const errorEmail = (value === "") ? "email không hợp lệ" : ""
            this.setState({
                errorEmail
            })
        }
        if(name === "password"){
            const errorPassword = (value === "") ? "password không hợp lệ" : ""
            this.setState({
                errorPassword
            })
        }
        this.setState({
            [name]: value
        });
    }

    handleSubmit(e){
        e.preventDefault();
        const {email, password, errorEmail, errorPassword} = this.state;
        if(errorEmail === "" && errorPassword === ""){
            const {login} = this.props;
            login(email, password);
        }
    }

    render(){

        const {errorEmail, errorPassword, email, password} = this.state;
        return (
            <div className="container form-margin-top">
                <div className="row justify-content-center mt-4 mb-4" >
                    <div className="col-md-6 border border-dark shadow rounded">
                        <div className="row justify-content-center">
                            <div className="col-md-8 mt-5 mb-5">
                                <h3 className="mb-3">Đăng Nhập Tài Khoản</h3>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Nhập email" name="email" value={email} onChange={this.handleChange} required/>
                                        <Form.Text className="text-danger">{errorEmail}</Form.Text>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Mật Khẩu</Form.Label>
                                        <Form.Control type="password" placeholder="Nhập mật khẩu" name="password" value={password} onChange={this.handleChange} required/>
                                        <Form.Text className="text-danger">{errorPassword}</Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" name="rememberUsername"  label="Nhớ tài khoản" onChange={this.handleChange}/>
                                    </Form.Group>
                                    <Button className="w-100" variant="primary" type="submit">
                                        Đăng Nhập
                                    </Button>
                                   
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const actionCreators = {
    login: userActions.login
}
export default connect(null, actionCreators)(Login);