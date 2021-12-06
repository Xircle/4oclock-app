import { ActivityAction, activityInitialState } from "./ActivityReducer";

export const activityDispatcher = {
  dispatchMaxParticipants: (
    newNum: number,
    dispatch: React.Dispatch<ActivityAction>
  ) => {
    if (newNum >= 2 && newNum <= 8)
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
  dispatchDetailAddress: (
    text: string,
    dispatch: React.Dispatch<ActivityAction>
  ) => {
    dispatch({
      type: "setDetailAddress",
      payload: text,
    });
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
  removeSubImages: (
    // @ts-ignore
    oldFiles: File[],
    // @ts-ignore
    fileToRemove: File,
    dispatch: React.Dispatch<ActivityAction>
  ) => {
    const toRomoveIndex = oldFiles.indexOf(fileToRemove);
    if (toRomoveIndex !== -1) {
      oldFiles.splice(toRomoveIndex, 1);
      dispatch({
        type: "setSubImagesFile",
        payload: oldFiles,
      });
    }
  },
  dispatchStage1Valid: (
    // @ts-ignore
    bool: Boolean,
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
  },
};
