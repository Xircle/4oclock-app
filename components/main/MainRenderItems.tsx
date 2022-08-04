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
            올라온 이번주 우리 팀 모임
          </RegularDividorHeader>
          <RegularDividorMainText>
            선착순으로 즐기는 우리 팀 모임! 2개중 하나 꼭 참석하기!
            {"\n"}갓.생.갓.놀 케빈의 정기모임의 참여해봐
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
            💎케빈의 클럽 다른 팀 모임
          </RegularDividorHeader>
          <RegularDividorMainText>
            이번주에 우리 팀 참여가 불가능하다면 매주 수요일부터 다른 팀 참가가
            가능해! 참석횟수는 0.5번으로 인정되니 참고해줘!
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
          <RegularDividorHeader>🧑‍🚀올라온 우리 팀 번개</RegularDividorHeader>
          <RegularDividorMainText>
            only 우리 팀만 즐길 수 있는 번개가 올라왔어!
            {"\n"}자유롭게 우리 팀이랑 친해져보자{"><"}
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
          <RegularDividorHeader>💎케빈의 클럽 전체 번개</RegularDividorHeader>
          <RegularDividorMainText>
            우리 팀 뿐아니라 다른 케빈의 클럽 프렌즈들을 만날 수 있는 공간이야!
            {"\n"}자유롭게 번개를 올리고 참여해보자!
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
