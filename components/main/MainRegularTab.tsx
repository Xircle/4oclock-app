import React, { useMemo, useState } from "react";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import styled from "styled-components/native";
import { getPlacesRegular } from "../../lib/api/getPlaces";
import { getUser } from "../../lib/api/getUser";
import { GetPlacesByLocationOutput, UserData } from "../../lib/api/types";
import { colors, GeneralText } from "../../styles/styles";
import MainFeed from "./MainFeed";
import { renderRegular } from "./MainRenderItems";

interface Props {}

function MainRegularTab(props: Props) {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const { data: userData, refetch: refetchUserData } = useQuery<
    UserData | undefined
  >(["userProfile"], () => getUser(), {
    retry: 1,
  });

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

  return (
    <Container>
      <MainFeed
        loadMore={loadMoreRegular}
        onRefresh={onRefreshRegular}
        refreshing={refreshing}
        renderItem={memoizedValueRegular}
        places={mainRegularData?.pages?.map((page) => page.places).flat()}
        listHeaderCompoent={
          userData.isYkClub ? (
            <RegularInfoContainer>
              <RegularInfoText>
                (매우중요) 정기모임 참여는 마이페이지 {">"} 프로필 수정하기에서
                팀과 활동코드를 입력해 주셔야지만 가능해요!
              </RegularInfoText>
            </RegularInfoContainer>
          ) : (
            <RegularInfoContainer>
              <RegularInfoText>호롤롤롤</RegularInfoText>
            </RegularInfoContainer>
          )
        }
      />
    </Container>
  );
}

export default React.memo(MainRegularTab);

const Container = styled.View`
  background-color: ${colors.bgColor};
  flex: 1;
`;

const RegularInfoContainer = styled.View``;

const RegularInfoText = styled(GeneralText)`
  line-height: 24px;
  color: ${colors.midGrey};
  padding-left: 10px;
  padding-right: 10px;
  font-size: 14px;
  line-height: 22px;
`;
