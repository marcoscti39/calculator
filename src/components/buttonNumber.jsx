import React from 'react'

export default function ButtonNumber({number, dispatch}) {
  return (
    <div onClick={() => dispatch({type: "ADD_NUMBER", payload: number})} >{number}</div>
  )
}
