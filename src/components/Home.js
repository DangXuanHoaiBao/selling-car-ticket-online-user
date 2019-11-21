import React from "react";
import {Form, Button, Image} from 'react-bootstrap';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
import '../styles/Home.css';
import img_1 from '../images/3.jpg';
import img_2 from '../images/2.jpg';
 
class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date()
        }
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    render(){

        const {startDate} = this.state;

        return (
            <div className="container ">
                <div className="row ">
                    <div className="col-md-6">
                        <div className="mb-2 font-weight-bold text-success"> MUA VÉ TRỰC TUYẾN</div>
                        <div className="border border-success">
                            <div className="row pt-3 pb-3 pl-3 pr-3">
                                <div className="col-md-6">
                                    <Form.Group controlId="formLocationDeparture">
                                        <Form.Label className="font-weight-bold">Điểm khởi hành</Form.Label>
                                        <Form.Control as="select">
                                            <option>Choose...</option>
                                            <option>...</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="formDateDeparture">
                                        <Form.Label className="font-weight-bold">Ngày khởi hành</Form.Label>
                                        <DatePicker className="input-date rounded-sm"
                                            selected={startDate}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Group>
                                    
                                </div>
                                <div className="col-md-6">
                                    <Form.Group controlId="formDestination">
                                        <Form.Label className="font-weight-bold">Điểm đến</Form.Label>
                                        <Form.Control as="select">
                                            <option>Choose...</option>
                                            <option>...</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="formNumberOfTicket">
                                        <Form.Label className="font-weight-bold">Số lượng vé</Form.Label>
                                        <Form.Control as="select">
                                            <option>Choose...</option>
                                            <option>...</option>
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                                
                            </div>
                            <div className="row text-center"><div className="col-md-12 mb-3"><Button className="w-50 font-weight-bold" variant="success"> Mua Vé </Button></div></div>
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
            </div>
        )
    }
}

export default Home;