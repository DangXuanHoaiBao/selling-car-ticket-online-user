import React from "react";
import {FormGroup, Form, Button, Input, Label, Row, Col, Card, CardBody, Media, NavLink} from "reactstrap";
import {Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import history from "../helpers/history";
import discount1 from "../images/discount1.png";
import discount2 from "../images/discount2.png";
import discount3 from "../images/discount3.png";
import discount_detail1 from "../images/discount-detail1.PNG";
import discount_detail2 from "../images/discount-detail2.PNG";

class Discount extends React.Component{

    render(){


        return (
                <div className="container" >
                 
                    <Link to="/discount-detail/1">
                        <Image className="discount-detail" src={discount3} />
                    </Link>
                    <Link to="/discount-detail/2">
                        <Image className="discount-detail" src={discount1} />
                    </Link>
                    <Image className="discount-detail" src={discount2} />
                    
                    
                   
                </div>
        );
    }
}

export default Discount;