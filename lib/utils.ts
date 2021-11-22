export const BASE_URL = "https://xircle-alpha-server.herokuapp.com";

import moment from "moment";
import "moment/locale/ko";

export const MBTIs = [
  "ISFP (호기심 많은 예술가)",
  "ISFJ (용감한 수호자)",
  "ISTP (만능재주꾼)",
  "ISTJ (청렴결백 논리주의자)",
  "INFP (열정적인 중재자)",
  "INFJ (선의의 옹호자)",
  "INTP (논리적 사색가)",
  "INTJ (용의주도한 전략가)",
  "ESFP (자유영혼 연예인)",
  "ESFJ (사교적인 외교관)",
  "ESTP (모험을 즐기는 사업가)",
  "ESTJ (엄격한 관리자)",
  "ENFP (재기발랄한 활동가)",
  "ENFJ (정의로운 사회운동가)",
  "ENTP (논쟁을 즐기는 변론가)",
  "ENTJ (대담한 통솔가)",
  "모름",
];

export const MBTIToIndex = {
  ISFP: 0,
  ISFJ: 1,
  ISTP: 2,
  ISTJ: 3,
  INFP: 4,
  INFJ: 5,
  INTP: 6,
  INTJ: 7,
  ESFP: 8,
  ESFJ: 9,
  ESTP: 10,
  ESTJ: 11,
  ENFP: 12,
  ENFJ: 13,
  ENTP: 14,
  ENTJ: 15,
  모름: 16,
};

export const IndexToMBTI = {
  0: "ISFP",
  1: "ISFJ",
  2: "ISTP",
  3: "ISTJ",
  4: "INFP",
  5: "INFJ",
  6: "INTP",
  7: "INTJ",
  8: "ESFP",
  9: "ESFJ",
  10: "ESTP",
  11: "ESTJ",
  12: "ENFP",
  13: "ENFJ",
  14: "ENTP",
  15: "ENTJ",
  16: "모름",
};

export const DrinkingStyles = [
  "안마셔요",
  "가끔",
  "술은 분위기상",
  "메뉴가 좋으면 못 참지!",
  "술은 인생의 동반자",
];

const DateByMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const StartDays = [
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
  "일요일",
];

export function AgeNumberToString(age: number): string {
  if (age === 0) {
    return "미정";
  } else if (age >= 19 && age <= 24) {
    return "20초반";
  } else if (age >= 24 && age <= 27) {
    return "20중반";
  } else if (age >= 28 && age <= 29) {
    return "20후반";
  } else if (age >= 30 && age <= 33) {
    return "30초반";
  } else if (age >= 34 && age <= 37) {
    return "30중반";
  } else if (age >= 38 && age <= 39) {
    return "30후반";
  } else {
    return "비밀~^^";
  }
}

/**
 *
 * @param time
 * @param options hasIndicator의 디폴트는 false 입니다.
 * @returns 1, 5, 오후 4시, 오전 9시,
 */

export function TimeNumberToString(
  time: number,
  options?: { hasIndicator: boolean }
): string {
  let timeString: string = "";
  if (time > 12) {
    timeString = `오후 ${time - 12}시`;
  } else {
    timeString = `오전 ${time}시`;
  }
  if (!options?.hasIndicator) {
    return timeString.slice(3);
  }
  return timeString;
}

export function participantsNumberLimit(time: number): string {
  if (time < 18) {
    return "4인";
  } else {
    return "2인";
  }
}

export const encodeUrlSlug = (url: string): string => {
  return url.replaceAll(" ", "-");
};

export const decodeUrlSlug = (url: string): string => {
  return url.replaceAll("-", " ");
};

// 마감, 오늘, 내일, 모래 이번주 *요일, 다음주 *요일, 10월 31일
export const CalculateDDay = (startDateAt: string): number => {
  const nowTimes = moment().format("YYYY-MM-DD").split("-");
  const startTimes = startDateAt.split("-");
  const nowMonths = Number(nowTimes[1]);
  const startMonths = Number(startTimes[1]);

  let diffs: number = (Number(startTimes[0]) - Number(nowTimes[0])) * 365;
  diffs += Number(startTimes[2]) - Number(nowTimes[2]);
  for (let i = 0; i < startMonths; i++) {
    diffs += DateByMonth[i];
  }
  for (let i = 0; i < nowMonths; i++) {
    diffs -= DateByMonth[i];
  }

  return diffs - 1;
};

export const CalculateCloseDay = (startDateAt: string): string => {
  const startDay = CalculateDDay(startDateAt);
  const curDay = moment().format("llll").split(" ")[3];
  let index = StartDays.indexOf(curDay);
  index += startDay;
  index %= 7;
  return StartDays[index];
};

export const ModifyDeadline = (deadline: string): string => {
  if (deadline.includes("D")) {
    return "신청 ".concat(deadline);
  } else {
    return deadline;
  }
};

// in ChatRoom
// ex param: new Date("2021-10-10T16:00:00"); ex result 오후 4:00
// ex param: new Date("2021-10-10T05:20:03"); ex result 오전 5:20
export const ConvertSentTime = (sentTime: Date): string => {
  return moment(sentTime).format("LT");
};

/**
 * @param sentTime
 */
// in ChatList
// XX월 XX일
// (어제/오늘) (오전/오후) X:XX
export const ConvertSentTimeForList = (sentAt: Date): string => {
  if (moment(sentAt).format("MMM Do YY") === moment().format("MMM Do YY")) {
    return ConvertSentTime(sentAt);
  } else if (
    moment(sentAt).add(1, "days").format("MMM Do YY") ===
    moment().format("MMM Do YY")
  ) {
    return "어제 " + ConvertSentTime(sentAt);
  } else {
    return moment(sentAt).format("MMM Do");
  }
};

/**
 *
 * @param prevM index - 1
 * @param curM  index
 */
export const IsMessageDividor = (prevM: Date, curM: Date): boolean => {
  return (
    moment(prevM).add(1, "days").format("MMM Do YY") ===
    moment(curM).format("MMM Do YY")
  );
};

/**
 *
 * @param prevM index -1
 */
export const SetMessageDividorText = (prevM: Date): string => {
  return moment(prevM).format("MMM Do YY");
};

export const ModifyStringToStringArray = (
  text: string,
  divider: string
): string[] => {
  const words = text.split("%");
  return words;
};

// export const IsSentDatesDifferent = (prevM: Date, curM: Date): boolean => {
//   const curMessageMoment = moment(curM);
//   const prevMessageMoment = moment(prevM);

// }
