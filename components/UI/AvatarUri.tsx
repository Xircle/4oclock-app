import styled from "styled-components/native";
import React from "react";

interface Props {
  source: string;
  size: number;
}

export default function AvatarUri({ size, source }: Props) {
  return <AvatarImage source={{ uri: source }} size={size} />;
}

const AvatarImage = styled.Image<{ size: number }>`
  width: ${(props) => props.size + "px"};
  height: ${(props) => props.size + "px"};
  border-radius: ${(props) => props.size / 2 + "px"};
`;
