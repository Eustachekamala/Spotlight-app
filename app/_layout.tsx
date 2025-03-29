import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import InitialLayout from "@/components/InitialLayout";
import ClerkAndConvexProvider from "@/providers/ClerkAndConvexProvider";
import { StatusBar } from "react-native";


export default function RootLayout() {
  return (
      <ClerkAndConvexProvider>
        <StatusBar translucent={true} backgroundColor="transparent" barStyle="light-content" />
        <SafeAreaProvider>
          <SafeAreaView style={{flex: 1, backgroundColor: "black"}} edges={['top', 'bottom']}>
            <InitialLayout/>
          </SafeAreaView>
        </SafeAreaProvider>
      </ClerkAndConvexProvider> 
  );
}
