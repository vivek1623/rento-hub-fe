import React, { useEffect } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Table, Button, DatePicker, Result, message } from "antd"
import moment from "moment"

import {
  updatePageState,
  getUserReservations,
} from "../../../../data/redux/page/actions"
import { APP_PAGE, ROUTE_PATH } from "../../../../data/config/constants"

import ErrorBoundary from "../../../../components/ErrorBoundary"
import TableLoader from "../../../../components/TableLoader"

const EditUser = ({
  actions,
  isMobile,
  loading,
  user,
  filters,
  history,
  match,
}) => {
  const { updatePageState, getUserReservations } = actions

  useEffect(() => {
    document.title = APP_PAGE.EDIT_USER
    updatePageState({ currentPage: APP_PAGE.USERS })
    return () => {
      updatePageState({
        selectedUser: {},
        selectedUserFilters: {
          startDate: moment(),
          endDate: moment().add(7, "days"),
        },
      })
    }
  }, [updatePageState])

  useEffect(() => {
    if (match?.params?.id) {
      let payload = { user: match.params.id }
      if (filters.startDate && filters.endDate)
        payload = {
          user: match.params.id,
          "startDate[gte]": filters.startDate.format("YYYY-MM-DD"),
          "endDate[lt]": filters.endDate.format("YYYY-MM-DD"),
        }
      getUserReservations(payload, () => {
        history.push(ROUTE_PATH.USERS)
      })
    } else {
      message.warning("user id is invalid")
      history.push(ROUTE_PATH.USERS)
    }
  }, [filters.endDate, filters.startDate, getUserReservations, history, match])

  const columns = [
    {
      title: "Reservation ID",
      dataIndex: "id",
    },
    {
      title: "Bike ID",
      dataIndex: "vehicle",
      render: (vehicle, record) => vehicle?.id,
    },
    {
      title: "Model",
      dataIndex: "vehicle",
      className: "ori-capitalize",
      render: (vehicle, record) => vehicle?.model,
    },
    {
      title: "Color",
      dataIndex: "vehicle",
      className: "ori-capitalize",
      render: (vehicle, record) => vehicle?.color,
    },
    {
      title: "Location",
      dataIndex: "vehicle",
      className: "ori-capitalize",
      render: (vehicle, record) => vehicle?.location,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      render: (date) => moment(date).format("DD MMM YYYY"),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      render: (date) => moment(date).format("DD MMM YYYY"),
    },
  ]

  const goBack = () => {
    history.goBack()
  }

  const handleDateRangeChange = (selectedDate) => {
    updatePageState({
      selectedUserFilters: {
        ...filters,
        startDate: selectedDate[0],
        endDate: selectedDate[1],
      },
    })
  }

  const handleReload = () => {
    if (match?.params?.id) {
      let payload = { user: match.params.id }
      if (filters.startDate && filters.endDate)
        payload = {
          user: match.params.id,
          "startDate[gte]": filters.startDate.format("YYYY-MM-DD"),
          "endDate[lt]": filters.endDate.format("YYYY-MM-DD"),
        }
      getUserReservations(payload, () => {
        history.push(ROUTE_PATH.USERS)
      })
    } else {
      message.warning("user id is invalid")
      history.push(ROUTE_PATH.USERS)
    }
  }

  return (
    <>
      <div className="ori-lr-mrgn-10 ori-flex-row ori-flex-jsb ori-flex-wrap ori-t-pad-15 ori-b-border-default">
        <p className="ori-b-mrgn-5">
          {user.name}
          {user.email && (
            <span className="ori-font-light ori-font-xs ori-l-mrgn-5">
              ({user.email})
            </span>
          )}
        </p>
        <div className="ori-b-mrgn-10">
          <DatePicker.RangePicker
            className="ori-r-mrgn-10 ori-b-mrgn-5"
            size="small"
            format="DD MMM YYYY"
            value={[filters.startDate, filters.endDate]}
            onChange={handleDateRangeChange}
            allowClear={false}
            disabled={loading}
          />
          <Button
            className="ori-r-mrgn-10 ori-b-mrgn-5"
            size="small"
            loading={loading}
            onClick={handleReload}
          >
            Refresh
          </Button>
          <Button
            className="ori-b-mrgn-5"
            type="primary"
            size="small"
            onClick={goBack}
          >
            Back
          </Button>
        </div>
      </div>
      <div className="ori-pad-10">
        {user?.reservations?.length > 0 ? (
          <ErrorBoundary sm>
            <Table
              scroll={{ x: 786 }}
              size={isMobile ? "small" : "middle"}
              loading={{
                spinning: loading,
                tip: "Loading",
              }}
              rowKey={(record) => record.id}
              columns={columns}
              dataSource={user.reservations}
            />
          </ErrorBoundary>
        ) : loading ? (
          <TableLoader />
        ) : (
          <Result
            status="404"
            title="Not Found"
            subTitle="Reservations list not found for this filter"
            extra={[
              <Button type="primary" key="reload" onClick={handleReload}>
                Reload
              </Button>,
              <Button key="back" onClick={history.goBack}>
                Back
              </Button>,
            ]}
          />
        )}
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    isMobile: state.pageDetails.isMobile,
    loading: state.pageDetails.selectedUserLoading,
    user: state.pageDetails.selectedUser,
    filters: state.pageDetails.selectedUserFilters,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      { updatePageState, getUserReservations },
      dispatch
    ),
  }
}

EditUser.propTypes = {
  isMobile: PropTypes.bool,
  loading: PropTypes.bool,
  user: PropTypes.object,
  filters: PropTypes.object,
}

EditUser.defaultProps = {
  loading: false,
  user: {},
  filters: {},
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser)
