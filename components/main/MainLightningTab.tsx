import { LinearGradient } from "expo-linear-gradient";
import React, { PureComponent, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import FastImage from "react-native-fast-image";
import Swiper from "react-native-swiper";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import styled from "styled-components/native";
import { getParties } from "../../lib/api/getParties";
import { getPlacesLightning } from "../../lib/api/getPlaces";
import { GetPlacesByLocationOutput, PartyData } from "../../lib/api/types";
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

  const { data: partyData } = useQuery<PartyData[]>(
    ["parties"],
    getParties,
    {}
  );

  useEffect(() => {
    if (partyData) console.log(partyData);
  }, [partyData]);

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
        {partyData ? (
          <LightningInfoContainer>
            <HeaderTitle>🎉KEVIN's party zone</HeaderTitle>
            <MainText>케빈이 준비한 파티, 이벤트가 올라오는 공간이야!</MainText>
            <SwiperContainer>
              <Swiper
                loop
                horizontal
                autoplay
                autoplayTimeout={20}
                containerStyle={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 15,
                  overflow: "hidden",
                }}
                showsButtons={false}
                showsPagination={false}
              >
                {partyData?.map((item, index) => {
                  return (
                    <SwiperWrapper key={index}>
                      <SwiperImage source={{ uri: item.images[0] }} />
                      <LinearGradient
                        // Background Linear Gradient
                        colors={["transparent", "transparent", colors.black]}
                        style={{
                          position: "absolute",
                          left: 0,
                          right: 0,
                          top: 0,
                          bottom: 0,
                        }}
                      />
                      <TextContainer>
                        <InvitationContainer>
                          <InvitationDetail>
                            {item.invitationDetail}
                          </InvitationDetail>
                        </InvitationContainer>
                        <PartyNameText>{item.name}</PartyNameText>
                        <Description>{item.description}</Description>
                      </TextContainer>
                    </SwiperWrapper>
                  );
                })}
              </Swiper>
            </SwiperContainer>
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
        listHeaderCompoent={<View />}
      />
    </Container>
  );
}

export default React.memo(MainLightningTab);

const SwiperContainer = styled.View`
  width: 100%;
  height: 180px;
  margin-top: 3px;
`;
const SwiperWrapper = styled.View`
  width: 100%;
  height: 100%;
  position: relative;
`;
const SwiperImage = styled(FastImage)`
  width: 100%;
  height: 100%;
`;
const TextContainer = styled.View`
  position: absolute;
  left: 20px;
  bottom: 20px;
`;

const PartyNameText = styled(GeneralText)`
  color: ${colors.bgColor};
  font-family: ${fontFamilies.bold};
`;

const InvitationContainer = styled.View`
  background-color: #fa4444;
  padding: 5px;
  border-radius: 10px;
  overflow: hidden;
`;

const InvitationDetail = styled(GeneralText)`
  color: ${colors.bgColor};
  font-family: ${fontFamilies.bold};
  font-size: 11px;
`;

const Description = styled(GeneralText)`
  color: ${colors.bgColor};
  font-family: ${fontFamilies.light};
  font-size: 12px;
`;

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
