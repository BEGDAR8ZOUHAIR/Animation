import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import Animated,
{
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
} from "react-native-reanimated";

const handleRotate = (progress) =>
{
  'worklet';
  return `${progress.value * 2 * Math.PI}rad`;
};
function App()
{
  const progress = useSharedValue(1);
  const scale = useSharedValue(2);

  const reanimatedStyle = useAnimatedStyle(() =>
  {
    return {
      opacity: progress.value,
      borderRadius: progress.value * 100/2,
      transform: [{ scale: scale.value }, { rotate: handleRotate(progress) }],
    }
  }, []);

  useEffect(() =>
  {
    progress.value = withRepeat(withSpring(0.5), -1, true)
    scale.value = withRepeat(withSpring(1), -1, true)
  }, [])

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          { height: 100, width: 100, backgroundColor: 'green' },
          reanimatedStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'fff',
    justifyContent: "center",
    alignItems: "center",
  },

},
);

export default App;
