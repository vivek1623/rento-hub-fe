import React, { useEffect } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Table, Button, DatePicker, Tag, Result, message } from "antd"
import moment from "moment"

import {
  updatePageState,
  getVehicleReservations,
} from "../../../../data/redux/page/actions"
import { APP_PAGE, ROUTE_PATH } from "../../../../data/config/constants"

import ErrorBoundary from "../../../../components/ErrorBoundary"
import TableLoader from "../../../../components/TableLoader"

const EditVehicle = ({
  actions,
  isMobile,
  loading,
  vehicle,
  filters,
  history,
  match,
}) => {
  const { updatePageState, getVehicleReservations } = actions

  useEffect(() => {
    document.title = APP_PAGE.EDIT_VEHICLE
    updatePageState({ currentPage: APP_PAGE.HOME })
    return () => {
      updatePageState({
        selectedVehicle: {},
        selectedVehicleFilters: {
          startDate: moment(),
          endDate: moment().add(7, "days"),
        },
      })
    }
  }, [updatePageState])

  useEffect(() => {
    if (match?.params?.id) {
      let payload = { vehicle: match.params.id }
      if (filters.startDate && filters.endDate)
        payload = {
          vehicle: match.params.id,
          "startDate[gte]": filters.startDate.format("YYYY-MM-DD"),
          "endDate[lt]": filters.endDate.format("YYYY-MM-DD"),
        }
      console.log(payload)
      getVehicleReservations(payload, () => {
        history.push(ROUTE_PATH.HOME)
      })
    } else {
      message.warning("vehicle id is invalid")
      history.push(ROUTE_PATH.HOME)
    }
  }, [
    filters.endDate,
    filters.startDate,
    getVehicleReservations,
    history,
    match,
  ])

  const columns = [
    {
      title: "Reservation ID",
      dataIndex: "id",
    },
    {
      title: "User ID",
      dataIndex: "user",
      render: (user) => user?.id,
    },
    {
      title: "Name",
      dataIndex: "user",
      className: "ori-capitalize",
      render: (user) => user?.name,
    },
    {
      title: "Email",
      dataIndex: "user",
      className: "ori-capitalize",
      render: (user) => user?.email,
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
      selectedVehicleFilters: {
        ...filters,
        startDate: selectedDate[0],
        endDate: selectedDate[1],
      },
    })
  }

  const handleReload = () => {
    if (match?.params?.id) {
      let payload = { vehicle: match.params.id }
      if (filters.startDate && filters.endDate)
        payload = {
          vehicle: match.params.id,
          "startDate[gte]": filters.startDate.format("YYYY-MM-DD"),
          "endDate[lt]": filters.endDate.format("YYYY-MM-DD"),
        }
      getVehicleReservations(payload, () => {
        history.push(ROUTE_PATH.HOME)
      })
    } else {
      message.warning("vehicle id is invalid")
      history.push(ROUTE_PATH.HOME)
    }
  }

  return (
    <>
      <div className="ori-lr-mrgn-10 ori-flex-row ori-flex-jsb ori-flex-wrap ori-t-pad-15 ori-b-border-default">
        <p className="ori-b-mrgn-5">
          <span className="ori-r-mrgn-10 ori-capitalize">{vehicle.model}</span>
          {vehicle.color && <Tag color="green">{vehicle.color}</Tag>}
          {vehicle.location && <Tag color="magenta">{vehicle.location}</Tag>}
        </p>
        <div className="ori-b-mrgn-10">
          <DatePicker.RangePicker
            className="ori-b-mrgn-5 ori-r-mrgn-10"
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
        {vehicle?.reservations?.length > 0 ? (
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
              dataSource={vehicle.reservations}
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

const mapStateToProps = (state) => ({
  isMobile: state.pageDetails.isMobile,
  loading: state.pageDetails.selectedVehicleLoading,
  vehicle: state.pageDetails.selectedVehicle,
  filters: state.pageDetails.selectedVehicleFilters,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    { updatePageState, getVehicleReservations },
    dispatch
  ),
})

EditVehicle.propTypes = {
  isMobile: PropTypes.bool,
  loading: PropTypes.bool,
  vehicle: PropTypes.object,
  filters: PropTypes.object,
}

EditVehicle.defaultProps = {
  loading: false,
  vehicle: {},
  filters: {},
}

export default connect(mapStateToProps, mapDispatchToProps)(EditVehicle)
