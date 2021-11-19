import styled from "styled-components/native";
import SelectDropdown from "react-native-select-dropdown";
import React from "react";
import { colors } from "../../styles/styles";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  data: any;
  width: number;
  onSelect: (selectedItem: any, index: any) => void;
  defaultButtonText: string;
}

export default function MySelect({ data, width }: Props) {
  return (
    <SelectDropdown
      data={data}
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index);
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        // text represented after item is selected
        // if data array is an array of objects then return selectedItem.property to render after item is selected
        return selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        // text represented for each item in dropdown
        // if data array is an array of objects then return item.property to represent item in dropdown
        return item;
      }}
      buttonStyle={{
        backgroundColor: colors.bgColor,
        borderColor: colors.bareGrey,
        borderWidth: 1,
        borderRadius: 12,
        width: width,
        marginTop: 20,
        height: 40,
      }}
      buttonTextStyle={{
        color: colors.bareGrey,
        fontSize: 16,
        textAlign: "left",
      }}
      defaultButtonText="MBTI를 설정해주세요"
      dropdownIconPosition={"right"}
      renderDropdownIcon={() => {
        return (
          <Ionicons name="chevron-down" color={colors.bareGrey} size={18} />
        );
      }}
    />
  );
}
