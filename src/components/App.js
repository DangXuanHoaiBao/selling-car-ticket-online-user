import React from 'react';
import {Navbar, Nav, Button, Image} from 'react-bootstrap';
import {Router, Switch, Route, Link} from 'react-router-dom';
import '../styles/App.css';
import Home from './Home';
import history from '../helpers/history';
import CustomerInfor from './CustomerInfor';
import Checkout from './Checkout';
import logo_mhh from '../images/logo-mhh.PNG';

function App() {
  return (
    <Router history={history}>

      <Navbar bg="dark" variant="dark">
        <div className="container">
          {/* <Navbar.Brand > <Link to="/" className="text-link"> Home </Link> </Navbar.Brand> */}
          <Nav className="ml-auto">
            <Nav.Item>
              <Link to="/login" className="text-link mr-2"> Đăng Nhập </Link> 
              <Link to="/sign-up" className="text-link mr-2"> Đăng Ký </Link>
              <Button variant="outline-success"> Đăng Xuất </Button>
            </Nav.Item>
          </Nav>
        </div>
      </Navbar>

      <div className="bg-green text-white">
        <div className="container ">
          <div className="row ">
            <div className="col-md-2 mt-2 mb-2">
                <Image src={logo_mhh} className="w-50" alt="" roundedCircle />
                <div className="ml-10 font-weight-bold">BCCDH</div>
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
            <Link to="/" className="mr-4"> Lịch Trình </Link>
            <Link to="/" className="mr-4"> Khuyến Mãi </Link>
            <Link to="/" className="mr-4"> Tin Tức </Link>
            <Link to="/" className="mr-4"> Tuyển Dụng </Link>
            <Link to="/" className=""> Liên Hệ </Link>
          </Nav.Item>
        </Nav>
      </div>
      
      <Switch>
        <Route exact path='/customer-infor'>
          <CustomerInfor />
        </Route>
        <Route exact path='/checkout'>
          <Checkout />
        </Route>
        <Route exact path='/'>
          <Home />
        </Route>
      </Switch>

    </Router>
  );
}

export default App;
