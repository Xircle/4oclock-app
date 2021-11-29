import styled from "styled-components/native";
import React from "react";
import { colors, fontFamilies, GeneralText } from "../../styles/styles";
import { Alert, Dimensions, TouchableOpacity } from "react-native";
import optimizeImage from "../../lib/helpers/optimizeImage";
import { useNavigation } from "@react-navigation/native";
import MyBackButton from "../../components/UI/MyBackButton";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "react-query";
import { PlaceData } from "../../lib/api/types.d";
import { getPlaceById } from "../../lib/api/getPlaceById";

interface Props {
  coverImage: string;
  id: string;
  name: string;
}

const { width, height } = Dimensions.get("window");

export default function Activity({ coverImage, id, name }: Props) {
  const navigation = useNavigation();

  console.log(id);
  const { data: activityData, isLoading } = useQuery<PlaceData | undefined>(
    ["place-detail", id],
    () => getPlaceById(id),
    {
      onError: (err: any) => {
        Alert.alert(err);
        return;
      },
      retry: 1,
      refetchOnWindowFocus: false,
    }
  );
  return (
    <Container>
      <CoverImage source={{ uri: optimizeImage(coverImage) }} />
      <ScrollView>
        <InnerWrapper>
          <Heading>{name}</Heading>
        </InnerWrapper>
      </ScrollView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  position: relative;
`;

const CoverImage = styled.Image`
  width: ${width + "px"};
  height: ${height * 0.3 + "px"};
`;

const InnerWrapper = styled.View`
  margin: 22px 0;
  padding: 18px;
`;

const ScrollView = styled.ScrollView`
  flex: 1;
`;

const Heading = styled(GeneralText)`
  font-family: ${fontFamilies.medium};
  font-size: 22px;
`;
