import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Spin } from "antd"

const GlobalInformation = ({ loading, loaderText }) => {
  if (!loading) return null
  return (
    <div className="ori-absolute ori-bg-black-light ori-align-full ori-zindex-99999 ori-flex-column ori-flex-center">
      <div className="ori-pad-15 ori-bg-base ori-border-radius-base ori-box-shadow-light">
        <Spin tip={`${loaderText} ...`} />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  loading: state.pageDetails.pageLoading,
  loaderText: state.pageDetails.pageLoadingText,
})

GlobalInformation.propTypes = {
  loading: PropTypes.bool,
  loaderText: PropTypes.string,
}

export default connect(mapStateToProps)(GlobalInformation)
