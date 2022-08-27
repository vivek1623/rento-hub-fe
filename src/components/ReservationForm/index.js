import React, { useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Button, DatePicker, message } from "antd"
import moment from "moment"

import InputItem from "../InputItem"
import TextAreaItem from "../TextAreaItem"

const ReservationForm = ({ data, reservedDates, loading, btnText, onCancel, onSubmit }) => {
  const [selectedData, setSelectedData] = useState(data)
  const [dates, setDates] = useState(null)

  const onClickSubmit = () => {
    if (selectedData.startDate && selectedData.endDate) {
      onSubmit(selectedData)
    } else message.warning("Reservation Date is required")
  }

  const onOpenChange = () => {
    setDates([null, null])
  }

  const disableDateRange = (current) => {
    if (current && current < moment().endOf("day")) return true

    let disabled = false
    if (reservedDates?.length > 0)
      for (let i = 0; i < reservedDates.length; i++) {
        if (
          dates &&
          dates[0] &&
          dates[0] < moment(reservedDates[i].startDate).startOf("day") &&
          current >= moment(reservedDates[i].endDate).endOf("day")
        ) {
          disabled = true
          break
        } else if (
          current >= moment(reservedDates[i].startDate).startOf("day") &&
          current < moment(reservedDates[i].endDate).endOf("day")
        ) {
          disabled = true
          break
        }
      }
    return disabled
  }

  const handleDateRangeChange = (selectedDate) => {
    setSelectedData({
      ...selectedData,
      startDate: selectedDate[0].startOf("day"),
      endDate: selectedDate[1].endOf("day"),
    })
  }

  return (
    <>
      <InputItem title="Model" value={selectedData.model} disabled />
      <InputItem title="Color" value={selectedData.color} disabled />
      <InputItem title="Location" value={selectedData.location} disabled />
      <TextAreaItem
        title="Description"
        placeholder="Write your experience"
        autoSize={{ minRows: 1, maxRows: 4 }}
        maxLength={60}
        value={selectedData.description}
        disabled
      />
      <p className="ori-b-mrgn-5">Reservation Date</p>
      <DatePicker.RangePicker
        format="DD MMM YYYY"
        value={[selectedData.startDate, selectedData.endDate]}
        onOpenChange={onOpenChange}
        onCalendarChange={(val) => setDates(val)}
        onChange={handleDateRangeChange}
        disabledDate={disableDateRange}
        allowClear={false}
      />
      <div className="ori-flex-row ori-flex-jc ori-pad-10 ori-t-mrgn-10">
        <Button className="ori-r-mrgn-10" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="primary"
          loading={loading}
          disabled={!(selectedData.startDate && selectedData.endDate)}
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

ReservationForm.propTypes = {
  btnText: PropTypes.string,
  data: PropTypes.object,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  reservedDates: PropTypes.array
}

ReservationForm.defaultProps = {
  data: {},
  btnText: "Save",
  reservedDates: []
}

export default connect(mapStateToProps)(ReservationForm)
