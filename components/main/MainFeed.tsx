import styled from "styled-components/native";
import React from "react";
import { OptimizedFlatList } from "react-native-optimized-flatlist";
import { PlaceFeedData } from "../../lib/api/types";
import { colors } from "../../styles/styles";

interface Props {
  loadMore: () => void;
  onRefresh: () => void;
  refreshing: boolean;
  places: PlaceFeedData[];
  renderItem: ({ item }: { item: any }) => JSX.Element;
  listHeaderCompoent: JSX.Element;
}

function AreEqual(prevProps: Props, nextProps: Props) {
  return prevProps.places === nextProps.places;
}

function MainFeed({
  loadMore,
  onRefresh,
  refreshing,
  places,
  renderItem,
  listHeaderCompoent,
}: Props) {
  //console.log("mainFeed Render");
  const placeFlatlistKeyExtractor = (item: PlaceFeedData, index) =>
    item.id + "" + index;
  return (
    <Container
      disableVirtualization={false}
      showsVerticalScrollIndicator={false}
      onEndReached={loadMore}
      onEndReachedThreshold={0.2}
      onRefresh={onRefresh}
      refreshing={refreshing}
      keyExtractor={placeFlatlistKeyExtractor}
      // @ts-ignore
      data={places}
      renderItem={renderItem}
      ListHeaderComponent={listHeaderCompoent}
    />
  );
}

export default React.memo(MainFeed, AreEqual);

const Container = styled(OptimizedFlatList)`
  background-color: ${colors.bgColor};
  width: 100%;
  height: 100%;
  padding: 15px 20px;
`;
