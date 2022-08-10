import React from 'react'

export default function ButtonOperator({operator, dispatch}) {
  return (
    <div onClick={() => dispatch({type: "OPERATOR", payload: operator})} >{operator}</div>
  )
}
