/* eslint-disable quotes */
import React from "react";
import {Form, Button} from "react-bootstrap";
import { toast, Bounce,ToastContainer } from 'react-toastify';
import { connect } from "react-redux";
import history from "../helpers/history";
import "react-datepicker/dist/react-datepicker.css";
import userActions from "../actions/user";

class ChairNumber extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            departureTime: "",
            getOnDeparture: "",
            numberChair: [],
            errorDepartureTime: "Thời gian khởi hành không được bỏ trống",
            errorGetOnDeparture: "Điểm lên xe không được bỏ trống"
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount(){
        const {departure, destination} = history.location.state;
        const {getRouteByDepartureAndDestination} = this.props;
        getRouteByDepartureAndDestination(departure, destination);
    }

    handleChange(e){
        const {name, value} = e.target;
        if(name === "departureTime"){
            const errorDepartureTime = (value === "") ? "Thời gian khởi hành không được bỏ trống": "";
            if(errorDepartureTime === ""){
                const {getTripByDepDesDateAndTime} = this.props;
                const {departure, destination, date} = history.location.state;
                const time = value.slice(0, value.lastIndexOf(":00"));
                getTripByDepDesDateAndTime(departure, destination, date, time);   
            }
            this.setState({
                errorDepartureTime
            })
        }
        if(name === "getOnDeparture"){
            const errorGetOnDeparture = (value === "") ? "Điểm lên xe không được bỏ trống": "";
            this.setState({
                errorGetOnDeparture
            })
        }
        this.setState({
            [name]: value
        })
    }

    handleClick(i){
        const {numberChair} = this.state;
        const {numberOfTicket} = history.location.state;
        const arrayTemp = numberChair.slice();
        if(numberChair.length < numberOfTicket){
            arrayTemp.push(i);
            this.setState({
                numberChair: arrayTemp
            })
        }
    }

    handleSubmit(e){
        e.preventDefault();
        const {departure, destination, date, numberOfTicket} = history.location.state;
        const {errorDepartureTime, errorGetOnDeparture, departureTime, getOnDeparture, numberChair} = this.state;
        const {route} = this.props;
        if(numberChair.length !== Number(numberOfTicket)){
            this.notify();
        }
        if(errorDepartureTime === ""  && errorGetOnDeparture === "" && numberChair.length === Number(numberOfTicket)){
            const fare = route.fare;
            const time = departureTime.slice(0, departureTime.lastIndexOf(":00"));
            history.push("/customer-infor", {departure, destination, date, numberOfTicket, time, getOnDeparture, numberChair, fare});  
        }
    }
    notify = () => {
        this.toastId = toast("Bạn chưa chọn ghế", {
        transition: Bounce,
        closeButton: true,
        autoClose: 3000,
        position: 'top-center',
        type: 'error',
        newestOnTop: true   
    })};
    

    render(){
        const {route} = this.props;
        const {departureTime, getOnDeparture, errorDepartureTime, errorGetOnDeparture, numberChair} = this.state;
        const {numberOfTicket} = history.location.state;
        let listDepartureTime;
        let listGetOnDeparture;
        let total = 0;
       
        if(route){
            console.log(route)
            var result1 = Object.keys(route.departureTime).map(function(key) {
                return [Number(key), route.departureTime[key]];
              });
            console.log(result1)
            listDepartureTime = result1.map(time => 
                    <option>{time[1].time}:00</option>
            )
            var result2 = Object.keys(route.getOnDeparture).map(function(key) {
                return [Number(key), route.getOnDeparture[key]];
              });
            listGetOnDeparture = result2.map(item => 
                <option>{item[1].departure}</option>
            )
            total = route.fare * numberOfTicket;
        }


        let listChair = [];
        const {bookedChair} = this.props;
        let lengthBookedChair = 0;
        if(bookedChair){
            lengthBookedChair = bookedChair.length;
        }
        let check;
        for(let i=1; i<=36; i++){
            check = false;
            if(errorDepartureTime !== ""){
                listChair.push(
                    <div className="col-md-2 mb-2">
                        <Button className="w-100" disabled onClick={() => this.handleClick(i)}>{i}</Button>
                    </div>
                )
            }
            else{
                for(let j = 0; j<lengthBookedChair; j+=1){
                    if(bookedChair[j] === i){
                        listChair.push(
                            <div className="col-md-2 mb-2">
                                <Button className="w-100 bg-secondary" disabled onClick={() => this.handleClick(i)}>{i}</Button>
                            </div>
                        ) 
                        check = true;
                        break;
                    }
                }
                if(check === false){
                    for(let k = 0; k < numberChair.length; k +=1){
                        if(numberChair[k] === i){
                            listChair.push(
                                <div className="col-md-2 mb-2">
                                    <Button className="w-100 bg-secondary" onClick={() => this.handleClick(i)}>{i}</Button>
                                </div>
                            )
                            check = true;
                            break;
                        }
                    }
                    if(check === false){
                        listChair.push(
                            <div className="col-md-2 mb-2">
                                <Button className="w-100" onClick={() => this.handleClick(i)}>{i}</Button>
                            </div>
                        )
                    }
                }
            }
        }
        return (
            <div className="background-img">
                <div className="container mt-5">
                    <div className="row ">
                        <div className="col-md-5">
                            <div className=" font-weight-bold"> Chọn Thông Tin Hành Trình</div>
                            <div className="border border-success rounded background-color">
                                <Form onSubmit={this.handleSubmit}>
                                    <div className="row mt-3 mb-4 ml-3 mr-3">
                                        <div className="col-md-12">
                                            <Form.Group controlId="formDateDeparture">
                                                <Form.Label className="font-weight-bold"><i class="fa fa-clock-o text-danger" aria-hidden="true"></i> Chọn giờ khởi hành</Form.Label>
                                                <Form.Control as="select" name="departureTime" value={departureTime} onChange={this.handleChange}>
                                                <option></option>
                                                {listDepartureTime}
                                                </Form.Control>
                                                <Form.Text className="text-danger">{errorDepartureTime}</Form.Text>
                                            </Form.Group>

                                            <Form.Group controlId="formDistrict">
                                                <Form.Label className="font-weight-bold"><i class="fa fa-map-marker text-danger" aria-hidden="true"></i> Chọn điểm lên xe</Form.Label>
                                                <Form.Control as="select" name="getOnDeparture" value={getOnDeparture} onChange={this.handleChange}>
                                                    <option></option>
                                                    {listGetOnDeparture}
                                                </Form.Control>
                                                <Form.Text className="text-danger">{errorGetOnDeparture}</Form.Text>
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className="row text-center"><div className="col-md-12 mb-3"><Button className="w-50 font-weight-bold" type="submit" variant="success"> Tiếp Theo </Button></div></div>
                                </Form>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className=" font-weight-bold"> Chọn Ghế  <span className="float-right">Tổng tiền: {total}vnd</span></div>
                            <div className="border border-success rounded background-color">
                                <div className="row mt-3 mb-3 ml-3 mr-3">
                                <div className="col-md-12">
                                <div className="row">
                                        {listChair}
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <ToastContainer />
                    </div>
                    
                </div>
            </div>
           
        );
    }
}

const mapStateToProps = state => ({
    route: state.getRouteByDepartureAndDestination.route,
    bookedChair: state.getTripByDepDesDateAndTime.bookedChair
})

const actionCreators = {
    getRouteByDepartureAndDestination: userActions.getRouteByDepartureAndDestination,
    getTripByDepDesDateAndTime: userActions.getTripByDepDesDateAndTime
}

export default connect(mapStateToProps, actionCreators)(ChairNumber);