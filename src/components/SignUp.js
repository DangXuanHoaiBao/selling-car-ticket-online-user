import React from "react";
import {FormGroup, Form, Button, Input, Label, Row, Col, Card, CardBody} from "reactstrap";
import userActions from "../actions/user";
import { connect } from "react-redux";
import {ToastContainer } from "react-toastify";

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
            <div className="background-img">
            <div className="container" >
                    <Row>
                    <Col md="3" />
                    <Col md="6" className="content-info"><h2>Đăng ký</h2></Col>
                    <Col md="3" />
                    </Row>
                    <Row >
                    <Col md="4" />
                    <Col md="4">
                        <Card className="main-card mb-3">
                            
                        <CardBody>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label for="exampleEmail">Họ tên</Label>
                                    <Input name="fullName" value={fullName} type="text" onChange={this.handleChange} required/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleEmail">Email</Label>
                                    <Input name="email" value={email} type="email" onChange={this.handleChange} required/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleEmail">Mật khẩu</Label>
                                    <Input name="password" value={password} type="password" onChange={this.handleChange} required/>
                                </FormGroup>
                                <Button className="float-right btn-upload">Đăng ký
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
const actionCreators = {
    signUp: userActions.signUp
}
export default connect(null, actionCreators)(SignUp);