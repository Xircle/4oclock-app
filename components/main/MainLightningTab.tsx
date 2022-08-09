import React, { PureComponent, useEffect, useMemo, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "react-query";
import styled from "styled-components/native";
import { getPlacesLightning } from "../../lib/api/getPlaces";
import { GetPlacesByLocationOutput } from "../../lib/api/types";
import { colors, fontFamilies, GeneralText } from "../../styles/styles";
import MainFeed from "./MainFeed";
import { renderItemLightning } from "./MainRenderItems";

interface Props {}
function MainLightningTab(props: Props) {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  //console.log("mainLightningTab render");
  const {
    data: mainLightningData,
    isLoading: mainLightningDataLoading,
    hasNextPage: hasNextPageLightning,
    fetchNextPage: fetchNextPageLightning,
  } = useInfiniteQuery<GetPlacesByLocationOutput | undefined>(
    ["places", "Lightning"],
    // @ts-ignore
    getPlacesLightning,
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

  const onRefreshLightning = () => onRefresh("Lightning");
  const memoizedValueLightning = useMemo(
    () => renderItemLightning,
    [mainLightningData?.pages?.map((page) => page.places).flat()]
  );
  const loadMoreLightning = () => {
    if (hasNextPageLightning) {
      fetchNextPageLightning();
    }
  };
  return (
    <Container>
      <HeaderContainer>
        {true ? (
          <LightningInfoContainer>
            <HeaderTitle>🎉KEVIN's party zone</HeaderTitle>
            <MainText>케빈이 준비한 파티, 이벤트가 올라오는 공간이야!</MainText>
          </LightningInfoContainer>
        ) : (
          <LightningInfoContainer>
            <LightningInfoText>
              🚨(중요)모임 못 나가시면 오카방에서 상황 설명 후 앱에서 꼭 바로
              취소 부탁드리겠습니다.🚨
            </LightningInfoText>
          </LightningInfoContainer>
        )}
      </HeaderContainer>

      <MainFeed
        loadMore={loadMoreLightning}
        onRefresh={onRefreshLightning}
        refreshing={refreshing}
        renderItem={memoizedValueLightning}
        places={mainLightningData?.pages?.map((page) => page.places).flat()}
        // listHeaderCompoent={
        //   <LightningInfoContainer>
        //     <LightningInfoText>
        //       🚨(중요)모임 못 나가시면 오카방에서 상황 설명 후 앱에서 꼭 바로
        //       취소 부탁드리겠습니다.🚨
        //     </LightningInfoText>
        //   </LightningInfoContainer>
        // }
      />
    </Container>
  );
}

export default React.memo(MainLightningTab);

const HeaderContainer = styled.View`
  width: 100%;
  padding: 15px 20px 0px 20px;
`;

const HeaderTitle = styled(GeneralText)`
  font-family: ${fontFamilies.bold};
  font-size: 20px;
`;

const MainText = styled(GeneralText)`
  font-size: 12px;
  color: ${colors.midGrey};
  padding-top: 13px;
`;

const Container = styled.View`
  background-color: ${colors.bgColor};
  flex: 1;
`;

const LightningInfoContainer = styled.View``;

const LightningInfoText = styled(GeneralText)`
  line-height: 24px;
  color: ${colors.midGrey};
  font-size: 14px;
  line-height: 22px;
`;
