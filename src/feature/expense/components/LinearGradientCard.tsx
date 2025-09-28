import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Card } from 'react-native-paper';
import { AppColor } from '../../../themes/AppColor';
import { AppFonts } from '../../../themes/AppFonts';
import { moderateScale } from 'react-native-size-matters';

interface GradientCardProps {
  title: string;
  subtitle: string;
  amount: number | undefined;
  colors?: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

const GradientCard: React.FC<GradientCardProps> = ({
  title,
  subtitle,
  amount,
  colors = ["#155d0080", "#155350"],
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 }
}) => {
  return (
   
         <LinearGradient
      colors={colors}
      start={start}
      end={end}
      style={styles.container}
    > <Card elevation={0} style={{
      backgroundColor:'transparent',
      marginHorizontal:1,
      paddingHorizontal:10,
      paddingVertical:12

    }}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <Text style={styles.amount}>
          {typeof amount === 'number' ? `$${amount.toFixed(2)}` : "Loading..."}
        </Text>
      </View>
    </Card>

    </LinearGradient>

   
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    // padding: 16,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize:  moderateScale(18),
  fontFamily: AppFonts.Bold,
   color: AppColor.WHITE,
    marginBottom: 4,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: moderateScale(14),
  fontFamily: AppFonts.Regular,
   color: AppColor.WHITE,
    opacity: 0.7,

  },
  amount: {
    fontSize: moderateScale(20),
    fontFamily: AppFonts.Bold,
    color: AppColor.WHITE,
    marginLeft: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default GradientCard;