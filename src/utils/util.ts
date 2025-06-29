import ImagePicker from 'react-native-image-crop-picker';
import uuid from 'react-native-uuid';
import { Constants } from '../constants/constants';

export const openCamera = async () => {
  try {
    const image = await ImagePicker.openCamera({
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

export const openImagePicker = async (IsMultiple: boolean = false) => {
  try {
    const image = await ImagePicker.openPicker({
      multiple: IsMultiple, // set to true to allow multiple selection
      compressImageQuality: 0.8,
      mediaType: 'photo', // 'photo', 'video', or 'any'

    });
    return image;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getImageDimensions = (width : number, height : number) => {
  const ratio = width / height;
  
  // Calculate dimensions to fit screen (with some padding)
  const maxWidth = Constants.ScreenWidth * 0.9; // 90% of screen width
  const maxHeight = Constants.ScreenHeight * 0.7; // 70% of screen height
  
  let imgWidth = maxWidth;
  let imgHeight = maxWidth / ratio;
  
  if (imgHeight > maxHeight) {
    imgHeight = maxHeight;
    imgWidth = maxHeight * ratio;
  }
  
  return { width: imgWidth, height: imgHeight };
};

export const getUuid = () => uuid.v4();

