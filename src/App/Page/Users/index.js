import React, { Suspense, lazy, useEffect, useState } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import {
  Table,
  Button,
  Popconfirm,
  Modal,
  Spin,
  Result,
  Tag,
  message,
} from "antd"
import { DeleteFilled, EditFilled, EyeFilled } from "@ant-design/icons"

import {
  updatePageState,
  getAllUsers,
  deleteUser,
  updateUser,
} from "../../../data/redux/page/actions"
import { APP_PAGE, ROLE, ROUTE_PATH } from "../../../data/config/constants"

import ErrorBoundary from "../../../components/ErrorBoundary"
import TableLoader from "../../../components/TableLoader"

const UserForm = lazy(() => import("../../../components/UserForm"))

const Users = ({ actions, isMobile, loading, users, selfId, history }) => {
  const [modalData, setModalData] = useState({})

  const { updatePageState, getAllUsers, deleteUser, updateUser } = actions
  useEffect(() => {
    document.title = APP_PAGE.USERS
    updatePageState({ currentPage: APP_PAGE.USERS })
  }, [updatePageState])

  useEffect(() => {
    getAllUsers()
  }, [getAllUsers])

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (role) => (
        <Tag className="ori-uppercase" color={role === ROLE.MANAGAER ? "green" : "warning"}>{role}</Tag>
      ),
    },
    {
      title: "Action",
      dataIndex: "Action",
      align: "center",
      render: (_item, record) =>
        selfId !== record._id && (
          <div className="ori-flex-row ori-flex-jc">
            <Button
              className="ori-r-mrgn-5"
              type="primary"
              size="small"
              icon={<EyeFilled />}
              onClick={() => handleView(record._id)}
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
              title="Are you sure you want to delete this user?"
              onConfirm={() => handleDelete(record._id)}
            >
              <Button
                className="ori-r-mrgn-5"
                type="danger"
                size="small"
                icon={<DeleteFilled />}
              />
            </Popconfirm>
          </div>
        ),
    },
  ]

  const closeModal = () => setModalData({})

  const handleEdit = (selectedUser) => {
    setModalData({
      title: "Edit User",
      showEditUser: true,
      selectedUser,
    })
  }

  const handleUserFormSubmit = (user) => {
    updateUser(user, closeModal)
  }

  const handleDelete = (id) => {
    if (id) {
      const payload = { id }
      deleteUser(payload)
    } else {
      message.error("UserId is missing")
    }
  }

  const handleView = (id) => {
    if (id) {
      history.push(`${ROUTE_PATH.USERS}/${id}`)
    } else {
      message.error("UserId is missing")
    }
  }

  return (
    <>
      <div className="ori-lr-mrgn-10 ori-flex-row ori-flex-jsb ori-flex-wrap ori-t-pad-15 ori-b-border-default">
        <p className="ori-b-mrgn-15">Users</p>
      </div>
      <div className="ori-pad-10">
        {users.length === 0 ? (
          loading ? (
            <TableLoader />
          ) : (
            <Result
              status="404"
              title="Not Found"
              subTitle="User list not found."
              extra={[
                <Button type="primary" key="reload" onClick={getAllUsers}>
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
              loading={{
                spinning: loading,
                tip: "Loading",
              }}
              rowKey={(user) => user._id}
              columns={columns}
              dataSource={users}
            />
          </ErrorBoundary>
        )}
      </div>
      <Modal
        bodyStyle={{ padding: "10px 20px" }}
        title={modalData.title}
        footer={null}
        visible={modalData.showEditUser}
        maskClosable={false}
        onCancel={closeModal}
        destroyOnClose
      >
        {modalData.showEditUser && (
          <ErrorBoundary onErrorCallback={closeModal}>
            <Suspense fallback={<Spin tip="loading" />}>
              <UserForm
                user={modalData.selectedUser}
                onCancel={closeModal}
                onSubmit={handleUserFormSubmit}
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
    selfId: state.authDetails.user._id,
    users: state.pageDetails.users,
    loading: state.pageDetails.usersLoading,
    isMobile: state.pageDetails.isMobile,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      { updatePageState, getAllUsers, deleteUser, updateUser },
      dispatch
    ),
  }
}

Users.propTypes = {
  isMobile: PropTypes.bool,
  loading: PropTypes.bool,
  selfId: PropTypes.string,
  users: PropTypes.array,
}

Users.defaultProps = {
  loading: false,
  users: [],
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
