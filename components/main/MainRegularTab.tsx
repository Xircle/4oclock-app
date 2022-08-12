import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import styled from "styled-components/native";
import { getPlacesRegular } from "../../lib/api/getPlaces";
import { getPoint } from "../../lib/api/getPoint";
import { getTeams } from "../../lib/api/getTeams";
import { getUser } from "../../lib/api/getUser";
import { patchTeam } from "../../lib/api/patchTeam";
import {
  GetPlacesByLocationOutput,
  PointData,
  TeamData,
  UserData,
} from "../../lib/api/types";
import { verifyByCode } from "../../lib/api/verifyByCode";
import storage, { StorageKey } from "../../lib/helpers/myAsyncStorage";
import {
  colors,
  fontFamilies,
  GeneralText,
  UnderLineInput,
} from "../../styles/styles";
import MyModal from "../UI/MyModal";
import MySelect from "../UI/MySelect";
import CodeButtonFC from "./CodeButtonFC";
import CountFC from "./CountFC";
import MainFeed from "./MainFeed";
import MRTeamSubmitBtn from "./MainRegular/MRTeamSubmitBtn";
import { renderRegular } from "./MainRenderItems";

interface Props {}

function MainRegularTab(props: Props) {
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
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

  const [localTeamNames, setLocalTeamNames] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [selectedTeamName, setSelectedTeamName] = useState("");
  const [localTeamIds, setLocalTeamIds] = useState([]);
  const { data: teamsData } = useQuery<TeamData[] | undefined>(
    ["teams"],
    () => getTeams(),
    {
      retry: 1,
    }
  );

  const { data: pointData, refetch: refetchPoint } = useQuery<
    PointData | undefined
  >(["point"], () => getPoint());

  useEffect(() => {
    navigation.addListener("focus", (e) => {
      // Do something
      try {
        refetchPoint();
      } catch (error) {}
    });
    if (teamsData && teamsData.length > 0 && localTeamNames.length === 0) {
      teamsData.forEach((team, index) => {
        setLocalTeamNames((prev) => [...prev, team.name]);
        setLocalTeamIds((prev) => [...prev, team.id]);
      });
      console.log(teamsData);
    }
  }, [teamsData]);

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
    setModalShown(true);
  };

  useEffect(() => {
    if (userData?.isYkClub) {
      setModalText("팀을 선택해주세요");
    } else {
      setModalText("활동코드를 입력해주세요");
    }
  }, [userData]);

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
      await mutatePatchTeam(selectedTeamId);
      await CloseModal();
    }
  };

  return (
    <Container>
      <MyModal visible={modalShown} onClose={CloseModal}>
        <RegularInfoContainer>
          <ActiveCodeText>{modalText}</ActiveCodeText>
          {!userData?.isYkClub ? (
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
          ) : (
            <MySelect
              data={localTeamNames}
              onSelect={(selectedItem, index) => {
                setSelectedTeamId(localTeamIds[index]);
                setSelectedTeamName(selectedItem);
              }}
              width={200}
              defaultButtonText="팀을 선택해주세요"
              defaultValue={selectedTeamName}
            />
          )}

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
                <CodeButtonFC text={"STEP1.활동코드 입력하고 즐기기💕"} />
              </ActiveCodeWrapper>
            </ActiveCodeContainer>
          ) : !userData?.team_id ? (
            <ActiveCodeContainer>
              <ActiveCodeWrapper onPress={OpenModal}>
                <CodeButtonFC text={"STEP2.팀 입력하고 즐기기💕"} />
              </ActiveCodeWrapper>
            </ActiveCodeContainer>
          ) : (
            <CountFC
              totalPointThisSeason={pointData?.totalPointThisSeason}
              myPointThisSeason={pointData?.myPointThisSeason}
            />
          )
        }
      />
    </Container>
  );
}

export default React.memo(MainRegularTab);

const ActiveCodeContainer = styled.View`
  width: 100%;
`;

const ActiveCodeWrapper = styled.TouchableOpacity``;

const ActiveCodeText = styled(GeneralText)`
  color: ${colors.black};
`;

const Container = styled.View`
  background-color: ${colors.white};
  flex: 1;
`;

const RegularInfoContainer = styled.View`
  align-items: center;
  width: 100%;
`;

const SUnderLineInput = styled(UnderLineInput)`
  width: 60%;
  text-align: center;
`;
