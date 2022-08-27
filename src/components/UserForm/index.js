import React, { useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Button, message } from "antd"

import { ROLES } from "../../data/config/constants"
import { isEmail } from "../../data/config/utils"

import InputItem from "../InputItem"
import SelectItem from "../SelectItem"

const UserForm = ({ user, loading, onCancel, onSubmit }) => {
  const [selectedUser, setSelectedUser] = useState(user)

  const handleFormDataChange = (payload) => {
    setSelectedUser({
      ...selectedUser,
      ...payload,
    })
  }

  const handleFormItemChange = (e) => {
    setSelectedUser({
      ...selectedUser,
      [e.target.name]: e.target.value,
    })
  }

  const onClickSubmit = () => {
    if (selectedUser.name) {
      if (selectedUser.email && isEmail(selectedUser.email))
        onSubmit(selectedUser)
      else message.warning("Enter valid Email")
    } else message.warning("Name/Email are required")
  }

  return (
    <>
      <InputItem
        title="Name"
        placeholder="Enter Name"
        name="name"
        value={selectedUser.name}
        onChange={handleFormItemChange}
      />
      <InputItem
        title="Email"
        placeholder="Enter email"
        name="email"
        value={selectedUser.email}
        onChange={handleFormItemChange}
      />
      <SelectItem
        title="Role"
        placeholder="Select role"
        name="role"
        options={ROLES}
        value={selectedUser.role}
        onChange={(role) => handleFormDataChange({ role })}
      />
      <div className="ori-flex-row ori-flex-jc ori-pad-10">
        <Button className="ori-r-mrgn-10" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="primary"
          loading={loading}
          disabled={!selectedUser.name}
          onClick={onClickSubmit}
        >
          Update
        </Button>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  loading: state.pageDetails.modalLoading,
})

UserForm.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
}

UserForm.defaultProps = {
  user: {},
  loading: false,
}

export default connect(mapStateToProps)(UserForm)
