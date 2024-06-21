import LottieView from "lottie-react-native";
import Animated, { FadeOut } from "react-native-reanimated";
import pokeballJson from "../assets/pokeball.json";
import { useRef } from "react";

interface AnimatedSplashScreenProps {
  onAnimationFinish?: (isCancelled: boolean) => void;
}

export default function AnimatedSplashScreen({
  onAnimationFinish = () => {},
}: AnimatedSplashScreenProps) {
  const animation = useRef(null);
  return (
    <Animated.View
      className="flex-1 items-center justify-center"
      exiting={FadeOut.duration(500)}
    >
      <LottieView
        source={pokeballJson}
        ref={animation}
        onAnimationFinish={onAnimationFinish}
        autoPlay
        loop={false}
        style={{
          width: 174,
          height: 174,
        }}
        resizeMode="contain"
      />
    </Animated.View>
  );
}
