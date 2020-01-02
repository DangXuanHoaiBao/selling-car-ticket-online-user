import React from "react";
import {Card, ListGroup} from "react-bootstrap";
import userActions from "../../actions/user";
import { connect } from "react-redux";
import {Media} from "reactstrap";
import profileImg from "../../images/profile.png";

class Detail extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        const {getFaresOfUser} = this.props;
        getFaresOfUser();
    }

    render(){
        const {fares, data} = this.props;
        const user = data.user;
        let listFare;
        if(fares){
            listFare = fares.map((fare, index)=> 
                <ListGroup.Item>
                    <Card.Body>
                         <div className="mb-2 font-weight-bold text-success"> THÔNG TIN VÉ</div>
                            <div className="border border-success rounded">
                                <table class="table">
                                <tbody>
                                    <tr>
                                        <td>Điểm khởi hành:</td>
                                        <th>{fare.departure}</th>
                                    </tr>
                                    <tr>
                                        <td>Điểm đến:</td>
                                        <th>{fare.destination}</th>
                                    </tr>
                                    <tr>
                                        <td>Ngày khởi hành:</td>
                                        <th>{fare.day}/{fare.month}/{fare.year}</th>
                                    </tr>
                                    <tr>
                                        <td>Thời gian khởi hành:</td>
                                        <th>{fare.time}</th>
                                    </tr>
                                    <tr>
                                        <td>Điểm lên xe:</td>
                                        <th>{fare.getOnDeparture}</th>
                                    </tr>
                                    <tr>
                                        <td>Giá vé:</td>
                                        <th>{fare.fare}</th>
                                    </tr>
                                    <tr>
                                        <td>Số lượng vé:</td>
                                        <th>{fare.numberOfTicket}</th>
                                    </tr>
                                    <tr>
                                        <td>Tổng số tiền:</td>
                                        <th>{fare.numberOfTicket * fare.fare}</th>
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                    </Card.Body>
                </ListGroup.Item>
            )
        } 

        return(
            <div>
                <div className="container mt-5">
                    <div className="row mt-2 mb-4">
                        <div className="col-md-9">
                            <Card className="shadow">
                                <Card.Header className="font-weight-bold">Danh sách vé đã được mua và thanh toán</Card.Header>
                                <ListGroup variant="flush">
                                    {listFare}
                                </ListGroup>
                            </Card>
                        </div>

                        <div className="col-md-3">
                            <div className="row">
                                <div className="col-md-4">
                                <Media object width={50} height={50} src={user.urlImg ? user.urlImg : profileImg} className="rounded-circle"/>
                                </div>
                                <div>
                                    <div className="font-weight-bold"><span>{user.fullName}<i className="fas fa-check-circle text-primary"></i></span></div>
                                    <span><i class="fas fa-venus text-primary"></i> {user.gender}</span>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <div><i className="fas fa-envelope text-primary mr-2"></i>&nbsp;<span>{user.email}</span></div>
                                    <div><i className="fas fa-map-marker-alt text-primary"></i> &nbsp; <span>{user.address}</span></div>
                                    <div><i class="fas fa-birthday-cake text-primary"></i> &nbsp; <span>{user.birthDay}</span></div>
                                    <div><i className="fas fa-phone-square text-primary mr-2"></i>{user.phoneNumber}</div>
                                    <p/>
                                    
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    fares: state.getFaresOfUser.fares,
    data: state.login.data
})

const actionCreators = {
    getFaresOfUser: userActions.getFaresOfUser
}

export default connect(mapStateToProps, actionCreators)(Detail);