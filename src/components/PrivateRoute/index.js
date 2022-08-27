import React from "react"
import { Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Result, Button } from "antd"

import { ROUTE_PATH, ROLE } from "../../data/config/constants"

const PrivateRoute = ({ component: Component, user, token, ...rest }) => {
  const checkAuthAndRender = (props) => {
    if (user && token) {
      const notAllowed =
        (user.role !== ROLE.MANAGAER &&
          props.match.path.includes(ROUTE_PATH.USERS)) ||
        (user.role === ROLE.MANAGAER &&
          props.match.path === ROUTE_PATH.MY_RESERVATION)
      if (notAllowed)
        return (
          <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={
              <Button
                type="primary"
                onClick={() => props.history.push(ROUTE_PATH.HOME)}
              >
                Back Home
              </Button>
            }
          />
        )
      return <Component {...props} />
    } else {
      return (
        <Redirect
          to={{ pathname: ROUTE_PATH.LOGIN, state: { from: props.location } }}
        />
      )
    }
  }

  return <Route {...rest} render={checkAuthAndRender} />
}

const mapStateToProps = (state) => {
  return {
    user: state.authDetails.user,
    token: state.authDetails.token,
  }
}

PrivateRoute.propTypes = {
  user: PropTypes.object,
}

export default connect(mapStateToProps)(PrivateRoute)
