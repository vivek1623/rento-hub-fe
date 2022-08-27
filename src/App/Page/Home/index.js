import React, { lazy, Suspense, useEffect, useState } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import moment from "moment"
import {
  Button,
  Select,
  Modal,
  Spin,
  Table,
  Popconfirm,
  Rate,
  Result,
  DatePicker,
  message,
} from "antd"
import {
  PlusOutlined,
  DeleteFilled,
  EditFilled,
  EyeFilled,
} from "@ant-design/icons"

import {
  updatePageState,
  getAvailableVehicles,
  addVehicle,
  updateVehicle,
  deleteVehicle,
  addReview,
  addReservation,
  getVehicleReservedDates,
} from "../../../data/redux/page/actions"
import {
  APP_PAGE,
  COLORS,
  LOCATIONS,
  MODELS,
  RATINGS,
  ROLE,
  ROUTE_PATH,
} from "../../../data/config/constants"

import ErrorBoundary from "../../../components/ErrorBoundary"
import TableLoader from "../../../components/TableLoader"

const VehicleForm = lazy(() => import("../../../components/VehicleForm"))
const ReviewForm = lazy(() => import("../../../components/ReviewForm"))
const ReservationForm = lazy(() =>
  import("../../../components/ReservationForm")
)

const Home = ({ actions, isMobile, loading, vehicles, filters, role, history }) => {
  const [modalData, setModalData] = useState({})
  const {
    updatePageState,
    getAvailableVehicles,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    addReview,
    addReservation,
    getVehicleReservedDates,
  } = actions

  const columns = [
    {
      title: "Bike ID",
      dataIndex: "id",
    },
    {
      title: "Model",
      dataIndex: "model",
      className: "ori-capitalize",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Color",
      dataIndex: "color",
      className: "ori-capitalize",
    },
    {
      title: "Location",
      dataIndex: "location",
      className: "ori-capitalize",
    },
    {
      title: "Average Ratings",
      dataIndex: "ratingsAverage",
      width: "160px",
      render: (rating) => <Rate allowHalf value={rating} disabled />,
    },
    {
      title: "Action",
      dataIndex: "Action",
      align: "center",
      render: (_item, record) => (
        <div className="ori-flex-row ori-flex-jc">
          {role === ROLE.MANAGAER ? (
            <>
              <Button
                className="ori-r-mrgn-5"
                type="primary"
                size="small"
                icon={<EyeFilled />}
                onClick={() => handleView(record.id)}
              />
              <Button
                className="ori-r-mrgn-5"
                type="primary"
                size="small"
                icon={<EditFilled />}
                onClick={() => handleEdit(record)}
              />
              <Popconfirm
                placement="topRight"
                title="Are you sure you want to delete this bike?"
                onConfirm={() => handleDelete(record.id)}
              >
                <Button
                  className="ori-r-mrgn-5"
                  type="danger"
                  size="small"
                  icon={<DeleteFilled />}
                />
              </Popconfirm>
            </>
          ) : (
            <>
              <Button
                className="ori-r-mrgn-5"
                size="small"
                onClick={() => handleReview(record)}
              >
                Review
              </Button>
              <Button
                type="primary"
                size="small"
                onClick={() => handleReservation(record)}
              >
                Reserve
              </Button>
            </>
          )}
        </div>
      ),
    },
  ]

  useEffect(() => {
    document.title = APP_PAGE.HOME
    updatePageState({ currentPage: APP_PAGE.HOME })
  }, [updatePageState])

  useEffect(() => {
    let payload = { ...filters }
    if (filters.startDate && filters.endDate) {
      if (role === ROLE.MANAGAER) {
        payload = {
          ...filters,
          startDate: undefined,
          endDate: undefined,
        }
      } else
        payload = {
          ...filters,
          startDate: filters.startDate.format("YYYY-MM-DD"),
          endDate: filters.endDate.format("YYYY-MM-DD"),
        }
    }
    getAvailableVehicles(payload)
  }, [getAvailableVehicles, filters, role])

  const handleFilterChange = (payload) => {
    updatePageState({ vehicleFilters: { ...filters, ...payload } })
  }

  const handleRatingFilterChange = (rating) => {
    let payload = {
      rating: null,
      "ratingsAverage[gte]": undefined,
      "ratingsAverage[lte]": undefined,
      "ratingsAverage[lt]": undefined,
    }
    if (rating === "low")
      payload = {
        ...payload,
        "ratingsAverage[lte]": 3,
        rating,
      }
    else if (rating === "mid")
      payload = {
        ...payload,
        "ratingsAverage[gte]": 3,
        "ratingsAverage[lt]": 4,
        rating,
      }
    else if (rating === "high")
      payload = {
        ...payload,
        "ratingsAverage[gte]": 4,
        rating,
      }
    handleFilterChange(payload)
  }

  const closeModal = () => setModalData({})

  const handleAdd = () => {
    setModalData({
      title: "Add Bike",
      showAddVehicle: true,
      selectedVehicle: {},
    })
  }

  const handleVehicleFormSubmit = (payload) => {
    if (modalData.showAddVehicle)
      addVehicle(payload, () => {
        getAvailableVehicles(filters)
        closeModal()
      })
    else if (modalData.showEditVehicle)
      updateVehicle(payload, () => {
        getAvailableVehicles(filters)
        closeModal()
      })
    else if (modalData.showAddReview)
      addReview(payload, () => {
        getAvailableVehicles(filters)
        closeModal()
      })
    else if (modalData.showAddReservation) {
      const data = {
        vehicle: payload.vehicle,
        startDate: payload.startDate,
        endDate: payload.endDate,
      }
      addReservation(data, () => {
        closeModal()
      })
    }
  }

  const handleEdit = (selectedVehicle) => {
    setModalData({
      title: "Edit Bike",
      showEditVehicle: true,
      selectedVehicle,
    })
  }

  const handleDelete = (id) => {
    if (id) deleteVehicle(id)
    else message.error("Id is missing")
  }

  const handleView = (id) => {
    if (id) {
      const url = ROUTE_PATH.EDIT_VEHICLE.replace(":id", id)
      history.push(url)
    } else {
      message.error("Vehicle Id is missing")
    }
  }

  const handleReview = (selectedVehicle) => {
    setModalData({
      title: `Review ${selectedVehicle.model}`,
      showAddReview: true,
      selectedReview: {
        vehicle: selectedVehicle.id,
      },
    })
  }

  const handleReload = () => {
    let payload = { ...filters }
    if (filters.startDate && filters.endDate) {
      if (role === ROLE.MANAGAER) {
        payload = {
          ...filters,
          startDate: undefined,
          endDate: undefined,
        }
      } else
        payload = {
          ...filters,
          startDate: filters.startDate.format("YYYY-MM-DD"),
          endDate: filters.endDate.format("YYYY-MM-DD"),
        }
    }
    getAvailableVehicles(payload)
  }

  const handleReservation = (selectedVehicle) => {
    getVehicleReservedDates(
      {
        vehicleId: selectedVehicle._id,
      },
      (reservedDates) => {
        setModalData({
          title: "Reserve Bike",
          showAddReservation: true,
          selectedReservation: {
            vehicle: selectedVehicle.id,
            model: selectedVehicle.model,
            color: selectedVehicle.color,
            location: selectedVehicle.location,
            description: selectedVehicle.description,
          },
          reservedDates,
        })
      }
    )
  }

  const disableDateRange = (current) => {
    return current && current < moment().endOf("day")
  }

  return (
    <>
      <div className="ori-lr-pad-10 ori-flex-row ori-flex-jsb ori-flex-wrap ori-t-pad-15 ori-b-border-default">
        <p className="ori-b-mrgn-5">Bikes</p>
        <div className="ori-b-mrgn-10">
          {role !== ROLE.MANAGAER && (
            <DatePicker.RangePicker
              className="ori-r-mrgn-10 ori-b-mrgn-5"
              size="small"
              format="DD MMM YYYY"
              value={[filters.startDate, filters.endDate]}
              onChange={(dr) => {
                handleFilterChange({
                  startDate: dr ? dr[0] : null,
                  endDate: dr ? dr[1] : null,
                })
              }}
              disabledDate={disableDateRange}
              disabled={loading}
              allowClear
            />
          )}

          <Select
            className="ori-r-mrgn-10 ori-b-mrgn-5"
            style={{ width: 100 }}
            size="small"
            placeholder="Model"
            options={MODELS}
            value={filters.model}
            onChange={(model) => handleFilterChange({ model })}
            disabled={loading}
            allowClear
          />
          <Select
            className="ori-r-mrgn-10 ori-b-mrgn-5"
            style={{ width: 100 }}
            size="small"
            placeholder="Color"
            options={COLORS}
            value={filters.color}
            onChange={(color) => handleFilterChange({ color })}
            disabled={loading}
            allowClear
          />
          <Select
            className="ori-r-mrgn-10 ori-b-mrgn-5"
            style={{ width: 100 }}
            size="small"
            placeholder="Locations"
            options={LOCATIONS}
            value={filters.location}
            onChange={(location) => handleFilterChange({ location })}
            disabled={loading}
            allowClear
          />
          <Select
            className="ori-r-mrgn-10 ori-b-mrgn-5"
            style={{ width: 100 }}
            size="small"
            placeholder="Ratings"
            options={RATINGS}
            value={filters.rating}
            onChange={handleRatingFilterChange}
            disabled={loading}
            allowClear
          />
          {role === ROLE.MANAGAER && (
            <Button
              className="ori-b-mrgn-5"
              size="small"
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
            >
              Add Bike
            </Button>
          )}
        </div>
      </div>
      <div className="ori-pad-10">
        {vehicles.length === 0 ? (
          loading ? (
            <TableLoader />
          ) : (
            <Result
              status="404"
              title="Not Found"
              subTitle="Vehicle list not found for this filter"
              extra={[
                <Button type="primary" key="reload" onClick={handleReload}>
                  Reload
                </Button>,
              ]}
            />
          )
        ) : (
          <ErrorBoundary sm>
            <Table
              scroll={{ x: 900 }}
              size={isMobile ? "small":"middle"}
              loading={{
                spinning: loading,
                tip: "Loading",
              }}
              rowKey={(record) => record.id}
              columns={columns}
              dataSource={vehicles}
            />
          </ErrorBoundary>
        )}
      </div>
      <Modal
        bodyStyle={{ padding: "10px 20px" }}
        title={modalData.title}
        footer={null}
        visible={
          modalData.showAddVehicle ||
          modalData.showEditVehicle ||
          modalData.showAddReview ||
          modalData.showAddReservation
        }
        maskClosable={false}
        onCancel={closeModal}
        destroyOnClose
      >
        {(modalData.showAddVehicle || modalData.showEditVehicle) && (
          <ErrorBoundary onErrorCallback={closeModal}>
            <Suspense fallback={<Spin tip="Loading" />}>
              <VehicleForm
                vehicle={modalData.selectedVehicle}
                onCancel={closeModal}
                onSubmit={handleVehicleFormSubmit}
                btnText={modalData.showAddVehicle ? "Add" : "Update"}
              />
            </Suspense>
          </ErrorBoundary>
        )}
        {modalData.showAddReview && (
          <ErrorBoundary onErrorCallback={closeModal}>
            <Suspense fallback={<Spin tip="Loading" />}>
              <ReviewForm
                reviewData={modalData.selectedReview}
                onCancel={closeModal}
                onSubmit={handleVehicleFormSubmit}
                btnText={modalData.showAddVehicle ? "Add" : "Update"}
              />
            </Suspense>
          </ErrorBoundary>
        )}
        {modalData.showAddReservation && (
          <ErrorBoundary onErrorCallback={closeModal}>
            <Suspense fallback={<Spin tip="Loading" />}>
              <ReservationForm
                data={modalData.selectedReservation}
                reservedDates={modalData.reservedDates}
                onCancel={closeModal}
                onSubmit={handleVehicleFormSubmit}
                btnText={modalData.showAddReservation ? "Reserve" : "Update"}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </Modal>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    isMobile: state.pageDetails.isMobile,
    loading: state.pageDetails.vehiclesLoading,
    vehicles: state.pageDetails.vehicles,
    filters: state.pageDetails.vehicleFilters,
    role: state.authDetails.user?.role,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        updatePageState,
        getAvailableVehicles,
        addVehicle,
        updateVehicle,
        deleteVehicle,
        addReview,
        addReservation,
        getVehicleReservedDates,
      },
      dispatch
    ),
  }
}

Home.propTypes = {
  isMobile: PropTypes.bool,
  loading: PropTypes.bool,
  vehicles: PropTypes.array,
  filters: PropTypes.object,
  role: PropTypes.string,
  actions: PropTypes.object,
}

Home.defaultProps = {
  loading: false,
  filters: {},
  vehicles: [],
  role: ROLE.USER,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
