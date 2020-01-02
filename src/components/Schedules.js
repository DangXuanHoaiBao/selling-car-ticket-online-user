import React from "react";
import {Table, Button, Popover, Toast} from "react-bootstrap";
import "../styles/App.css";
import userActions from "../actions/user";
import { connect } from "react-redux";
import history from "../helpers/history";
import {Media} from "reactstrap";

class Schedules extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            comment: "",
            errorComment: "Chưa nhập bình luận"
        }
        this.handleClickSchedulesDetail = this.handleClickSchedulesDetail.bind(this);
        this.handleclickBuyTicket = this.handleclickBuyTicket.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClickComment = this.handleClickComment.bind(this);
    }

    componentWillMount(){
        const {getAllRoutes, getAllComments} = this.props;
        getAllRoutes();
        getAllComments();
    }

    handleclickBuyTicket(route){
        history.push("/", route);
    }

    handleClickSchedulesDetail(departure, destination){
        history.push("/schedules-detail", {departure, destination});
    }

    handleChange(e){
        const {name, value} = e.target;
        if(name === "comment"){
            const errorComment = (value === "") ? "Chưa nhập bình luận" : "";
            this.setState({
                errorComment
            })
        }
        this.setState({
            [name]: value
        })
    }

    handleClickComment(){
        const {errorComment, comment} = this.state;
        const data = JSON.parse(localStorage.getItem("data"));
        if(!data){
            history.push("/login");
        }
        else{
            if(errorComment === ""){
                const user = data.user;
                const {addComment} = this.props;
                addComment(comment, user);
            }
        }
    }
    
    render(){
        const {comment} = this.state;
        const {routes, comments} = this.props;

        let listComment;
        if(comments){
            listComment = comments.map((comment, i) => 
            <div>
                <Toast>
                    <Toast.Header>
                        <Media object width={30} height={30} src={comment.urlImg} className="rounded-circle"/>
                        <strong className="mr-auto">&emsp;{comment.fullName}</strong>
                    </Toast.Header>
                    <Toast.Body>{comment.comment}</Toast.Body>
                </Toast>
                <p/>
            </div>
            )
        }

        let listRoute;
        if(routes){
            listRoute = routes.map((route, i) => 
                <tr>
                    <td>{i + 1}</td>
                    <td>{route.departure}</td>
                    <td>{route.destination}</td>
                    <td>{route.typeOfCar}</td>
                    <td>{route.distance}</td>
                    <td>{route.departureTime.length}</td>
                    <td>{route.fare}</td>
                    <td><Button onClick={() => this.handleClickSchedulesDetail(route.departure, route.destination)} variant="outline-success"><i class="fas fa-clock"></i></Button></td>
                    <td><Button variant="success" onClick={() => this.handleclickBuyTicket(route)}>Mua Vé</Button></td>
                </tr>
            )
        }

        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="text-success font-weight-bold">Các tuyến đường &nbsp; <i className=" fas fa-exchange-alt"></i></div>
                        <Table responsive="sm">
                            <thead>
                                <tr className="">
                                    <th>STT</th>
                                    <th>Bến đi</th>
                                    <th>Bến đến</th>
                                    <th>Loại xe</th>
                                    <th>Quảng Đường</th>
                                    <th>Số chuyến/ngày</th>
                                    <th>Giá vé</th>
                                    <th>Giờ chạy</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {listRoute}
                            </tbody>
                        </Table>
                    
                        <div class="col-md-8 col-md-offset-3">
                            <h5>Bình luận</h5>
                            <div class="panel panel-info">
                                <div class="panel-body">
                                    <textarea name="comment" value={comment} onChange={this.handleChange} placeholder="Viết bình luận ở đây!" className="border border-primary pb-cmnt-textarea"></textarea>
                                    <form class="form-inline">
                                        <div class="btn-group">
                                            <button class="btn" type="button"><span class="fa fa-picture-o fa-lg"></span></button>
                                            <button class="btn" type="button"><span class="fa fa-video-camera fa-lg"></span></button>
                                            <button class="btn" type="button"><span class="fa fa-microphone fa-lg"></span></button>
                                            <button class="btn" type="button"><span class="fa fa-music fa-lg"></span></button>
                                        </div>
                                        <button class="btn btn-primary pull-right" onClick = {this.handleClickComment}>Bình luận</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 mt-3 mb-3">
                            {listComment}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    routes: state.getAllRoutes.routes,
    comments: state.getAllComments.comments
})
const actionCreators = {
    getAllRoutes: userActions.getAllRoutes,
    addComment: userActions.addComment,
    getAllComments: userActions.getAllComments
}

export default connect(mapStateToProps, actionCreators)(Schedules);