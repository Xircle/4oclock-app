import { AuthAction } from "../../components/auth/types";
import { Universities } from "../SelectData";

const CheckAge = (age: number) => {
  if (age >= 19 && age <= 40) return true;
  return false;
};

export const authValidation = {
  validatePhoneNumber: (data: string, dispatch: React.Dispatch<AuthAction>) => {
    if (data.length < 10 || data.length > 11) {
      dispatch({ type: "setStage1Valid", payload: false });
    } else if (data[0] !== "0" || data[1] !== "1" || data[2] !== "0") {
      dispatch({ type: "setStage1Valid", payload: false });
    } else if (isNaN(Number(data)) || Number(data) < 0) {
      dispatch({ type: "setStage1Valid", payload: false });
    } else {
      dispatch({ type: "setStage1Valid", payload: true });
    }
  },
  validateName: (
    data: string,
    otherBool: boolean,
    dispatch: React.Dispatch<AuthAction>
  ) => {
    const result = data.length <= 0 || data.length > 20;
    dispatch({ type: "setStage2Valid", payload: !(result || otherBool) });
    return result;
  },
  validateAge: (
    age: string,
    otherBool: boolean,
    dispatch: React.Dispatch<AuthAction>
  ) => {
    const result = !CheckAge(Number(age));
    dispatch({ type: "setStage2Valid", payload: !(result || otherBool) });
    return result;
  },
  validateTitle: (
    data: string,
    otherBool: boolean,
    dispatch: React.Dispatch<AuthAction>
  ) => {
    const result = data.length <= 0 || data.length > 15;
    dispatch({ type: "setStage2Valid", payload: !(result || otherBool) });
    return result;
  },
  validateBio: (
    data: string,
    otherBool: boolean,
    dispatch: React.Dispatch<AuthAction>
  ) => {
    const result = data.length <= 0 || data.length > 1000;
    dispatch({ type: "setStage2Valid", payload: !(result || otherBool) });
    return result;
  },
  validateGender: (
    data: string,
    otherBool: boolean,
    dispatch: React.Dispatch<AuthAction>
  ) => {
    const result = data !== "male" && data !== "female";
    dispatch({ type: "setStage2Valid", payload: !(result || otherBool) });
    return result;
  },
  validateUniversity: (
    univ: string,
    otherBool: boolean,
    dispatch: React.Dispatch<AuthAction>
  ) => {
    const result = !Universities.includes(univ);
    dispatch({ type: "setStage2Valid", payload: !(result || otherBool) });
    return result;
  },
  validateStage3: (
    MBTI: string,
    drinkingStyle: number,
    personality: string,
    dispatch: React.Dispatch<AuthAction>
  ) => {
    dispatch({ type: "setStage3Valid", payload: MBTI && personality && drinkingStyle >= 0 });
  },
};
