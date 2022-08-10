import React from 'react'

export default function ButtonSpecial({special, dispatch}) {
  return (
    <div onClick={() => dispatch({type: special})} >{special}</div>
  )
}
