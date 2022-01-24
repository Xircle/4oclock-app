import { Animated, Dimensions, Modal, PanResponder, View } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../styles/styles";
import React, { useRef } from "react";

interface Props {
  children: React.ReactNode | React.ReactNode[];
  width?: number;
  height?: number;
  onClose: () => void;
  visible: boolean;
  setModal: () => void;
}

const { width, height } = Dimensions.get("window");

export default function MyBottomModal({
  visible,
  onClose,
  children,
  setModal,
}: Props) {
  // pan responders

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Container onPress={setModal}></Container>
      <ModalWrapper
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,

          elevation: 24,
        }}
      >
        {children}
      </ModalWrapper>
    </Modal>
  );
}

const Container = styled.TouchableOpacity`
  flex: 1;
`;

const ModalWrapper = styled.View`
  width: ${width + "px"};
  height: ${"200px"};
  background-color: ${colors.bgColor};
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  position: absolute;
  bottom: 0;
  justify-content: space-evenly;
  align-items: center;
`;
