import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  Keyboard,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaWrapper } from "../../../../components/SafeAreaWrapper/SafeAreaWrapper";
import HeaderWithBackButton from "../../../../components/Button/HeaderWithBackButton";
import { goBack, navigate } from "../../../../utils/NavigationUtil";
import { AppText } from "../../../../constants/appText";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import CircleTabs from "../../../reports/components/CircleTabs";
import NextPreviewButton from "../../../../components/Button/NextPreviewButton";
import IconTextInput from "../../../../components/CustomTextInput/CustomIconTextInput";
import { typeOfPicker } from "../../../../utils/dateUtil";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import CustomTextInput from "../../../../components/CustomTextInput/CustomTextInput";
import {
  activities,
  controlPlans,
  hazardCategories,
  hazardOptions,
  initialHazardCat,
  JobActivities,
  selectionType,
  severityOptions,
} from "../../helper/jobUtil";
import { AppColor } from "../../../../themes/AppColor";
import { AppFonts } from "../../../../themes/AppFonts";
import { moderateScale } from "react-native-size-matters";
import { Card, Checkbox } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomText from "../../../../components/CustomText/CustomText";
import SignatureModal from "../../../../components/Modal/SignatureModal";
import { images } from "../../../../assets";
import { screenNames } from "../../../../navigation/ScreenNames";
import ListSelectionModal from "../../../../components/Modal/ListSelectionModal";
import { useDispatch } from "react-redux";
import { updateJobHazard } from "../../../../store/slice/UserSlice";
import { useIsFocused } from "@react-navigation/native";
import ScrollViewWrapper from "../../../../components/ScrollViewWrapper/ScrollViewWrapper";

interface CreateJobHazardProps {}

const CreateJobHazard: React.FC<CreateJobHazardProps> = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [activeTabTitle, setActiveTabTitle] = useState(
    AppText.EnterProjectDetails
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [showPickerModal, setShowPickerModal] = useState(false);
  const [selectedPickerType, setSelectedPickerType] = useState(
    typeOfPicker.date
  );
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [activeCategory, setActiveCategory] = useState(
    initialHazardCat.Worksite_Hazards
  );
  const [WorkerName, setWorkerName] = useState("");
  const [activitiesList, setActivitiesList] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([
    ...JobActivities,
  ]);
  const [tasks, setTasks] = useState([
    { task: "Site Inspection", severity: "H", hazard: "", controlPlan: "" },
  ]);
  const [signature, setSignature] = useState("");
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [SelectionList, setSelectionList] = useState<
    { label: string; value: string }[]
  >([]);
  const [ShowSelectionListModal, setShowSelectionListModal] = useState(false);
  const [SelectedIndex, setSelectedIndex] = useState(-1);
  const [SelectionType, setSelectionType] = useState(selectionType.severity);
  const [siteOrientationChecked, setSiteOrientationChecked] = useState(false);
  const [toolBoxMeetingChecked, setToolBoxMeetingChecked] = useState(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [OtherTextHazards, setOtherTextHazards] = useState<
    { activityName: string; value: string }[]
  >([]);

  const locationRef = useRef<any>(null);
  const projectNameRef = useRef<any>(null);
  const descriptionRef = useRef<any>(null);

  useEffect(() => {
    if (activeTab == 2) {
      clickOnCategories(activeCategory);
    }
  }, [activeTab]);

  useEffect(() => {
    if (isFocused) {
    }
  }, [isFocused]);

  const resetData = () => {
    setActiveTab(1);
    setActiveTabTitle(AppText.EnterProjectDetails);
    setSelectedDate("");
    setShowPickerModal(false);
    setSelectedPickerType(typeOfPicker.date);
    setTime("");
    setLocation("");
    setProjectName("");
    setDescription("");
    setActiveCategory(initialHazardCat.Worksite_Hazards);
    setWorkerName("");
    setActivitiesList([]);
    setSelectedActivities([...JobActivities]);
    setTasks([
      { task: "Site Inspection", severity: "H", hazard: "", controlPlan: "" },
    ]);
    setSignature("");
  };

  const handleSignatureOK = (signatureBase64: string) => {
    setShowSignatureModal(false);
    if (signatureBase64) {
      setSignature(signatureBase64);
    }
  };

  const onDateChange = (date: Date) => {
    if (date) {
      if (selectedPickerType === typeOfPicker.date) {
        const formattedDate = moment(date).format("YYYY-MM-DD");
        setSelectedDate(formattedDate);
      }
      if (selectedPickerType === typeOfPicker.time) {
        const formattedTime = moment(date).format("HH:mm A");
        setTime(formattedTime);
      }
    }
    setShowPickerModal(false);
  };

  const clickOnTabs = (step: number) => {
    setActiveTab(step);
    if (step === 1) {
      setActiveTabTitle(AppText.EnterProjectDetails);
    } else if (step === 2) {
      setActiveTabTitle(AppText.HazardSelection);
    } else if (step === 3) {
      setActiveTabTitle(AppText.TaskAddition);
    } else if (step === 4) {
      setActiveTabTitle(AppText.JobHazardAnalysis);
    }
    callToUpdateData();
  };

  const callToUpdateData = () => {
    const data = {
      projectName,
      location,
      selectedDate,
      time,
      WorkerName,
      description,
      selectedActivities,
      tasks,
      signature,
      siteOrientationChecked,
      toolBoxMeetingChecked,
      OtherTextHazards,
    };
    dispatch(updateJobHazard(data));
  };

  const clickOnPicker = (type: string) => {
    setSelectedPickerType(type);
    setShowPickerModal(true);
  };

  const renderActivities = ({
    item,
    index,
  }: {
    item: { activityName: string; isChecked: boolean };
    index: number;
  }) => {
    return (
      <View>
        <Card style={styles.activityCard}>
          <View style={styles.activityItem}>
            <Text style={styles.activityText}>{item.activityName}</Text>
            <Checkbox.Android
              status={item?.isChecked ? "checked" : "unchecked"}
              color={AppColor.PRIMARY}
              onPress={() => {
                const updatedList = [...activitiesList];
                updatedList[index].isChecked = !updatedList[index]?.isChecked;
                setActivitiesList(updatedList);

                if (!selectedActivities) {
                  return;
                }

                // Create a deep copy of selectedActivities to avoid modifying the original
                let tempSelectActivity = JSON.parse(
                  JSON.stringify(selectedActivities)
                );

                const sIndex = tempSelectActivity.findIndex(
                  (item1) => item1.activityName === activeCategory
                );

                if (sIndex !== -1) {
                  const activityExists = tempSelectActivity[
                    sIndex
                  ].activities.includes(item.activityName);

                  if (activityExists) {
                    // Create a new array without the activity
                    tempSelectActivity[sIndex] = {
                      ...tempSelectActivity[sIndex],
                      activities: tempSelectActivity[sIndex].activities.filter(
                        (item1) => item1 !== item.activityName
                      ),
                    };
                  } else {
                    // Create a new array with the added activity
                    tempSelectActivity[sIndex] = {
                      ...tempSelectActivity[sIndex],
                      activities: [
                        ...tempSelectActivity[sIndex].activities,
                        item.activityName,
                      ],
                    };
                  }
                }

                setSelectedActivities(tempSelectActivity);
              }}
            />
          </View>
        </Card>

        {item.activityName === "Other" && item.isChecked ? (
          <CustomTextInput
            placeholder="Please specify..."
            onChangeText={(text) => {
              let tempOtherText = [...OtherTextHazards];
              const index = tempOtherText.findIndex(
                (item) => activeCategory === item?.activityName
              );
              if (index !== -1) {
                tempOtherText[index].value = text;
              } else {
                tempOtherText.push({
                  activityName: activeCategory,
                  value: text,
                });
              }
              console.log("tempOtherText: ", tempOtherText);
              setOtherTextHazards(tempOtherText);
            }}
            placeholderTextColor="#666"
            multiline
            returnKeyType="done"
            blurOnSubmit={true}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            textValue={
              OtherTextHazards.find(
                (item) => item?.activityName === activeCategory
              )?.value
            }
            label={"Other"}
          />
        ) : null}
      </View>
    );
  };

  const clickOnCategories = (category: string) => {
    const tempActivityList = [];
    setActiveCategory(category);
    const filteredActivities = selectedActivities.filter(
      (item) => item.activityName === category
    );

    activities[category].map((item: string) => {
      let tempItem = {
        activityName: item,
        isChecked: false,
      };
      if (filteredActivities[0]?.activities.includes(item)) {
        tempItem.isChecked = true;
      }
      tempActivityList.push(tempItem);
    });
    setActivitiesList(tempActivityList);
  };

  const addNewTask = () => {
    setTasks((prevTasks) => {
      const updatedTasks = [
        ...prevTasks,
        { task: "Site Inspection", severity: "H", hazard: "", controlPlan: "" },
      ];
      return updatedTasks;
    });
  };

  const removeTask = (index: number) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter(
        (_, taskIndex) => taskIndex !== index
      );
      return updatedTasks;
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return (
          <KeyboardAwareScrollView
            style={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.formContainer}>
              <IconTextInput
                value={selectedDate}
                label={"Date"}
                editable={false}
                rightIconName={"calendar"}
                onClickIcon={() => clickOnPicker(typeOfPicker.date)}
              />

              <IconTextInput
                value={time}
                label={"Time"}
                editable={false}
                rightIconName={"clock"}
                onClickIcon={() => clickOnPicker(typeOfPicker.time)}
              />

              <CustomTextInput
                ref={locationRef}
                onChangeTextValue={(text) => setLocation(text)}
                textValue={location}
                label="Project Location"
                placeholder="Enter project location"
                onSubmitEditing={() => projectNameRef.current?.focus()}
                returnKeyType="next"
              />

              <CustomTextInput
                ref={projectNameRef}
                onChangeTextValue={(text) => setProjectName(text)}
                textValue={projectName}
                label="Project Name"
                placeholder="Enter project name"
                onSubmitEditing={() => descriptionRef.current?.focus()}
                returnKeyType="next"
              />

              <CustomTextInput
                ref={descriptionRef}
                onChangeTextValue={(text) => setDescription(text)}
                textValue={description}
                label="Task Description"
                placeholder="Enter task description"
                multiline
                numberOfLines={4}
                returnKeyType="done"
                returnKeyLabel="Done"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={true}
              />
            </View>
          </KeyboardAwareScrollView>
        );
      case 2:
        return (
          <>
            <View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryScrollContainer}
              >
                {hazardCategories.map((category, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.categoryButton,
                      activeCategory === category &&
                        styles.activeCategoryButton,
                    ]}
                    onPress={() => clickOnCategories(category)}
                  >
                    <Text
                      style={[
                        styles.categoryButtonText,
                        activeCategory === category &&
                          styles.activeCategoryButtonText,
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <KeyboardAwareScrollView
              style={styles.content}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {/* <View style={styles.tab2Container}> */}

              <ScrollViewWrapper>
                {activitiesList.length > 0 ? (
                  <FlatList
                    data={activitiesList}
                    renderItem={renderActivities}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.activitiesListContainer}
                    showsVerticalScrollIndicator={false}
                  />
                ) : (
                  <View style={styles.emptyStateContainer}>
                    <Text style={styles.emptyStateText}>
                      Select a category to view activities
                    </Text>
                  </View>
                )}

                {/* <View style={{ height: 100 }} /> */}
              </ScrollViewWrapper>

              {/* </View> */}
            </KeyboardAwareScrollView>
          </>
        );
      case 3:
        return (
          <KeyboardAwareScrollView
            style={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.tabContent}>
              {tasks.map((task, index) => (
                <Card
                  key={index}
                  style={{
                    borderRadius: 6,
                    padding: 15,
                    marginBottom: 20,
                    backgroundColor: AppColor.WHITE,
                    borderWidth: 0.3,
                    borderColor: AppColor.BLACK,
                    marginHorizontal: 2,
                  }}
                >
                  {index > 0 && (
                    <TouchableOpacity
                      onPress={() => removeTask(index)}
                      style={{
                        position: "absolute",
                        top: 10, // Position it at the top of the task box
                        right: 10, // Right side of the task box,
                        zIndex: 3,
                      }}
                    >
                      <Ionicons name="remove-circle" size={24} color="red" />
                    </TouchableOpacity>
                  )}

                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: AppFonts.Bold,
                      marginBottom: 10,
                    }}
                  >
                    Task - {index + 1}
                  </Text>

                  <CustomTextInput
                    label={"Tasks"}
                    textValue={task.task}
                    editable={false}
                  />

                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        marginRight: 10,
                        width: "20%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          marginBottom: 5,
                          color: "#000",
                          fontFamily: AppFonts.Medium,
                        }}
                      >
                        Severity
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setSelectionType(selectionType.severity);
                          setSelectedIndex(index);
                          setSelectionList(severityOptions);
                          setShowSelectionListModal(true);
                        }}
                        style={{
                          borderWidth: 1,
                          borderColor: "#d3d3d3",
                          borderRadius: 5,
                          overflow: "hidden",
                          backgroundColor: "#fff",
                          position: "relative",
                          flexDirection: "row",
                          alignItems: "center",
                          paddingHorizontal: 10,
                          height: 50,
                        }}
                      >
                        <Text
                          style={{
                            flex: 1,
                            fontSize: 16,
                            color: "#000",
                            fontFamily: AppFonts.Medium,
                          }}
                        >
                          {task.severity}
                        </Text>
                        <Ionicons
                          name="caret-down"
                          size={16}
                          color="gray"
                          style={{
                            marginLeft: 10,
                          }}
                        />
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        marginRight: 10,
                        width: "75%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          marginBottom: 5,
                          color: "#000",
                          fontFamily: AppFonts.Medium,
                        }}
                      >
                        Hazards
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setSelectionType(selectionType.hazard);
                          setSelectedIndex(index);
                          setSelectionList(hazardOptions);
                          setShowSelectionListModal(true);
                        }}
                        style={{
                          borderWidth: 1,
                          borderColor: "#d3d3d3",
                          borderRadius: 5,
                          backgroundColor: "#fff",
                          position: "relative",
                          flexDirection: "row",
                          alignItems: "center",
                          paddingHorizontal: 10,
                          height: 50,
                          overflow: "scroll",
                        }}
                      >
                        <Text
                          style={{
                            flex: 1,
                            fontSize: 16,
                            color: "#000",
                            fontFamily: AppFonts.Medium,
                            lineHeight: 50,
                          }}
                        >
                          {task.hazard || "Select Hazard"}
                          {/* {hazardOptions.find((option) => option.value == task.hazard)
                                                        ?.label || "Select Hazard"} */}
                        </Text>
                        <Ionicons
                          name="caret-down"
                          size={16}
                          color="gray"
                          style={{
                            marginLeft: 10,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ marginTop: 10 }} />
                  <CustomTextInput
                    label={"Plans to Eliminate/Control"}
                    textValue={task.controlPlan}
                    editable={false}
                    onChangeText={(text) => {
                      const updatedTasks = [...tasks];
                      updatedTasks[index].controlPlan = text;
                      setTasks(updatedTasks);
                    }}
                    multiline={true}
                    numberOfLines={10}
                  />
                </Card>
              ))}
              <View
                style={{
                  alignItems: "flex-end",
                  marginBottom: 20,
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: AppColor.PRIMARY,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    backgroundColor: "#fff",
                  }}
                  onPress={() => {
                    addNewTask();
                  }}
                >
                  <Ionicons
                    name="add-circle-outline"
                    size={24}
                    color={AppColor.PRIMARY}
                  />
                  <Text
                    style={{
                      color: AppColor.PRIMARY,
                      fontSize: 16,
                      marginLeft: 5,
                      fontFamily: AppFonts.Medium,
                    }}
                  >
                    Add More
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ height: 60 }} />
          </KeyboardAwareScrollView>
        );
      case 4:
        return (
          <KeyboardAwareScrollView
            style={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.tabContent}>
              <Card
                style={{
                  padding: 10,
                  borderRadius: 6,
                  backgroundColor: AppColor.WHITE,
                  marginHorizontal: 1,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <CustomText title={"Have you completed site orientation?"} />
                  <Checkbox.Android
                    color={AppColor.PRIMARY}
                    status={siteOrientationChecked ? "checked" : "unchecked"}
                    onPress={() => {
                      setSiteOrientationChecked(!siteOrientationChecked);
                    }}
                  />
                </View>
              </Card>

              <Card
                style={{
                  padding: 10,
                  borderRadius: 6,
                  backgroundColor: AppColor.WHITE,
                  marginHorizontal: 1,
                  marginTop: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <CustomText title={"Have you completed tool box meeting?"} />
                  <Checkbox.Android
                    color={AppColor.PRIMARY}
                    status={toolBoxMeetingChecked ? "checked" : "unchecked"}
                    onPress={() => {
                      setToolBoxMeetingChecked(!toolBoxMeetingChecked);
                    }}
                  />
                </View>
              </Card>

              <View style={{ marginVertical: 5 }} />
              <CustomTextInput
                onChangeTextValue={(text) => setWorkerName(text)}
                textValue={WorkerName}
                label="Worker Name"
                multiline={true}
                numberOfLines={10}
              />

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
                  onPress={() => {
                    Keyboard.dismiss();
                    setShowSignatureModal(true);
                  }}
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
                          if (signature) {
                            setSignature("");
                          }
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
                    <View
                      style={{
                        gap: 20,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: -10,
                      }}
                    >
                      <Image
                        resizeMode="contain"
                        source={images.SIGNATURE}
                        style={{
                          width: 35,
                          height: 35,
                        }}
                      />
                      <Text
                        style={{
                          color: AppColor.PRIMARY,
                          fontSize: moderateScale(16),
                          marginLeft: 5,
                          fontFamily: AppFonts.Medium,
                          marginTop: 5,
                        }}
                      >
                        Add Signature
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>

              {showSignatureModal && (
                <SignatureModal
                  handleSignatureOK={handleSignatureOK}
                  showSignatureModal={showSignatureModal}
                  onclose={() => {
                    setShowSignatureModal(false);
                  }}
                />
              )}
            </View>
          </KeyboardAwareScrollView>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <SafeAreaWrapper>
        <View style={styles.container}>
          <HeaderWithBackButton
            title={"Add JHA"}
            onBackClick={() => goBack()}
          />

          <CircleTabs
            ActiveTab={activeTab}
            Tabs={[1, 2, 3, 4]}
            lineWidth={20}
            onTabPress={(tab) => clickOnTabs(tab)}
          />

          <View style={styles.tabTitleContainer}>
            <Text style={styles.tabTitleText}>{activeTabTitle}</Text>
          </View>

          {renderTabContent()}
        </View>

        {ShowSelectionListModal ? (
          <ListSelectionModal
            modalVisible={ShowSelectionListModal}
            setModalVisible={(v) => {
              setShowSelectionListModal(v);
            }}
            List={SelectionList}
            handleSelect={(item) => {
              // Create a deep copy of tasks to avoid modifying the original state
              let tempTask = tasks.map((task) => ({ ...task }));
              if (SelectionType === selectionType.severity) {
                tempTask[SelectedIndex] = {
                  ...tempTask[SelectedIndex],
                  severity: item,
                };
              } else if (SelectionType === selectionType.hazard) {
                tempTask[SelectedIndex] = {
                  ...tempTask[SelectedIndex],
                  hazard: item,
                  controlPlan: controlPlans[`${item}`],
                };
              }

              setTasks(tempTask);
              setShowSelectionListModal(false);
            }}
          />
        ) : null}

        <DateTimePicker
          isVisible={showPickerModal}
          date={selectedDate ? new Date(selectedDate) : new Date()}
          mode={selectedPickerType === typeOfPicker.date ? "date" : "time"}
          onConfirm={onDateChange}
          onCancel={() => setShowPickerModal(false)}
          isDarkModeEnabled={false}
        />
      </SafeAreaWrapper>
      <NextPreviewButton
        ActiveTab={activeTab}
        clickOnPrevious={() => {
          if (activeTab > 1) {
            clickOnTabs(activeTab - 1);
          } else {
            goBack();
          }
        }}
        clickOnNext={() => {
          if (activeTab === 4) {
            // Submit form
            callToUpdateData();
            navigate(screenNames.PreviewJobHazard);
          } else {
            clickOnTabs(activeTab + 1);
          }
        }}
        size={4}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.WHITE,
  },
  content: {
    flex: 1,
  },
  formContainer: {
    // paddingHorizontal: moderateScale(16),
    paddingBottom: moderateScale(80),
  },
  tabTitleContainer: {
    // paddingHorizontal: moderateScale(16),
    marginVertical: moderateScale(8),
  },
  tabTitleText: {
    fontSize: moderateScale(18),
    fontFamily: AppFonts.Bold,
    color: AppColor.BLACK,
  },
  tab2Container: {
    // flex: 1,
    // paddingHorizontal: moderateScale(8),
  },
  categoryScrollContainer: {
    // paddingHorizontal: moderateScale(8),

    paddingVertical: moderateScale(8),
  },
  categoryButton: {
    height: moderateScale(40),
    backgroundColor: AppColor.LIGHT_GRAY,
    borderRadius: moderateScale(20),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: moderateScale(16),
    marginHorizontal: moderateScale(4),
  },
  activeCategoryButton: {
    backgroundColor: AppColor.PRIMARY,
  },
  categoryButtonText: {
    fontSize: moderateScale(14),
    fontFamily: AppFonts.Regular,
    color: AppColor.BLACK,
  },
  activeCategoryButtonText: {
    color: AppColor.WHITE,
  },
  activitiesListContainer: {
    // paddingHorizontal: moderateScale(8),
    // paddingBottom: 130,
  },
  activityCard: {
    backgroundColor: AppColor.WHITE,
    marginVertical: moderateScale(4),
    marginHorizontal: moderateScale(2),
    borderRadius: moderateScale(6),
    elevation: 2,
  },
  activityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: moderateScale(12),
  },
  activityText: {
    fontSize: moderateScale(14),
    fontFamily: AppFonts.Regular,
    color: AppColor.BLACK,
    flex: 1,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: moderateScale(20),
  },
  emptyStateText: {
    fontSize: moderateScale(16),
    fontFamily: AppFonts.Regular,
    color: AppColor.LIGHT_GRAY,
    textAlign: "center",
  },
  tabContent: {
    flex: 1,
  },
});

export default CreateJobHazard;
