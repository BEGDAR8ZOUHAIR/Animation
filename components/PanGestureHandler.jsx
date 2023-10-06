import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withRepeat, withSpring } from "react-native-reanimated";
import { PanGestureHandler } from 'react-native-gesture-handler';

const SIZE = 80;
const CIRCLE_RADIUS = SIZE * 2;

const handleRotate = (progress) =>
{
    'worklet';
    return `${progress.value * 2 * Math.PI}rad`;
};

const PangestureHandler = () =>
{
    const progress = useSharedValue(1);
    const scale = useSharedValue(2);
    const translationX = useSharedValue(0);
    const translationY = useSharedValue(0);

    const panGestureEvent = useAnimatedGestureHandler({
        onStart: (event, context) =>
        {
            context.translateX = translationX.value;
            context.translateY = translationY.value;
        },
        onActive: (event, context) =>
        {
            translationX.value = event.translationX + context.translateX;
            translationY.value = event.translationY + context.translateY;
        },
        onEnd: () =>
        {
            const distance = Math.sqrt(Math.pow(translationX.value, 2) + Math.pow(translationY.value, 2));

            if (distance > CIRCLE_RADIUS)
            {
                translationX.value = withSpring(0);
                translationY.value = withSpring(0);
            }
        },
    });

    const rStyle = useAnimatedStyle(() =>
    {
        return {
            opacity: progress.value,
            borderRadius: progress.value * SIZE / 2,
            transform: [
                { translateX: translationX.value },
                { translateY: translationY.value },
                { scale: scale.value },
                { rotate: handleRotate(progress) }
            ]
        };
    }, []);

    useEffect(() =>
    {
        progress.value = withRepeat(withSpring(0.5), 5, true)
        scale.value = withRepeat(withSpring(1), 5, true)
    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.circle}>
                <PanGestureHandler onGestureEvent={panGestureEvent} >
                    <Animated.View style={[styles.square, rStyle]} />
                </PanGestureHandler>
            </View>
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
        backgroundColor: "tomato",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20
    },
    circle: {
        height: CIRCLE_RADIUS * 2,
        width: CIRCLE_RADIUS * 2,
        borderRadius: CIRCLE_RADIUS,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 4,
        borderColor: "tomato",
    }

});
