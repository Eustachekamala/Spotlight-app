import { View } from "react-native";
import { styles } from "@/styles/auth.styles";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <Link
        style={{
          padding: 8,
          backgroundColor: "black",
          color: "white",
          borderRadius: 15,
        }}
        href="/notifications"
      >
        {" "}
        Visit Notification Screen
      </Link>
    </View>
  );
}
