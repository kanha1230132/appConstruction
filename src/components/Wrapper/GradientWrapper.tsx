// components/GradientWrapper.tsx

import React, { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";

interface GradientWrapperProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  colors?: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  borderRadius?: number;
}

const GradientWrapper: React.FC<GradientWrapperProps> = ({
  children,
  style,
  colors = ['#dceeff', '#f0f6ff'],
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  borderRadius = 6,
}) => {
  return (
    <LinearGradient
      colors={colors}
      start={start}
      end={end}
      style={[{borderRadius }, style]}
    >
      {children}
    </LinearGradient>
  );
};

export default GradientWrapper;
