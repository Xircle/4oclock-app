import styled from "styled-components/native";
import React from "react";
import { Modal } from "react-native";
import { colors } from "../../styles/styles";
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
          {children}
          <ModalCloseButton onPress={onClose}>
            <Ionicons name="close" color={colors.bgColor} size={30} />
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
  height: 400px;
  background-color: ${colors.bgColor};
  align-items: center;
  border-radius: 15px;
  position: relative;
  padding-top: 60px;
  padding-bottom: 60px;
`;

const ModalCloseButton = styled.TouchableOpacity`
  position: absolute;
  top: -30px;
  right: 0;
`;
