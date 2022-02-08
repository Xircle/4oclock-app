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
  defaultValueByIndex?: number;
  defaultValue?: string;
}

export default function MySelect({
  data,
  width,
  defaultButtonText,
  defaultValueByIndex,
  onSelect,
  defaultValue,
}: Props) {
  if (defaultValue) {
    return (
      <SelectDropdown
        data={data}
        onSelect={(selectedItem, index) => {
          onSelect(selectedItem, index);
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
        defaultValue={defaultValue}
        buttonStyle={{
          backgroundColor: colors.bgColor,
          borderColor: colors.bareGrey,
          borderWidth: 1,
          borderRadius: 12,
          width: width,
          marginTop: 20,
          height: 40,
        }}
        dropdownStyle={{ borderRadius: 5 }}
        buttonTextStyle={{
          color: colors.bareGrey,
          fontSize: 16,
          textAlign: "left",
        }}
        defaultButtonText={defaultButtonText}
        dropdownIconPosition={"right"}
        renderDropdownIcon={() => {
          return (
            <Ionicons name="chevron-down" color={colors.bareGrey} size={18} />
          );
        }}
      />
    );
  } else if (defaultValueByIndex) {
    return (
      <SelectDropdown
        data={data}
        onSelect={(selectedItem, index) => {
          onSelect(selectedItem, index);
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
        defaultValueByIndex={defaultValueByIndex}
        buttonStyle={{
          backgroundColor: colors.bgColor,
          borderColor: colors.bareGrey,
          borderWidth: 1,
          borderRadius: 12,
          width: width,
          marginTop: 20,
          height: 40,
        }}
        dropdownStyle={{ borderRadius: 5 }}
        buttonTextStyle={{
          color: colors.bareGrey,
          fontSize: 16,
          textAlign: "left",
        }}
        defaultButtonText={defaultButtonText}
        dropdownIconPosition={"right"}
        renderDropdownIcon={() => {
          return (
            <Ionicons name="chevron-down" color={colors.bareGrey} size={18} />
          );
        }}
      />
    );
  } else {
    return (
      <SelectDropdown
        data={data}
        onSelect={(selectedItem, index) => {
          onSelect(selectedItem, index);
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
        dropdownStyle={{ borderRadius: 5 }}
        buttonTextStyle={{
          color: colors.bareGrey,
          fontSize: 16,
          textAlign: "left",
        }}
        defaultButtonText={defaultButtonText}
        dropdownIconPosition={"right"}
        renderDropdownIcon={() => {
          return (
            <Ionicons name="chevron-down" color={colors.bareGrey} size={18} />
          );
        }}
      />
    );
  }
}
