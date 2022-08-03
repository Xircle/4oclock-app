import { existingPlace } from "./../../components/profile/MyCreatedPlacesFlatList";

import { ActivityAction, activityInitialState } from "./ActivityReducer";

export const activityDispatcher = {
  dispatchMaxParticipants: (
    newNum: number,
    dispatch: React.Dispatch<ActivityAction>
  ) => {
    if (newNum >= 1)
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
    dispatch({ type: "setStartDateAt", payload: date.toString() });
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
  deleteExistingCoverImage: (dispatch: React.Dispatch<ActivityAction>) => {
    dispatch({ type: "setModifyCoverImageUrl", payload: undefined });
    dispatch({ type: "setIsCoverImageDeleted", payload: true });
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
  removeExistingSubImage: (
    oldFiles: string[],
    toRomoveIndex: number,
    dispatch: React.Dispatch<ActivityAction>
  ) => {
    if (toRomoveIndex !== -1) {
      const temp = [...oldFiles];
      temp.splice(toRomoveIndex, 1);
      dispatch({
        type: "setModifySubImageUrls",
        payload: temp,
      });
    }
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
  dispatchTeamOnly: (
    bool: boolean,
    dispatch: React.Dispatch<ActivityAction>
  ) => {
    dispatch({ type: "setTeamOnly", payload: bool });
  },
  dispatchInitialState: (dispatch: React.Dispatch<ActivityAction>) => {
    dispatch({ type: "setName", payload: activityInitialState.name });
    dispatch({
      type: "setMaxParticipantsNumber",
      payload: activityInitialState.maxParticipantsNumber,
    });
    dispatch({
      type: "setTeamOnly",
      payload: activityInitialState.teamOnly,
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
    dispatch({
      type: "setModify",
      payload: false,
    });
    dispatch({ type: "setStage1Valid", payload: false });
    dispatch({ type: "setIsFinished", payload: false });
    dispatch({
      type: "setQAndA",
      payload: activityInitialState.qAndA,
    });
  },
  dispatchExistingState: (
    loadedData: existingPlace,
    dispatch: React.Dispatch<ActivityAction>
  ) => {
    dispatch({
      type: "setName",
      payload: loadedData.name || activityInitialState.name,
    });
    dispatch({
      type: "setTeamOnly",
      payload: loadedData.team ? true : false,
    });
    dispatch({
      type: "setMaxParticipantsNumber",
      payload:
        loadedData.maxParticipantsNumber ||
        activityInitialState.maxParticipantsNumber,
    });
    dispatch({
      type: "setParticipationFee",
      payload:
        loadedData.participationFee || activityInitialState.participationFee,
    });
    dispatch({
      type: "setStartDateAt",
      payload: loadedData.startDateAt || activityInitialState.startDateAt,
    });
    dispatch({
      type: "setDescription",
      payload: loadedData.description || activityInitialState.description,
    });
    dispatch({
      type: "setDetailAddress",
      payload: loadedData.detailAddress || activityInitialState.detailAddress,
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
      payload: loadedData.activityType || activityInitialState.activityType,
    });
    dispatch({
      type: "setKakaoLink",
      payload: loadedData.kakaoLink || activityInitialState.kakaoLink,
    });
    dispatch({
      type: "setRecommendation",
      payload: loadedData.recommendation || activityInitialState.recommendation,
    });
    dispatch({ type: "setPlaceId", payload: loadedData.kakaoPlaceId });
    dispatch({
      type: "setModifyPlaceId",
      payload: loadedData.id,
    });
    dispatch({
      type: "setModify",
      payload: true,
    });
    dispatch({ type: "setModifySubImageUrls", payload: loadedData.subImages });
    dispatch({
      type: "setModifyCoverImageUrl",
      payload: loadedData.coverImage,
    });
    dispatch({ type: "setStage1Valid", payload: true });
    dispatch({ type: "setIsFinished", payload: false });
    dispatch({ type: "setIsCoverImageDeleted", payload: false });
    dispatch({ type: "setQAndA", payload: loadedData.qAndA });
  },
  dispatchQAndA(questions: string[], dispatch: React.Dispatch<ActivityAction>) {
    dispatch({ type: "setQAndA", payload: questions });
  },
};
