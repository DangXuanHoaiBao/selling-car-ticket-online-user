import React from "react";
import {Table, Button} from "react-bootstrap";
import "../styles/App.css";
import userActions from "../actions/user";
import { connect } from "react-redux";
import history from "../helpers/history";

class SchedulesDetail extends React.Component {

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount(){
        const {departure, destination} = history.location.state;
        const {getRouteByDepartureAndDestination} = this.props;
        getRouteByDepartureAndDestination(departure, destination);
    }

    handleClick(departure, destination){
        history.push("/", {departure, destination});
    }
    
    render(){

        const {route} = this.props;
        let listTrip;

        if(route){
            listTrip = route.departureTime.map((time, i) => 
                <tr>
                    <td>{i + 1}</td>
                    <td>{time}:00</td>
                    <td>{route.departure} ---> {route.destination}</td>
                    <td>{route.distance}km</td>
                    <td>{route.fare}vnd</td>
                    <td></td>
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
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    route: state.getRouteByDepartureAndDestination.route
})
const actionCreators = {
    getRouteByDepartureAndDestination: userActions.getRouteByDepartureAndDestination
}

export default connect(mapStateToProps, actionCreators)(SchedulesDetail);