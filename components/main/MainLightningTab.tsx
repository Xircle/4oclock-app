import React, { PureComponent, useMemo, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "react-query";
import styled from "styled-components/native";
import { getPlacesLightning } from "../../lib/api/getPlaces";
import { GetPlacesByLocationOutput } from "../../lib/api/types";
import { colors, GeneralText } from "../../styles/styles";
import MainFeed from "./MainFeed";
import { renderItemLightning } from "./MainRenderItems";

interface Props {}
function MainLightningTab(props: Props) {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();

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
      <MainFeed
        loadMore={loadMoreLightning}
        onRefresh={onRefreshLightning}
        refreshing={refreshing}
        renderItem={memoizedValueLightning}
        places={mainLightningData?.pages?.map((page) => page.places).flat()}
        listHeaderCompoent={
          <LightningInfoContainer>
            <LightningInfoText>
              π¨(μ€μ)λͺ¨μ λͺ» λκ°μλ©΄ μ€μΉ΄λ°©μμ μν© μ€λͺ ν μ±μμ κΌ­ λ°λ‘
              μ·¨μ λΆνλλ¦¬κ² μ΅λλ€.π¨
            </LightningInfoText>
          </LightningInfoContainer>
        }
      />
    </Container>
  );
}

export default React.memo(MainLightningTab);

const Container = styled.View`
  background-color: ${colors.bgColor};
  flex: 1;
`;

const LightningInfoContainer = styled.View``;

const LightningInfoText = styled(GeneralText)`
  line-height: 24px;
  color: ${colors.midGrey};
  padding-left: 10px;
  padding-right: 10px;
  font-size: 14px;
  line-height: 22px;
`;
