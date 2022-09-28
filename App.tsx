import {View, Text, StyleSheet, Alert} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

type contextType = {
  translateX: number;
  translateY: number;
};

const App = () => {
  const transitionX = useSharedValue(0);
  const transitionY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    contextType
  >({
    onStart: (event, context) => {
      context.translateX = transitionX.value;
      context.translateY = transitionY.value;
    },
    onActive: (event, context) => {
      transitionX.value = event.translationX + context.translateX;
      transitionY.value = event.translationY + context.translateY;
    },
    onEnd: () => {
      const distance = Math.sqrt(
        transitionX.value ** 2 + transitionY.value ** 2,
      );
      console.log(transitionX.value, transitionY.value, distance);
      if (distance < 250) {
        transitionX.value = withSpring(0);
        transitionY.value = withSpring(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: transitionX.value,
        },
        {
          translateY: transitionY.value,
        },
      ],
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={[styles.square, rStyle]} />
        </PanGestureHandler>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(0,0,256, 0.5)',
    borderRadius: 20,
  },
  circle: {
    height: 400,
    width: 400,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 200,
    borderWidth: 5,
    borderColor: 'blue',
  },
});
