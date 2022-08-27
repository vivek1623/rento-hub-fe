import React, { useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Button, message } from "antd"

import { COLORS, LOCATIONS, MODELS } from "../../data/config/constants"

import SelectItem from "../SelectItem"
import TextAreaItem from "../TextAreaItem"

const VehicleForm = ({ vehicle, loading, btnText, onCancel, onSubmit }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(vehicle)

  const handleFormDataChange = (payload) => {
    setSelectedVehicle({
      ...selectedVehicle,
      ...payload,
    })
  }

  const onClickSubmit = () => {
    if (
      selectedVehicle.model &&
      selectedVehicle.color &&
      selectedVehicle.location
    ) {
      onSubmit(selectedVehicle)
    } else message.warning("Model/Color/Location are required")
  }

  return (
    <>
      <SelectItem
        title="Model"
        placeholder="Select model"
        options={MODELS}
        value={selectedVehicle.model}
        onChange={(model) => handleFormDataChange({ model })}
      />
      <SelectItem
        title="Color"
        placeholder="Select color"
        options={COLORS}
        value={selectedVehicle.color}
        onChange={(color) => handleFormDataChange({ color })}
      />
      <SelectItem
        title="Location"
        placeholder="Select location"
        options={LOCATIONS}
        value={selectedVehicle.location}
        onChange={(location) => handleFormDataChange({ location })}
      />
      <TextAreaItem
        title="Description"
        placeholder="Write details about vehicle"
        autoSize={{ minRows: 2, maxRows: 4 }}
        maxLength={60}
        value={selectedVehicle.description}
        onChange={(e) => handleFormDataChange({ description: e.target.value })}
        showCount
      />
      <div className="ori-flex-row ori-flex-jc ori-pad-10">
        <Button className="ori-r-mrgn-10" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="primary"
          loading={loading}
          disabled={
            !(
              selectedVehicle.model &&
              selectedVehicle.color &&
              selectedVehicle.location
            )
          }
          onClick={onClickSubmit}
        >
          {btnText}
        </Button>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  loading: state.pageDetails.modalLoading,
})

VehicleForm.propTypes = {
  btnText: PropTypes.string,
  vehicle: PropTypes.object,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  loading: PropTypes.bool
}

VehicleForm.defaultProps = {
  vehicle: {},
  btnText: "Save",
  loading: false
}

export default connect(mapStateToProps)(VehicleForm)
