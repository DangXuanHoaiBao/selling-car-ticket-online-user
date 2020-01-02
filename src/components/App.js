import React from "react";
import {Navbar, Nav, Button, Image, Card} from "react-bootstrap";
import {Router, Switch, Route, Link} from "react-router-dom";
import "../styles/App.css";
import Home from "./Home";
import history from "../helpers/history";
import CustomerInfor from "./CustomerInfor";
import Checkout from "./Checkout";
import Schedules from "./Schedules";
import SchedulesDetail from "./SchedulesDetail";
import logo_mhh from "../images/logo-mhh.PNG";
import ChairNumber from "./ChairNumber";
import Login from "./Login";
import SignUp from "./SignUp";
import Detail from "./User/Detail";

function App() {
  return (
    <Router history={history}>

      <Navbar bg="dark" variant="dark">
        <div className="container">
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
            <Link to="/" className="mr-4"> Khuyến Mãi </Link>
            <Link to="/" className="mr-4"> Tin Tức </Link>
            <Link to="/" className="mr-4"> Tuyển Dụng </Link>
            <Link to="/" className=""> Liên Hệ </Link>
          </Nav.Item>
        </Nav>
      </div>
      
      <Switch>
        <Route exact path="/sign-up">
          <SignUp/>
        </Route>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route exact path="/customer-infor">
          <CustomerInfor />
        </Route>
        <Route exact path="/checkout">
          <Checkout />
        </Route>
        <Route exact path="/schedules">
          <Schedules />
        </Route>
        <Route exact path="/schedules-detail">
          <SchedulesDetail /> 
        </Route>
        <Route exact path="/chair-number">
          <ChairNumber/>
        </Route>
        <Route exact path="/user-detail">
          <Detail />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>

      <Card className="bg-green text-white mt-3">
        <div className="container mt-3 mb-3 text-dark">
          <div className="row mb-3">
            <div className="col-md-2 border-right">
              <Link to="/">
                <Image src={logo_mhh} className="w-50" alt="" roundedCircle />
                <div className="ml-10 font-weight-bold text-white">BCCDH</div>
              </Link>
            </div>
            <div className="col-md-5 border-right">
              <div className="font-weight-bold">Văn Phòng Công Ty</div>
              <div>Địa chỉ: 266-268 Lê Hồng Phong, phường 4, quận 5, Tp. HCM</div>
              <div>Số Fax: (028) 62 908 313</div>
            </div>
            <div className="col-md-5">
              <div className="font-weight-bold">Chi Nhánh</div>
              <div>Địa chỉ: Số 06 Lữ Gia, Phường 9, Đà Lạt, Lâm Đồng.</div>
              <div>Địa chỉ: Mai Chí Thọ, Phường 9, Quận 2, TPHCM</div>
              <div>Địa chỉ: QL1A, Phường 1, Châu Thành, Long An.</div>
              <div>Địa chỉ: AL1A, Phường 2, Cai Lậy, Tiền Giang.</div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-2 border-right">
              <div className="font-weight-bold">Chứng nhận</div>
            </div>
            <div className="col-md-10">
              <div>Giấy chứng nhận đăng ký kinh doanh số: 0302029252 do Sở Kế hoạch đầu tư TPHCM
                   cấp ngày 08/03/2000 - MST: 0302029252
                   Người chịu trách nhiệm: Lê Đức Thành
              </div>
            </div>
          </div>
        </div>
      </Card>

    </Router>
  );
}

export default App;
