import {
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NotificationScreenProps } from "../../types/navigation";
import HeaderWithBackButton from "../../components/Button/HeaderWithBackButton";
import { SafeAreaWrapper } from "../../components/SafeAreaWrapper/SafeAreaWrapper";
import { AppText } from "../../constants/appText";
import { goBack, navigate } from "../../utils/NavigationUtil";
import ScrollViewWrapper from "../../components/ScrollViewWrapper/ScrollViewWrapper";
import RestClient from "../../api/restClient";
import { NotificationRespionse } from "../../api/apiInterface";
import useToastHook from "../../hooks/toast";
import moment from "moment";
import { AppColor } from "../../themes/AppColor";
import { moderateScale } from "react-native-size-matters";
import { Card } from "react-native-paper";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import ActivityLoader from "../../components/Loader/ActivityLoader";
import NotFoundText from "../../components/CustomText/NotFoundText";
import { screenNames } from "../../navigation/ScreenNames";

const NotificationScreen: React.FC<NotificationScreenProps> = () => {
  const [NotificationList, setNotificationList] = useState<
    NotificationRespionse[]
  >([]);
  const { showToast } = useToastHook();
  const isFocused = useIsFocused();
  const [loading, setloading] = useState(false);
  const navigation = useNavigation();


  useEffect(() => {
    if (isFocused) {
      getNotifications();
    }
  }, [isFocused]);

  const getNotifications = async () => {
    try {
      setloading(true);
      const restClient = new RestClient();
      const response = await restClient.getNotifications();
      if (response && typeof response !== "string") {
        setNotificationList(response.data);
      } else {
        showToast(response || "Something went wrong", "danger");
      }
    } catch (error) {
      setloading(false);
      showToast("Something went wrong", "danger");
    } finally {
      setloading(false);
    }
  };

  const markNotificationAsRead = async (id: number) => {
    try {
      const restClient = new RestClient();
      const param = {
        id: [id],
      };
      const response = await restClient.updateNotificationStatus(param); // Replace with actual method name
      if (response && typeof response !== "string") {
        setNotificationList((prev) =>
          prev.map((item) => (item.id === id ? { ...item, is_read: 1 } : item))
        );
      }
    } catch (error) {
      showToast("Failed to update notification", "danger");
    }
  };

  const renderNotificationItem = ({
    item,
  }: {
    item: NotificationRespionse;
  }) => (
    <Card
      style={{
        backgroundColor: item.is_read ? AppColor.WHITE : "#E3F2FD",
        padding: 14,
        marginBottom: 12,
        marginHorizontal: 1,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          if (item.is_read == 0) {
            markNotificationAsRead(item.id);
          }
        //    navigation.reset({
        //   index: 0,
        //   routes: [
        //     {
        //       name: screenNames.HomeTabs,
        //       state: {
        //         routes: [
        //           { name: screenNames.ExpenseScreen },
        //         ],
        //       },
        //     },
        //   ],
        // });
 navigation.reset({
  index: 0,
  routes: [
    {
      name: screenNames.MainApp, // DrawerNavigator is registered as MainApp in your root stack
      state: {
        routes: [
          {
            name: screenNames.HomeTabs,
            state: {
              routes: [{ name: screenNames.ExpenseScreen }],
              index: 0,
            },
          },
        ],
      },
    },
  ],
});

        }}
        style={[styles.notificationCard]}
      >
        <View style={styles.notificationContent}>
          <Text style={styles.subjectText}>{item.subject}</Text>
          <Text style={styles.messageText}>{item.message}</Text>
          <Text style={styles.dateText}>
            {moment(item.created_at).format("DD MMM YYYY, hh:mm A")}
          </Text>
        </View>
      </TouchableOpacity>
    </Card>
  );

  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={AppText.Notification}
          onBackClick={() => goBack()}
        />
        <ScrollViewWrapper>
          {loading ? <ActivityLoader /> : null}

          {
            NotificationList.length == 0 && !loading ? (
              <View style={{ marginTop: 20 }}>
                <NotFoundText message="No notification found" />
              </View>
            ) : null
          }
          {
            NotificationList.length > 0 && !loading ? (
              <FlatList
            data={NotificationList}
            renderItem={renderNotificationItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
          />
            ) : null
          }

         
        </ScrollViewWrapper>
      </SafeAreaWrapper>
    </>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  listContainer: {},
  notificationCard: {
    borderRadius: moderateScale(10),
  },
  notificationContent: {
    flexDirection: "column",
  },
  subjectText: {
    fontSize: moderateScale(16),
    fontWeight: "bold",
    color: AppColor.PRIMARY,
    marginBottom: 4,
  },
  messageText: {
    fontSize: moderateScale(14),
    color: AppColor.BLACK,
    marginBottom: 6,
  },
  dateText: {
    fontSize: moderateScale(12),
       color: AppColor.BLACK,
    textAlign: "right",
  },
});
