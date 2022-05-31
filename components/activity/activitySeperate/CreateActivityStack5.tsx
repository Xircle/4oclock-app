import styled from "styled-components/native";
import React, { useEffect, useState } from "react";
import {
  BigTextInput,
  BlackLabel,
  colors,
  ErrorMessage,
  GeneralText,
  MainHeading,
  SpaceBetweenWrapper,
} from "../../../styles/styles";
import MyKeyboardAvoidingView from "../../UI/MyKeyboardAvoidingView";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/reducers";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { activityDispatcher } from "../../../lib/activity/ActivityDispatcher";
import { createPlaceErrorMessage } from "../../../lib/errorMessages";
import { openLink } from "../../shared/Links";
import { Alert } from "react-native";
import FullScreenLoader from "../../UI/FullScreenLoader";
import { createPlace } from "../../../lib/api/createPlace";
import { editPlace } from "../../../lib/api/editPlace";
import RelativeMainButtonWBg from "../../UI/RelativeMainButtonWBG";

interface Props {}

export default function CreateActivityStack5(props: Props) {
  const { kakaoLink, modify, modifyPlaceId } = useSelector(
    (state: RootState) => state.activityReducer
  );

  const state = useSelector((state: RootState) => state.activityReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [openKakaoLinkError, setOpenKakaoLinkError] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const nextHandler = async () => {
    setLoading(true);
    try {
      if (!modify) {
        await createPlace(state);
      } else if (modifyPlaceId) {
        await editPlace(state, modifyPlaceId);
      }
    } catch (e) {
      setLoading(false);
      Alert.alert("일시적 오류가 발생했습니다");
      console.log(e);
    }
    setLoading(false);
    // @ts-ignore
    navigation.navigate("CAS6", {});
  };

  useEffect(() => {
    setOpenKakaoLinkError(!kakaoLink.startsWith("https://open.kakao.com/o/g"));
  }, []);

  return (
    <MyKeyboardAvoidingView keyboardVerticalOffset={50}>
      <SpaceBetweenWrapper>
        <Container showsVerticalScrollIndicator={false}>
          <MainHeading>모임 디테일</MainHeading>

          <InnerContainer>
            <BlackLabel>오픈 카카오톡 채팅방 링크</BlackLabel>
            <SBigTextInput
              placeholder="ex: https://open.kakao.com/o/grFhbIBd"
              autoCapitalize="none"
              blurOnSubmit={true}
              returnKeyType="next"
              returnKeyLabel="next"
              autoCorrect={false}
              value={kakaoLink}
              defaultValue={kakaoLink ? kakaoLink : ""}
              onChange={(event) => {
                const { eventCount, target, text } = event.nativeEvent;
                activityDispatcher.dispatchKakaoLink(
                  //text.replace(/[^A-Za-z0-9/.]/g, ""),
                  text.replace(/[^A-Za-z0-9/.:]/g, ""),
                  dispatch
                );

                setOpenKakaoLinkError(
                  !text.startsWith("https://open.kakao.com/o/g")
                );
              }}
            />
            {openKakaoLinkError ? (
              <SErrorMessage>{createPlaceErrorMessage[7]}</SErrorMessage>
            ) : null}
            <OKInfoButton onPress={openLink.LOpenKakaoChatGUide}>
              <OKInfoText>오카방 만드는 방법</OKInfoText>
            </OKInfoButton>
          </InnerContainer>
        </Container>
        <RelativeMainButtonWBg
          onPress={nextHandler}
          disabled={openKakaoLinkError}
          title={"다음"}
          bottom={10}
        />

        {loading && <FullScreenLoader />}
      </SpaceBetweenWrapper>
    </MyKeyboardAvoidingView>
  );
}

const OKInfoButton = styled.TouchableOpacity`
  margin-left: auto;
  margin-right: auto;
`;

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${colors.bgColor};
  padding-top: 20px;
  padding-left: 15px;
  padding-right: 15px;
`;

const InnerContainer = styled.View`
  margin-top: 22px;
`;

const SBigTextInput = styled(BigTextInput)<{ error?: Boolean }>`
  border: ${(props) =>
    props.error
      ? `0.5px solid ${colors.warningRed}`
      : `0.5px solid ${colors.midGrey}`};
  margin-top: 20px;
`;

const OKInfoText = styled(GeneralText)`
  font-size: 11px;
  margin-top: 11px;
  color: ${colors.midGrey};
  text-decoration-line: underline;
`;

const SErrorMessage = styled(ErrorMessage)`
  color: ${colors.warningRed};
`;
