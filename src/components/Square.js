import React from 'react'

export default function Square({value,onClick}) {
  return (
    <div>
      <button className="square" onClick={onClick}>
        {value}
      </button>
    </div>
  )
}
