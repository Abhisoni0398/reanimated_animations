import {View, Text, Dimensions, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
const {width, height} = Dimensions.get('window');
const SIZE = width * 0.7;

interface pageProps {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
}

const Page: FC<pageProps> = (props: any) => {
  const {title, index, translateX} = props;

  const rStyles = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, 1, 0],
      Extrapolate.CLAMP,
    );
    const borderRadius = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP,
    );
    return {
      borderRadius: borderRadius,
      transform: [{scale: scale}],
    };
  }, []);

  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [200, 0, -200],
      Extrapolate.CLAMP,
    );
    const opacity = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [-2, 1, -2],
      Extrapolate.CLAMP,
    );
    return {
      opacity,
      transform: [
        {
          translateY,
        },
      ],
    };
  });

  return (
    <View
      style={{
        backgroundColor: `rgba(0, 0, 256, 0.${index + 2})`,
        height: height,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Animated.View style={[styles.square, rStyles]} />
      <Animated.View style={[{position: 'absolute'}, rTextStyle]}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(0,0,256,0.4)',
  },
  text: {
    fontSize: 60,
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: '700',
  },
});
