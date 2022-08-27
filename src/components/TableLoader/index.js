import React from "react"

const TableLoader = () => (
  <div className="ori-full-width ori-overflow-auto">
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
      <TableRow key={i} />
    ))}
  </div>
)

const TableRow = () => (
  <div className="ori-full-width ori-flex-row ori-flex-jsb ori-pad-5 ori-bg-base">
    {[1, 2, 3, 4].map((i) => {
      return (
        <div key={i} className="ori-pad-10 ori-flex-column ori-flex-jc">
          <div className={`ori-card-loading ori-height-sm width${i}`}>
            &nbsp;
          </div>
        </div>
      )
    })}
  </div>
)

export default TableLoader
