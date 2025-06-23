import { Dimensions, StatusBar } from "react-native";

export enum Constants {
    ScreenHeight = Dimensions.get('screen').height,
    ScreenWidth = Dimensions.get('screen').width,
    StatusBarHeight = StatusBar.currentHeight || 0,
    AppName = 'CIVION'
}