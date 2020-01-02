import React from "react";
import {Form, Button} from "react-bootstrap";
import DatePicker from "react-datepicker";
import history from "../helpers/history";

import "react-datepicker/dist/react-datepicker.css";

class CustomerInfor extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            fullName: "",
            email: "",
            city: "TPHCM",
            birthday: null,
            phoneNumber: "",
            district: "Quận 1",
            errorFullName: "tên không được để trống",
            errorEmail: "email không được để trống",
            errorPhoneNumber: "sđt không được để trống"
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeBirthday = this.handleChangeBirthday.bind(this);
    }

    handleChange(e){
        const {name , value} = e.target;
        if(name === "fullName"){
            this.setState({
                errorFullName: (value === "") ? "tên không được để trống" : ""
            })
        }
        if(name === "email"){
            this.setState({
                errorEmail: (value === "") ? "email không được để trống" : ""
            })
        }
        if(name === "phoneNumber"){
            this.setState({
                errorPhoneNumber: (value === "") ? "sđt không được để trống" : ""
            })
        }
        this.setState({
            [name]: value
        })
    }

    handleChangeBirthday = date => {
        this.setState({
            birthday: date
        });
    }

    handleSubmit(e){
        e.preventDefault();
        const {departure, destination, date, numberOfTicket, time, getOnDeparture, numberChair, fare} = history.location.state;
        const {fullName, email, phoneNumber, city, district, birthday, errorEmail, errorFullName, errorPhoneNumber} = this.state;
        if(errorEmail === "" && errorFullName === "" && errorPhoneNumber === ""){
            const fareInfo = {
                departure, destination, date, numberOfTicket, time, getOnDeparture, fare,
                numberChair, fullName, email, phoneNumber, city, district, birthday
            }
            history.push("/checkout", fareInfo)
        }
    }

    render(){

        const {birthday, fullName, email, phoneNumber, city, district, errorFullName, errorEmail, errorPhoneNumber} = this.state;

        return (
            <div className="container mt-5">
                <div className="row ">
                    <div className="col-md-6">
                        <div className="mb-2 font-weight-bold text-success"> NHẬP THÔNG TIN KHÁCH HÀNG</div>
                        <div className="border border-success rounded">
                            <Form onSubmit={this.handleSubmit} className="mt-4 ml-4 mr-4">
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group controlId="formName">
                                            <Form.Label className="font-weight-bold">Họ Tên</Form.Label>
                                            <Form.Control type="text" placeholder="Nhập Họ Tên" name="fullName" value={fullName} onChange={this.handleChange}/>
                                            <Form.Text className="text-danger">{errorFullName}</Form.Text>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                    <Form.Group controlId="formBirthday">
                                        <Form.Label className="font-weight-bold">Ngày Sinh</Form.Label>
                                        <DatePicker className="input-date rounded-sm"
                                            selected={birthday}
                                            onChange={this.handleChangeBirthday}
                                        />
                                        <Form.Text></Form.Text>
                                    </Form.Group>
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group controlId="formEmail">
                                            <Form.Label className="font-weight-bold">Email</Form.Label>
                                            <Form.Control type="email" placeholder="Nhập Email" name="email" value={email} onChange={this.handleChange}/>
                                            <Form.Text className="text-danger">{errorEmail}</Form.Text>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group controlId="formBasicPhoneNumber">
                                            <Form.Label className="font-weight-bold">Di Động</Form.Label>
                                            <Form.Control type="text" placeholder="Nhập SĐT" name="phoneNumber" value={phoneNumber} onChange={this.handleChange}/>
                                            <Form.Text className="text-danger">{errorPhoneNumber}</Form.Text>
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group controlId="formDistrict">
                                            <Form.Label className="font-weight-bold">Tỉnh/TP</Form.Label>
                                            <Form.Control as="select" name="city" value={city} onChange={this.handleChange}>
                                                <option>TPHCM</option>
                                                <option>Ha Noi</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group controlId="formTow">
                                            <Form.Label className="font-weight-bold">Quận/Huyện</Form.Label>
                                            <Form.Control as="select" name="district" value={district} onChange={this.handleChange}>
                                                <option>Quận 1</option>
                                                <option>Quận 2</option>
                                                <option>Quận 3</option>
                                                <option>Quận 4</option>
                                                <option>Quận 5</option>
                                                <option>Quận 6</option>
                                                <option>Quận 7</option>
                                                <option>Quận 8</option>
                                                <option>Quận 9</option>
                                                <option>Quận 10</option>
                                                <option>Quận 11</option>
                                                <option>Quận 12</option>
                                                <option>Cái bè</option>
                                                <option>Cai lậy</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row text-center"><div className="col-md-12 mb-4"><Button className="w-50 font-weight-bold" type="submit" variant="success"> Tiếp Theo </Button></div></div>
                            </Form>
                        </div>
                    </div>
                    <div className="col-md-6">
                    <div className="mb-2 font-weight-bold text-success"> MỘT SỐ ĐIỀU KHOẢN CẦN LƯU Ý DÀNH CHO KHÁCH HÀNG</div>
                        <div className="border border-success rounded">
                            <div className="row mt-3 mb-4 ml-3 mr-3">
                                <span> 
                                    <i class="material-icons ">filter_1</i>
                                    &nbsp;&nbsp;Quý khách vui lòng mang email có chứa mã vé đến văn phòng để đổi vé lên xe trước giờ xuất bến
                                    ít nhất 60 phút để chúng tôi trung chuyển.
                                </span>
                                <p/>
                                <span>
                                    <i className="material-icons">filter_2</i>
                                    &nbsp;&nbsp;Thông tin hành khách phải chính xác, nếu không sẽ không thể lên xe hoặc hủy/đổi vé.
                                </span>
                                <p/>
                                <span>
                                    <i className="material-icons">filter_3</i>
                                    &nbsp;&nbsp;Quý khách không được đổi trả vé vào các ngày lễ tết (ngày thường quý khách được chuyển đổi hoặc
                                    hủy vé một lần duy nhất trước giờ xe chạy 24 giờ), phí hủy vé 10%.
                                </span>
                                <p/>
                                <span>
                                    <i className="material-icons">filter_4</i>
                                    &nbsp;&nbsp;Nếu quý khách có nhu cầu trung chuyển, vui lòng liên hệ số điện thoại 1900 6067 trước khi đặt vé,
                                    chúng tôi sẽ không đón/trung chuyển tại những điểm xe trung chuyển không thể tới được.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default CustomerInfor;