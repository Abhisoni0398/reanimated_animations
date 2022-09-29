import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Page from '../components/Page';

const WORDS = ["What's", 'up', 'code', 'brewers'];

const ScrollAnimation = () => {
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });
  return (
    <Animated.ScrollView
      pagingEnabled
      style={styles.container}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      horizontal>
      {WORDS.map((item, index) => {
        return (
          <Page
            title={item}
            index={index}
            key={index.toString()}
            translateX={translateX}
          />
        );
      })}
    </Animated.ScrollView>
  );
};

export default ScrollAnimation;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red'
  },
});
