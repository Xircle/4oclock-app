import styled from "styled-components/native";
import React from "react";
import { Dimensions, TouchableWithoutFeedback } from "react-native";
import { openLink } from "../shared/Links";
import { colors, fontFamilies, GeneralText } from "../../styles/styles";
import { LinearGradient } from "expo-linear-gradient";
import Swiper from "react-native-swiper";

interface Props {}

const { width, height } = Dimensions.get("window");
function MainTopCarousel(props: Props) {
  return (
    <TopCarouselContainer>
      <Swiper
        loop
        horizontal
        autoplay
        autoplayTimeout={3.5}
        containerStyle={{ width: "100%", height: "100%" }}
        showsButtons={false}
        showsPagination={false}
      >
        <TouchableWithoutFeedback
          onPress={() =>
            openLink.LOpenLink(
              "https://longhaired-gym-a5e.notion.site/250885c37ef3433690f141e4bcae2d30"
            )
          }
        >
          <RegularMainListHeaderContainer>
            <RegularMainListHeaderImage
              source={require("../../statics/images/calendar.jpeg")}
            />
            <LinearGradient
              // Background Linear Gradient
              colors={["transparent", colors.black]}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                opacity: 0.7,
              }}
            />
            <RMLTextWrapper>
              <RegularMainListHeaderSubHeading>
                2/14~3/13에 어떤 활동들이 열릴까?
              </RegularMainListHeaderSubHeading>
              <RegularMainListHeaderHeading>
                연고이팅 2기 달력 {">"}
              </RegularMainListHeaderHeading>
            </RMLTextWrapper>
          </RegularMainListHeaderContainer>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() =>
            openLink.LOpenLink(
              "https://longhaired-gym-a5e.notion.site/54081710685b456aa31ec0665c21267f"
            )
          }
        >
          <RegularMainListHeaderContainer>
            <RegularMainListHeaderImage
              source={require("../../statics/images/RegularHeader.jpeg")}
            />
            <LinearGradient
              // Background Linear Gradient
              colors={["transparent", colors.black]}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                opacity: 0.7,
              }}
            />
            <RMLTextWrapper>
              <RegularMainListHeaderSubHeading>
                연고이팅 처음 가입했다면 필독!
              </RegularMainListHeaderSubHeading>
              <RegularMainListHeaderHeading>
                연고이팅 정기모임 가이드 {">"}
              </RegularMainListHeaderHeading>
            </RMLTextWrapper>
          </RegularMainListHeaderContainer>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() =>
            openLink.LOpenLink(
              "https://longhaired-gym-a5e.notion.site/823262fe528e4d3d9ceca8800764dcfe"
            )
          }
        >
          <RegularMainListHeaderContainer>
            <RegularMainListHeaderImage
              source={require("../../statics/images/LightningHeader.jpeg")}
            />
            <LinearGradient
              // Background Linear Gradient
              colors={["transparent", colors.black]}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                opacity: 0.7,
              }}
            />
            <RMLTextWrapper>
              <RegularMainListHeaderSubHeading>
                연고이팅 번개는 누구나 열고 참여가능하다구 {"><"}
              </RegularMainListHeaderSubHeading>
              <RegularMainListHeaderHeading>
                연고이팅 번개모임 가이드 {">"}
              </RegularMainListHeaderHeading>
            </RMLTextWrapper>
          </RegularMainListHeaderContainer>
        </TouchableWithoutFeedback>
      </Swiper>
    </TopCarouselContainer>
  );
}

export default MainTopCarousel;

const RegularMainListHeaderContainer = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${colors.black};
  justify-content: flex-end;
`;

const RMLTextWrapper = styled.View`
  padding: 11px;
  padding-left: 13px;
`;

const RegularMainListHeaderImage = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const RegularMainListHeaderHeading = styled(GeneralText)`
  color: ${colors.bgColor};
  font-size: 20px;
  font-family: ${fontFamilies.bold};
`;

const TopCarouselContainer = styled.View`
  width: ${width + "px"};
  height: 150px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

const RegularMainListHeaderSubHeading = styled(RegularMainListHeaderHeading)`
  font-size: 12px;
  font-family: ${fontFamilies.regular};
  padding-bottom: 2px;
`;
