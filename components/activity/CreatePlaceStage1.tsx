import styled from "styled-components/native";
import React, { useRef, useState } from "react";
import {
  BlackLabel,
  colors,
  MainHeading,
  SubHeading,
} from "../../styles/styles";
import { ScrollView, View, Animated, Dimensions, Platform } from "react-native";
import ExpandableV from "../UI/ExpandableV";
import DatePicker from "react-native-date-picker";

interface Props {}

const { width } = Dimensions.get("window");

export default function CreatePlaceStage1(props: Props) {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  console.log(width);
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MainHeading>모임을 열어볼까?</MainHeading>
        <SubHeading style={{ marginTop: 20, marginBottom: 20 }}>
          재밌는 모임을 열어보자~~ 행복하고 재밌는 모임
        </SubHeading>

        <ExpandableV title="어떤 모임인가요? (제목)" height={100}>
          <MainHeading>모임을 열어볼까?</MainHeading>
        </ExpandableV>
        <ExpandableV title="모임에 대한 간단한 소개!" height={100}>
          <MainHeading>모임을 열어볼까?</MainHeading>
        </ExpandableV>
        <ExpandableV title="만남시간" height={100}>
          <AnimInnerContainer>
            <PickerContainer onPress={() => setOpen(true)}>
              <WhiteText>시간 선택하기</WhiteText>
            </PickerContainer>
            <DatePicker
              modal
              open={open}
              date={date}
              minuteInterval={30}
              onConfirm={(date) => {
                setOpen(false);
                setDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </AnimInnerContainer>
        </ExpandableV>
        <ExpandableV title="만남장소" height={100}>
          <MainHeading>모임을 열어볼까?</MainHeading>
        </ExpandableV>
        <ExpandableV title="최대 참가인원" height={100}>
          <MainHeading>모임을 열어볼까?</MainHeading>
        </ExpandableV>
        <ExpandableV title="참가비" height={100}>
          <MainHeading>모임을 열어볼까?</MainHeading>
        </ExpandableV>
      </ScrollView>
    </Container>
  );
}

const PickerContainer = styled.TouchableOpacity`
  background-color: ${colors.mainBlue};
  border-radius: 3px;
  padding: 5px;
`;

const WhiteText = styled(BlackLabel)`
  color: ${colors.bgColor};
  font-size: 20px;
`;

const Container = styled.View`
  flex: 1;
  background-color: ${colors.bgColor};
  padding: 0px 30px;
`;

const AnimContainer = styled.View`
  width: 100%;
`;

const AnimInnerContainer = styled.View`
  margin-top: 20px;
  flex-direction: row;
  justify-content: space-around;
`;
