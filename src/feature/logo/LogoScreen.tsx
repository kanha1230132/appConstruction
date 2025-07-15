import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { LogoScreenProps } from "../../types/navigation";
import { SafeAreaWrapper } from "../../components/SafeAreaWrapper/SafeAreaWrapper";
import HeaderWithBackButton from "../../components/Button/HeaderWithBackButton";
import { goBack, navigate } from "../../utils/NavigationUtil";
import RestClient from "../../api/restClient";
import { CompanyLogoResponse } from "../../api/apiInterface";
import useToastHook from "../../hooks/toast";
import { Card, FAB } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AppColor } from "../../themes/AppColor";
import ScrollViewWrapper from "../../components/ScrollViewWrapper/ScrollViewWrapper";
import { screenNames } from "../../navigation/ScreenNames";
import ActivityLoader from "../../components/Loader/ActivityLoader";
import { moderateScale } from "react-native-size-matters";
import { useIsFocused } from "@react-navigation/native";

const LogoScreen: React.FC<LogoScreenProps> = () => {
  const [Logos, setLogos] = useState<CompanyLogoResponse[]>([]);
  const [Loading, setLoading] = useState(false);
  const { showToast } = useToastHook();
  const isFocused = useIsFocused();


  useEffect(() => {
    if(isFocused){
    getLogos();
    }
  }, [isFocused]);

  const getLogos = async () => {
    try {
        setLoading(true);
      const restClient = new RestClient();
      const response = await restClient.getLogo();
      if (response && typeof response != "string") {
        setLogos(response);
      } else {
        showToast(response || "Something went wrong", "danger");
      }
      console.log("response : ", JSON.stringify(response));
    } catch (error) {
      console.log("Error getLogos : ", error);
      showToast("Something went wrong", "danger");
    } finally {
        setLoading(false);
    }
  };

  const onClickLogo = (item:CompanyLogoResponse) => {
    navigate(screenNames.LogoUploadScreen, {
      logo: item,});
  };

  const renderLogo = ({
    item,
    index,
  }: {
    item: CompanyLogoResponse;
    index: number;
  }) => {
    return (
      <>
        <Card 
        key={index.toString()}
          style={{
            backgroundColor: AppColor.WHITE,
            marginVertical: 5,
            padding: moderateScale(6),
            marginHorizontal:2
          }}
        >
          <TouchableOpacity
          onPress={()=> {onClickLogo(item)}}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: 6,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: 6,
                gap: 20,
              }}
            >
              <Image
                source={{ uri: item.file_url }}
                style={{ width: 70, height: 70 }}
              />
              <Text>{item.companyName}</Text>
            </View>

            <MaterialIcons
              name="chevron-right"
              size={24}
              color={AppColor.BLACK}
            />
          </TouchableOpacity>
        </Card>
      </>
    );
  };

  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={"Logos"}
          onBackClick={() => goBack()}
          customStyle={undefined}
        />

        

        <ScrollViewWrapper>
            {
            Loading && Logos.length ==0 ?

            <ActivityLoader /> : null
        }
          {!Loading && Logos.length > 0 ? (
            <FlatList
              data={Logos}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderLogo}
              showsVerticalScrollIndicator={false}
              style={{ paddingBottom:40}}
            />
          ) : null}
        </ScrollViewWrapper>
      </SafeAreaWrapper>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigate(screenNames.LogoUploadScreen)}
        color={AppColor.WHITE}
      />
    </>
  );
};

export default LogoScreen;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 20,
    right: 7,
    bottom: 7,
    backgroundColor: AppColor.PRIMARY,
    color: AppColor.WHITE,
    borderRadius: 100,
  },
});
