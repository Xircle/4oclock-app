import { AuthAction } from "../../components/auth/types";

export const authDispatcher = {
  dispatchKakao: (
    uid: number,
    profileImageUrl: string,
    email: string,
    gender: string,
    dispatch: React.Dispatch<AuthAction>
  ) => {
    if (uid) dispatch({ type: "setUid", payload: uid });
    if (gender) dispatch({ type: "setGender", payload: gender });
    if (profileImageUrl)
      dispatch({ type: "setProfileImgUrl", payload: profileImageUrl });
    if (email) dispatch({ type: "setEmail", payload: email });
  },
  dispatchApple: (email: string, dispatch: React.Dispatch<AuthAction>) => {
    if (email) dispatch({ type: "setEmail", payload: email });
  },
  dispatchPhoneNumber: (text: string, dispatch: React.Dispatch<AuthAction>) => {
    dispatch({ type: "setPhoneNumber", payload: text });
  },
  dispatchName: (text: string, dispatch: React.Dispatch<AuthAction>) => {
    dispatch({ type: "setName", payload: text });
  },
  dispatchUniversity: (
    university: string,
    dispatch: React.Dispatch<AuthAction>
  ) => {
    dispatch({
      type: "setUniversity",
      payload: university,
    });
  },
  dispatchIsGraduate: (
    isGraduate: boolean,
    dispatch: React.Dispatch<AuthAction>
  ) => {
    dispatch({
      type: "setIsGraduate",
      payload: isGraduate,
    });
  },
  dispatchAge: (age: string, dispatch: React.Dispatch<AuthAction>) => {
    dispatch({
      type: "setAge",
      payload: age,
    });
  },
  dispatchGender: (gender: string, dispatch: React.Dispatch<AuthAction>) => {
    dispatch({
      type: "setGender",
      payload: gender,
    });
  },
  dispatchTitle: (title: string, dispatch: React.Dispatch<AuthAction>) => {
    dispatch({
      type: "setTitle",
      payload: title,
    });
  },
  dispatchBio: (bio: string, dispatch: React.Dispatch<AuthAction>) => {
    dispatch({
      type: "setBio",
      payload: bio,
    });
  },
  dispatchPersonality: (
    personality: string,
    dispatch: React.Dispatch<AuthAction>
  ) => {
    dispatch({
      type: "setPersonality",
      payload: personality,
    });
  },
  dispatchMBTI: (MBTI: string, dispatch: React.Dispatch<AuthAction>) => {
    dispatch({
      type: "setMBTI",
      payload: MBTI,
    });
  },

  dispatchDrinkingStyle: (
    drinkingStyle: number,
    dispatch: React.Dispatch<AuthAction>
  ) => {
    dispatch({
      type: "setDrinkingStyle",
      payload: drinkingStyle,
    });
  },
  dispatchProfileImg: (
    // @ts-ignore
    file: File,
    url: string,
    dispatch: React.Dispatch<AuthAction>
  ) => {
    dispatch({
      type: "setProfileImgFile",
      payload: file,
    });
    dispatch({
      type: "setProfileImgUrl",
      payload: url,
    });
  },
};
