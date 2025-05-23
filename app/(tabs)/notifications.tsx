import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import Loader from '@/components/Loader';
import { styles } from '@/styles/notification.styles';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';
import Notification from '@/components/Notification';

export default function Notifications() {
  const notifications = useQuery(api.notifications.getNotifications);

  if (!notifications) return <Loader />;
  if(notifications.length === 0) return <NoNotificationsFound/>

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>

        <FlatList
          data={notifications}
          renderItem={({ item }) => <Notification notification={item} />}
          keyExtractor={(item) => item._id?.toString() || Math.random().toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  )
}

function NoNotificationsFound(){
  return (
    <View style={[styles.container, styles.centered]}>
      <Ionicons name='notifications-outline' size={48} color={COLORS.primary}/>
      <Text style={{fontSize: 20, color: COLORS.white}}>No notifications yet</Text>
    </View>
  )
}