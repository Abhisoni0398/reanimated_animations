import {View, Text, SafeAreaView, Dimensions} from 'react-native';
import React, {Context} from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const THRESHOLD = SCREEN_WIDTH / 2;

const App = () => {
  const translateX = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {x: number}
  >({
    onStart: (_, context) => {
      context.x = translateX.value;
    },

    onActive: (event, context) => {
      console.log(translateX.value);
      translateX.value = event.translationX + context.x;
    },
    onEnd: () => {
      if (translateX.value <= THRESHOLD) {
        translateX.value = withTiming(0);
      } else {
        translateX.value = withTiming(SCREEN_WIDTH / 2);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [0, SCREEN_WIDTH / 2],
      [0, 3],
      Extrapolate.CLAMP,
    );
    const borderRadius = interpolate(
      translateX.value,
      [0, SCREEN_WIDTH / 2],
      [0, 25],
      Extrapolate.CLAMP,
    );
    const scale = interpolate(
      translateX.value,
      [0, SCREEN_WIDTH / 2],
      [1, 0.8],
      Extrapolate.CLAMP,
    );

    return {
      transform: [
        {perspective: 100},
        {
          translateX: translateX.value,
        },
        {
          rotateY: `-${rotate}deg`,
        },
        {
          scale: withTiming(scale),
        },
      ],

      borderRadius: borderRadius,
      shadowColor: translateX.value > 0 ? 'red' : 'black',
      shadowOffset: {width: 0, height: 20},
      shadowOpacity: 1,
      shadowRadius: 20,
      elevation: 5,
    };
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#3C3C3C'}}>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={[{flex: 1, backgroundColor: 'white'}, rStyle]}>
            <View style={{margin: 28}}>
              <Text style={{fontSize: 18, fontWeight: '700', color: 'red'}}>
                Welcome to animation
              </Text>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default App;
