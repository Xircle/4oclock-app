import styled from "styled-components/native";
import { Modal } from "react-native";
import { useEffect, useState } from "react";
import { colors, fontFamilies, GeneralText } from "../../styles/styles";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  children: React.ReactNode | React.ReactNode[];
  width?: number;
  height?: number;
  onClose: () => void;
  visible: boolean;
}

export default function MyModal({ children, onClose, visible }: Props) {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <ModalOuterWrapper>
        <ModalInnerWrapper>
          <ModalCloseButton onPress={onClose}>
            <Ionicons name="close" color={colors.bgColor} size={30} />
            {children}
          </ModalCloseButton>
        </ModalInnerWrapper>
      </ModalOuterWrapper>
    </Modal>
  );
}

const ModalOuterWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(52, 52, 52, 0.8);
`;

const ModalInnerWrapper = styled.View`
  width: 300px;
  height: 500px;
  background-color: ${colors.bgColor};
  align-items: center;
  justify-content: space-evenly;
  border-radius: 15px;
  position: relative;
`;

const ModalCloseButton = styled.TouchableOpacity`
  position: absolute;
  top: -30px;
  right: 0;
`;
