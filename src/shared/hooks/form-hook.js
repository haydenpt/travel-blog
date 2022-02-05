import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
        if (inputId === action.inputId) {
          // check if the inputId is on the action inputId
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    case 'SET_DATA':
        return {
            inputs: action.inputs,
            isValid: action.formIsValid
        }
    default:
      return state;
  }
};

export const useForm = (initialInput, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInput,
    isValid: initialFormValidity,
  });

  const inputHandler = useCallback((id, value, isValid) => { //useCallback prevent inputHandler from being re-created everytime the page re-renders
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []); // In JS, function is re-created whenever there is change. UseCallback prevent this.

  const setFormData = useCallback((inputData, formValidity) => {
      dispatch({
          type: 'SET_DATA',
          inputs: inputData,
          formIsValid: formValidity
      })
  }, [])

  return [formState, inputHandler, setFormData];
};
