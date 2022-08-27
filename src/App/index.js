import React, { lazy, Suspense, useEffect, useRef } from "react"
import { Route, Switch, BrowserRouter as Router } from "react-router-dom"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import { updatePageState } from "../data/redux/page/actions"
import { ROUTE_PATH } from "../data/config/constants"

import PrivateRoute from "../components/PrivateRoute"
import ErrorBoundary from "../components/ErrorBoundary"
import GlobalInformation from "../components/GlobalInformation"

const AuthContainer = lazy(() => import("./Auth"))
const Login = lazy(() => import("./Auth/Login"))
const SignUp = lazy(() => import("./Auth/SignUp"))
const PageContainer = lazy(() => import("./Page"))
const Home = lazy(() => import("./Page/Home"))
const EditVehicle = lazy(() => import("./Page/Home/EditVehicle"))
const Users = lazy(() => import("./Page/Users"))
const EditUser = lazy(() => import("./Page/Users/EditUser"))
const MyReservation = lazy(() => import("./Page/MyReservation"))
const PageNotFound = lazy(() => import("../components/PageNotFound"))

const App = ({ actions }) => {
  const { updatePageState } = actions
  const resizeRef = useRef(null)

  useEffect(() => {
    const handleDeviceStatusChange = () => {
      if (resizeRef.current) clearTimeout(resizeRef.current)
      resizeRef.current = setTimeout(
        () => updatePageState({ isMobile: window.innerWidth <= 480 }),
        500
      )
    }

    window.addEventListener("resize", handleDeviceStatusChange)
    return () => {
      window.removeEventListener("resize", handleDeviceStatusChange)
      if (resizeRef.current) clearTimeout(resizeRef.current)
    }
  }, [updatePageState])

  return (
    <div className="ori-full-width ori-relative ori-animated ori-fade-in">
      <ErrorBoundary>
        <GlobalInformation />
      </ErrorBoundary>
      <Router>
        <Switch>
          <Route path={ROUTE_PATH.AUTH}>
            <ErrorBoundary sm>
              <Suspense fallback={null}>
                <AuthContainer>
                  <Suspense fallback={null}>
                    <Switch>
                      <Route path={ROUTE_PATH.LOGIN} component={Login} />
                      <Route path={ROUTE_PATH.SIGNUP} component={SignUp} />
                      <Route component={PageNotFound} />
                    </Switch>
                  </Suspense>
                </AuthContainer>
              </Suspense>
            </ErrorBoundary>
          </Route>
          <ErrorBoundary sm>
            <Suspense fallback={null}>
              <PageContainer>
                <Switch>
                  <PrivateRoute exact path={ROUTE_PATH.HOME} component={Home} />
                  <PrivateRoute
                    path={ROUTE_PATH.EDIT_VEHICLE}
                    component={EditVehicle}
                  />
                  <PrivateRoute
                    path={ROUTE_PATH.USERS}
                    component={Users}
                    exact
                  />
                  <PrivateRoute
                    path={ROUTE_PATH.EDIT_USER}
                    component={EditUser}
                  />
                  <PrivateRoute
                    path={ROUTE_PATH.MY_RESERVATION}
                    component={MyReservation}
                  />
                  <PrivateRoute component={PageNotFound} />
                </Switch>
              </PageContainer>
            </Suspense>
          </ErrorBoundary>
        </Switch>
      </Router>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        updatePageState,
      },
      dispatch
    ),
  }
}

export default connect(null, mapDispatchToProps)(App)
