import {
  View,
  Text,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
} from 'react-native-reanimated';
const {width, height} = Dimensions.get('window');

const App = () => {
  const progress = useSharedValue(1);
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      // borderRadius: (progress.value * 100) / 2,
      transform: [
        // {
        //   scale: withTiming(progress.value),
        // },
        // {rotate: `${progress.value * 2 * Math.PI}rad`},
      ],
      width: withTiming(progress.value > 2 ? '90%' : 10),
      height: 50,
    };
  }, []);

  // useEffect(() => {
  //   // progress.value = withRepeat(withSpring(0.5), 6, true);
  //   scale.value = withSpring(3);
  // }, []);

  return (
    <SafeAreaView
      style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Animated.View
        style={[
          {width: width, height: 100, backgroundColor: 'blue'},
          animatedStyle,
        ]}
      />
      <TouchableOpacity
        style={{marginTop: 150}}
        onPress={() => (progress.value = 1)}>
        <Text>Click me!</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginTop: 10}}
        onPress={() => (progress.value = 3)}>
        <Text>Click me!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default App;
