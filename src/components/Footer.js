/* eslint-disable quotes */
import React from 'react';
import {Image, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import logo_mhh from "../images/logo-mhh.PNG";

class Footer extends React.Component {

    render(){
        const {data} = this.props;

        return (
            <div valign="bottom">
                <Card className="bg-green text-white mt-3">
                    <div className="container mt-3 mb-3 text-dark">
                    <div className="row mb-3">
                        <div className="col-md-2 border-right">
                        <Link to="/">
                            <Image src={logo_mhh} className="w-50" alt="" roundedCircle />
                            <div className="ml-10 font-weight-bold text-white">BCCDH</div>
                        </Link>
                        </div>
                        <div className="col-md-5 border-right">
                        <div className="font-weight-bold">Văn Phòng Công Ty</div>
                        <div>Địa chỉ: 266-268 Lê Hồng Phong, phường 4, quận 5, Tp. HCM</div>
                        <div>Số Fax: (028) 62 908 313</div>
                        </div>
                        <div className="col-md-5">
                        <div className="font-weight-bold">Chi Nhánh</div>
                        <div>Địa chỉ: Số 06 Lữ Gia, Phường 9, Đà Lạt, Lâm Đồng.</div>
                        <div>Địa chỉ: Mai Chí Thọ, Phường 9, Quận 2, TPHCM</div>
                        <div>Địa chỉ: QL1A, Phường 1, Châu Thành, Long An.</div>
                        <div>Địa chỉ: AL1A, Phường 2, Cai Lậy, Tiền Giang.</div>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-md-2 border-right">
                        <div className="font-weight-bold">Chứng nhận</div>
                        </div>
                        <div className="col-md-10">
                        <div>Giấy chứng nhận đăng ký kinh doanh số: 0302029252 do Sở Kế hoạch đầu tư TPHCM
                            cấp ngày 08/03/2000 - MST: 0302029252
                            Người chịu trách nhiệm: Lê Đức Thành
                        </div>
                        </div>
                    </div>
                    </div>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    data: state.login.data
});

export default connect(mapStateToProps)(Footer);