import { AuthAction } from "../../components/auth/types";

export const authDispatcher = {
  dispatchPhoneNumber: (text: string, dispatch: React.Dispatch<AuthAction>) => {
    dispatch({ type: "setPhoneNumber", payload: text });
  },
  dispatchName: (text: string, dispatch: React.Dispatch<AuthAction>) => {
    dispatch({ type: "setName", payload: text });
  },
};
