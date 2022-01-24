import { CreateActivityOutput } from "../api/types.d";

export type ActivityAction =
  | { type: "setName"; payload: string }
  | { type: "setMaxParticipantsNumber"; payload: number }
  | { type: "setParticipationFee"; payload: string }
  | { type: "setStartDateAt"; payload: Date }
  | { type: "setDescription"; payload: string }
  | { type: "setDetailAddress"; payload: string }
  // @ts-ignore
  | { type: "setCoverImageFile"; payload: File }
  // @ts-ignore
  | { type: "setSubImagesFile"; payload: File[] }
  | { type: "setStage1Valid"; payload: Boolean }
  | { type: "setIsFinished"; payload: Boolean }
  | { type: "setPlaceId"; payload: string }
  | { type: "setActivityType"; payload: string };

export interface ActivityState extends CreateActivityOutput {
  stage1Valid: Boolean;
  isFinished: Boolean;
  activityType: string;
}

export const activityInitialState: ActivityState = {
  name: "",
  maxParticipantsNumber: 5,
  description: "",
  detailAddress: "",
  coverImage: undefined,
  subImages: [],
  participationFee: "0",
  startDateAt: new Date(),
  stage1Valid: false,
  isFinished: false,
  placeId: "0",
  activityType: "정기",
};

export function reducer(
  state: ActivityState,
  action: ActivityAction
): ActivityState {
  switch (action.type) {
    case "setName":
      return {
        ...state,
        name: action.payload,
      };
    case "setMaxParticipantsNumber":
      return {
        ...state,
        maxParticipantsNumber: action.payload,
      };
    case "setParticipationFee":
      return {
        ...state,
        participationFee: action.payload,
      };
    case "setStartDateAt":
      return {
        ...state,
        startDateAt: action.payload,
      };
    case "setDescription":
      return {
        ...state,
        description: action.payload,
      };
    case "setDetailAddress":
      return {
        ...state,
        detailAddress: action.payload,
      };
    case "setSubImagesFile":
      return {
        ...state,
        subImages: action.payload,
      };
    case "setCoverImageFile":
      return {
        ...state,
        coverImage: action.payload,
      };
    case "setStage1Valid":
      return {
        ...state,
        stage1Valid: action.payload,
      };
    case "setIsFinished":
      return {
        ...state,
        isFinished: action.payload,
      };
    case "setPlaceId":
      return {
        ...state,
        placeId: action.payload,
      };
    case "setActivityType":
      return {
        ...state,
        activityType: action.payload,
      };
    default:
      throw new Error();
  }
}
