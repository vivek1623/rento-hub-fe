import React from "react"
import PropTypes from "prop-types"
import { Layout } from "antd"

import AppHeader from "../../components/AppHeader/index.js"

import { APP_LAYOUT } from "../../data/config/constants"

const Page = ({ children }) => {
  return (
    <Layout className="layout ori-full-height">
      <AppHeader />
      <Layout.Content
        className="ori-overflow-y-auto"
        style={{
          height: `calc(100vh - ${APP_LAYOUT.APP_HEADER_HEIGHT}px)`,
        }}
      >
        {children}
      </Layout.Content>
    </Layout>
  )
}

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default Page
