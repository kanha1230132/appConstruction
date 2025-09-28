import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ImageSelectionScreenProps } from "../../../../types/navigation";
import { SafeAreaWrapper } from "../../../../components/SafeAreaWrapper/SafeAreaWrapper";
import HeaderWithBackButton from "../../../../components/Button/HeaderWithBackButton";
import { AppText } from "../../../../constants/appText";
import { goBack, navigate } from "../../../../utils/NavigationUtil";
import {
  GetPhotoFileResponse,
  SchedulesResponse,
} from "../../../../api/apiInterface";
import {
  DateWithImages,
  ImageItem,
} from "../../../photoFiles/PhotoFilesScreen";
import RestClient from "../../../../api/restClient";
import useToastHook from "../../../../hooks/toast";
import moment from "moment";
import { DateFormat } from "../../../../utils/dateUtil";
import NotFoundText from "../../../../components/CustomText/NotFoundText";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AppColor } from "../../../../themes/AppColor";
import { Card } from "react-native-paper";
import FastImage from "react-native-fast-image";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AppFonts } from "../../../../themes/AppFonts";
import { moderateScale } from "react-native-size-matters";
import { screenNames } from "../../../../navigation/ScreenNames";
import { useDispatch, useSelector } from "react-redux";
import { updateDailyImages, updateWeeklyImages } from "../../../../store/slice/Reports";
import { RootState } from "../../../../store/store";
import { reportTypeFrom } from "../../helper/reportsType";
import ActivityLoader from "../../../../components/Loader/ActivityLoader";
import ImageDescriptionModal from "../../Modal/ImageDescriptionModal";

const ImageSelectionScreen: React.FC<ImageSelectionScreenProps> = ({
  route,
}) => {
  const project = route?.params?.project;
  const fromType = route?.params?.FromScreen;
  const [Project, setProject] = useState<SchedulesResponse>();
  const [PhotoList, setPhotoList] = useState<DateWithImages[]>([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToastHook();
  const [selectedPhotos, setSelectedPhotos] = useState<ImageItem[]>([]);
  const dispatch = useDispatch();
  const { DailyReports,WeeklyReports   } = useSelector((state: RootState) => state.Reports);
  const [IsDiscriptionModal, setIsDiscriptionModal] = useState(false)


  useEffect(() => {
    if (project) {
      setSelectedPhotos([]);
      setProject(project);
      getPhotoFiles(project.id);
      if (fromType) {
        if (DailyReports?.Images) {
          setSelectedPhotos(DailyReports?.Images);
        }
        if(fromType == reportTypeFrom.weekly && WeeklyReports?.Images){
          setSelectedPhotos(WeeklyReports?.Images);
        }
      }
    }
  }, []);

  const getPhotoFiles = async (id: number) => {
    try {
      setLoading(true);
      const restClient = new RestClient();
      const response = await restClient.getPhotoFiles({
        filter: {
          schedule_id: id,
        },
      });
      if (response && typeof response !== "string") {
        const output: GetPhotoFileResponse[] = response.data;
        if (output && output.length > 0) {
          console.log("output : ", JSON.stringify(output));
          filterPhotoByDate(output);
        } else {
          setPhotoList([]);
        }
      }
    } catch (error) {
      console.log("Error :", error);
      showToast("Something went wrong please try again", "danger");
    } finally {
      setLoading(false);
    }
  };

  const filterPhotoByDate = (output: GetPhotoFileResponse[]) => {
    const map = new Map();
    output.map((item) => {
      const isTimeCheck = moment(item.created_at).format(DateFormat.DD_MM_YYYY);
      if (map.has(isTimeCheck)) {
        map.get(isTimeCheck).images.push({
          uri: item.file_url,
          _id: item.id,
          selected: false,
          time: item.created_at,
        });
      } else {
        map.set(isTimeCheck, {
          date: item.created_at,
          images: [
            {
              uri: item.file_url,
              _id: item.id,
              selected: false,
              time: item.created_at,
            },
          ],
          selected: false,
        });
      }
    });

    const sortedMap = new Map(
      [...map.entries()].sort((a, b) => {
        // Convert dates to Moment objects in DD-MM-YYYY format
        const dateA = moment(a[0], "DD-MM-YYYY");
        const dateB = moment(b[0], "DD-MM-YYYY");

        // Compare the dates
        return dateB - dateA;
      })
    );

    console.log(
      "Array.from(sortedMap.values()) : ",
      JSON.stringify(Array.from(sortedMap.values()))
    );

    const sortedGroups = Array.from(sortedMap.values()).map((item: any) => {
      item?.images?.sort((a: any, b: any) => {
        return moment(b.time).valueOf() - moment(a.time).valueOf();
      });
      return item;
    });
    setPhotoList(sortedGroups);
  };

  const handleLongPress = (
    item: DateWithImages,
    pindex: number,
    index: number
  ) => {
    const { images, ...restItem } = item;
    const mappedImage = {
      ...restItem,
      uri: images[index].uri,
      time: images[index].time,
      _id: images[index]._id,
      selected: true,
    };
    const indexOfMappedImage = selectedPhotos.findIndex(
      (image) => image.uri === mappedImage.uri
    );
    let selectPhotos = [];
    if (indexOfMappedImage != -1) {
      selectPhotos = selectedPhotos.filter(
        (item) => item.uri !== mappedImage.uri
      );
    } else {
      selectPhotos = [...selectedPhotos, mappedImage];
    }

    console.log("selectPhotos ", selectPhotos);
    setSelectedPhotos(selectPhotos);

    const _photos = [...PhotoList];

    _photos[pindex].images[index].selected =
      !PhotoList[pindex].images[index].selected;
    let _images = _photos[pindex].images;
    const isExist = _images.findIndex((image) => image.selected == true);
    if (isExist == -1) {
      _photos[pindex].selected = false;
    } else {
      _photos[pindex].selected = true;
    }
    setPhotoList(_photos);
  };

  const selectHandleImage = (item: DateWithImages, index: number) => {
    const { images, ...restItem } = item;
    const mappedImage = {
      ...restItem,
      uri: images[index].uri,
      time: images[index].time,
    };
    navigate(screenNames.ImageViewer, { image: mappedImage.uri });
  };

  const renderPhotoGroup = ({
    item,
    index,
  }: {
    item: DateWithImages;
    index: number;
  }) => {
    return (
      <Card elevation={0} style={styles.photoSection} key={item?.date}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            alignItems: "center",
            paddingVertical: 2,
          }}
        >
          <View
            style={{
              width: "90%",
            }}
          >
            <View style={styles.photoHeader}>
              <Text style={styles.photoDate}>
                {moment(item.date).format("DD-MM-YYYY")}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
            // justifyContent: "space-between",
          }}
        >
          {item.images.map((image, innerindex) => {
            return (
              <Card
                style={{
                  width: "30%",
                  height: 120,
                  marginTop: 10,
                  borderRadius: 6,
                  margin: "1.5%",
                  backgroundColor: AppColor.WHITE,
                }}
                key={innerindex + Math.random().toString()}
                onPress={() => {
                  if (selectedPhotos.length > 0) {
                    handleLongPress(item, index, innerindex);
                  } else {
                    selectHandleImage(item, innerindex);
                  }
                }}
                onLongPress={() => {
                  handleLongPress(item, index, innerindex);
                }}
              >
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.photo}
                    source={{
                      uri: image.uri,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  <View
                    style={{
                      width: "100%",
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      flexDirection: "row",
                      backgroundColor: "#ffffff20",
                      justifyContent: "space-between",
                      paddingVertical: 2,
                      paddingHorizontal: 10,
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.photoTime}>
                      Time : {moment(image.time).format("hh:mm:ss A")}
                    </Text>
                  </View>

                  {selectedPhotos.length > 0 &&
                    selectedPhotos
                      .map((photo) => photo.uri)
                      .includes(image.uri) && (
                      <View style={styles.selectionOverlay}>
                        <View
                          style={{
                            position: "absolute",
                            top: 5,
                            right: 5,
                          }}
                        >
                          <Ionicons
                            name="checkmark-circle"
                            size={24}
                            color={AppColor.PRIMARY}
                          />
                        </View>
                      </View>
                    )}
                </View>
              </Card>
            );
          })}
        </View>
      </Card>
    );
  };

  const onSelectPhoto = () => {
    // if(fromType == reportTypeFrom.daily){
    //    dispatch(updateDailyImages(selectedPhotos));
    // } else if(fromType == reportTypeFrom.weekly){
    //    dispatch(updateWeeklyImages(selectedPhotos));
    // }
    if(selectedPhotos.length > 0){
    setIsDiscriptionModal(true);
    }else{
     goBack(); 
    }
  };

  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={Project?.project_name || AppText.ImageSelection}
          onBackClick={() => goBack()}
          customStyle={undefined}
          RightIcon2={"checkmark"}
          RightIcon2Color={AppColor.PRIMARY}
          showRightIcon2={selectedPhotos.length > 0}
          onClickRightIcon2={() => onSelectPhoto()}
        />

{loading ? <ActivityLoader /> : null}
        {!loading && PhotoList?.length == 0 ? (
          <NotFoundText message={"No Photos Found"} />
        ) : null}

        {!loading && PhotoList.length > 0 ? (
          <FlatList
            data={PhotoList}
            keyExtractor={(item) =>
              item?.date + new Date().getTime().toString()
            }
            renderItem={renderPhotoGroup}
            style={styles.photoList}
            showsVerticalScrollIndicator={false}
          />
        ) : null}
{
  selectedPhotos && IsDiscriptionModal ?

  <ImageDescriptionModal 
selectedImage={selectedPhotos} visible={IsDiscriptionModal} onDismiss={()=>{
  setIsDiscriptionModal(false)
}} onSubmit={()=>{
    setIsDiscriptionModal(true);
   if(fromType == reportTypeFrom.daily){
       dispatch(updateDailyImages(selectedPhotos));
    } else if(fromType == reportTypeFrom.weekly){
       dispatch(updateWeeklyImages(selectedPhotos));
    }
    goBack();

}}
onChangeDescription={(index,text)=>{
let _photos = [...selectedPhotos]; // shallow clone array
_photos[index] = { ..._photos[index], description: text }; // clone object & add description
setSelectedPhotos(_photos);

}}

/> : null
}


        
      </SafeAreaWrapper>
    </>
  );
};

export default ImageSelectionScreen;

const styles = StyleSheet.create({
  selectionOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: AppColor.PRIMARY_TRANSPARENT,
    borderRadius: 5,
  },
  photoList: {
    width: "100%",
    paddingBottom: 16,
  },
  imageContainer: {
    width: "100%",
    position: "relative",
    marginRight: 10,
    borderRadius: 6,
    height: 120,
  },
  photo: {
    width: "100%",
    height: 100,
  },
  photoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  photoDate: {
    fontSize: moderateScale(14),
    fontFamily: AppFonts.Bold,
    color: AppColor.PRIMARY,
  },
  photoTime: {
    fontFamily: AppFonts.Regular,
    fontSize: moderateScale(8),
    marginVertical: 0,
    color: AppColor.BLACK_70,
  },

  photoSection: {
    marginBottom: 16,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: AppColor.WHITE,
    marginHorizontal: 3,
  },
});
