import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { ImageViewerProps } from "../../types/navigation";
import { Constants } from "../../constants/constants";
import { AppColor } from "../../themes/AppColor";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { goBack } from "../../utils/NavigationUtil";
import {
  fitContainer,
  ResumableZoom,
  useImageResolution,
} from 'react-native-zoom-toolkit';

const ImageViewer: React.FC<ImageViewerProps> = ({ route }) => {
  const { image } = route?.params;
    const { width, height } = useWindowDimensions();
  const { isFetching, resolution } = useImageResolution({ uri: image });
  if (isFetching || resolution === undefined) {
    return null;
  }

  const size = fitContainer(resolution.width / resolution.height, {
    width,
    height,
  });
  return (
    <View
      style={{
        height: Constants.ScreenHeight - 100,
        backgroundColor: AppColor.WHITE,
        position: "relative",
        marginVertical: "auto",
      }}
    >
      <TouchableOpacity style={styles.closeButton} onPress={() => goBack()}>
        <MaterialIcons name="cancel" size={40} color={AppColor.PRIMARY} />
      </TouchableOpacity>
      {image ? (
        <ResumableZoom maxScale={resolution}>
  <Image
          source={{ uri: image }}
          resizeMode="contain"
          style={{
            ...size
          }}
        />

        </ResumableZoom>
      
      ) : null}
    </View>
  );
};

export default ImageViewer;

const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    right: 0,
    top: Platform.OS == "ios" ? 0 : 0,
    padding: 10,
    zIndex: 1,
    borderRadius: 0,
  },
  closeText: { fontSize: 30, color: AppColor.WHITE },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
