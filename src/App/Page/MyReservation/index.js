import React, { useEffect } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Table, Button, Popconfirm, Result, message } from "antd"
import moment from "moment"

import {
  updatePageState,
  getMyReservations,
  deleteReservation,
} from "../../../data/redux/page/actions"
import { APP_PAGE, ROUTE_PATH } from "../../../data/config/constants"

import ErrorBoundary from "../../../components/ErrorBoundary"
import TableLoader from "../../../components/TableLoader"

const MyReservation = ({
  actions,
  isMobile,
  loading,
  reservations,
  history,
}) => {
  const { updatePageState, getMyReservations, deleteReservation } = actions

  useEffect(() => {
    document.title = APP_PAGE.MY_RESERVATION
    updatePageState({ currentPage: APP_PAGE.MY_RESERVATION })
    return () => {
      updatePageState({ myReservations: [] })
    }
  }, [updatePageState])

  useEffect(() => {
    getMyReservations(() => {
      history.push(ROUTE_PATH.HOME)
    })
  }, [getMyReservations, history])

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
    {
      title: "Action",
      dataIndex: "Action",
      align: "center",
      render: (_item, record) => (
        <div className="ori-flex-row ori-flex-jc">
          <Popconfirm
            placement="topRight"
            title="Are you sure you want to cancel this reservation?"
            onConfirm={() => handleCancel(record._id)}
          >
            <Button className="ori-r-mrgn-5" type="danger" size="small">
              Cancel
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ]

  const handleCancel = (id) => {
    if (id) deleteReservation(id)
    else message.error("Id is missing")
  }

  const goToHome = () => history.push(ROUTE_PATH.HOME)

  return (
    <>
      <div className="ori-lr-mrgn-10 ori-flex-row ori-flex-jsb ori-flex-wrap ori-t-pad-15 ori-b-border-default">
        <p className="ori-b-mrgn-15">My Reservations</p>
        <div className="ori-b-mrgn-15">
          <Button size="small" loading={loading} onClick={getMyReservations}>
            Refresh
          </Button>
          <Button
            className="ori-l-mrgn-10"
            type="primary"
            size="small"
            onClick={goToHome}
          >
            Home
          </Button>
        </div>
      </div>
      <div className="ori-pad-10">
        {reservations.length === 0 ? (
          loading ? (
            <TableLoader />
          ) : (
            <Result
              status="404"
              title="Empty"
              subTitle="Reservations not found."
              extra={[
                <Button type="primary" key="reload" onClick={getMyReservations}>
                  Reload
                </Button>,
              ]}
            />
          )
        ) : (
          <ErrorBoundary sm>
            <Table
              scroll={{ x: 786 }}
              size={isMobile ? "small" : "middle"}
              loading={{ spinning: loading, tip: "Loading" }}
              rowKey={(record) => record.id}
              columns={columns}
              dataSource={reservations}
            />
          </ErrorBoundary>
        )}
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  isMobile: state.pageDetails.isMobile,
  loading: state.pageDetails.myReservationsLoading,
  reservations: state.pageDetails.myReservations,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    { updatePageState, getMyReservations, deleteReservation },
    dispatch
  ),
})

MyReservation.propTypes = {
  isMobile: PropTypes.bool,
  loading: PropTypes.bool,
  reservations: PropTypes.array,
}

MyReservation.defaultProps = {
  loading: false,
  reservations: [],
}

export default connect(mapStateToProps, mapDispatchToProps)(MyReservation)
