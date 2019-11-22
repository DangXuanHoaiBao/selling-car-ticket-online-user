import React from 'react';
import {Form, Button} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import history from '../helpers/history';

import 'react-datepicker/dist/react-datepicker.css';

class CustomerInfor extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            birthday: new Date()
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = date => {
        this.setState({
            birthday: date
        });
    }

    handleSubmit(e){
        e.preventDefault();
        history.push('/payment')
    }

    render(){

        const {birthday} = this.state;

        return (
            <div className="container mt-5">
                <div className="row ">
                    <div className="col-md-6">
                        <div className="mb-2 font-weight-bold text-success"> NHẬP THÔNG TIN KHÁCH HÀNG</div>
                        <div className="border border-success">
                            <Form onSubmit={this.handleSubmit}>
                                <div className="row mt-3 mb-4 ml-3 mr-3">
                                    <div className="col-md-6">
                                        <Form.Group controlId="formName">
                                            <Form.Label className="font-weight-bold">Họ Tên</Form.Label>
                                            <Form.Control type="text" placeholder="Nhập Họ Tên" />
                                            <Form.Text className="text-muted">
                                            </Form.Text>
                                        </Form.Group>
                                        <Form.Group controlId="formEmail">
                                            <Form.Label className="font-weight-bold">Email</Form.Label>
                                            <Form.Control type="email" placeholder="Nhập Email" />
                                            <Form.Text className="text-muted">
                                            </Form.Text>
                                        </Form.Group>
                                        <Form.Group controlId="formDistrict">
                                            <Form.Label className="font-weight-bold">Tỉnh/TP</Form.Label>
                                            <Form.Control as="select">
                                                <option>Choose...</option>
                                                <option>...</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group controlId="formBirthday">
                                            <Form.Label className="font-weight-bold">Ngày Sinh</Form.Label>
                                            <DatePicker className="input-date rounded-sm"
                                                selected={birthday}
                                                onChange={this.handleChange}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicPhoneNumber">
                                            <Form.Label className="font-weight-bold">Di Động</Form.Label>
                                            <Form.Control type="text" placeholder="Nhập SĐT" />
                                            <Form.Text className="text-muted">
                                            </Form.Text>
                                        </Form.Group>
                                        <Form.Group controlId="formTow">
                                            <Form.Label className="font-weight-bold">Quận/Huyện</Form.Label>
                                            <Form.Control as="select">
                                                <option>Choose...</option>
                                                <option>...</option>
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
                        <div className="border border-success">
                            <div className="row mt-3 mb-3 ml-3 mr-3">
                                <span> 
                                    <i class="material-icons ">looks_one</i>
                                    &nbsp;&nbsp;Quý khách vui lòng mang email có chứa mã vé đến văn phòng để đổi vé lên xe trước giờ xuất bến
                                    ít nhất 60 phút để chúng tôi trung chuyển.
                                </span>
                                <p/>
                                <span>
                                    <i className="material-icons">looks_two</i>
                                    &nbsp;&nbsp;Thông tin hành khách phải chính xác, nếu không sẽ không thể lên xe hoặc hủy/đổi vé.
                                </span>
                                <p/>
                                <span>
                                    <i className="material-icons">looks_3</i>
                                    &nbsp;&nbsp;Quý khách không được đổi trả vé vào các ngày lễ tết (ngày thường quý khách được chuyển đổi hoặc
                                    hủy vé một lần duy nhất trước giờ xe chạy 24 giờ), phí hủy vé 10%.
                                </span>
                                <p/>
                                <span>
                                    <i className="material-icons">looks_4</i>
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