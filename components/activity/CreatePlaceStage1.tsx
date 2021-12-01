import styled from "styled-components/native";
import React, { useEffect, useRef, useState } from "react";
import {
  BigTextInput,
  BlackLabel,
  colors,
  GeneralText,
  MainHeading,
  SubHeading,
  TextArea,
} from "../../styles/styles";
import { ScrollView, View, Animated, Dimensions, Platform } from "react-native";
import ExpandableV from "../UI/ExpandableV";
import DatePicker from "react-native-date-picker";
import { CreateActivityOutput } from "../../lib/api/types";
import { ActivityAction } from "../../lib/activity/ActivityReducer";
import { Ionicons } from "@expo/vector-icons";
import { activityDispatcher } from "../../lib/activity/ActivityDispatcher";

interface Props {
  state: CreateActivityOutput;
  dispatch: React.Dispatch<ActivityAction>;
}

const { width } = Dimensions.get("window");

export default function CreatePlaceStage1({ state, dispatch }: Props) {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [maxParticiapnts, setMaxParticipants] = useState(2);

  const changeMaxParticipants = (plus: boolean) => {
    if (maxParticiapnts > 2 && !plus) {
      setMaxParticipants((prev) => prev - 1);
    }
    if (maxParticiapnts < 8 && plus) {
      setMaxParticipants((prev) => prev + 1);
    }
  };

  useEffect(() => {
    console.log(state.startDateAt);
  }, [state.startDateAt]);
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MainHeading>모임을 열어볼까?</MainHeading>
        <SubHeading style={{ marginTop: 20, marginBottom: 20 }}>
          재밌는 모임을 열어보자~~ 행복하고 재밌는 모임
        </SubHeading>

        <ExpandableV title="어떤 모임인가요? (제목)" height={80}>
          <InnerContainer>
            <SBigTextInput
              placeholder="ex. 말이 많아요 / 치믈리에 새내기..."
              autoCapitalize="none"
              blurOnSubmit={true}
              returnKeyType="next"
              returnKeyLabel="next"
              autoCorrect={false}
              defaultValue={state.name ? state.name : ""}
              onChange={(event) => {
                const { eventCount, target, text } = event.nativeEvent;
                activityDispatcher.dispatchName(text, dispatch);
              }}
            />
          </InnerContainer>
        </ExpandableV>
        <ExpandableV title="모임에 대한 간단한 소개!" height={130}>
          <InnerContainer style={[{ paddingTop: 15 }, { paddingBottom: 15 }]}>
            <STextArea
              placeholder="ex. 안녕하세요 트와이스를 좋아하는 인문대생입니다 / 취준하느라 너무 힘들어요...! 같이 고민이야기 하실 분!"
              autoCapitalize="none"
              blurOnSubmit={true}
              returnKeyType="next"
              returnKeyLabel="next"
              autoCorrect={false}
              multiline={true}
              defaultValue={state.description ? state.description : ""}
              onChange={(event) => {
                const { eventCount, target, text } = event.nativeEvent;
                activityDispatcher.dispatchDescription(text, dispatch);
              }}
            />
          </InnerContainer>
        </ExpandableV>
        <ExpandableV title="만남시간" height={80}>
          <InnerContainer>
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
                activityDispatcher.dispatchStartDateAt(date, dispatch);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </InnerContainer>
        </ExpandableV>
        <ExpandableV title="만남장소" height={80}>
          <InnerContainer>
            <SBigTextInput
              placeholder="ex. 말이 많아요 / 치믈리에 새내기..."
              autoCapitalize="none"
              blurOnSubmit={true}
              returnKeyType="next"
              returnKeyLabel="next"
              autoCorrect={false}
              defaultValue={state.detailAddress ? state.detailAddress : ""}
              onChange={(event) => {
                const { eventCount, target, text } = event.nativeEvent;
                activityDispatcher.dispatchDetailAddress(text, dispatch);
              }}
            />
          </InnerContainer>
        </ExpandableV>
        <ExpandableV title="최대 참가인원" height={100}>
          <InnerContainer>
            <MaxParticipantsContainer>
              <MaxPrticipantsButton
                left={true}
                onPress={() => {
                  activityDispatcher.dispatchMaxParticipants(
                    state.maxParticipantsNumber - 1,
                    dispatch
                  );
                }}
              >
                <Ionicons name="remove-outline" size={24} color="black" />
              </MaxPrticipantsButton>
              <MaxParticipantsNumber>
                {state.maxParticipantsNumber}
              </MaxParticipantsNumber>
              <MaxPrticipantsButton
                left={false}
                onPress={() => {
                  activityDispatcher.dispatchMaxParticipants(
                    state.maxParticipantsNumber + 1,
                    dispatch
                  );
                }}
              >
                <Ionicons name="add" size={24} color="black" />
              </MaxPrticipantsButton>
            </MaxParticipantsContainer>
          </InnerContainer>
        </ExpandableV>
        <ExpandableV title="참가비" height={80}>
          <InnerContainer>
            <SBigTextInput
              placeholder="ex. 말이 많아요 / 치믈리에 새내기..."
              autoCapitalize="none"
              blurOnSubmit={true}
              returnKeyType="next"
              returnKeyLabel="next"
              autoCorrect={false}
              defaultValue={
                state.participationFee ? state.participationFee : ""
              }
              onChange={(event) => {
                const { eventCount, target, text } = event.nativeEvent;
                activityDispatcher.dispatchParticipationFee(text, dispatch);
              }}
            />
          </InnerContainer>
        </ExpandableV>
        <View style={{ height: 150 }} />
      </ScrollView>
    </Container>
  );
}

const MaxParticipantsContainer = styled.View`
  width: 280px;
  flex-direction: row;

  height: 100%;
  max-height: 60px;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  border: 1px solid ${colors.bareGrey};
`;

const MaxPrticipantsButton = styled.TouchableOpacity<{ left?: boolean }>`
  width: 60px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.left ? colors.bareGrey : colors.lightBlue};
  height: 100%;
  border-bottom-left-radius: ${(props) => (props.left ? "30px" : "0px")};
  border-top-left-radius: ${(props) => (props.left ? "30px" : "0px")};
  border-bottom-right-radius: ${(props) => (!props.left ? "30px" : "0px")};
  border-top-right-radius: ${(props) => (!props.left ? "30px" : "0px")};
`;

const MaxParticipantsNumber = styled(GeneralText)`
  flex: 1;
  background-color: ${colors.bgColor};
  text-align: center;
`;

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

const SBigTextInput = styled(BigTextInput)``;

const InnerContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const STextArea = styled(TextArea)`
  flex: 1;
`;
