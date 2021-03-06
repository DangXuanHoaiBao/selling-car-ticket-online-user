import React from "react";
import {Form, Button, Image} from "react-bootstrap";
import {ToastContainer} from "react-toastify";
import DatePicker from "react-datepicker";
import {connect} from "react-redux";
import history from "../helpers/history";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/Home.css";
import img_1 from "../images/3.jpg";
import img_2 from "../images/background2.png";
import userActions from "../actions/user";
 
class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            route: "",
            dateDeparture: new Date(),
            numberOfTicket: 1,
            errorRoute: "Bắt buộc",
            errorDateDeparture: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeDateDeparture = this.handleChangeDateDeparture.bind(this);
    }

    componentWillMount(){
        const {getAllRoutes} = this.props;
        const route = history.location.state;
        if(route){
            this.setState({
                route: `${route.departure}--->${route.destination}`,
                errorRoute: ""
            })
        }
        else{
            getAllRoutes();    
        }
    }
    componentWillReceiveProps(newProp){
        const { routes } = newProp;
        this.setState({ route: `${routes[0].departure}--->${routes[0].destination}`});
    }
    
    handleChange(e){
        const {name, value} = e.target; 
        if(name === "route"){
            const errorRoute = (value === "") ? "Bắt buộc": ""
            this.setState({
                errorRoute
            })
        }

        this.setState({
            [name]: value
        })
    };

    handleChangeDateDeparture = date => {
        const currentDate = new Date();
        const errorDateDeparture = (date < currentDate) ? "Ngày khởi hành không hợp lệ": "";
        this.setState({
            dateDeparture: date,
            errorDateDeparture
        })
    };

    handleSubmit(e){
        e.preventDefault();
        const {route, numberOfTicket, dateDeparture, errorRoute, errorDateDeparture} = this.state
        console.log(route);
        const departure = route.slice(0, route.lastIndexOf("--->"));
        const destination = route.slice(route.lastIndexOf("--->") + 4, route.length);
        const day = dateDeparture. getDate();
        const month = dateDeparture. getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12.
        const year = dateDeparture. getFullYear();
        const date = {
            d: day,
            m: month,
            y: year
        }
        history.push("/chair-number", {departure, destination, numberOfTicket, date});
    }

    render(){

        const {routes} = this.props;
        const {dateDeparture, numberOfTicket, route, errorRoute, errorDateDeparture} = this.state;
        
        let listRoutes=[];
        if(routes){
            for(let i=1; i<routes.length; i++){
                listRoutes.push(
                    <option>{routes[i].departure}--->{routes[i].destination}</option>
                );
            }

        }
       
        return (
            <div className="container ">
                <div className="row ">
                    <div className="col-md-6">
                        <div className="mb-1 font-weight-bold text-success"> MUA VÉ TRỰC TUYẾN</div>
                        <div className="border border-success rounded">
                            <Form onSubmit = {this.handleSubmit}>
                                <div className="row pt-3 pb-1 pl-3 pr-3">
                                    <div className="col-md-12">
                                        <Form.Group controlId="formLocationDeparture">
                                            <Form.Label className="font-weight-bold">Tuyến Đường</Form.Label>
                                            <Form.Control as="select" name="route" value={route} onChange={this.handleChange}>
                                                <option value={route}>{route}</option>
                                                {listRoutes}
                                            </Form.Control>
                                        </Form.Group>
                                    </div>
                                
                                    <div className="col-md-6">
                                        <Form.Group controlId="formDateDeparture">
                                            <Form.Label className="font-weight-bold">Ngày khởi hành</Form.Label>
                                            <DatePicker className="input-date rounded-sm"
                                                selected={dateDeparture}
                                                onChange={this.handleChangeDateDeparture}
                                            />
                                            <Form.Text className="text-danger">{errorDateDeparture}</Form.Text>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group controlId="formNumberOfTicket">
                                            <Form.Label className="font-weight-bold">Số lượng vé</Form.Label>
                                            <Form.Control as="select" name="numberOfTicket" value={numberOfTicket} onChange={this.handleChange}>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </div>
                                </div>
                                
                                <div className="row text-center">
                                    <div className="col-md-12 mb-2">
                                        <Button type="submit" className="w-50 font-weight-bold" variant="success">
                                            Mua Vé
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Image src={img_1} />
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-12"> 
                        <Image src={img_2} fluid />
                    </div>
                </div>
                <ToastContainer />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    routes: state.getAllRoutes.routes
});

const userCreators = {
    getAllRoutes: userActions.getAllRoutes
}

export default connect(mapStateToProps, userCreators)(Home);