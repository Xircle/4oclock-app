import { fontFamilies, colors } from "../../styles/styles";
import styled from "styled-components/native";
import { GeneralText } from "../../styles/styles";
import MainFlatListPlace from "./MainFlatListPlace";
import React from "react";

export const renderRegular = ({ item, index }) => {
  if (item.divider === "myTeam") {
    return (
      <>
        <RegularDividorContainer>
          <RegularDividorHeader>
            # 이번주 우리 팀 정기모임🔥
          </RegularDividorHeader>
          <RegularDividorMainText>
            이번주에 열린 우리 팀 정기모임 2개 중 하나를 선택해서 참여해주세요!
            {"\n"} 선착순으로 마감되니 빨리 ㄱㄱ
          </RegularDividorMainText>
        </RegularDividorContainer>
        <MainFlatListPlace
          leftParticipantsCount={item.leftParticipantsCount}
          coverImage={item.coverImage}
          name={item.name}
          id={item.id}
          description={item.placeDetail.description}
          startDateFromNow={item.startDateFromNow}
          participants={item.participants}
          isClosed={item.isClosed}
          recommendation={item.recommendation}
        />
      </>
    );
  } else if (item.divider === "otherTeam") {
    return (
      <>
        <RegularDividorContainer>
          <RegularDividorHeader># 지금 올라온 정기모임 🎉</RegularDividorHeader>
          <RegularDividorMainText>
            이번주에 우리 팀 참여가 불가하다고?! 담당 운영진에게 연락을 주고
            {"\n"}다른 팀 정기모임에 참여해봐!
          </RegularDividorMainText>
        </RegularDividorContainer>
        <MainFlatListPlace
          leftParticipantsCount={item.leftParticipantsCount}
          coverImage={item.coverImage}
          name={item.name}
          id={item.id}
          description={item.placeDetail.description}
          startDateFromNow={item.startDateFromNow}
          participants={item.participants}
          isClosed={item.isClosed}
          recommendation={item.recommendation}
        />
      </>
    );
  }

  return (
    <MainFlatListPlace
      leftParticipantsCount={item.leftParticipantsCount}
      coverImage={item.coverImage}
      name={item.name}
      id={item.id}
      description={item.placeDetail.description}
      startDateFromNow={item.startDateFromNow}
      participants={item.participants}
      isClosed={item.isClosed}
      recommendation={item.recommendation}
    />
  );
};

export const renderItemLightning = ({ item }) => {
  if (item.divider === "myTeam") {
    return (
      <>
        <RegularDividorContainer>
          <RegularDividorHeader>#우리 클럽 번개모임🔥</RegularDividorHeader>
          <RegularDividorMainText>
            이번주에 열린 우리 팀 정기모임 2개 중 하나를 선택해서 참여해주세요!
            {"\n"} 선착순으로 마감되니 빨리 ㄱㄱ
          </RegularDividorMainText>
        </RegularDividorContainer>
        <MainFlatListPlace
          leftParticipantsCount={item.leftParticipantsCount}
          coverImage={item.coverImage}
          name={item.name}
          id={item.id}
          description={item.placeDetail.description}
          startDateFromNow={item.startDateFromNow}
          participants={item.participants}
          isClosed={item.isClosed}
          recommendation={item.recommendation}
        />
      </>
    );
  } else if (item.divider === "otherTeam") {
    return (
      <>
        <RegularDividorContainer>
          <RegularDividorHeader>
            # 누구나 참가할 수 있는 번개 🎉
          </RegularDividorHeader>
          <RegularDividorMainText>
            이번주에 우리 팀 참여가 불가하다고?! 담당 운영진에게 연락을 주고
            {"\n"}다른 팀 정기모임에 참여해봐!
          </RegularDividorMainText>
        </RegularDividorContainer>
        <MainFlatListPlace
          leftParticipantsCount={item.leftParticipantsCount}
          coverImage={item.coverImage}
          name={item.name}
          id={item.id}
          description={item.placeDetail.description}
          startDateFromNow={item.startDateFromNow}
          participants={item.participants}
          isClosed={item.isClosed}
          recommendation={item.recommendation}
        />
      </>
    );
  }

  return (
    <MainFlatListPlace
      leftParticipantsCount={item.leftParticipantsCount}
      coverImage={item.coverImage}
      name={item.name}
      id={item.id}
      description={item.placeDetail.description}
      startDateFromNow={item.startDateFromNow}
      participants={item.participants}
      isClosed={item.isClosed}
      recommendation={item.recommendation}
    />
  );
};

const RegularDividorContainer = styled.View`
  width: 100%;
  padding-top: 15px;
`;

const RegularDividorHeader = styled(GeneralText)`
  font-family: ${fontFamilies.bold};
  font-size: 20px;
`;

const RegularDividorMainText = styled(GeneralText)`
  font-size: 12px;
  color: ${colors.midGrey};
  padding-top: 13px;
`;
