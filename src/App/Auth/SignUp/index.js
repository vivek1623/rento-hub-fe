import React, { Fragment } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Form, Input, Button, Select, message } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"

import { signUpUser } from "../../../data/redux/auth/actions"

import { ROUTE_PATH } from "../../../data/config/constants"
import { isEmail } from "../../../data/config/utils"

const SignUp = ({ history, actions, loading }) => {
  const goToLogin = () => {
    history.push(ROUTE_PATH.LOGIN)
  }

  const goToHome = () => history.push(ROUTE_PATH.HOME)

  const onFinish = (payload) => {
    if (payload && payload.email && isEmail(payload.email)) {
      if (
        payload.password &&
        payload.confirmPassword &&
        payload.password === payload.confirmPassword
      ) {
        const data = {
          name: payload.username,
          email: payload.email,
          password: payload.password,
          role: payload.role,
        }
        actions.signUpUser(data, goToHome)
      } else message.error("password and confirm password should be same")
    } else {
      message.error("Please enter valid email id")
    }
  }

  const onFinishFailed = () => {
    message.error("Please enter/validate email and password!")
  }

  return (
    <Fragment>
      <Form
        size="large"
        scrollToFirstError
        layout="vertical"
        initialValues={{
          role: "user",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please enter your name",
            },
          ]}
        >
          <Input
            allowClear
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Name"
          />
        </Form.Item>
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
            placeholder="Email Id"
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
        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please re-enter your password",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Confirm Password"
          />
        </Form.Item>
        <Form.Item name="role">
          <Select placeholder="Select role">
            <Select.Option value="user">User</Select.Option>
            <Select.Option value="manager">Manager</Select.Option>
          </Select>
        </Form.Item>
        <Button
          className=" ori-b-mrgn-10"
          type="primary"
          htmlType="submit"
          loading={loading}
          block
        >
          Sign Up
        </Button>
        <p className="ori-text-center">
          Already have an account?{"  "}
          <span className="ori-link-primary ori-font-bold" onClick={goToLogin}>
            Login
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
  actions: bindActionCreators({ signUpUser }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
