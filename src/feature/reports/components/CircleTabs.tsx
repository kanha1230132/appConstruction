import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Animated, Easing } from 'react-native';
import { AppColor } from '../../../themes/AppColor';
import { AppFonts } from '../../../themes/AppFonts';
import { Constants } from '../../../constants/constants';

interface CircleTabsProps {
  ActiveTab: number;
  Tabs: number[];
  onTabPress?: (tab: number) => void;
  lineWidth:number
}

const CircleTabs: React.FC<CircleTabsProps> = ({ ActiveTab, Tabs, onTabPress,lineWidth }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const lineWidthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 150,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
    Animated.timing(lineWidthAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [ActiveTab]);

  const handleTabPress = (tab: number) => {
    if (onTabPress) {
      onTabPress(tab);
    }
  };

  return (
    <View style={styles.progressContainer}>
      {Tabs.map((step, index) => (
        <React.Fragment key={index}>
          <Animated.View
            style={[
              {
                transform: step === ActiveTab ? [{ scale: scaleAnim }] : [{ scale: 1 }],
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => handleTabPress(step)}
              style={[
                styles.progressCircle,
                step <= ActiveTab
                  ? styles.activeCircle
                  : { borderColor: AppColor.LIGHT_GRAY, borderWidth: 1 },
              ]}
            >
              <Text
                style={[
                  styles.progressText,
                  step <= ActiveTab ? styles.activeText : {},
                ]}
              >
                {step}
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {index < Tabs.length - 1 && (
            <Animated.View
              style={[
                styles.progressLine,
                {
                  width: lineWidthAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%',`${lineWidth}%` ],
                  }),
                },
                step < ActiveTab ? styles.completedLine : {},
              ]}
            />
          )}
        </React.Fragment>
      ))}
    </View>
  );
};

export default CircleTabs;

const styles = StyleSheet.create({
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  progressCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: AppColor.BLACK_10,
    alignItems: "center",
    justifyContent: "center",
  },
  activeCircle: {
    borderColor: AppColor.PRIMARY,
    backgroundColor: AppColor.PRIMARY,
  },
  progressText: {
    fontSize: 16,
    color: AppColor.BLACK,
    fontFamily: AppFonts.Medium,
  },
  activeText: {
    color: AppColor.WHITE,
    fontFamily: AppFonts.Medium,
  },
  progressLine: {
    height: 2,
    backgroundColor: AppColor.BLACK_10,
    marginHorizontal: 2,
  },
  completedLine: {
    backgroundColor: AppColor.PRIMARY,
  },
});