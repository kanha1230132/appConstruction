import { Dimensions, StatusBar } from "react-native";

export enum Constants {
    ScreenHeight = Dimensions.get('window').height,
    ScreenWidth = Dimensions.get('window').width,
    StatusBarHeight = StatusBar.currentHeight || 0,
    AppName = 'CIVION',
    
}