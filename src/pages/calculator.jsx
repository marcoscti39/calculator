import React,{useState, useReducer} from 'react'
import ButtonNumber from '../components/buttonNumber'
import ButtonOperator from '../components/buttonOperator'
import ButtonSpecial from '../components/buttonSpecial'

const reducer = (state, action) =>{
  switch (action.type){
    case "ADD_NUMBER":
      if(state.resolvedtCalc){
        return {...state, currentCalc: action.payload, resolvedtCalc: false}
      }
      if(action.payload === "0" && state.currentCalc === "0") return state
      if(action.payload === "." && state.currentCalc.length < 0) return state 
      if(action.payload === "." && state.currentCalc.includes(".")) return state

      return {...state, currentCalc: state.currentCalc + action.payload}
    case "OPERATOR":
      
      if(!state.currentCalc) return {...state}

      if(state.operator){

        if(state.operator !== action.payload) return {...state, operator: action.payload}

        return { 
          ...state,
          prevCalc: evaluate(state.currentCalc,state.prevCalc,state.operator),
          currentCalc: "",
          operator: action.payload
        }
      }
      return {...state, prevCalc: state.currentCalc, currentCalc: "", operator: action.payload}
    case "=":
      if(state.prevCalc && state.operator && state.currentCalc){
        return {
          ...state,
          currentCalc: evaluate(state.currentCalc,state.prevCalc,state.operator),
          prevCalc: "",
          operator: "",
          resolvedtCalc: true
        }
      }
      return {...state}
     
    case "AC":
      return {...state, currentCalc: "", prevCalc: "", operator: ""}
    case "DEL":
      return {...state, currentCalc: state.currentCalc.slice(0, -1)}
  }
}

const evaluate = (number1, number2, operator) =>{
  if(operator === "+"){
    return parseFloat(number1) + parseFloat(number2)
  }
  if(operator === "-"){
    return parseFloat(number2) - parseFloat(number1)
  }
  if(operator === "*"){
    return parseFloat(number2) * parseFloat(number1)
  }
  if(operator === "/"){
    return parseFloat(number2) / parseFloat(number1)
  }
}

const formatNumbers = (number) =>{
  if(number) {
    const formatter = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 21 })
    return formatter.format(number)
  }
  return
  
}

const calculator = {
  currentCalc: "",
  prevCalc: "",
  operator: null
}

export default function Calculator() {
  const [{currentCalc, prevCalc, operator}, dispatch] = useReducer(reducer, calculator)

  
  
  return (
    <main>
      <div className="display">
          <span className='prev-result'>{prevCalc} {operator}</span>
          <span className="result">{formatNumbers(currentCalc)}</span>
      </div>
      <div className="dialer">
        <ButtonSpecial dispatch={dispatch} special="AC"/>
        <ButtonSpecial dispatch={dispatch} special="DEL"/>

        <ButtonOperator dispatch={dispatch} operator="/"/>

        <ButtonNumber dispatch={dispatch} number="1"/>
        <ButtonNumber dispatch={dispatch} number="2"/>
        <ButtonNumber dispatch={dispatch} number="3"/>

        <ButtonOperator dispatch={dispatch} operator="*"/>

        <ButtonNumber dispatch={dispatch} number="4"/>
        <ButtonNumber dispatch={dispatch} number="5"/>
        <ButtonNumber dispatch={dispatch} number="6"/>

        <ButtonOperator dispatch={dispatch} operator="+"/>

        <ButtonNumber dispatch={dispatch} number="7"/>
        <ButtonNumber dispatch={dispatch} number="8"/>
        <ButtonNumber dispatch={dispatch} number="9"/>

        <ButtonOperator dispatch={dispatch} operator="-"/>

        <ButtonNumber dispatch={dispatch} number="."/>
        <ButtonNumber dispatch={dispatch} number="0"/>

        <ButtonSpecial dispatch={dispatch} special="="/>
      </div>
    </main>
  )
}
