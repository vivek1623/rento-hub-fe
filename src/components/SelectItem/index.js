import React from "react"
import PropTypes from "prop-types"
import { Select } from "antd"

const SelectItem = ({ title, message, description, ...selectProps }) => {
  return (
    <div className="ori-relative ori-tb-pad-7">
      {title && (
        <p
          className={`ori-capitalize-first ${
            description ? "" : "ori-b-mrgn-5"
          }`}
        >
          {title}
        </p>
      )}
      {description && (
        <p className="ori-font-light ori-font-xs ori-b-mrgn-5">{description}</p>
      )}
      <Select className="ori-full-width" {...selectProps} />
      {message && <p className="ori-font-xxs ori-font-warning">{message}</p>}
    </div>
  )
}

SelectItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,

  message: PropTypes.string,
}

export default SelectItem
