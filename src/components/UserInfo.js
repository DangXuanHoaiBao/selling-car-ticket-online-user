/* eslint-disable quotes */
/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable camelcase */
import React from "react";
import {connect} from 'react-redux';
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Button,
  Media,
} from "reactstrap";
import { toast, Bounce,ToastContainer } from 'react-toastify';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faFan } from '@fortawesome/free-solid-svg-icons';
import userActions from "../actions/user";
import profileImg from "../images/profile.png"
import { storage } from "../config/firebase-config";


class Info extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notify1: false,
      notify2: false,
      notify3: false,
      notify4: false,
      fullNameTemp: '',
      fullName: '',
      gender: '',
      address: '',
      phoneNumber: '',
      email: '',
      imgFile: null,
      urlImg: '',
      selectdImage: null,
      reviewImage: null,
      progress: 0,
      isUploading: false, 
  
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectImage = this.handleSelectImage.bind(this);
  }

  UNSAFE_componentWillMount(){
    const {data} = this.props;
    console.log(this.state.urlImg);
    this.setState({
      fullNameTemp: data.user.fullName,
      fullName: data.user.fullName,
      gender: data.user.gender,
      address: data.user.address,
      phoneNumber: data.user.phoneNumber,
      email: data.user.email,
      urlImg: data.user.urlImg
  });
  }
  
  UNSAFE_componentWillReceiveProps(newProp){
    const { info } = newProp;
    if(info){
      this.setState({
        fullName: info.fullName,
        code: info.code,
        email: info.email,
        role: info.role
      });
    }
  }

  notify = () => {
    this.toastId = toast("Định dạng file không hợp lệ", {
    transition: Bounce,
    closeButton: true,
    autoClose: 3000,
    position: 'top-center',
    type: 'error',
    newestOnTop: true   
  })};



  handleChange(e) {
    const { name, value } = e.target;
    console.log(value);
    if(name === 'phoneNumber' && !Number(value) && value !== ''){
      return;
    }
    this.setState({ [name]: value });
  }

  handleSelectImage(e){
    const Img = e.target.files[0]
    if(Img !== undefined){
      if(Img.type.includes('image') !== true){
        this.setState({
          selectdImage: Img
        });
        this.notify();
        return;
      }
      this.setState({
        reviewImage: URL.createObjectURL(Img),
        selectdImage: Img
      });
    }
  }

  handleSubmit(e) {
      e.preventDefault(); 
      const { updateInfo } = this.props;
      const { fullName, email, gender, selectdImage, address, phoneNumber, urlImg} = this.state;
      this.setState({ isUploading: true });

      if(fullName === ''){
        this.setState({ notify1: true });
      }
      else{
        this.setState({ notify1: false });
      }

      if(gender === ''){
        this.setState({ notify2: true });
      }
      else{
        this.setState({ notify2: false });
      }

      if(address === ''){
        this.setState({ notify3: true });
      }
      else{
        this.setState({ notify3: false });
      }

      if(phoneNumber === ''){
        this.setState({ notify4: true });
      }
      else{
        this.setState({ notify4: false });
      }

     

      
      const newUser = {
        fullName,
        gender, 
        address, 
        phoneNumber,
        urlImg
      }

      if(selectdImage === null){
        updateInfo(newUser);
        this.setState({isUploading: false});
        
      }
      else{
        if(selectdImage.type.includes('image') !== true){
          this.notify();
          this.setState({ isUploading: false });
          return;
        }
        const uploadTask = storage.ref(`image/${email}/${selectdImage.name}`).put(selectdImage);
        uploadTask.on(
          "state_changed",
          function(snapshot) {
            // progress function ...
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            this.setState({ progress });
          }.bind(this),
          function(error) {
            // Error function ...
            console.log(error);
          },
          function() {
            // complete function ...
            uploadTask.snapshot.ref.getDownloadURL()
            .then(function(url){
              if(fullName !== ''){
                newUser.urlImg = url;
                updateInfo(newUser);
                this.setState({ urlImg: url,
                  isUploading: false});
                }
              
            }.bind(this))
          }.bind(this)
        );
      }
      
    
      
  }   

  



  render() {
    const { fullName, email, gender, address, phoneNumber, reviewImage, isUploading,
          notify1, notify2, notify3, notify4
    } = this.state;

  
   

    let { urlImg } = this.state;
    const span = <span style={{ color: "red" }}>(*)</span>;
    if(reviewImage !== null){
      urlImg = reviewImage;
    }
    return (
      <div className="container">
        <Row>
          <Col md="3" />
          <Col md="6" className="content-info"><h2>Thông tin cá nhân</h2></Col>
          <Col md="3" />
        </Row>
        <Row>
          <Col md="3" />
          <Col md="6">
            <Card className="main-card mb-3">
                <Row className="custom-image-info">
                  <Col xs={12} >
                    {reviewImage !== null &&
                      <Media object  width={100}
                      height={100}
                      src={reviewImage} className="rounded-circle"/>
                    }
                    {reviewImage === null && urlImg !== '' &&
                      <Media object  width={100}
                      height={100}
                      src={urlImg} className="rounded-circle" >
                      </Media>
                    }
                    {reviewImage === null && urlImg === '' &&
                      <Media object  width={100}
                      height={100}
                      src={profileImg} className="rounded-circle"/>
                    }
                  </Col>
                </Row>
                <Row className="custom-image-info">
                  <Col xs={12}>
                  <div className="custom-form-file-group">
                      <Button className="btn-upload">Cập nhật ảnh</Button>
                      <input type="file" id="fileup" accept="image/*" onChange={this.handleSelectImage} />
                  </div>
                  </Col>
                </Row>
              <CardBody>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label for="exampleEmail">Họ tên</Label>
                    <Input invalid={notify1} name="fullName" value={fullName} type="text" onChange={this.handleChange}/>
                    <FormFeedback>Tên không được bỏ trống!!!</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">Email {span}</Label>
                    <Input name="email" value={email} type="text" disabled />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">Giới tính</Label>
                    <Input invalid={notify2} type="select" name="gender" value={gender} onChange={this.handleChange}>
                              <option value=""></option>
                              <option value="Nam">Nam</option>
                              <option value="Nữ">Nữ</option>
                              <option value="Khác">Khác</option>
                    </Input>
                    <FormFeedback>Bạn chưa chọn giới tính!!!</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">Địa chỉ</Label>
                    <Input invalid={notify3} name="address" value={address} type="text" onChange={this.handleChange}/>
                    <FormFeedback>Bạn chưa nhập địa chỉ!!!</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">Số điện thoại</Label>
                    <Input invalid={notify4} name="phoneNumber" value={phoneNumber} type="text" onChange={this.handleChange}/>
                    <FormFeedback>Bạn chưa nhập số điện thoại!!!</FormFeedback>
                  </FormGroup>
                  <Label className="margin-top-1em">{span}: Chỉ xem</Label>
                  <Button className="float-right btn-upload margin-top-1em" type="submit">Cập nhật
                  {isUploading &&
                    <FontAwesomeIcon className="ml-2 opacity-8" icon={faFan} spin/>
                  }
                  </Button>
                </Form>
              </CardBody> 
            </Card>
          </Col>
          <Col md="3" />
        </Row>
        <ToastContainer />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  data: state.login.data
});

const actionCreator = {
  updateInfo: userActions.updateInfo,
}
export default connect(mapStateToProps, actionCreator)(Info);
