import styled from "styled-components/native";
import React, { useEffect } from "react";
import { CreateActivityStackParamList } from "../../../navigators/CreateActivityStackNav";
import { useNavigation } from "@react-navigation/native";
import { colors, MainHeading } from "../../../styles/styles";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/reducers";
import { activityDispatcher } from "../../../lib/activity/ActivityDispatcher";
import { useDispatch } from "react-redux";
import CreatePlaceTypeSelector from "../CreatePlaceTypeSelector";

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
    <Container>
      {/* @ts-ignore */}
      <TouchableOpacity onPress={() => navigation.navigate("CAS3")}>
        <MainHeading>Finish</MainHeading>
      </TouchableOpacity>
      <InnerContainer style={{ paddingBottom: 5 }}>
        <CreatePlaceTypeSelector
          onPress={setActivityType}
          selectedType={activityType}
        />
      </InnerContainer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${colors.bgColor};
`;

const InnerContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
