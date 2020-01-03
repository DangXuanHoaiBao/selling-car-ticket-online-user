import React from "react";
import {Table, Button, Toast} from "react-bootstrap";
import "../styles/App.css";
import userActions from "../actions/user";
import { connect } from "react-redux";
import history from "../helpers/history";
import {Media} from "reactstrap";

class SchedulesDetail extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            comment: "",
            errorComment: "Chưa nhập bình luận"
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClickComment = this.handleClickComment.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount(){
        const {departure, destination} = history.location.state;
        const {getRouteByDepartureAndDestination, getAllComments} = this.props;
        getRouteByDepartureAndDestination(departure, destination);
        getAllComments();
    }

    handleClick(departure, destination){
        history.push("/", {departure, destination});
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
        const {route, comments} = this.props;

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

        let listTrip;
        if(route){
            const result = Object.keys(route.departureTime).map(function(key) {
                return [Number(key), route.departureTime[key]];
            });
            listTrip = result.map((time, i) => 
                <tr>
                    <td>{i + 1}</td>
                    <td>{time[1].time}:00</td>
                    <td>{route.departure} ---> {route.destination}</td>
                    <td>{route.distance}km</td>
                    <td>{route.fare}vnd</td>
                    <td><Button variant="success" onClick={() => this.handleClick(route.departure, route.destination)}>Mua Vé</Button></td>
                </tr>
            )
        }

        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="text-success font-weight-bold">Tên Tuyến Đường &nbsp; <i class=" fas fa-exchange-alt"></i></div>
                        <Table responsive="sm">
                            <thead>
                                <tr className="">
                                    <th>STT</th>
                                    <th>Giờ chạy</th>
                                    <th>Tuyến</th>
                                    <th>Quảng Đường</th>
                                    <th>Giá vé</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {listTrip}
                            </tbody>
                        </Table>

                        <div class="col-md-8 col-md-offset-3">
                            <h5>Bình luận</h5>
                            <div class="panel panel-info">
                                <div class="panel-body">
                                    <textarea name="comment" value={comment} onChange={this.handleChange} placeholder="Viết bình luận ở đây!" className="pb-cmnt-textarea border border-primary"></textarea>
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
    route: state.getRouteByDepartureAndDestination.route,
    comments: state.getAllComments.comments
})
const actionCreators = {
    getRouteByDepartureAndDestination: userActions.getRouteByDepartureAndDestination,
    getAllComments: userActions.getAllComments
}

export default connect(mapStateToProps, actionCreators)(SchedulesDetail);