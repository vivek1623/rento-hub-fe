import React from "react"
import PropTypes from "prop-types"
import { Result, Button } from "antd"

import { ROUTE_PATH } from "../../data/config/constants"

const PageNotFound = ({ history }) => {
  const goToHome = () => history.push(ROUTE_PATH.HOME)

  return (
    <div className="ori-pad-10 ori-full-parent-height ori-flex-column ori-flex-center">
      <Result
        status="403"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={[
          <Button type="primary" key="home" onClick={goToHome}>
            Home
          </Button>,
          <Button key="back" onClick={history.goBack}>
            Back
          </Button>,
        ]}
      />
    </div>
  )
}

PageNotFound.propTypes = {
  history: PropTypes.object,
}

export default PageNotFound
