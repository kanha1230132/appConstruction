import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { AppFonts } from '../../themes/AppFonts';
import { AppColor } from '../../themes/AppColor';
import { moderateScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BUTTON_WIDTH = SCREEN_WIDTH - 40;
const SWIPEABLE_WIDTH = 60;

interface SwipeButtonProps {
  title: string;
  onSwipeSuccess: () => Promise<boolean>; // <-- make sure it's async
  resetAfterSuccess?: boolean;
  color?: string;
  successColor?: string;
}

const SwipeButton: React.FC<SwipeButtonProps> = ({
  title,
  onSwipeSuccess,
  resetAfterSuccess = true,
  color = AppColor.PRIMARY,
  successColor = AppColor.APPROVE,
}) => {
  const pan = useRef(new Animated.Value(0)).current;
  const iconOpacity = useRef(new Animated.Value(0)).current;

  const [swipeComplete, setSwipeComplete] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // <-- loading state

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !swipeComplete && !loading, // block during loading
      onPanResponderMove: (_, gestureState) => {
        const newX = Math.max(0, Math.min(gestureState.dx, BUTTON_WIDTH - SWIPEABLE_WIDTH));
        pan.setValue(newX);
      },
      onPanResponderRelease: async (_, gestureState) => {
        const threshold = BUTTON_WIDTH * 0.75;
        if (gestureState.dx > threshold) {
          Animated.timing(pan, {
            toValue: BUTTON_WIDTH - SWIPEABLE_WIDTH,
            duration: 300,
            useNativeDriver: false,
          }).start(async () => {
            setSwipeComplete(true);
            setLoading(true); // <-- show loader

            try {
             const isCorrect =  await onSwipeSuccess(); // <-- await async call
            setLoading(false); // <-- show loader
              setIsSuccess(isCorrect ? true : false);

              Animated.timing(iconOpacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
              }).start();

               

              if (resetAfterSuccess) {
                setTimeout(() => {
                  Animated.parallel([
                    Animated.timing(pan, {
                      toValue: 0,
                      duration: 300,
                      useNativeDriver: false,
                    }),
                    Animated.timing(iconOpacity, {
                      toValue: 0,
                      duration: 300,
                      useNativeDriver: true,
                    }),
                  ]).start(() => {
                    setSwipeComplete(false);
                    setIsSuccess(false);
                    setLoading(false); // <-- reset loader
                  });
                }, 1000);
              } else {
                setLoading(false);
              }
            } catch (error) {
              // handle failure here if needed
              Animated.spring(pan, {
                toValue: 0,
                friction: 5,
                useNativeDriver: false,
              }).start(() => {
                setSwipeComplete(false);
                setLoading(false);
              });
            }
          });
        } else {
          Animated.spring(pan, {
            toValue: 0,
            friction: 5,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <Text style={styles.text}>
  {loading
    ? 'Processing...'
    : isSuccess
    ? 'Success!'
    : title}
</Text>
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.swipe,
            {
              backgroundColor: isSuccess ? successColor : color,
              transform: [{ translateX: pan }],
            },
          ]}
        >
          {loading ? (
            <ActivityIndicator color={AppColor.WHITE} />
          ) : isSuccess ? (
            <Animated.Text style={[styles.successIcon, { opacity: iconOpacity }]}>
              <Ionicons name="checkmark-done-outline" size={30} />
            </Animated.Text>
          ) : (
            <MaterialIcons name="keyboard-double-arrow-right" size={30} color={AppColor.WHITE} />
          )}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  track: {
    width: BUTTON_WIDTH,
    height: 60,
    backgroundColor: '#eee',
    borderRadius: 30,
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  text: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: moderateScale(16),
    color: AppColor.BLACK,
    fontFamily: AppFonts.Medium,
  },
  swipe: {
    width: SWIPEABLE_WIDTH,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
  },
  successIcon: {
    fontSize: 24,
    fontFamily: AppFonts.Medium,
    color: AppColor.WHITE,
  },
});

export default SwipeButton;
