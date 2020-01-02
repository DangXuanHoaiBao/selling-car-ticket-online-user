/* eslint-disable quotes */
import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Private from "../helpers/private";

import Home from "./Home";
import CustomerInfor from "./CustomerInfor";
import Checkout from "./Checkout";
import Schedules from "./Schedules";
import SchedulesDetail from "./SchedulesDetail";
import ChairNumber from "./ChairNumber";
import Login from "./Login";
import SignUp from "./SignUp";
import UserInfo from "./UserInfo";
import ChangePassword from "./ChangePassword";
import Detail from "./User/Detail";
import GroupChat from "./User/GroupChat";
import Discount from "./Discount";
import DiscountDetail from "./DiscountDetail";

class Main extends React.Component {
  render() {
    return (
      <Switch>
        <Private.IsNotLogin exact path="/sign-up" component={SignUp}/>
        <Private.IsNotLogin exact path="/login" component={Login}/>
        <Private.IsLogin exact path="/customer-infor" component={CustomerInfor}/>
        <Private.IsLogin exact path="/checkout" component={Checkout}/>
        <Route exact path="/schedules">
          <Schedules />
        </Route>
        <Private.IsLogin exact path="/schedules-detail" component={SchedulesDetail}/>
        <Private.IsLogin exact path="/chair-number" component={ChairNumber}/>
        <Route exact path="/">
          <Home />
        </Route>
        <Private.IsLogin exact path="/user-info" component={UserInfo}/>
        <Private.IsLogin exact path="/change-password" component={ChangePassword}/>
        <Private.IsLogin exact path="/user-history" component={Detail}/>
        <Private.IsLogin exact path="/group-chat" component={GroupChat}/>
      
        <Route exact path="/discount">
          <Discount />
        </Route>
        <Route exact path="/discount-detail/:id" component={DiscountDetail}/>
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  data: state.login.data
});

export default connect(mapStateToProps)(Main);
