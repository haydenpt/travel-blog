import React, { useReducer, useEffect } from "react";

import { validate } from "../../util/validators"; // get validate function from the file
import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state, // copy current properties to new state object
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  // useReducer returns 2 element array
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '', // current value or empty
    isTouched: false,
    isValid: props.initialValid || false,
  }); // initial value of useReducer

  const { id, onInput } = props; // only take id and onInput in props
  const { value, isValid } = inputState; // only take value, isValid from inputState

  useEffect(() => {
    onInput(id, value, isValid, onInput);
  }, [id, value, isValid, onInput]); // when any of these value changes, call onInput()

  const changeHandler = (e) => {
    dispatch({
      type: "CHANGE",
      val: e.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        autoComplete="current-password"
        onChange={changeHandler}
        onBlur={touchHandler} // when use click and unclick the input field
        value={inputState.value} // input value in html
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.row || 3}
        onChange={changeHandler}
        onBlur={touchHandler} // when use click and unclick the input field
        value={inputState.value} // text area in html
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
