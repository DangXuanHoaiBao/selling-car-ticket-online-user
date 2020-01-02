/* eslint-disable quotes */
import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, Image} from 'react-bootstrap';
import { Media } from 'reactstrap'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import userActions from '../actions/user';
import history from '../helpers/history';
import UserBox from './UserBox'
import logo_mhh from "../images/logo-mhh.PNG";

class Header extends React.Component{
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        const {logout} = this.props;
        logout();
        history.push('/');
    }

    render(){
        const {data} = this.props;
        if(data)
            console.log(data)
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    {!data && 
                     <Nav className="ml-auto">
                        <Link to="/login">
                            <Button className="custom-button" variant="outline-info">
                                Đăng nhập
                            </Button>
                        </Link>
                        <Link to="/sign-up">
                            <Button className="custom-button" variant="outline-info">
                                Đăng ký
                            </Button>
                        </Link>
                     </Nav>
                    }
                    {data && 
                        <Nav className="ml-auto">
                            <UserBox />
                        </Nav>
                    }
                </Navbar>

                <div className="bg-green text-white">
                    <div className="container ">
                    <div className="row ">
                        <div className="col-md-2 mt-2 mb-2">
                            <Link to="/">
                            <Image src={logo_mhh} className="w-50" alt="" roundedCircle />
                            <div className="ml-10 font-weight-bold text-link">BCCDH</div>
                            </Link>
                        </div>
                        <div className="mt-2 mb-2 ml--80">
                        <div>CÔNG TY TRÁCH NHIỆM HỮU HẠN</div>
                        <h3 className="text-warning font-weight-bold">BCCDH</h3>
                        <div className="">Đồng hành cùng việt nam trên khắp mọi nẽo đường</div>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="container">
                    <Nav className="justify-content-end">
                    <Nav.Item>
                        <Link to="/schedules" className="mr-4"> Lịch Trình </Link>
                        <Link to="/discount" className="mr-4"> Khuyến Mãi </Link>
                        <Link to="/" className="mr-4"> Tin Tức </Link>
                        <Link to="/" className="mr-4"> Tuyển Dụng </Link>
                        <Link to="/" className=""> Liên Hệ </Link>
                    </Nav.Item>
                    </Nav>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    data: state.login.data
});

const actionCreator = {
    logout: userActions.logout
}

export default connect(mapStateToProps, actionCreator)(Header);