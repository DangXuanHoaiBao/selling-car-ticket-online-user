/* eslint-disable quotes */
import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

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

class Main extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/sign-up">
          <SignUp />
        </Route>
        <Route exact path="/login">
          <Login />
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
          <ChairNumber />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/user-info">
          <UserInfo />
        </Route>
        <Route exact path="/change-password" >
          <ChangePassword />
        </Route>  
        <Route exact path="/user-detail">
          <Detail />
        </Route>
        <Route exact path="/group-chat">
          <GroupChat/>
        </Route>
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  data: state.login.data
});

export default connect(mapStateToProps)(Main);
