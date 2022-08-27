import React from "react"

import { IMG_AUTH_BG, IMG_LOGO } from "../../data/assets"

const Auth = ({ children }) => {
  return (
    <div
      className="ori-flex ori-flex-center ori-full-height"
      style={{
        backgroundImage: `url(${IMG_AUTH_BG})`,
        backgroundPosition: "center",
        backgroundRepeat: "norepeat",
        backgroundSize: "cover",
      }}
    >
      <div
        className="ori-animated ori-fade-in ori-bg-base ori-box-shadow-light ori-border-radius-base"
        style={{
          width: "420px",
          maxWidth: "95%",
          minHeight: "350px",
          padding: "30px",
        }}
      >
        <div className="ori-flex-row ori-flex-jc ori-b-mrgn-20">
          <img style={{ height: 60 }} src={IMG_LOGO} alt="RentoHub" />
        </div>
        {children}
      </div>
    </div>
  )
}

export default Auth
