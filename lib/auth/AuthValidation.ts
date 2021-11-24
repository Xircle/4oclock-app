import { AuthAction } from "../../components/auth/types";

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
    let result;
    if (data.length <= 0 || data.length > 20) {
      dispatch({ type: "setStage2Valid", payload: false });
      result = true;
    } else {
      result = false;
      if (!otherBool) {
        dispatch({ type: "setStage2Valid", payload: true });
      }
    }
    return result;
  },
};
