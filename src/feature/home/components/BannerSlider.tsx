import * as React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance, Pagination,
} from "react-native-reanimated-carousel";
import { Constants } from "../../../constants/constants";
import { Card } from "react-native-paper";
import { AppColor } from "../../../themes/AppColor";
import { BannerInfo } from "../../../api/apiInterface";
 
const data = [...new Array(6).keys()];

const BannerSlider = ({List}:{List:BannerInfo[]}) => {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  
  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <Card elevation={0} style={{marginTop:10,backgroundColor:AppColor.WHITE,height:200,borderRadius:10}}>
      <Carousel
        ref={ref}
        autoPlay={true}
        width={Constants.ScreenWidth-20}
        height={200}
        autoPlayInterval={4000}
        
        style={{
          alignSelf:'center',
          borderRadius:10
        }}
        data={List}
        onProgressChange={progress}
        mode={"parallax"}
        renderItem={({ item,index }:{item:BannerInfo,index:number}) => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
           <Image resizeMode='cover' source={{uri:item.image_path}} style={{width:'100%',height:'100%',borderRadius:10}} />
          </View>
        )}
      />
 
      <Pagination.Basic
        progress={progress}
        data={List}
        dotStyle={{ backgroundColor: AppColor.LIGHT_GRAY, borderRadius: 50 }}
        activeDotStyle={{
          backgroundColor: AppColor.PRIMARY,
          borderRadius: 50,
        }}
        containerStyle={{ gap: 5, marginTop: 10 }}
        onPress={onPressPagination}
      />
    </Card>
  )
}

export default BannerSlider

const styles = StyleSheet.create({})