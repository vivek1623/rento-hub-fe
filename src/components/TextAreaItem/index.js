import React from "react"
import PropTypes from "prop-types"
import { Input } from "antd"

const { TextArea } = Input

const TextAreaItem = ({ title, description, ...textareaProps }) => {
  return (
    <div className="ori-tb-pad-7">
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
      <TextArea {...textareaProps} />
    </div>
  )
}

TextAreaItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
}

export default TextAreaItem
