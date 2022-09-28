import {View, Text, SafeAreaView, Alert} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
} from 'react-native-reanimated';

const Transform = () => {
  const progress = useSharedValue(1);
  const scale = useSharedValue(3);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * 100) / 2,
      transform: [
        {scale: scale.value},
        {rotate: `${progress.value * 2 * Math.PI}rad`},
      ],
    };
  }, []);

  useEffect(() => {
    progress.value = withRepeat(withSpring(0.5), 6, true);
    scale.value = withRepeat(withSpring(1), 6, true);
  }, []);

  return (
    <SafeAreaView
      style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Animated.View
        style={[
          {width: 100, height: 100, backgroundColor: 'blue'},
          animatedStyle,
        ]}
      />
    </SafeAreaView>
  );
};

export default Transform;
