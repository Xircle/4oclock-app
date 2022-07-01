import React, { useEffect, useMemo, useState } from "react";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import styled from "styled-components/native";
import { getPlacesRegular } from "../../lib/api/getPlaces";
import { getUser } from "../../lib/api/getUser";
import { patchTeam } from "../../lib/api/patchTeam";
import { GetPlacesByLocationOutput, UserData } from "../../lib/api/types";
import { verifyByCode } from "../../lib/api/verifyByCode";
import storage, { StorageKey } from "../../lib/helpers/myAsyncStorage";
import { colors, GeneralText, UnderLineInput } from "../../styles/styles";
import MyModal from "../UI/MyModal";
import MainFeed from "./MainFeed";
import MRTeamSubmitBtn from "./MainRegular/MRTeamSubmitBtn";
import { renderRegular } from "./MainRenderItems";

interface Props {}

function MainRegularTab(props: Props) {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const [modalShown, setModalShown] = useState(false);
  const [modalText, setModalText] = useState("활동코드를 입력해주세요");
  const [modalInput, setModalInput] = useState("");
  //console.log("MainRegular Tab render");
  const { data: userData, refetch: refetchUserData } = useQuery<
    UserData | undefined
  >(["userProfile"], () => getUser(), {
    retry: 1,
  });
  const { mutateAsync: mutateVerifyByCode } = useMutation(verifyByCode);
  const { mutateAsync: mutatePatchTeam } = useMutation(patchTeam);

  const {
    data: mainRegularData,
    isLoading: mainRegularDataLoading,
    hasNextPage: hasNextPageRegular,
    fetchNextPage: fetchNextPageRegular,
  } = useInfiniteQuery<GetPlacesByLocationOutput | undefined>(
    ["places", "Regular-meeting"],
    // @ts-ignore
    getPlacesRegular,
    {
      getNextPageParam: (currentPage) => {
        const nextPage = currentPage.meta.page + 1;
        return nextPage > currentPage.meta.totalPages ? null : nextPage;
      },
    }
  );

  useEffect(() => {
    let mounted = true;
    async function fetchNewData() {
      if (mounted && userData?.accountType) {
        await storage.setItem(StorageKey.accountType, userData?.accountType);
      }
    }
    fetchNewData();
    const cleanup = () => {
      mounted = false;
    };

    return () => {
      cleanup();
    };
  }, [userData]);
  const onRefresh = async (type: string) => {
    setRefreshing(true);
    await queryClient.refetchQueries(["places", type]);
    setRefreshing(false);
  };

  const onRefreshRegular = () => onRefresh("Regular-meeting");
  const loadMoreRegular = () => {
    if (hasNextPageRegular) {
      fetchNextPageRegular();
    }
  };
  const memoizedValueRegular = useMemo(
    () => renderRegular,
    [mainRegularData?.pages?.map((page) => page.places).flat()]
  );

  const CloseModal = async () => {
    await refetchUserData();
    setModalShown(false);
  };

  const OpenModal = () => {
    if (userData?.isYkClub) {
      setModalText("팀을 선택해주세요");
    } else {
      setModalText("활동코드를 입력해주세요");
    }
    setModalShown(true);
  };

  const TeamSubmitCTA = async () => {
    console.log("modal input: " + modalInput);
    if (!userData?.isYkClub) {
      // isYkClub 업데이트=
      await mutateVerifyByCode(modalInput);
      setModalInput("");
      await CloseModal();
      setModalShown(true);
    } else {
      // 팀 업데이트
      await mutatePatchTeam(modalInput);
      setModalInput("");
      await CloseModal();
    }
  };

  return (
    <Container>
      <MyModal visible={modalShown} onClose={CloseModal}>
        <RegularInfoContainer>
          <ActiveCodeText>{modalText}</ActiveCodeText>
          <SUnderLineInput
            blurOnSubmit={true}
            returnKeyType="next"
            returnKeyLabel="next"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="코드 입력"
            onChange={(event) => {
              const { eventCount, target, text } = event.nativeEvent;
              setModalInput(text);
            }}
          />
          <MRTeamSubmitBtn onPress={TeamSubmitCTA} title={"제출"} top={15} />
        </RegularInfoContainer>
      </MyModal>
      <MainFeed
        loadMore={loadMoreRegular}
        onRefresh={onRefreshRegular}
        refreshing={refreshing}
        renderItem={memoizedValueRegular}
        places={mainRegularData?.pages?.map((page) => page.places).flat()}
        listHeaderCompoent={
          !userData?.isYkClub ? (
            <ActiveCodeContainer>
              <ActiveCodeWrapper onPress={OpenModal}>
                <ActiveCodeInstruction>활동코드 입력하기</ActiveCodeInstruction>
              </ActiveCodeWrapper>
            </ActiveCodeContainer>
          ) : !userData?.team ? (
            <ActiveCodeContainer>
              <ActiveCodeWrapper onPress={OpenModal}>
                <ActiveCodeInstruction>팀 입력하기</ActiveCodeInstruction>
              </ActiveCodeWrapper>
            </ActiveCodeContainer>
          ) : (
            <RegularInfoContainer>
              <RegularInfoText>
                (매우중요) 정기모임 참여는 마이페이지 {">"} 프로필 수정하기에서
                팀과 활동코드를 입력해 주셔야지만 가능해요!
              </RegularInfoText>
            </RegularInfoContainer>
          )
        }
      />
    </Container>
  );
}

export default React.memo(MainRegularTab);

const SUnderLineInput = styled(UnderLineInput)`
  width: 60%;
  text-align: center;
`;

const ActiveCodeContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const ActiveCodeWrapper = styled.TouchableOpacity`
  margin: 10px;
  padding: 10px;
  width: 90%;
  border-radius: 100px;
  background-color: ${colors.mainBlue};
  align-items: center;
`;

const ActiveCodeText = styled(GeneralText)`
  color: ${colors.black};
`;

const ActiveCodeInstruction = styled(GeneralText)`
  color: ${colors.bgColor};
`;

const Container = styled.View`
  background-color: ${colors.bgColor};
  flex: 1;
`;

const RegularInfoContainer = styled.View`
  align-items: center;
  width: 100%;
`;

const RegularInfoText = styled(GeneralText)`
  line-height: 24px;
  color: ${colors.midGrey};
  padding-left: 10px;
  padding-right: 10px;
  font-size: 14px;
  line-height: 22px;
`;
