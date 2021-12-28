export const BASE_URL = "https://api.4oclock.kr";

import moment from "moment";
import "moment/locale/ko";

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

export const getStartDateFromNow = (startDateFromNow: string) => {
  if (startDateFromNow === "마감") return startDateFromNow;
  const words = startDateFromNow.split(" ");
  const point = startDateFromNow.lastIndexOf(" ");

  const hourBase24Num = Number(words[words.length - 1]);
  const hourBse12String =
    hourBase24Num < 12
      ? "오전 " + hourBase24Num
      : "오후 " + (hourBase24Num - 12);
  return startDateFromNow.substr(0, point).concat(" ", hourBse12String) + " 시";
};

export const convertTimeCA = (date: Date) => {
  if (date.getMinutes() % 30 !== 0) return "";
  const hours =
    date.getHours() >= 12
      ? "오후 " + (date.getHours() - 12) + "시 "
      : "오전 " + date.getHours() + "시 ";
  return (
    date.getMonth() +
    1 +
    "월 " +
    date.getDate() +
    "일 " +
    hours +
    date.getMinutes() +
    "분"
  );
};
