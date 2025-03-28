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
                height: 40,
                paddingBottom : 10
            }
        }}
    >
        <Tabs.Screen 
            name='index'
            options={{
                tabBarIcon: ({size, color}) => <Ionicons size={size} color={color} name="home" />
            }}
        />
        <Tabs.Screen 
            name='bookmarks'
            options={{
                 tabBarIcon: ({size, color}) => <Ionicons size={size} color={color} name="bookmark" />
            }}
        />
        <Tabs.Screen 
            name='create'
            options={{
                 tabBarIcon: ({size}) => <Ionicons size={size} color={COLORS.primary} name="add-circle" />
            }}
        />
        <Tabs.Screen 
            name='notifications'
            options={{
                 tabBarIcon: ({size, color}) => <Ionicons size={size} color={color} name="heart" />
            }}
        />
        <Tabs.Screen 
            name='profile'
            options={{
                 tabBarIcon: ({size, color}) => <Ionicons size={size} color={color} name="person-circle" />
            }}
        />
    </Tabs>
  )
}