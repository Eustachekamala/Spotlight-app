import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import InitialLayout from "../components/InitialLayout";
import ClerkAndConvexProvider from "../providers/ClerkAndConvexProvider";
import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import * as NavigationBar from "expo-navigation-bar";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "JetBrainsMono-Medium": require("../assets/fonts/JetBrainsMono-Medium.ttf"),
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync("#000000");
      NavigationBar.setButtonStyleAsync("light");
    }
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      setTimeout(() => {
        setIsReady(true);
        SplashScreen.hideAsync();
      }, 4000);
    }
  }, [fontsLoaded]);

  if (!isReady) {
    return (
      <View style={styles.splashContainer}>
        <Image source={require("../assets/images/splash-icon.png")} style={styles.splashIcon} />
        <Text style={styles.splashText}>Spotlight</Text>
      </View>
    );
  }

  return (
    <ClerkAndConvexProvider>
      <StatusBar translucent={true} backgroundColor="transparent"/>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#000000" }}>
          <InitialLayout />
        </SafeAreaView>
      </SafeAreaProvider>
    </ClerkAndConvexProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  splashIcon: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  splashText: {
    fontSize: 24,
    color: "green",
    fontWeight: "bold",
  },
});
