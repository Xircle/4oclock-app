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

function MyModalCompare(prevProps: Props, nextProps: Props) {
  return (
    prevProps.visible === nextProps.visible &&
    prevProps.children === nextProps.children
  );
}

function MyModal({ children, onClose, visible }: Props) {
  //console.log("modal re-render");
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
            <Ionicons name="close" color={colors.black} size={40} />
          </ModalCloseButton>
        </ModalInnerWrapper>
      </ModalOuterWrapper>
    </Modal>
  );
}

export default React.memo(MyModal, MyModalCompare);

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
  top: 10px;
  right: 10px;
`;
