import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import DateTimePicker from "react-native-modal-datetime-picker";
import { DateFormat } from "../../../utils/dateUtil";
import IconTextInput from "../../../components/CustomTextInput/CustomIconTextInput";
import { AppFonts } from "../../../themes/AppFonts";
import Ionicons from "react-native-vector-icons/Ionicons";
import SignatureModal from "../../../components/Modal/SignatureModal";
import { AppColor } from "../../../themes/AppColor";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CustomText from "../../../components/CustomText/CustomText";
import { navigate } from "../../../utils/NavigationUtil";
import { screenNames } from "../../../navigation/ScreenNames";
import {
  equipmentList,
  labourList,
  reportDetailsType,
  visitorList,
} from "../helper/reportsType";
import { moderateScale } from "react-native-size-matters";
import {
  DateWiseData,
  UserEntries,
  WeeklyDataStructure,
} from "../../../utils/interface";
import { TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { updateWeeklyReports } from "../../../store/slice/Reports";
import { RootState } from "../../../store/store";

type Props = {
  startDate: string;
  endDate: string;
  signature: string;
  setStartDate: (startDate: string) => void;
  setEndDate: (endDate: string) => void;
  setSignature: (signature: string) => void;
  WeeklyAllList: WeeklyDataStructure | undefined;
  setWeeklyAllList: (weeklyAllList: WeeklyDataStructure) => void;
};

const WeeklyReportTab2: React.FC<Props> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  signature,
  setSignature,
  WeeklyAllList,
  setWeeklyAllList,
}) => {
  const [selectedPickerType, setSelectedPickerType] = useState<
    "fromDate" | "toDate"
  >("fromDate");
  const [showPickerModal, setShowPickerModal] = useState(false);

  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<UserEntries>();
  const [showSignatureModal, setShowSignatureModal] = useState<boolean>(false);
  const [UserKeys, setUserKeys] = useState<string[]>([]);
  const dispatch = useDispatch();
  const { WeeklyReports } = useSelector((state: RootState) => state.Reports);

  const handleSignatureOK = (signatureBase64: string | null) => {
    setShowSignatureModal(false);
    if (signatureBase64) {
      setSignature(signatureBase64);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      generateWeekDays(startDate, endDate);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (WeeklyAllList) {
      callToSelectedDay(selectedDay);
    }
  }, [WeeklyAllList]);

  const clickOnPicker = (type: "fromDate" | "toDate") => {
    setShowPickerModal(true);
    setSelectedPickerType(type);
  };

  const onDateChange = (_: any, date?: Date) => {
    if (date) {
      const formattedDate = moment(date).format(DateFormat.YYYY_MM_DD);
      if (selectedPickerType === "fromDate") {
        setStartDate(formattedDate);
      } else {
        setEndDate(formattedDate);
      }
    }
    setShowPickerModal(false);
  };

  const generateWeekDays = (start: string, end: string) => {
    if (!start || !end) return;
    const days: string[] = [];
    const startDate = moment(start, DateFormat.YYYY_MM_DD).toDate();
    const endDate = moment(end, DateFormat.YYYY_MM_DD).toDate();
    while (startDate <= endDate) {
      days.push(moment(startDate).format(DateFormat.YYYY_MM_DD));
      startDate.setDate(startDate.getDate() + 1);
    }
    setWeekDays(days);
    setSelectedDay(days[0] || "");
  };

  const callToSelectedDay = (day: string) => {
    setSelectedDay(day);
    const list = WeeklyAllList?.[day];
    if (list) {
      const keys = Object.keys(list);
      setUserKeys(keys);
      callToSelectUser(keys[0], day);
    } else {
      setSelectedUser("");
      setUserKeys([]);
      setSelectedEntry(undefined);
    }
  };

  const callToSelectUser = (userKey: string, day: string) => {
    setSelectedUser(userKey);
    setSelectedEntry(WeeklyAllList?.[day]?.[userKey]);
  };

  const TabButton = ({
    title,
    iconName,
    onclick,
  }: {
    title: string;
    iconName: string;
    onclick: () => void;
  }) => {
    return (
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => {
          onclick();
        }}
      >
        <MaterialIcons name={iconName} size={24} color={AppColor.PRIMARY} />
        <CustomText fontSize={moderateScale(12)} title={title} />
      </TouchableOpacity>
    );
  };

  const onChangeDescription = (index: number, text: string) => {
    if (WeeklyAllList && selectedDay && selectedUser) {
      const updatedWeeklyList = {
        ...WeeklyAllList,
        [selectedDay]: {
          ...WeeklyAllList[selectedDay],
          [selectedUser]: selectedEntry,
        },
      };

      setWeeklyAllList(updatedWeeklyList);

      setSelectedEntry(
        selectedEntry
          ? {
              ...selectedEntry,
              entry: selectedEntry.entry.map((entry, i) =>
                i === index ? { ...entry, description: text } : { ...entry }
              ),
            }
          : undefined
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.sectionTitle}>Selected week</Text>

      <View style={styles.rowContainer}>
        <View style={styles.halfInputContainer}>
          <IconTextInput
            key={Math.random()}
            onClickIcon={() => clickOnPicker("fromDate")}
            value={startDate}
            label="Start Date"
            rightIconName="calendar-outline"
            editable={false}
          />
        </View>

        <View style={styles.halfInputContainer}>
          <IconTextInput
            key={Math.random()}
            onClickIcon={() => clickOnPicker("toDate")}
            value={endDate}
            label="End Date"
            rightIconName="calendar-outline"
            editable={false}
          />
        </View>
      </View>

      <View></View>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.dateScroll}
        >
          {weekDays.map((day, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.nameContainer,
                selectedDay === day && styles.activeBtn,
              ]}
              onPress={() => callToSelectedDay(day)}
            >
              <Text
                style={[
                  styles.nameText,
                  selectedDay === day && styles.activeNameText,
                ]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.dateScroll}
        >
          {UserKeys.map((day, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.nameContainer,
                selectedUser === day && styles.activeBtn,
              ]}
              onPress={() => callToSelectUser(day, selectedDay)}
            >
              <Text
                style={[
                  styles.nameText,
                  selectedUser === day && styles.activeNameText,
                ]}
              >
                {day.split(",")[1]}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View>
        <View style={styles.activityContainer}>
          <Text style={styles.activityTitle}>
            Activities for Selected Dates:
          </Text>
        </View>

        {selectedEntry && selectedEntry?.diary.length > 0
          ? selectedEntry?.diary.map((item, index) => (
              <View key={index}>
                <TextInput
                  mode="outlined" // or 'flat' based on your design preference
                  style={[styles.textArea]}
                  label={"Add Project Description"}
                  multiline={true}
                  numberOfLines={6} // Set minimum number of lines
                  value={item.description}
                  onChangeText={(text) => {
                    const updatedDiary = selectedEntry?.diary.map((entry, i) =>
                      i === index ? { ...entry, description: text } : entry
                    );

                    setSelectedEntry(
                      selectedEntry
                        ? { ...selectedEntry, diary: updatedDiary }
                        : undefined
                    );
                  }}
                  onBlur={() => {
                    if (!WeeklyAllList) return;
                    const updatedWeeklyList = {
                      ...WeeklyAllList,
                      [selectedDay]: {
                        ...WeeklyAllList[selectedDay],
                        [selectedUser]: {
                          ...WeeklyAllList[selectedDay][selectedUser],
                          diary: selectedEntry?.diary || [],
                        },
                      },
                    };

                    setWeeklyAllList(updatedWeeklyList);
                    dispatch(
                      updateWeeklyReports({
                        ...WeeklyReports,
                        WeeklyAllList: updatedWeeklyList,
                      })
                    );
                  }}
                  activeOutlineColor={AppColor.PRIMARY}
                  onSubmitEditing={() => Keyboard.dismiss()}
                  contentStyle={{
                    color: AppColor.BLACK
                  }}
                />
              </View>
            ))
          : null}

        {selectedEntry && selectedEntry?.entry?.length > 0
          ? selectedEntry?.entry.map((item, index) => (
              <View style={styles.detailsContainer}>
                {item.equipments.length ? (
                  <TabButton
                    title={"View Equipment Details"}
                    iconName={"construction"}
                    onclick={() => {
                      navigate(screenNames.WeeklyDetailScreen, {
                        type: reportDetailsType.equipment,
                        list: item.equipments,
                      });
                    }}
                  />
                ) : null}

                {item.visitors.length ? (
                  <TabButton
                    title={"View Visitor Details"}
                    iconName={"people-alt"}
                    onclick={() => {
                      navigate(screenNames.WeeklyDetailScreen, {
                        type: reportDetailsType.visitor,
                        list: item.visitors,
                      });
                    }}
                  />
                ) : null}

                {item.labours.length ? (
                  <TabButton
                    title={"View Labour Details"}
                    iconName={"engineering"}
                    onclick={() => {
                      navigate(screenNames.WeeklyDetailScreen, {
                        type: reportDetailsType.labour,
                        list: item.labours,
                      });
                    }}
                  />
                ) : null}

                {item.photoFiles ? (
                  <TabButton
                    title={"View Project Images"}
                    iconName={"photo"}
                    onclick={() => {
                      navigate(screenNames.WeeklyDetailScreen, {
                        type: reportDetailsType.photoFiles,
                        list: item.photoFiles,
                      });
                    }}
                  />
                ) : null}

                <View style={{ width: "100%" }} key={index}>
                  <TextInput
                    mode="outlined" // or 'flat' based on your design preference
                    style={[styles.textArea]}
                    label={"Add Project Description"}
                    multiline={true}
                    numberOfLines={6} // Set minimum number of lines
                    value={item.description}
                     contentStyle={{
                    color: AppColor.BLACK
                  }}
                    onChangeText={(text) => {
                      const updatedDiary = selectedEntry?.entry.map(
                        (entry, i) =>
                          i === index ? { ...entry, description: text } : entry
                      );

                      setSelectedEntry(
                        selectedEntry
                          ? { ...selectedEntry, entry: updatedDiary }
                          : undefined
                      );
                    }}
                    onBlur={() => {
                      Keyboard.dismiss();
                      if (!WeeklyAllList) return;

                      const updatedWeeklyList = {
                        ...WeeklyAllList,
                        [selectedDay]: {
                          ...WeeklyAllList[selectedDay],
                          [selectedUser]: {
                            ...WeeklyAllList[selectedDay][selectedUser],
                            entry: selectedEntry?.entry || [],
                          },
                        },
                      };

                      setWeeklyAllList(updatedWeeklyList);
                      dispatch(
                        updateWeeklyReports({
                          ...WeeklyReports,
                          WeeklyAllList: updatedWeeklyList,
                        })
                      );
                    }}
                    activeOutlineColor={AppColor.PRIMARY}
                    onSubmitEditing={() => Keyboard.dismiss()}
                  />
                </View>
                {/* ) : null} */}
              </View>
            ))
          : null}

        <Text
          style={{
            marginBottom: 5,
            fontSize: 16,
            color: "#000",
            fontFamily: AppFonts.Medium,
            marginTop: 15,
          }}
        >
          Signature
        </Text>

        <View
          style={{
            borderColor: "#ddd",
            borderWidth: 1,
            marginBottom: 20,
            backgroundColor: "white",
            borderRadius: 6,
            minHeight: 45,
          }}
        >
          <TouchableOpacity
            style={{
              padding: 10,
              borderRadius: 5,
              alignItems: "center",
              marginTop: 10,
            }}
            onPress={() => setShowSignatureModal(true)}
          >
            {signature ? (
              <View>
                <Image
                  resizeMode="contain"
                  source={{ uri: signature }}
                  style={{
                    width: 200,
                    borderWidth: 0.5,
                    borderColor: "#00000039",
                    height: 150,
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    setSignature("");
                  }}
                  style={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    zIndex: 6,
                  }}
                >
                  <Ionicons name="close" size={24} color="red" />
                </TouchableOpacity>
              </View>
            ) : (
              <Text
                style={{
                  color: AppColor.PRIMARY,
                  fontSize: 16,
                  marginLeft: 5,
                  fontFamily: AppFonts.Medium,
                }}
              >
                Add Signature
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {showSignatureModal && (
        <SignatureModal
          handleSignatureOK={handleSignatureOK}
          showSignatureModal={showSignatureModal}
          onclose={() => setShowSignatureModal(false)}
        />
      )}

      {showPickerModal && (
        <DateTimePicker
          isVisible={showPickerModal}
          value={
            selectedPickerType === "fromDate"
              ? new Date(startDate || new Date())
              : new Date(endDate || new Date())
          }
          onConfirm={(date: Date) => onDateChange(null, date)}
          onCancel={() => setShowPickerModal(false)}
          textColor="black"
          themeVariant="light"
          isDarkModeEnabled={false}
        />
      )}
    </View>
  );
};

export default WeeklyReportTab2;
const styles = StyleSheet.create({
  activeBtn: {
    borderWidth: 1,
    borderColor: AppColor.PRIMARY,
    backgroundColor: AppColor.PRIMARY,
  },
  sectionTitle: {
    fontSize: 18,
    color: AppColor.BLACK,
    fontFamily: AppFonts.Medium,
    marginVertical: 4,
    marginHorizontal: 5,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    marginHorizontal: 5,
  },
  halfInputContainer: {
    width: "48%",
    height: 35,
  },
  label: {
    fontSize: 16,
    fontFamily: AppFonts.Medium,
    color: "#000",
    marginBottom: 4,
  },
  dateInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 45,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
  },
  dateInputText: {
    flex: 1,
    fontSize: 16,
    fontFamily: AppFonts.Medium,
  },
  icon: {
    marginLeft: 8,
  },
  dateScroll: {
    paddingHorizontal: 5,
    marginTop: 20,
    // backgroundColor:'red'
  },
  nameContainer: {
    alignItems: "center",
    marginRight: 15,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: AppColor.BLACK,
    paddingHorizontal: 10,
  },
  nameText: {
    fontSize: 16,
    color: "#333",
    fontFamily: AppFonts.Medium,
  },
  activeNameText: {
    color: AppColor.WHITE,
    fontFamily: AppFonts.Medium,
    borderColor: AppColor.PRIMARY,
  },
  underline: {
    height: 2,
    width: "100%",
    backgroundColor: "#D3D3D3",
    marginTop: 5,
  },
  activeUnderline: {
    backgroundColor: AppColor.PRIMARY,
  },
  activityContainer: {
    paddingHorizontal: 4,
    marginTop: 10,
  },
  activityTitle: {
    fontSize: 16,
    fontFamily: AppFonts.Medium,

    marginBottom: 8,
    color: "#000",
  },
  activityDescription: {
    fontSize: 16,
    color: "#333",
    fontFamily: AppFonts.Regular,
  },
  detailsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 25,
  },
  detailsButton: {
    backgroundColor: "#d9e7ff",
    padding: 12,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonContainer: {
    position: "absolute",
    top: Dimensions.get("window").height - 80,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  previousButton: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: AppColor.PRIMARY,
    borderRadius: 8,
    alignItems: "center",
  },
  textArea: {
    width: "100%",
    minHeight: 200, // Ensure enough space for multiline
    textAlignVertical: "top", // Align text to top (important for multiline)
    backgroundColor: "white",
    marginVertical: 8,
  },
});
