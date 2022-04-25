import { ActivityAction, activityInitialState } from "./ActivityReducer";

export const activityDispatcher = {
  dispatchMaxParticipants: (
    newNum: number,
    dispatch: React.Dispatch<ActivityAction>
  ) => {
    if (newNum >= 1 && newNum <= 8)
      dispatch({
        type: "setMaxParticipantsNumber",
        payload: newNum,
      });
  },
  dispatchName: (text: string, dispatch: React.Dispatch<ActivityAction>) => {
    dispatch({
      type: "setName",
      payload: text,
    });
    dispatch({
      type: "setStage1Valid",
      payload: text.length > 2,
    });
  },
  dispatchKakaoLink: (
    link: string,
    dispatch: React.Dispatch<ActivityAction>
  ) => {
    dispatch({
      type: "setKakaoLink",
      payload: link,
    });
  },
  dispatchDescription: (
    text: string,
    dispatch: React.Dispatch<ActivityAction>
  ) => {
    dispatch({
      type: "setDescription",
      payload: text,
    });
  },
  dispatchTeam: (team: string, dispatch: React.Dispatch<ActivityAction>) => {
    dispatch({
      type: "setTeam",
      payload: team,
    });
  },
  dispatchRecommendation: (
    recommendation: string,
    dispatch: React.Dispatch<ActivityAction>
  ) => {
    dispatch({
      type: "setRecommendation",
      payload: recommendation,
    });
  },
  dispatchParticipating: (
    participating: boolean,
    dispatch: React.Dispatch<ActivityAction>
  ) => {
    dispatch({
      type: "setParticipating",
      payload: participating,
    });
  },
  dispatchDetailAddress: (
    placeName: string,
    placeId: string,
    dispatch: React.Dispatch<ActivityAction>
  ) => {
    dispatch({
      type: "setDetailAddress",
      payload: placeName,
    });
    dispatch({ type: "setPlaceId", payload: placeId });
  },
  dispatchParticipationFee: (
    text: string,
    dispatch: React.Dispatch<ActivityAction>
  ) => {
    dispatch({
      type: "setParticipationFee",
      payload: Number(text).toString(),
    });
  },
  dispatchStartDateAt: (
    date: Date,
    dispatch: React.Dispatch<ActivityAction>
  ) => {
    dispatch({ type: "setStartDateAt", payload: date });
  },
  dispatchActivityType: (
    type: string,
    dispatch: React.Dispatch<ActivityAction>
  ) => {
    dispatch({ type: "setActivityType", payload: type });
  },
  dispatchCoverImage: (
    // @ts-ignore
    file: File,
    dispatch: React.Dispatch<ActivityAction>
  ) => {
    dispatch({ type: "setCoverImageFile", payload: file });
  },

  dispatchSubImages: (
    // @ts-ignore
    oldFiles: File[],
    // @ts-ignore
    newFiles: File[],
    dispatch: React.Dispatch<ActivityAction>
  ) => {
    dispatch({ type: "setSubImagesFile", payload: oldFiles.concat(newFiles) });
  },
  removeSubImagesByFile: (
    // @ts-ignore
    oldFiles: File[],
    // @ts-ignore
    fileToRemove: File,
    dispatch: React.Dispatch<ActivityAction>
  ) => {
    const toRomoveIndex = oldFiles.indexOf(fileToRemove);
    if (toRomoveIndex !== -1) {
      const temp = [...oldFiles];
      temp.splice(toRomoveIndex, 1);
      dispatch({
        type: "setSubImagesFile",
        payload: temp,
      });
    }
  },
  removeSubImagesByIndex: (
    // @ts-ignore
    oldFiles: File[],
    // @ts-ignore
    toRomoveIndex: number,
    dispatch: React.Dispatch<ActivityAction>
  ) => {
    if (toRomoveIndex !== -1) {
      const temp = [...oldFiles];
      temp.splice(toRomoveIndex, 1);
      dispatch({
        type: "setSubImagesFile",
        payload: temp,
      });
    }
  },
  dispatchStage1Valid: (
    // @ts-ignore
    bool: boolean,
    dispatch: React.Dispatch<ActivityAction>
  ) => {
    dispatch({ type: "setStage1Valid", payload: bool });
  },
  dispatchInitialState: (dispatch: React.Dispatch<ActivityAction>) => {
    dispatch({ type: "setName", payload: activityInitialState.name });
    dispatch({
      type: "setMaxParticipantsNumber",
      payload: activityInitialState.maxParticipantsNumber,
    });
    dispatch({
      type: "setParticipationFee",
      payload: activityInitialState.participationFee,
    });
    dispatch({
      type: "setStartDateAt",
      payload: activityInitialState.startDateAt,
    });
    dispatch({
      type: "setDescription",
      payload: activityInitialState.description,
    });
    dispatch({
      type: "setDetailAddress",
      payload: activityInitialState.detailAddress,
    });
    dispatch({
      type: "setCoverImageFile",
      payload: activityInitialState.coverImage,
    });
    dispatch({
      type: "setSubImagesFile",
      payload: activityInitialState.subImages,
    });
    dispatch({
      type: "setActivityType",
      payload: activityInitialState.activityType,
    });
    dispatch({
      type: "setTeam",
      payload: activityInitialState.team,
    });
    dispatch({
      type: "setKakaoLink",
      payload: activityInitialState.kakaoLink,
    });
    dispatch({
      type: "setRecommendation",
      payload: activityInitialState.recommendation,
    });
    dispatch({
      type: "setParticipating",
      payload: activityInitialState.participating,
    });
  },
};
