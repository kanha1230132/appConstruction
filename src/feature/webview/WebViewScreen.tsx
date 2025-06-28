import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { WebViewScreenProps } from "../../types/navigation";
import { SafeAreaWrapper } from "../../components/SafeAreaWrapper/SafeAreaWrapper";
import HeaderWithBackButton from "../../components/Button/HeaderWithBackButton";
import { goBack } from "../../utils/NavigationUtil";
import WebView from "react-native-webview";
import { useIsFocused } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import { AppColor } from "../../themes/AppColor";
import ActivityLoader from "../../components/Loader/ActivityLoader";

const WebViewScreen: React.FC<WebViewScreenProps> = ({ route }) => {
  const [WebUrl, setWebUrl] = useState("");
  const [ScreenTitle, setScreenTitle] = useState("");
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isFocused) {
      if (route.params) {
        const { url, title } = route.params;
        setWebUrl(url);
        setScreenTitle(title);
        setIsLoading(false);
      }
    }
  }, [route.params, isFocused]);
  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={ScreenTitle}
          onBackClick={() => goBack()}
          customStyle={undefined}
        />

        {isLoading ? (
         <ActivityLoader />
        ) : null}

        {!isLoading && WebUrl ? (
          <WebView source={{ uri: WebUrl, cacheEnabled: true }} />
        ) : null}
      </SafeAreaWrapper>
    </>
  );
};

export default WebViewScreen;

const styles = StyleSheet.create({});
