import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { Text, Divider, Button, ProgressBar, Card, FAB } from 'react-native-paper';
import { SafeAreaWrapper } from '../../../../components/SafeAreaWrapper/SafeAreaWrapper';
import HeaderWithBackButton from '../../../../components/Button/HeaderWithBackButton';
import { goBack, navigate } from '../../../../utils/NavigationUtil';
import CustomTextInput from '../../../../components/CustomTextInput/CustomTextInput';
import ScrollViewWrapper from '../../../../components/ScrollViewWrapper/ScrollViewWrapper';
import { LogoUploadScreenProps } from '../../../../types/navigation';
import { screenNames } from '../../../../navigation/ScreenNames';
import { images } from '../../../../assets';
import { AppColor } from '../../../../themes/AppColor';
import { AppFonts } from '../../../../themes/AppFonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LoaderButton from '../../../../components/Button/LoaderButton';


const LogoUploadScreen: React.FC<LogoUploadScreenProps> = ({navigation}) => {
  const [isUploading, setIsUploading] = React.useState(false);
  const [companyName, setCompanyName] = useState('')
  const [IsLoading, setIsLoading] = useState(false);

  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={"Upload Logo"}
          onBackClick={() => navigate(screenNames.LogoScreen)}
          customStyle={undefined}
        />

<ScrollViewWrapper >
    <View style={{marginTop:10}}>



          <View>
            <Card elevation={1} style={{

              backgroundColor: AppColor.WHITE,
              marginVertical: 5,
              padding: 10,
              alignItems:'center',marginHorizontal:2,
              paddingVertical:20,
              borderRadius:10
            }}>
                <View style={{
                    width:80,
                    height:80,
                    justifyContent:'center',
                    alignItems:'center',
                    borderRadius:100,
                    backgroundColor:AppColor.WHITE,
                    borderWidth:2,
                    borderStyle:'dashed',
                    borderColor:AppColor.BLACK_40,
                    alignSelf:'center'
                }}>
                    <View style={{
                    width:70,
                    height:70,
                    justifyContent:'center',
                    alignItems:'center',
                    borderRadius:100,
                    backgroundColor:AppColor.PRIMARY,
                }}>

                    <MaterialIcons
                                 name="add"
                                 size={30}
                                 color={AppColor.WHITE}
                               />
                </View>

                </View>
                

               {/* <Image resizeMode='contain' source={images.UPLOAD_IMAGE_GALLERY} style={{width: 70, height: 70,marginLeft:15,alignSelf:'center'}} /> */}

               <Text style={{
                marginTop:10,
                color:AppColor.BLACK_80,
                fontFamily:AppFonts.Medium,
                fontSize:20,
                textAlign:'center'
               }}>Upload Logo</Text>
               <Text style={{
                marginTop:10,
                color:AppColor.BLACK_50,
                fontFamily:AppFonts.Medium,
                fontSize:13,
                textAlign:'center',
                marginHorizontal:20
               }}>You can upload a logo by importing or taking a photo to submit from your phone.</Text>
            </Card>

            <View style={{
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',marginTop:15
            }}>
                <Card style={{backgroundColor:AppColor.WHITE,borderRadius:10, width:'40%',marginVertical:10,alignItems:'center',paddingVertical:8,marginHorizontal:2}}>
 <TouchableOpacity style={{flexDirection:'row',alignItems:'center',gap:10}} >
                   <MaterialIcons
                                 name="photo-library"
                                 size={30}
                                 color={AppColor.PRIMARY}
                               />
                    <Text>Gallery</Text>
                </TouchableOpacity>
                </Card>

                <Card style={{backgroundColor:AppColor.WHITE,borderRadius:10, width:'40%',marginVertical:10,alignItems:'center',paddingVertical:8,marginHorizontal:2}}>
 <TouchableOpacity style={{flexDirection:'row',alignItems:'center',gap:10}} >
                   <MaterialIcons
                                 name="photo-camera"
                                 size={30}
                                 color={AppColor.PRIMARY}
                               />
                    <Text>Camera</Text>
                </TouchableOpacity>
                </Card>
               
            </View>
          </View>

            <View style={{marginVertical:20}}>
 <CustomTextInput
            onChangeTextValue={(text) => {
              setCompanyName(text);
            }}
            textValue={companyName}
            label={"Company Name"}
            
          />
            </View>
         
    </View>
     
</ScrollViewWrapper>

       
          
        </SafeAreaWrapper>
    {/* <View style={styles.container}>
      <Text variant="titleMedium" style={styles.title}>{'Upload Logo'}</Text>
      <Text style={styles.description}>Upload a photo of yourself holding your valid ID for verification.</Text>
      <Divider style={styles.divider} />
      
      {!isUploading ? (
        <>
          <Button 
            mode="contained" 
            style={styles.uploadButton}
            labelStyle={styles.uploadButtonLabel}
            onPress={() => setIsUploading(true)}
          >
            Tap to upload photo
          </Button>
          
          <Text style={styles.fileTypes}>PNG, JPG or PDF (max. 800x400px)</Text>
          
          <View style={styles.orContainer}>
            <Divider style={styles.orDivider} />
            <Text style={styles.orText}>OR</Text>
            <Divider style={styles.orDivider} />
          </View>
          
          <Button 
            mode="outlined" 
            style={styles.cameraButton}
            labelStyle={styles.cameraButtonLabel}
            icon="camera"
          >
            Open camera
          </Button>
        </>
      ) : (
        <>
          <Text style={styles.uploadingText}>Uploading Document...</Text>
          <Text style={styles.fileName}>myiboard.jpg</Text>
          <ProgressBar indeterminate color="#6200ee" style={styles.progressBar} />
        </>
      )}
      
      {!isUploading && (
        <>
          <Text variant="titleMedium" style={[styles.title, styles.secondTitle]}>Upload ID</Text>
          <Text style={styles.description}>Upload a photo of yourself holding your valid ID for verification.</Text>
          <Divider style={styles.divider} />
        </>
      )}
    </View> */}
<View style={styles.button}>
 <LoaderButton
          title="Upload"
          onPress={() => navigate(screenNames.VerifyOTPScreen)}
          loading={IsLoading}
        />

</View>
    </>

   

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  secondTitle: {
    marginTop: 24,
  },
  description: {
    color: '#666',
    marginBottom: 16,
  },
  divider: {
    marginVertical: 8,
  },
  uploadButton: {
    marginTop: 16,
    borderRadius: 4,
    backgroundColor: '#6200ee',
  },
  uploadButtonLabel: {
    color: 'white',
    fontWeight: 'bold',
    paddingVertical: 6,
  },
  fileTypes: {
    color: '#666',
    textAlign: 'center',
    marginVertical: 16,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  orDivider: {
    flex: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 8,
    color: '#666',
  },
  cameraButton: {
    marginTop: 8,
    borderRadius: 4,
    borderColor: '#6200ee',
  },
  cameraButtonLabel: {
    color: '#6200ee',
    paddingVertical: 6,
  },
  uploadingText: {
    marginTop: 16,
    color: '#666',
    textAlign: 'center',
  },
  fileName: {
    marginTop: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  progressBar: {
    marginTop: 16,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#e0e0e0',
  },
    button: {
      width: "95%",
      alignSelf: "center",
      position: "absolute",
      bottom: Platform.OS == "ios" ? 30 : 10,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },
});

export default LogoUploadScreen;