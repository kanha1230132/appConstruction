
import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Text, useTheme, Card, ProgressBar } from "react-native-paper";
import { images } from "../../../assets";
import { AppColor } from "../../../themes/AppColor";
import { getUuid, openDocumentPicker } from "../../../utils/util";
import { ImageType } from "../../../types/ImageType";
import RestClient from "../../../api/restClient";
import { AttachmentResponse } from "../../../api/apiInterface";
import Ionicons from "react-native-vector-icons/Ionicons";

interface FileUploadCardProps {
  file: any;
  setFile: (file: any) => void;
  IsBoss ?:boolean
}

const FileUploadCard: React.FC<FileUploadCardProps> = ({ file, setFile,IsBoss }) => {

  const [pdfName, setPdfName] = useState('');
  const [docFile, setDocFile] = useState<AttachmentResponse>();
  const [fileIsLoading, setFileIsLoading] = useState(false);

  useEffect(() => {
    if(file){
      console.log("first : ", file);
      setPdfName(file?.split('/').pop());
    }
  }, [file])

  const clickToUpload = async () => {
    try {
      const response = await openDocumentPicker();
      if (response) {
        setFileIsLoading(true)
        console.log("response L: ", response);
        setPdfName(response.name || '')
        await uploadAttachments(response.uri);
        setFileIsLoading(false)

      }
    } catch (error) {
      console.log("Error : ", error);
    }finally{
        setFileIsLoading(false)
    }
  };


  const uploadAttachments = async (uri:string)=>{
    try {
      const formData = new FormData();
            formData.append('file', {
                uri: uri,
             name: `document_${new Date().getTime()}.pdf`,   // name of the file (optional but good practice)
            type: 'application/pdf'
            });

            formData.append('type', ImageType.SCHEDULE);
        const restClient = new RestClient();
        const response = await restClient.uploadAttachments(formData);
        if(response && typeof response !== 'string'){
            console.log("response : ", response.data);
            const file:AttachmentResponse = response.data[0];
            setDocFile(file);
              let url = file.fileUrl;
                    console.log("url : ",url)
                     url = url.replace(/^.*?\.net\//, "");
            setFile(url);
          }
    } catch (error) {
      console.log("first : ", error);
    }
  }

  return (
    <Card elevation={0} style={{ borderRadius: 6, marginHorizontal: 2, borderWidth: 1, borderColor: AppColor.BLACK_30 }}>
      <View
        style={[
          styles.container,
          { backgroundColor: AppColor.WHITE, marginHorizontal: 2 },
        ]}
      >
        <Text style={styles.title}>{file ? 'Uploaded Schedule Pdf' :'Upload Schedule Pdf' }</Text>
        {
          file ?

          <Text style={{color:AppColor.PRIMARY}}>{pdfName}</Text>

          : 
          <>
        <Text style={styles.fileTypes}>Pdf</Text>
          
           <TouchableOpacity
          onPress={() => clickToUpload()}
          style={{
            width: "80%",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderStyle: "dashed",
            borderColor: AppColor.BLACK_30,
            paddingVertical: 30,
            borderRadius: 20,
          }}
        >
          <Image
            source={images.PDF_ICON}
            style={{
              width: 100,
              height: 100,
            }}
          />
        </TouchableOpacity>


          </>

        }



       
      </View>

{
  file && IsBoss  ?
   <Ionicons onPress={() => {setDocFile(undefined), setFile(''), setPdfName('')}} style={{
        position:'absolute',
        right:10,
        top:10
       }} name="close" size={24} color={AppColor.REJECT} /> 

  : null
}
{
  fileIsLoading ? <ProgressBar style={{ backgroundColor: AppColor.BLACK_20 }}  progress={0.5} indeterminate color={AppColor.PRIMARY} /> : null
}

    
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    alignSelf: "center",
    borderRadius: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  fileTypes: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
});

export default FileUploadCard;



function useSEffect(arg0: () => void, arg1: (AttachmentResponse | undefined)[]) {
  throw new Error("Function not implemented.");
}

