// components/CustomDrawer.js
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Switch } from "react-native-paper";
import { AppColor } from "../../themes/AppColor";
import { AppFonts } from "../../themes/AppFonts";
import { images } from "../../assets";
import { Image } from "react-native";
import TabButton from "../components/TabButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useConfirmationPopup } from "../../components/Popup/confirmationPopup";
import { logoutUser, userIsBoss } from "../../store/slice/UserSlice";
import { navigate, resetAndNavigate } from "../../utils/NavigationUtil";
import { screenNames } from "../ScreenNames";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { AppText } from "../../constants/appText";
import Divider from "../components/Divider";
import useToastHook from "../../hooks/toast";
import RestClient from "../../api/restClient";
import { useNavigation } from "@react-navigation/native";
import { ScreenType } from "../../types/screenTypes";

export interface CustomDrawerProps {
  navigation: any;
}

export default function CustomDrawer(props: CustomDrawerProps) {
  const { UserName, UserEmail, IsBoss } = useSelector(
    (state: RootState) => state.User
  );
  const { showConfirmationPopup, ConfirmationPopup, popupVisible } =
    useConfirmationPopup();
  const { showToast } = useToastHook();

  const onToggleSwitch = async (value: boolean) => {
    const restClient = new RestClient();
    const response = await restClient.updateBossPermission(value);
    if (response && typeof response != "string") {
      showToast(response.message, "success");
      dispatch(userIsBoss(value));
      return;
    }
    showToast(response, "success");
  };
  const dispatch = useDispatch();

  const comingSoon = () => {
    showToast(AppText.ComingSoon, "normal");
  };

  const callToLogout = async () => {
    props.navigation.closeDrawer();
    const result = await showConfirmationPopup(
      "Logout",
      "Are you sure you want to logout?",
      "Logout",
      "Cancel"
    );
    if (!result) {
      return;
    }
    dispatch(logoutUser());
    resetAndNavigate(screenNames.LoginScreen);
  };

  // useEffect(()=>{
  //   dispatch(userIsBoss(!IsBoss))
  // },[IsBoss])

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Close Icon */}
        <TouchableOpacity
          style={styles.closeIcon}
          onPress={() => props.navigation.closeDrawer()}
        >
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>

        <View>
          <Image source={images.USER} style={{ height: 50, width: 50 }} />
        </View>
        <View
          style={{
            gap: 4,
            marginTop: 10,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: AppFonts.Bold,
              color: AppColor.BLACK,
            }}
          >
            {UserName}
          </Text>

          <Text
            style={{
              fontSize: 15,
              fontFamily: AppFonts.Regular,
              color: AppColor.BLACK_70,
            }}
          >
            {UserEmail}
          </Text>

          {/* <TouchableOpacity
            onPress={() => {}}
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 10,
              borderRadius: 6,
              marginTop: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 15,
              }}
            >
              <FontAwesome5
                name={"user-tie"}
                size={24}
                color={AppColor.PRIMARY}
              />
              <Text>{"Is Boss"}</Text>
            </View>
            <Switch
              color={AppColor.PRIMARY}
              value={IsBoss}
              onValueChange={(value) => onToggleSwitch(value)}
            />
          </TouchableOpacity> */}
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            width: "100%",
            marginTop: 20,
            padding: 0,
            // justifyContent: "space-around",
          }}
        >
          {IsBoss ? (
            <>
              <TabButton
                label={"Add User"}
                onPress={() => navigate(screenNames.AddUserScreen)}
                icon={"person-add-alt-1"}
              />
              <Divider />
            </>
          ) : null}

          <TabButton
            label={"Logos"}
            onPress={() => navigate(screenNames.LogoScreen)}
            icon={"photo-size-select-actual"}
          />
          <Divider />

          <TabButton
            label={"About Us"}
            onPress={() =>
              navigate(screenNames.WebViewScreen, {
                url: "https://www.kps.ca/about",
                title: "About Us",
              })
            }
            icon={"info"}
          />
          <Divider />
          <TabButton
            label={"Change Password"}
            onPress={() => {
              navigate(screenNames.ResetPasswordScreen, {
                UserEmail,
                title: AppText.ChangePassword,
              });
            }}
            icon={"lock"}
          />
          <Divider />
          <TabButton
            label={"Terms & Conditions"}
            onPress={() => comingSoon()}
            icon={"description"}
          />
          <Divider />

          <TabButton
            label={"Privacy Policy"}
            onPress={() => comingSoon()}
            icon={"privacy-tip"}
          />
          <Divider />

          <TabButton
            label={"Contact Us"}
            onPress={() =>
              navigate(screenNames.WebViewScreen, {
                url: "https://www.kps.ca/contact",
                title: "Contact Us",
              })
            }
            icon={"contacts"}
          />
          <Divider />

          <TabButton
            label={"Help"}
            onPress={() => comingSoon()}
            icon={"help"}
          />
          <Divider />
          <TabButton
            label={"Share Report"}
            onPress={() =>
              navigate(screenNames.ScheduleListScreen, {
                type: ScreenType.PDF,
              })
            }
            icon={"picture-as-pdf"}
          />
          <Divider />
        </ScrollView>
      </View>
      <TabButton
        label={"Logout"}
        onPress={() => callToLogout()}
        icon={"logout"}
      />

      {popupVisible && <ConfirmationPopup />}
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 30, alignItems: "center" },
  header: { fontSize: 20, marginBottom: 20, marginTop: 20 },
  link: { marginVertical: 10 },
  text: { fontSize: 16 },
  closeIcon: {
    alignSelf: "flex-start",
    padding: 8,
    marginBottom: 10,
    position: "absolute",
    top: -20,
  },
});
