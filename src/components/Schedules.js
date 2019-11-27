import React from 'react';
import {Table, Button} from 'react-bootstrap';

const Schedules = () => {

    return (
        <div className="container mt-5">
            <div className="row mb-3">
                <div className="col-md-12">
                    <h4 className="text-warning"> Tuyến Đường <i class="fas fa-shuttle-van"></i></h4>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="text-success font-weight-bold">Tên Tuyến Đường &nbsp; <i class=" fas fa-exchange-alt"></i></div>
                    <Table responsive="sm">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Bến đi</th>
                                <th>Bến đến</th>
                                <th>Loại xe</th>
                                <th>Quảng Đường</th>
                                <th>Thời gian</th>
                                <th>Số chuyến</th>
                                <th>Giá vé</th>
                                <th>Giờ chạy</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><Button variant="success">Mua Vé</Button></td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default Schedules;