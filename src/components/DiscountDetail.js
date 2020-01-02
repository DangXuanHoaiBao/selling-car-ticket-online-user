import React from "react";
import {Image} from "react-bootstrap";
import history from "../helpers/history"
import discount_detail1 from "../images/discount-detail1.PNG"
import discount_detail2 from "../images/discount-detail2.PNG"

class DiscountDetail extends React.Component{
    render(){
        const {id} = this.props.match.params;
        return (
                <div className="container" >
                    {id === "1" &&
                        <Image src={discount_detail2}/>
                    }
                    {id === "2" &&
                        <Image src={discount_detail1}/>
                    }
                    
                </div>
        );
    }
}

export default DiscountDetail;