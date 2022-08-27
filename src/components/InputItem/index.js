import React from "react"
import PropTypes from "prop-types"
import { Input } from "antd"

const InputItem = ({ title, description, message, ...inputProps }) => {
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
      <Input {...inputProps} />
      {message && message.trim().length > 0 && (
        <p className="ori-absolute ori-font-xxs ori-font-warning">{message}</p>
      )}
    </div>
  )
}

InputItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  message: PropTypes.string,
}

export default InputItem
