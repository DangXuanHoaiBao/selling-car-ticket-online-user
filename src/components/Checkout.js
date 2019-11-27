import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import {Spinner, Form} from 'react-bootstrap';
import checkout from '../actions/checkout';

class Checkout extends React.Component {
  constructor(props){
    super(props);
    this.handleToken = this.handleToken.bind(this);
  }
  
  handleToken(token){
    const { checkout } = this.props;
    checkout(token);
  }

  render(){
    
    const {checkoutRequest, checkoutSuccess} = this.props;

    return(
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="mb-2 font-weight-bold text-success"> THÔNG TIN ĐẶT VÉ</div>
            <div className="border border-success rounded">
              <Form onSubmit={this.handleSubmit}>
                  <div className="row mt-3 mb-4 ml-3 mr-3">
                      <div className="col-md-12">
                          <Form.Group controlId="form">
                              <Form.Label className="font-weight-bold">Tuyến</Form.Label>
                              <Form.Control type="text"/>
                          </Form.Group>
                          <Form.Group controlId="formDepartureDate">
                              <Form.Label className="font-weight-bold">Ngày Đi</Form.Label>
                              <Form.Control type="text"  />
                          </Form.Group>
                          <Form.Group controlId="form">
                              <Form.Label className="font-weight-bold">Điểm Lên Xe</Form.Label>
                              <Form.Control type="text"  />
                          </Form.Group>
                          <Form.Group controlId="formName">
                              <Form.Label className="font-weight-bold">Họ Tên</Form.Label>
                              <Form.Control type="text" />
                          </Form.Group>
                          <Form.Group controlId="formEmail">
                              <Form.Label className="font-weight-bold">Email</Form.Label>
                              <Form.Control type="email" />
                          </Form.Group>
                          <Form.Group controlId="formTotalMoney">
                              <Form.Label className="font-weight-bold">Tổng Tiền</Form.Label>
                              <Form.Control type="text" />
                          </Form.Group>
                      </div>
                  </div>
                  {(checkoutRequest && !checkoutSuccess) ? <Spinner animation="border" size="sm" /> : ''}
              </Form>
              <div className="row justify-content-center mb-3">
                <StripeCheckout 
                  stripeKey='pk_test_RknGlS5ASjG2BGAygpTfcRh700UlGTyYsI'
                  amount = {2500}  
                  token = {this.handleToken}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) =>({
  checkoutRequest: state.checkoutRequest,
  checkoutSuccess: state.checkoutSuccess
});

const actionCreators = {
  checkout
}

export default connect(mapStateToProps, actionCreators)(Checkout);