import { AuthState } from "./../../pages/auth/types.d";

export interface CoreOutput {
  ok: boolean;
  error?: string;
}
export interface MetaTag {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  hasMore: boolean;
}

export interface CreateAccountOutput extends CoreOutput {
  data?: {
    uid: string;
    username: string;
    email: string;
    token: string;
    profile: {
      id: string;
      thumbnail: string;
    };
  };
}

// getPlacesByLocation fetcher types
enum Gender {
  Male = "Male",
  Female = "Female",
}

export interface Participants {
  userId: string;
  profileImgUrl: string;
}
export interface PlaceFeedData {
  id: string;
  name: string;
  coverImage: string;
  oneLineIntroText: string;
  startDateAt: string;
  startTime: number;
  isClosed: boolean;
  isLightning: boolean;
  participantsCount: number;
  startDateFromNow: string;
  isParticipating: boolean;
  deadline: string;
  views: number;
  placeDetail: {
    description: string;
    detailAddress: string;
  };
  leftParticipantsCount: number;
  participants: Participants[];
}

export interface ParticipantsListData extends Participants {}

interface Meta {
  page: number;
  totalPages: number;
}

export interface GetPlacesByLocationOutput extends CoreOutput {
  places: PlaceFeedData[];
  meta: Meta;
}

// Get Place By Id
interface PlaceDataParticipantsProfile extends Participants {}

export interface Review {
  id: string;
  imageUrls: string[];
  isRepresentative: boolean;
  description: string;
  user_id: string;
  likesNumber: number;
  place_id: string;
  ratings?: number | null;
}

interface ParticipantsData {
  leftParticipantsCount: number;
  participantsCount: number;
  participantsUsername: string[];
}

export interface PlaceData {
  name: string; //
  oneLineIntroText: string; //
  recommendation: string;
  startDateFromNow: string;
  startTime: number;
  deadline: string;
  coverImage: string; //
  isClosed: boolean; //
  isLightning: boolean;
  isParticipating: boolean; //
  participants: PlaceDataParticipantsProfile[];
  participantsCount: number;
  views: number;
  startDateAt: string;
  reviews: Review[];
  subImages: string[];
  isLightning?: boolean;
  placeType?: string;
  participantsUsername?: string[];
  participantsInfo: {
    total_count: number;
    male_count: number;
    average_age: number;
  };
  placeDetail: {
    title: string;
    description: string;
    categories: string;
    detailAddress: string;
    detailLink: string;
    participationFee: number;
    maxParticipantsNumber?: number;
  };
  participantsData: ParticipantsData;
}

export interface CreateActivityData {
  name: string;
  maxParticipantsNumber?: number;
  participationFee: string;
  startDateAt: Date;
  description: string;
  detailAddress: string;
  coverImage?: File;
  subImages?: File[];
  placeId?: string;
}

// need to change CreatePlaceOutput
export interface CreateActivityOutput extends CreateActivityData {}

export interface GetPlaceByIdOutput extends CoreOutput {
  placeData: PlaceData;
}

// My Page
export interface UserData {
  profileImageUrl: string;
  username: string;
  university: string;
  age: number;
  reservation_count: number;
  job: string;
  gender: string;
  shortBio: string;
  location: string;
  activities?: string;
  isYkClub?: boolean;
  MBTI?: string;
  drinkingStyle?: number;
  personality?: string;
  accountType?: string;
  fk_user_id?: string;
  team?: string;
}

export interface GetUserOutput extends CoreOutput {
  data: Userdata;
}

// My Xircle I've registered
export interface MyPlaceData {
  id: string;
  coverImage: string;
  name: string;
  oneLineIntroText: string;
  participantsCount: number;
  startDateFromNow: string;
  isClosed: boolean;
  description: string;
  kakaoPlaceId?: string;
}

export interface GetMyPlaceOutput extends CoreOutput {
  places: MyPlaceData[];
}

// See Random Profile
interface UserProfile {
  id: string;
  profileImageUrl: string;
  location?: string;
  username: string;
  job: string;
  university: string;
  gender: Gender;
  age: number;
  shortBio: string;
  activities?: string;
  isYkClub?: boolean;
  MBTI?: string;
  drinkingStyle?: number;
  personality?: string;
}

export interface SeeRandomProfile extends CoreOutput {
  randomProfile: UserProfile;
}

// See User By Id
export interface SeeUserByIdOutput extends CoreOutput {
  user: UserProfile;
}

// Make reservation
export interface MakeReservationInput {
  placeId: string;
  isVaccinated: boolean;
}

export interface MakeReservationOutput extends CoreOutput {}

export interface CancelReservationInput {
  placeId: string;
  cancelReason: string;
  detailReason: string;
}

export interface CancelReservationOutput extends CoreOutput {}

export interface EditPlaceInput {
  placeId: string;
  state: CreateActivityOutput;
}

export interface EditPlaceOutput extends CoreOutput {}

// Get Reservation Participant number
export interface GetReservationParticipantNumberOutput extends CoreOutput {
  participantsNumber?: number;
}

// Get ParticipantList
export interface PlaceParticipantListData {
  participantListProfiles: MainFeedPlaceParticipantsProfile[];
  participantsInfo: {
    total_count: number;
    male_count: number;
    average_age: number;
  };
}

export interface GetPlaceParticipantListOutput extends CoreOutput {
  participants?: PlaceParticipantListData;
}

export interface IMessageRoom {
  isMe: boolean;
  isRead: boolean;
  content: string;
}

export interface IReceiverRoom {
  id: string;
  profileImageUrl: string;
  username: string;
}

// My Room
export interface IRoom {
  id: string;
  receiver: IReceiverRoom;
  lastMessage: IMessageRoom;
  latestMessageAt: Date;
}

export interface GetMyRooms extends CoreOutput {
  myRooms: IRoom[];
  hasUnreadMessage: boolean;
}

// My Room Messages
export interface IMessage {
  content: string;
  isMe: boolean;
  sentAt?: Date;
  isRead?: boolean;
}

export interface GetRoomMessagesOutput extends CoreOutput {
  messages: IMessage[];
  meta?: MetaTag;
}

// Send Message
export interface SendMessageInput {
  roomId: string;
  isRead?: boolean;
  receiverId: string;
  content: string;
}

export interface GetReviewsOutput extends CoreOutput {
  reviews: Review[];
}

export interface ParticipantsInfo {}
