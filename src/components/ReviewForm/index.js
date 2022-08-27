import React, { useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Button, Rate, message } from "antd"

import TextAreaItem from "../TextAreaItem"

const ReviewForm = ({ reviewData, loading, btnText, onCancel, onSubmit }) => {
  const [selectedReviewData, setSelectedReviewData] = useState(reviewData)

  const handleFormDataChange = (payload) => {
    setSelectedReviewData({
      ...selectedReviewData,
      ...payload,
    })
  }

  const onClickSubmit = () => {
    if (selectedReviewData.review && selectedReviewData.rating) {
      onSubmit(selectedReviewData)
    } else message.warning("Review/Rating are required")
  }

  return (
    <>
      <div className="ori-flex-row ori-flex-jc ori-t-mrgn-10">
        <Rate
          value={selectedReviewData.rating}
          onChange={(rating) => handleFormDataChange({ rating })}
          allowHalf
        />
      </div>
      <TextAreaItem
        title="Review"
        placeholder="Write your experience"
        autoSize={{ minRows: 2, maxRows: 4 }}
        maxLength={60}
        value={selectedReviewData.review}
        onChange={(e) => handleFormDataChange({ review: e.target.value })}
        showCount
      />
      <div className="ori-flex-row ori-flex-jc ori-pad-10">
        <Button className="ori-r-mrgn-10" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="primary"
          loading={loading}
          disabled={!(selectedReviewData.review && selectedReviewData.rating)}
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

ReviewForm.propTypes = {
  loading: PropTypes.bool,
  btnText: PropTypes.string,
  reviewData: PropTypes.object,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
}

ReviewForm.defaultProps = {
  loading: false,
  reviewData: {},
  btnText: "Save",
}

export default connect(mapStateToProps)(ReviewForm)
