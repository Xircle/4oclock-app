import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import styled from "styled-components/native";
import { getPlacesRegular } from "../../lib/api/getPlaces";
import { getPoint } from "../../lib/api/getPoint";
import { getUser } from "../../lib/api/getUser";
import {
  GetPlacesByLocationOutput,
  PointData,
  UserData,
} from "../../lib/api/types";
import storage, { StorageKey } from "../../lib/helpers/myAsyncStorage";
import { colors } from "../../styles/styles";
import CountFC from "./CountFC";
import MainFeed from "./MainFeed";
import { renderRegular } from "./MainRenderItems";

interface Props {}

function MainRegularTab(props: Props) {
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
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
  }, []);

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

  return (
    <Container>
      <MainFeed
        loadMore={loadMoreRegular}
        onRefresh={onRefreshRegular}
        refreshing={refreshing}
        renderItem={memoizedValueRegular}
        places={mainRegularData?.pages?.map((page) => page.places).flat()}
        listHeaderCompoent={
          <CountFC
            totalPointThisSeason={pointData?.totalPointThisSeason}
            myPointThisSeason={pointData?.myPointThisSeason}
          />
        }
      />
    </Container>
  );
}

export default React.memo(MainRegularTab);

const Container = styled.View`
  background-color: ${colors.white};
  flex: 1;
`;
