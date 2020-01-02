import React from "react";
import StripeCheckout from "react-stripe-checkout";
import {connect} from "react-redux";
import userActions from "../actions/user";
import history from "../helpers/history";

class Checkout extends React.Component {
  constructor(props){
    super(props);
    this.handleToken = this.handleToken.bind(this);
  }
  
  handleToken(token){
    const { checkout, createFare, createTrip } = this.props;
    const fareInfo = history.location.state;
    createFare(fareInfo);
    createTrip(fareInfo);
    checkout(token, fareInfo.fare);
  }

  render(){

    const fareInfo = history.location.state;

    return(
      <div className="background-img">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="mb-2 font-weight-bold text-success"> THÔNG TIN ĐẶT VÉ</div>
                <div className="border border-success rounded background-color">
                  <table class="table">
                    <tbody>
                      <tr>
                        <th>Tuyến:</th>
                        <td>{fareInfo.departure} ---> {fareInfo.destination} </td>
                      </tr>
                      <tr>
                        <th>Ngày đi:</th>
                        <td>{fareInfo.date.d}/{fareInfo.date.m}/{fareInfo.date.y}</td>
                      </tr>
                      <tr>
                        <th>Điểm lên xe:</th>
                        <td>{fareInfo.getOnDeparture}</td>
                      </tr>
                      <tr>
                        <th>Họ tên:</th>
                        <td>{fareInfo.fullName}</td>
                      </tr>
                      <tr>
                        <th>Email:</th>
                        <td>{fareInfo.email}</td>
                      </tr>
                      <tr>
                        <th>Tổng tiền:</th>
                          <td>{fareInfo.fare}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="row justify-content-center mb-3">
                    <StripeCheckout 
                      stripeKey="pk_test_RknGlS5ASjG2BGAygpTfcRh700UlGTyYsI"
                      amount = {fareInfo.fare}  
                      token = {this.handleToken}
                    />
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
    checkout: userActions.checkout,
    createFare: userActions.createFare,
    createTrip: userActions.createTrip
}

export default connect(null, actionCreators)(Checkout);