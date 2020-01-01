import React from "react";
import {Form, Button} from "react-bootstrap";
// import history from "../helpers/history";
// import { ToastContainer } from "react-toastify";

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            errors: {
                email: "",
                password: ""
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        const {name, value} = e.target;
        let errors = {
            email: "",
            password: ""
        }
        if(name === "email"){
            errors.email = (value.length < 1 || value[0] === " ") ? "Email không hợp lệ" : ""
        }
        if(name === "password"){
            errors.fullName = (value.length < 1 || value[0] === " ") ? "Password không hợp lệ" : ""
        }
        this.setState({
            [name]: value,
            errors
        })
    }

    handleSubmit(e){
        e.preventDefault();
        const {password, email, errors} = this.state;
        const userAccount = {
            password,
            email
        }
        if(errors.email === "" && errors.password === "" && email.length !== 0 && password.length !== 0){
            // history.push("/setting-account", userAccount);
        }
    }
  

    render(){

        const {password, email, errors} = this.state;

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
                                            {errors.email ? <Form.Text className="text-danger">{errors.email}</Form.Text> : null}
                                        </Form.Group>

                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Nhập password" name="password" value={password} onChange={this.handleChange}/>
                                            {errors.password ? <Form.Text className="text-danger">{errors.password}</Form.Text> : null}
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

export default SignUp;