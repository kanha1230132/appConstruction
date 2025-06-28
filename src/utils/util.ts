import ImagePicker from 'react-native-image-crop-picker';
import uuid from 'react-native-uuid';

export const openCamera = async () => {
  try {
    const image = await ImagePicker.openCamera({
      width: 300,
      height: 500,
      cropping: true, // enable cropping
      compressImageQuality: 0.8,
      includeBase64: false,
      mediaType: 'photo',
    });
    console.log(image);
    return image;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const openImagePicker = async () => {
  try {
    const image = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: false, // set to true to allow multiple selection
      compressImageQuality: 0.8,
      mediaType: 'photo', // 'photo', 'video', or 'any'
    });
    console.log(image);
    return image;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUuid = () => uuid.v4();

