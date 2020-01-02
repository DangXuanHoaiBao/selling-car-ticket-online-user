import React from "react";
import {Card, ListGroup} from "react-bootstrap";
import userActions from "../../actions/user";
import { connect } from "react-redux";
import {profileImg} from "../../images/profile.png";
import {Media} from "reactstrap";

class Detail extends React.Component{
    constructor(props){
        super(props);
       
    }

    componentWillMount(){
        const {getFaresOfUser} = this.props;
        getFaresOfUser();
    }

    render(){
        const {fares} = this.props;

        let listFare;
        if(fares){
            listFare = fares.map((fare, index)=> 
                <ListGroup.Item>
                    <Card.Body>
                        <Card.Title>Tên tuyến đường: </Card.Title>
                        <Card.Text>
                            <div className="row">
                                <div className="col-md-2 mt-3">
                                </div>
                                <div className="col-md-10 mt-2">  
                                    <h5 className="mb-1">Thông tin vé</h5>    
                                    <div className="ml-3">
                                        <div><i class="fas fa-user"></i>Điểm khởi hành: <span></span></div>
                                        <div><i class="fas fa-envelope-square"></i> Điểm đến: <span></span></div>
                                        <div><i class="fas fa-phone-square-alt"></i> Ngày khởi hành: <span></span></div>
                                        <div>Thời gian khởi hành: </div>
                                        <div>Điểm lên xe: </div>
                                        <div>Số lượng vé: </div>
                                    </div>
                                </div>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </ListGroup.Item>
            )
        } 

        return(
            <div>
                <div className="container margin-top-6em">
                    <div className="row mt-4 mb-4">
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
                                <Media object width={50} height={50} src={profileImg} className="rounded-circle"/>
                                </div>
                                <div>
                                    <div className="font-weight-bold">Full name<span><i className="fas fa-check-circle text-primary"></i></span></div>
                                    <span>Email</span>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <div><i class="fas fa-venus text-primary"></i> &nbsp; <span>Giới tính</span></div>
                                    <div><i className="fas fa-map-marker-alt text-primary"></i> &nbsp; <span>địa chỉ</span></div>
                                    <div><i className="fas fa-envelope text-primary mr-2"></i>Ngày sinh</div>
                                    <div><i className="fas fa-phone-square text-primary mr-2"></i>Số điện thoại</div>
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
    fares: state.getFaresOfUser.fares
})

const actionCreators = {
    getFaresOfUser: userActions.getFaresOfUser
}

export default connect(mapStateToProps, actionCreators)(Detail);