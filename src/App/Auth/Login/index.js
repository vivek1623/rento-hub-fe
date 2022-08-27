import React, { Fragment, useEffect } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Form, Input, Button, message } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"

import { loginUser, signOutUser } from "../../../data/redux/auth/actions"

import { ROUTE_PATH } from "../../../data/config/constants"

const Login = ({ history, actions, loading }) => {
  const { signOutUser, loginUser } = actions

  useEffect(() => {
    signOutUser()
  }, [signOutUser])

  const goToSignup = () => {
    history.push(ROUTE_PATH.SIGNUP)
  }

  const goToHome = () => history.push(ROUTE_PATH.HOME)

  const onFinish = (payload) => loginUser(payload, goToHome)

  const onFinishFailed = () => {
    message.error("Please enter/validate username and password!")
  }

  return (
    <Fragment>
      <Form
        scrollToFirstError
        size="large"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter email",
            },
          ]}
        >
          <Input
            allowClear
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email / Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
          />
        </Form.Item>
        <Button
          className=" ori-b-mrgn-10"
          type="primary"
          htmlType="submit"
          loading={loading}
          block
        >
          {loading ? "LOGGING" : "LOGIN"}
        </Button>
        <p className="ori-text-center">
          Don't have an account?{"  "}
          <span className="ori-link-primary ori-font-bold" onClick={goToSignup}>
            Sign Up
          </span>{" "}
          Here
        </p>
      </Form>
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  loading: state.authDetails.loading,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ loginUser, signOutUser }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
