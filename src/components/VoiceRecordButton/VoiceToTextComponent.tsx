import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Pressable,
  Text,
} from "react-native";
import {
  destroy,
  getRecognitionLanguage,
  startListening,
  stopListening,
} from "@ascendtis/react-native-voice-to-text";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AppColor } from "../../themes/AppColor";
import { TextInput } from "react-native-paper";

interface VoiceToTextInputProps {
  description: string;
  setDescription: (description: string) => void;
}

const VoiceToTextComponent = ({
  description,
  setDescription,
}: VoiceToTextInputProps) => {
  const [listening, setListening] = useState(false);
  const micScale = useRef(new Animated.Value(1)).current;
  const micPulseAnimation = useRef<Animated.CompositeAnimation | null>(null);
  const [text, setText] = useState("");

  const animateMic = () => {
    micScale.setValue(1);
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
    micScale.setValue(1);
  };

  const requestPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: "Microphone Permission",
          message: "App needs access to your microphone",
          buttonPositive: "OK",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const startVoice = async () => {
    const permission = await requestPermission();
    if (!permission) return;
    animateMic();
    setListening(true);
    await startListening();
  };

  const stopVoice = async () => {
    stopMicAnimation();
    setListening(false);
    await stopListening();
  };

  useEffect(() => {
    (async ()=>{
    const permission = await requestPermission();
    if (!permission) return;
     getRecognitionLanguage().then((res) => {
      console.log("Language:", res);
      setText(res);
    });
  
    })()
     return () => {
      destroy()?.then(() => console.log("destroyed"));
    };
  }, []);

  const handleSend = () => {
    if (text.trim()) {
      console.log("Send:", text);
      const prev = description + " " + text;
      setText("");
      setDescription(prev);
    }
    stopListening();
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Enter Description ......"
        value={text}
        onChangeText={setText}
        mode="outlined"
        style={styles.input}
        right={
          <TextInput.Icon
            icon="send"
            onPress={handleSend}
            forceTextInputFocus={false}
            color={AppColor.PRIMARY}
          />
        }
        activeOutlineColor={AppColor.PRIMARY}
      />

      <Pressable
        onPress={listening ? stopVoice : startVoice}
        style={styles.button}
      >
        <View style={styles.micWrapper}>
          {listening && (
            <Animated.View
              style={[
                styles.pulseCircle,
                {
                  transform: [{ scale: micScale }],
                  opacity: micScale.interpolate({
                    inputRange: [1, 1.5],
                    outputRange: [0.7, 0.3],
                  }),
                },
              ]}
            />
          )}
          <Animated.View style={{ transform: [{ scale: micScale }] }}>
            <MaterialIcons
              name={listening ? "mic" : "mic-none"}
              size={30}
              color={AppColor.WHITE}
            />
          </Animated.View>
        </View>
      </Pressable>

      
    </View>
  );
};

export default VoiceToTextComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    alignSelf: "center",
    backgroundColor: AppColor.PRIMARY,
    borderRadius: 50,
    padding: 12,
    elevation: 2,
    marginTop: 20,
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
  cancelButton: {
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#ccc",
    borderRadius: 20,
  },
  cancelText: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    flex: 1,
    backgroundColor: AppColor.WHITE,
  },
});
