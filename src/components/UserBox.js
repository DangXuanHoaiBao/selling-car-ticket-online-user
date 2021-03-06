/* eslint-disable quotes */
/* eslint-disable no-script-url */

import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {
    DropdownToggle, DropdownMenu, Media, UncontrolledButtonDropdown, DropdownItem, NavLink
} from 'reactstrap';
import {
    toast,
    Bounce
} from 'react-toastify';


import {
    faAngleDown,
    faInfo,
    faExchangeAlt,
    faSignOutAlt,
    faHistory
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import Badge from '@material-ui/core/Badge';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import { styled } from '@material-ui/styles';


import userActions from '../actions/user';
import history from '../helpers/history';
import profileImg from '../images/profile.png';


const MyMailOutlineRoundedIcon = styled(MailOutlineRoundedIcon)({
    color: 'white',
});



class UserBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };
        this.handleLogout = this.handleLogout.bind(this);
    }

    
    notify = () => {
        this.toastId = toast("You don't have any new items in your calendar for today! Go out and play!", {
        transition: Bounce,
        closeButton: true,
        autoClose: 3000,
        position: 'top-center',
        type: 'success'
    })};

    handleLogout(e){
        e.preventDefault();
        const { logout} = this.props;
        
        logout();
        history.push("/login");
    }
  
    
    

    render() {
        const { data } = this.props;  
        return (
            <Fragment>
                <div className="header-btn-lg pr-0">
                    <div className="widget-content p-0">
                        <div className="widget-content-wrapper">
                               <div className="widget-content-left">
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle color="link" className="p-0">
                                        <Media object width={32} height={32} className="rounded-circle" src={data.user.urlImg? data.user.urlImg: profileImg} alt=""/>
                                        <FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown}/>
                                    </DropdownToggle>
                                    {data &&
                                    <DropdownMenu right className="rm-pointers dropdown-menu-lg">
                                        <NavLink href="/user-info">
                                            <DropdownItem >Thông tin tài khoản
                                                <FontAwesomeIcon className="mr-2 ml-2" icon={faInfo}/>
                                            </DropdownItem>
                                        </NavLink>
                                        <NavLink href="/user-history">
                                                <DropdownItem >Lịch sử mua vé
                                                    <FontAwesomeIcon className="mr-2 ml-2" icon={faHistory}/>
                                                </DropdownItem>
                                        </NavLink>
                                        {data.user.typeAccount === 'Normal' &&
                                        <NavLink href="/change-password">
                                            <DropdownItem >Đổi mật khẩu
                                                <FontAwesomeIcon className="mr-2 ml-2" icon={faExchangeAlt}/>
                                            </DropdownItem>
                                        </NavLink>
                                        }
                            
                                        <NavLink>
                                            <DropdownItem onClick={this.handleLogout} >Đăng xuất
                                                <FontAwesomeIcon className="mr-2 ml-2" icon={faSignOutAlt}/>
                                            </DropdownItem>
                                        </NavLink>
                                    </DropdownMenu>   
                                    }
                                </UncontrolledButtonDropdown>
                            </div>
                            <div className="widget-content-left  ml-3 header-user-info">
                                {data &&
                                <div>
                                    <div className="widget-heading">
                                        {data.user.fullName}
                                    </div>
                                    <div className="widget-subheading">
                                        {data.user.role}
                                    </div>
                                </div>
                                }
                            </div>

                            <div className="widget-content-right header-user-info ml-3">
                            <UncontrolledButtonDropdown>
                                    <DropdownToggle color="link" className="p-0">
                                            <Badge badgeContent={4} color="secondary">
                                            <MyMailOutlineRoundedIcon />
                                        </Badge>
                                    </DropdownToggle>
                                  
                                </UncontrolledButtonDropdown>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    data: state.login.data,
});

const actionCreator = {
    logout: userActions.logout,
}

export default connect(mapStateToProps, actionCreator)(UserBox);