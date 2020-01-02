import React from "react";
import {Form, Button} from "react-bootstrap";
import userActions from "../actions/user";
import { connect } from "react-redux";

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fullName: "",
            email: "",
            password: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        const {password, email, fullName} = this.state;
        const {signUp} = this.props;
        signUp(fullName, email, password);
    }
  

    render(){

        const {fullName, password, email} = this.state;

        return (
            <div>
                <div className="container">
                    <div className="row justify-content-center mt-4 mb-4" >
                        <div className="col-md-6 border border-dark shadow rounded">
                            <div className="row justify-content-center">
                                <div className="col-md-8 mt-5 mb-5">
                                    <h3 className="mb-3">Đăng Ký Tài Khoản</h3>
                                    <Form onSubmit={this.handleSubmit}>
                                        <Form.Group controlId="formFirstName">
                                            <Form.Label>Họ tên</Form.Label>
                                            <Form.Control type="text"  name="fullName" value={fullName} onChange={this.handleChange} required/>
                                        </Form.Group>
                                        <Form.Group controlId="formFirstName">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email"  name="email" value={email} onChange={this.handleChange} required/>
                                        </Form.Group>

                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Mật khẩu</Form.Label>
                                            <Form.Control type="password" name="password" value={password} onChange={this.handleChange} required/>
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