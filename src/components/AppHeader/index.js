import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Layout, Menu, Dropdown, Avatar } from "antd"
import {
  LogoutOutlined,
  ScheduleOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { withRouter } from "react-router-dom"

import { signOutUser } from "../../data/redux/auth/actions"
import { ROUTE_PATH, APP_PAGE, ROLE } from "../../data/config/constants"
import { IMG_LOGO } from "../../data/assets"

const AppHeader = ({
  isMobile,
  userName,
  currentPage,
  role,
  history,
  actions,
}) => {
  const handleHeaderMenuClick = (item) => {
    if (item.key) history.push(ROUTE_PATH[item.key.toUpperCase()])
  }

  const handleDropdownMenuClick = (item) => {
    if (item.key === "logout") {
      actions.signOutUser()
      history.push(ROUTE_PATH.LOGIN)
    } else if (item.key === "booking") {
      history.push(ROUTE_PATH.MY_RESERVATION)
    }
  }

  return (
    <Layout.Header className="ori-relative ori-box-shadow-light ori-flex-row">
      <div className="">
        <img
          style={{ height: isMobile ? 35 : 50 }}
          src={IMG_LOGO}
          alt="RentoHub"
        />
      </div>
      {role === ROLE.MANAGAER && (
        <Menu
          mode="horizontal"
          className="ori-full-flex"
          selectedKeys={currentPage ? [currentPage] : []}
          onClick={handleHeaderMenuClick}
          items={[
            {
              label: APP_PAGE.HOME,
              path: ROUTE_PATH.HOME,
              key: APP_PAGE.HOME,
            },
            {
              label: APP_PAGE.USERS,
              path: ROUTE_PATH.USERS,
              key: APP_PAGE.USERS,
            },
          ]}
        />
      )}
      <Dropdown
        overlay={
          <Menu
            items={[
              isMobile && {
                key: "userName",
                icon: <UserOutlined />,
                label: userName,
                disabled: true,
              },
              role !== ROLE.MANAGAER && {
                key: "booking",
                icon: <ScheduleOutlined />,
                label: "My Booking",
              },
              {
                key: "logout",
                icon: <LogoutOutlined />,
                label: "Logout",
              },
            ]}
            onClick={handleDropdownMenuClick}
          />
        }
        placement="bottomRight"
        trigger={["click"]}
        style={{ display: "flex" }}
      >
        <div className="ori-absolute ori-align-right-15 ori-cursor-ptr">
          <Avatar
            className="ori-bg-primary ori-capitalize"
            shape="square"
            size={32}
          >
            {userName.charAt(0)}
          </Avatar>
          {!isMobile && (
            <span className="ori-capitalize ori-l-pad-5 ori-font-medium">
              {userName}
            </span>
          )}
        </div>
      </Dropdown>
    </Layout.Header>
  )
}

const mapStateToProps = (state) => ({
  isMobile: state.pageDetails.isMobile,
  userName: state.authDetails.user?.name,
  role: state.authDetails.user?.role,
  currentPage: state.pageDetails.currentPage,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ signOutUser }, dispatch),
})

AppHeader.propTypes = {
  isMobile: PropTypes.bool,
  userName: PropTypes.string,
  currentPage: PropTypes.string,
  role: PropTypes.string,
}

AppHeader.defaultProps = {
  userName: "Unknown",
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppHeader)
)
