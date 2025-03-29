import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from "@expo/vector-icons"
import { COLORS } from '@/constants/theme'

export default function TabLayout() {
  return (
    <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: COLORS.grey,
            tabBarStyle: {
                backgroundColor: COLORS.surface,
                borderTopColor: COLORS.surfaceLight,
                borderTopWidth: 0,
                position: 'absolute',
                elevation: 0,
                height: 50,
                paddingBottom : 16
            }
        }}
    >
        <Tabs.Screen 
            name='index'
            options={{
                tabBarIcon: ({color}) => <Ionicons size={30} color={color} name="home" />
            }}
        />
        <Tabs.Screen 
            name='bookmarks'
            options={{
                 tabBarIcon: ({color}) => <Ionicons size={30} color={color} name="bookmark" />
            }}
        />
        <Tabs.Screen 
            name='create'
            options={{
                 tabBarIcon: () => <Ionicons size={30} color={COLORS.primary} name="add-circle" />
            }}
        />
        <Tabs.Screen 
            name='notifications'
            options={{
                 tabBarIcon: ({color}) => <Ionicons size={30} color={color} name="heart" />
            }}
        />
        <Tabs.Screen 
            name='profile'
            options={{
                 tabBarIcon: ({color}) => <Ionicons size={30} color={color} name="person-circle" />
            }}
        />
    </Tabs>
  )
}