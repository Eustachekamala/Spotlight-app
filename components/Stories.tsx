import { STORIES } from "@/constants/mock-data";
import { styles } from "@/styles/feed.styles";
import { ScrollView } from "react-native";
import Story from "./Story";

export const StoriesSection = () => (
  <ScrollView
    horizontal
    showsVerticalScrollIndicator={false}
    style={styles.storiesContainer}
  >
    {STORIES.map((story) => (
      <Story key={story.id} story={story} />
    ))}
  </ScrollView>
);