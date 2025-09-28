import React, { useEffect, useRef, useState } from "react";
import {
  View,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Pressable,
  Animated,
  Easing,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { TextInput, useTheme } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AppColor } from "../../themes/AppColor";
import Voice, {
  type SpeechRecognizedEvent,
  type SpeechResultsEvent,
  type SpeechErrorEvent,
} from '@react-native-voice/voice';
interface VoiceToTextInputProps {
  description: string;
  setDescription: (description: string) => void;
}

const VoiceToTextInput = ({
  description,
  setDescription,
}: VoiceToTextInputProps) => {
  const [isListening, setIsListening] = useState(false);
  const micScale = useRef(new Animated.Value(1)).current;
  const micPulseAnimation = useRef<Animated.CompositeAnimation | null>(null);
const descriptionRef = useRef(description)

useEffect(() => {
  descriptionRef.current = description;
}, [description]);

  // Animate mic icon while listening
  const animateMic = () => {
    micScale.setValue(1); // reset
    micPulseAnimation.current = Animated.loop(
      Animated.sequence([
        Animated.timing(micScale, {
          toValue: 1.5,
          duration: 600,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(micScale, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ])
    );
    micPulseAnimation.current.start();
  };

  const stopMicAnimation = () => {
    micPulseAnimation.current?.stop();
    micScale.setValue(1); // Reset value immediately
  };

useEffect(() => {
  Voice.onSpeechResults = (e) => {
    if (e.value && e.value.length > 0) {
      const spokenText = e.value[0];
      const updated = descriptionRef.current + " " + spokenText;
      setDescription(updated.trim());
    }
  };

  Voice.onSpeechError = (e) => {
    console.log("Speech Error:", e);
    stopListening();
  };

  return () => {
    Voice.destroy().then(Voice.removeAllListeners);
  };
}, []);



  const requestMicPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const startListening = async () => {
    // const hasPermission = await requestMicPermission();
    // if (!hasPermission) return;

      const hasPermission = await requestMicPermission();
      console.log("hasPermission : ", hasPermission)
  if (!hasPermission) return;


    try {
      setIsListening(true);
      animateMic();
      Voice.start("en-US").then((res)=>{
        console.log("res : ", res)
      }).catch((e)=>{
        console.log("e : ", e)
      })
    } catch (e) {
      console.log("e : ", e)
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.log(e);
    }
    setIsListening(false);
    stopMicAnimation();
  };

  const handleMicPress = async() => {
    if (isListening) {
      await stopListening();
    } else {
      await startListening();

    }
  };



  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleMicPress} style={styles.button}>
        <View style={styles.micWrapper}>
          {isListening && (
            <Animated.View
              style={[
                styles.pulseCircle,
                {
                  transform: [{ scale: micScale }],
                  opacity: micScale.interpolate({
                    inputRange: [1, 1.2],
                    outputRange: [0.7, 0.3],
                  }),
                },
              ]}
            />
          )}
          <Animated.View style={{ transform: [{ scale: micScale }] }}>
            <MaterialIcons
              name={isListening ? "mic" : "mic-none"}
              size={30}
              color={AppColor.WHITE}
            />
          </Animated.View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default VoiceToTextInput;

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  input: {
    flex: 1,
    backgroundColor: AppColor.WHITE,
  },
  button: {
    alignSelf: "center",
    backgroundColor: AppColor.PRIMARY,
    borderRadius: 50,
    padding: 12,
    elevation: 2,
  },

  micWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
  },

  pulseCircle: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 28,
    backgroundColor: AppColor.PRIMARY,
  },
});
