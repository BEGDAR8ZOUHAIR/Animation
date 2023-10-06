import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { PanGestureHandler } from 'react-native-gesture-handler';

const SIZE = 100;

const PangestureHandler = () =>
{
    
    const translationX = useSharedValue(0);

    const panGestureEvent = useAnimatedGestureHandler({
        onStart: (event) => { },
        onActive: (event) =>
        {
            translationX.value = event.translationX;
        },
        onEnd: (event) => { },
    });

    const rStyle = useAnimatedStyle(() =>
    {
        return {
            transform: [
                { translateX: translationX.value }
            ]
        };
    });

    return (
        <View style={styles.container}>
            <PanGestureHandler onGestureEvent={panGestureEvent} >
                <Animated.View style={[styles.square, rStyle]} />
            </PanGestureHandler>
        </View>
    );
}
export default PangestureHandler

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "center",
        alignItems: "center",
    },
    square: {
        height: SIZE,
        width: SIZE,
        backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20
    }
});
