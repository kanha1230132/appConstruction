import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { PhotoFilesScreenProps } from "../../types/navigation";
import { SchedulesResponse } from "../../api/apiInterface";
import { SafeAreaWrapper } from "../../components/SafeAreaWrapper/SafeAreaWrapper";
import HeaderWithBackButton from "../../components/Button/HeaderWithBackButton";
import { goBack, navigate } from "../../utils/NavigationUtil";
import ScrollViewWrapper from "../../components/ScrollViewWrapper/ScrollViewWrapper";
import { AppFonts } from "../../themes/AppFonts";
import { AppColor } from "../../themes/AppColor";
import { images } from "../../assets";

const PhotoFilesScreen: React.FC<PhotoFilesScreenProps> = ({ route }) => {
  const [ProjectList, setProjectList] = useState<SchedulesResponse>();
  useEffect(() => {
    if (route.params) {
      const { project } = route.params;
      if (project) {
        setProjectList(project);
      }
      console.log(project);
    }
  }, []);
  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={`Photo Files (${ProjectList?.projectName})`}
          onBackClick={() => goBack()}
          customStyle={undefined}
        />
        <ScrollViewWrapper>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 10,
              backgroundColor: AppColor.GREY_F9,
              paddingHorizontal: 10,
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: AppFonts.Medium,
              }}
            >
              Photos
            </Text>
            <TouchableOpacity
              onPress={() => {}}
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: AppColor.PRIMARY,
                paddingVertical: 2,
                paddingHorizontal: 10,
                borderRadius: 5,
              }}
            >
              <Image
                source={images.ADD_IMAGE_ICON}
                style={{ width: 27, height: 27 }}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "regular",
                }}
              >
                Take Pictures
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollViewWrapper>
      </SafeAreaWrapper>
    </>
  );
};

export default PhotoFilesScreen;

const styles = StyleSheet.create({});
