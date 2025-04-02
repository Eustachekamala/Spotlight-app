# ScrollView vs FlatList in React Native

Both `ScrollView` and `FlatList` are used for rendering scrollable content in React Native, but they serve different purposes and have distinct advantages.

## Use FlatList when

- You have a large dataset that cannot fit in memory at once.
- You need optimized, performance-friendly scrolling.
- You want built-in features like lazy loading, item separators, and list headers.
- You are implementing an infinite scrolling experience (e.g., social media feeds, long lists).

## Use ScrollView when

- You have a small amount of content that fits comfortably in memory.
- You need a simple, vertically scrollable container (e.g., displaying a settings screen or static content).
- You want to render all items at once without worrying about performance issues.
- You do not require complex list optimizations like virtualization.

### When to Use What?

- Use `ScrollView` when you have a small amount of content that fits in memory (e.g., a settings screen or short lists).  
- Use `FlatList` when dealing with large lists (e.g., infinite scrolling feeds, long lists of items).  

---

## Pressable vs TouchableOpacity in React Native

Both `Pressable` and `TouchableOpacity` are used for handling touch interactions in React Native, but they have different behaviors and use cases.

## Use Pressable When

- You need more control over the press state (e.g., detecting `onPressIn`, `onPressOut`, or `onLongPress`).
- You want to apply dynamic styling based on press states.
- You need better performance for highly interactive UI components.

## Use TouchableOpacity When

- You want a simple way to add touch feedback with opacity changes.
- You don’t need advanced control over press events.
- You are creating standard buttons or clickable elements without complex press handling.

---

## Expo Image vs React Native Image

Both `Expo Image` and `React Native Image` components are used to display images in a React Native application, but they offer different features and use cases.

## Use Expo Image When

- You need advanced caching and performance optimizations.
- You want support for better image loading strategies, including placeholders and fallbacks.
- You are using Expo and want an easier way to handle remote images with better performance.

## Use React Native Image When

- You need a simple way to display images without additional dependencies.
- You are working on a bare React Native project without Expo.
- You are handling local images and do not require advanced caching or placeholder support.

---

## icon.png vs adaptive-icon.png

### icon.png

- This is the standard app icon appears on most devices. It's the primary icon for your app
- Recommended img size: 1024x1024

### adaptive-icon.png

- Introduced in Androind 8.0 (Oreo), this is specific to Android devices.
- Recommended img: 1024x1024

If you don't provide these icons, your app will still work, but it will use Expo's default icons. For a professional app that you plan to publish to the App Store or Play Store, you should definitely include your custom icons

---

## React Native Directory

- We can find hundreds of other third-party libraries at: [React Native Directory](https://reactnative.directory)

---

## React Native Gesture Handler

- Gesture are a great way to provide an intuitive user experience in an app.
- The **React Native Handler** library provides built-in native components that can handle gestures.
- It recognizes pan, tap, rotation, and other gestures using the platform's native touch handling system
- Learn more: [React Native Gesture Handler Documentation](<https://docs.swansion.com/react-native-gesture-handler/docs/>)

## React Native Reanimated

- Create smooth anmimations with an excellent developer experience.
- Learn more: [React Native Reanimated Documentaion](<https://docs.swansion.com/react-native-reanimated/>)

---

## Building & Publishing

- Youc can build your app for production with Expo Application Services (EAS)
- If you want to submit it to Google Play Store / App Store you'll need a developer account
- It would take couple of days/weeks till your app gets accepted and go live
- [Build Project Documentation](https://docs.expo.dev/deploy/build-project/)
- [Submit to App Stores Documentation](https://docs.expo.dev/deploy/submit-to-app-stores/)
- Building your app with

### Steps

- visit expo.dev and signup
- npm i -g eas-cli
- eas login
- eas init & it'll ask you to create a project, just say yes
- eas build --platfrom android => builds for android => will give you APK file
- eas build --platfrom ios => builds for Ios => will give you IPA file
- Then you'd take those files and submit to play store or app store
