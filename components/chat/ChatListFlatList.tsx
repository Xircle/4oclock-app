import styled from "styled-components/native";
import React from "react";
import { colors, GeneralText } from "../../styles/styles";
import { IMessageRoom } from "../../lib/api/types";
import { IReceiverRoom } from "../../lib/api/types.d";
import AvatarUri from "../UI/AvatarUri";
import { ConvertSentTimeForList } from "../../lib/utils";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

interface Props {
  lastMessage: IMessageRoom;
  receiver: IReceiverRoom;
  latestMessageAt: Date;
}

export default function ChatListFlatList({
  lastMessage,
  receiver,
  latestMessageAt,
}: Props) {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        // @ts-ignore
        navigation.navigate("ChatRoom", { sender: receiver.username })
      }
    >
      <Container>
        <LeftContainer>
          <AvatarUri size={60} source={receiver.profileImageUrl} isSmall />
        </LeftContainer>
        <RightContainer>
          <TopRightContainer>
            <NameContainer>
              <NameText>{receiver.username}</NameText>
              {!lastMessage.isMe && !lastMessage.isRead && <Cong />}
            </NameContainer>
            <DateText>{ConvertSentTimeForList(latestMessageAt)}</DateText>
          </TopRightContainer>
          <MessageText isBlue={!lastMessage.isMe && !lastMessage.isRead}>
            {lastMessage.isMe || lastMessage.isRead
              ? lastMessage.content
              : "새로운 메세지가 도착했습니다"}
          </MessageText>
        </RightContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
}

const Container = styled.View`
  width: 100%;
  height: 80px;
  background-color: ${colors.bgColor};
  /* border-bottom-color: ${colors.lightBlack};
  border-bottom-width: 1px; */
  flex-direction: row;
  padding: 10px 20px;
`;

const LeftContainer = styled.View`
  width: 90px;
`;

const RightContainer = styled.View`
  flex: 1;
  justify-content: space-around;
`;

const NameText = styled(GeneralText)`
  color: ${colors.black};
`;

const MessageText = styled(NameText)<{ isBlue: boolean }>`
  color: ${(props) => (props.isBlue ? colors.mainBlue : colors.lightBlack)};
`;

const NameContainer = styled.View`
  flex-direction: row;
`;

const TopRightContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DateText = styled(NameText)`
  color: ${colors.lightBlack};
`;

const Cong = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${colors.mainBlue};
  margin-left: 2px;
`;
