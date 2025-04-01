import Loader from '@/components/Loader';
import { COLORS } from '@/constants/theme';
import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';
import { styles } from '@/styles/profile.styles';
import { useAuth } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery } from 'convex/react';
import { Image } from 'expo-image';
import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'


export default function profile() {
  const { signOut, userId } = useAuth();
  const [ isEditModalVisible, setEditModalVisible ] = useState(false);
  const currentUser = useQuery(api.users.getUserByClerkId, userId ? { clerkId: userId} : "skip")

  const [editedProfile, setEditedProfile] = useState({
    fullname: currentUser?.fullname || "",
    bio: currentUser?.bio || ""
  })

  const [ selectedPost, setSelectedPost] = useState<Doc<"posts"> | null>(null)
  const posts = useQuery(api.posts.getPostByUser, {});

  const updateProfile = useMutation(api.users.updateProfile);

  const handleSaveProfile = async () => {

  }

  const handleEditProfile = async () => {

  }

  if(!currentUser || posts === undefined) return <Loader/>

  return (
    <View style={styles.container}>
      {/**HEADER */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.username}>{currentUser.username}</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerIcon}  onPress={() => signOut()}>
              <Ionicons name='log-out-outline' size={24} color={COLORS.white}/>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.profileInfo}>
            {/**AVATAR & STATS */}
            <View style={styles.avatarAndStats}>
              <View style={styles.avatarContainer}>
                <Image
                  source={currentUser.image}
                  style={styles.avatar}
                  contentFit='cover'
                  transition={200}
                />
              </View>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>
                    {currentUser.posts}
                  </Text>
                  <Text style={styles.statLabel}>
                    Posts
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{currentUser.followers}</Text>
                  <Text style={styles.statLabel}>Followers</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{currentUser.following}</Text>
                  <Text style={styles.statLabel}>Following</Text>
                </View>
              </View>
            </View>

              <Text style={styles.name}>{currentUser.fullname}</Text>
              {currentUser.bio && <Text style={styles.bio}>{currentUser.bio}</Text>}

            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareButton}>
                <Ionicons name='share-outline' size={20} color={COLORS.white}/>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
    </View>
  )
}