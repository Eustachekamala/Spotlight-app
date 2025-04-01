import Loader from '@/components/Loader';
import { COLORS } from '@/constants/theme';
import { api } from '@/convex/_generated/api'
import { styles } from '@/styles/feed.styles';
import { useQuery } from 'convex/react'
import { Image } from 'expo-image';
import { View, Text, ScrollView } from 'react-native'


export default function bookmarks() {
  const bookmarkedPost = useQuery(api.bookmarks.getBookMarkedPosts);

  if(bookmarkedPost === undefined) <Loader/>
  if(bookmarkedPost?.length === 0) return <NoBookMarksFound />

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bookmarks</Text>
      </View>
      {/**POSTS */}
      <ScrollView
        contentContainerStyle={{
          padding: 8,
          flexDirection: "row",
          flexWrap: "wrap"
        }}
      >
        { bookmarkedPost?.map((post) => {
          if(!post) return null
          return (
            <View key={post._id} style={{width:"33.33%", padding:1}}>
              <Image 
                source={post.imageUrl}
                style={{width: "100%", aspectRatio: 1}}
                contentFit='cover'
                transition={200}
                cachePolicy="memory-disk"
              />
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

function NoBookMarksFound(){
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: "center",
      backgroundColor: COLORS.background
    }}>
      <Text style={{color: COLORS.primary, fontSize: 22}}>No bookmarked posts yet</Text>
    </View>
  )
}