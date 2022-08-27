const { override, fixBabelImports, addLessLoader } = require("customize-cra")

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      "@layout-header-background": "#fff",
      "@layout-header-height": "64px",
      "@layout-header-padding": "0 20px",
      "@layout-header-color": "#808080",
      "@primary-color": "#9d22ed",
      "@text-color": "#808080",
      "@text-color-secondary": "#b3b3b3",
      "@heading-color": "#808080",
      "@border-radius-base": "4px",
      "@tooltip-color": "#808080",
      "@tooltip-bg": "#fff",
      "@badge-height-sm": "16px",
      "@badge-font-size-sm": "10px",
      "@badge-color": "#9d22ed",
      "@background-color-light": "transparent",
      "@table-font-size-sm": "12px",
      "@radio-button-margin": "10px",
      "@popover-padding-horizontal": "12px",
      "@disabled-color": "#b3b3b3",
    },
  })
)
