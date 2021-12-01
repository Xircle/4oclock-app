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
  | { type: "setSubImagesFile"; payload: File[] };

export const activityInitialState: CreateActivityOutput = {
  name: "",
  maxParticipantsNumber: 4,
  description: "",
  detailAddress: "",
  coverImage: undefined,
  subImages: [],
  participationFee: "0",
  startDateAt: new Date(),
};

export function reducer(
  state: CreateActivityOutput,
  action: ActivityAction
): CreateActivityOutput {
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
    default:
      throw new Error();
  }
}
