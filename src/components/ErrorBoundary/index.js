import React, { Component } from "react"
import PropTypes from "prop-types"
import { Result, Button } from "antd"

import { reloadPage } from "../../data/config/utils"

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true }, () => {
      if (this.props.onErrorCallback) this.props.onErrorCallback()
    })
  }

  render() {
    const { sm, children } = this.props
    const { hasError } = this.state
    if (!hasError) return children
    else if (sm)
      return (
        <Result
          status="500"
          title="Error Occured"
          subTitle="Sorry, Something went wrong, please your connection and reload the page"
          extra={[
            <Button type="primary" key="reload" onClick={reloadPage}>
              Reload
            </Button>,
          ]}
        />
      )
    return null
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  sm: PropTypes.bool,
}

ErrorBoundary.defaultProps = {
  sm: false,
}
