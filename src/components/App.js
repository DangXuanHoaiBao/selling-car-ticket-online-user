import React from 'react';
import {Navbar, Nav, Button} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import '../styles/App.css';
import Home from './Home';
import history from '../helpers/history';
import CustomerInfor from './CustomerInfor';

function App() {
  return (
    <Router history={history}>

      <Navbar bg="dark" variant="dark">
        <div className="container">
          <Navbar.Brand > <Link to="/" className="text-link"> Home </Link> </Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link > <Link to="/login" className="text-link"> Đăng Nhập </Link> </Nav.Link>
            <Nav.Link > <Link to="/sign-up" className="text-link"> Đăng Ký </Link></Nav.Link>
            <Button variant="outline-success"> Đăng Xuất </Button>
          </Nav>
        </div>
      </Navbar>

      <div className="container">
        <Nav className="justify-content-end">
          <Nav.Item>
            <Nav.Link >Lịch Trình</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link >Khuyến Mãi</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link> Tin Tức </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link> Tuyển Dụng </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link> Liên Hệ </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      
      <Switch>
        <Route exact path='/customer-infor'>
          <CustomerInfor />
        </Route>
        <Route exact path='/'>
          <Home />
        </Route>
      </Switch>

    </Router>
  );
}

export default App;
