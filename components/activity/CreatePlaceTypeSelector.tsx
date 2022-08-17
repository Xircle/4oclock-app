import styled from "styled-components/native";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { colors, fontFamilies, GeneralText } from "../../styles/styles";
import storage, { StorageKey } from "../../lib/helpers/myAsyncStorage";
import FullScreenLoader from "../UI/FullScreenLoader";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  onPress: (string) => void;
  selectedType: string;
}

const { width } = Dimensions.get("window");

const types = ["번개", "정기", "이벤트"];

export default function CreatePlaceTypeSelector({
  onPress,
  selectedType,
}: Props) {
  const [accountType, setAccountType] = useState("");

  useEffect(() => {
    let mounted = true;

    async function fetchAccountType() {
      if (mounted) {
        const accountFromStorage = await storage.getItem(
          StorageKey.accountType
        );
        setAccountType(accountFromStorage);
        console.log(accountFromStorage);
      }
    }
    function cleanUp() {
      mounted = false;
    }
    fetchAccountType();

    return cleanUp();
  }, []);
  function Select(value: string) {
    if (value === types[0]) {
      onPress(value);
    } else if (accountType === "Owner" && value === types[1]) {
      onPress(value);
    }
  }

  return (
    <Container>
      <SelectContainer
        onPress={() => Select(types[0])}
        selected={selectedType === types[0]}
      >
        <Label selected={selectedType === types[0]}>
          케빈의 클럽 번개모임 열기 ⭐️
        </Label>
        <SubLabel selected={selectedType === types[0]}>
          누구든 열 수 있고, 새로운 친구들과 놀고 싶을 때 놀러가자!
        </SubLabel>
      </SelectContainer>
      <SelectContainer
        onPress={() => Select(types[1])}
        selected={selectedType === types[1]}
      >
        <Label selected={selectedType === types[1]}>
          케빈의 클럽 정기모임 열기 👽
        </Label>
        <SubLabel selected={selectedType === types[1]}>
          리더가 여는 케빈의 클럽 컨텐츠로 꿀잼 비행모임
        </SubLabel>
        {accountType !== "Owner" && (
          <Disabler>
            <Ionicons name="lock-closed" size={50} color="black" />
          </Disabler>
        )}
      </SelectContainer>
      <SelectContainer
        onPress={() => Select(types[2])}
        selected={selectedType === types[2]}
      >
        <Label selected={selectedType === types[2]}>
          케빈의 클럽 파티 열기 🔥️
        </Label>
        <SubLabel selected={selectedType === types[2]}>
          운영진만 열 수 있어요!
        </SubLabel>
        <Disabler>
          <Ionicons name="lock-closed" size={50} color="black" />
        </Disabler>
      </SelectContainer>
    </Container>
  );
}

const Disabler = styled.View`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.5;
  border-radius: 9px;
  background-color: ${colors.white};
  position: absolute;
  justify-content: center;
  align-items: center;
`;

const SelectContainer = styled.TouchableOpacity<{ selected: boolean }>`
  width: 100%;
  height: 85px;
  border-radius: 9px;
  background-color: ${(props) =>
    props.selected ? colors.vividBlue : "#ebebeb"};
  margin-bottom: 18px;
  padding: 11px;
  padding-top: 16px;
  padding-bottom: 16px;
  justify-content: space-between;
`;

const Label = styled(GeneralText)<{ selected: boolean }>`
  font-family: ${fontFamilies.bold};
  color: ${(props) => (props.selected ? colors.white : colors.black)};
`;

const SubLabel = styled(GeneralText)<{ selected: boolean }>`
  font-size: 10px;
  color: ${(props) => (props.selected ? colors.white : "#959595")};
`;

const Container = styled.View`
  width: ${width * 0.9 + "px"};
  height: 100%;
`;
