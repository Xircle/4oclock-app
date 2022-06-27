import styled from "styled-components/native";
import React, { useEffect } from "react";
import { CreateActivityStackParamList } from "../../../navigators/CreateActivityStackNav";
import { useNavigation } from "@react-navigation/native";
import { colors, MainHeading, SubHeading } from "../../../styles/styles";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/reducers";
import { activityDispatcher } from "../../../lib/activity/ActivityDispatcher";
import { useDispatch } from "react-redux";
import CreatePlaceTypeSelector from "../CreatePlaceTypeSelector";
import RelativeMainButtonWBg from "../../UI/RelativeMainButtonWBG";

type Props = CreateActivityStackParamList["CASPlaceType"];

export default function CASPlaceTypeScreen(props: Props) {
  const { modify, activityType } = useSelector(
    (state: RootState) => state.activityReducer
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const nextHandler = () => {
    // @ts-ignore
    navigation.navigate("CAS1");
  };

  useEffect(() => {
    console.log(modify);
  }, [modify]);

  const setActivityType = (type: string) => {
    activityDispatcher.dispatchActivityType(type, dispatch);
  };

  return (
    <SpaceBetweenWrapper>
      <Container>
        <MainHeading>모임을 열어볼까?</MainHeading>
        <SubHeading style={{ marginTop: 20, marginBottom: 20 }}>
          재밌는 모임을 열어볼까? 열고 친구들과 꿀잼모임😊
        </SubHeading>
        <InnerContainer style={{ paddingBottom: 5 }}>
          <CreatePlaceTypeSelector
            onPress={setActivityType}
            selectedType={activityType}
          />
        </InnerContainer>
      </Container>
      {/* @ts-ignore */}
      <RelativeMainButtonWBg onPress={nextHandler} title={"다음"} bottom={10} />
    </SpaceBetweenWrapper>
  );
}

const Container = styled.ScrollView`
  flex: 1;
  padding-top: 20px;
  padding-left: 15px;
  padding-right: 15px;
  background-color: ${colors.bgColor};
`;

const InnerContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const SpaceBetweenWrapper = styled.View`
  flex: 1;
  justify-content: space-between;
  width: 100%;
`;
