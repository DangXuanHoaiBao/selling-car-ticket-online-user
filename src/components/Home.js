import React from "react";
import {Form} from 'react-bootstrap';

const Home = () => {
    return (
        <div className="container">
             <div className="row">
                <div className="col-md-6">
                    <div> MUA VÉ TRỰC TUYẾN</div>
                    <div className=" border border-dark">
                        <div className="row">
                            <div className="col-md-6">
                                <div>
                                <Form.Group controlId="formGridState">
                                    <Form.Label>Điểm khởi hành</Form.Label>
                                    <Form.Control as="select">
                                        <option>Choose...</option>
                                        <option>...</option>
                                    </Form.Control>
                                </Form.Group>
                                </div>
                                
                            </div>
                            <div className="col-md-6">
                                <Form.Group controlId="formGridState">
                                    <Form.Label>Điểm đến</Form.Label>
                                    <Form.Control as="select">
                                        <option>Choose...</option>
                                        <option>...</option>
                                    </Form.Control>
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">

                </div>
             </div>
        </div>
    )
}

export default Home;