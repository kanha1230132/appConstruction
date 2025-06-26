import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useToast } from "react-native-toast-notifications";

const useToastHook = () => {
  const toast = useToast();

  const showToast = (
    message: string,
    type: "normal" | "success" | "warning" | "danger" | "custom"
  ) => {
    toast.show(message, {
      type: type,
      placement: "bottom",
      duration: 2000,
      swipeEnabled: true,
    });
  };
  return {
    showToast,
  };
};

export default useToastHook;

const styles = StyleSheet.create({});
