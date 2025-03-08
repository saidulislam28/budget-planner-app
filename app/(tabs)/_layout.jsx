import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '../../utils/Colors'
export default function TabLayout() {
  return (
    <Tabs
    screenOptions={{
        tabBarActiveTintColor: Colors.PRIMARY,
        headerShown: false
    }}
    >
        <Tabs.Screen 
        
        name="index"
        options={{
            title: 'Home',
            tabBarIcon: ({color}) =><FontAwesome size={28} name="home" color={"black"} />
        }}
        />
        <Tabs.Screen 
        name="history"
        options={{
            title: 'History',
            tabBarIcon: ({color}) =><FontAwesome size={28} name="history" color={"black"} />
        }}
        />
        <Tabs.Screen 
        name="profile"
        options={{
            title: 'Profile',
            tabBarIcon: ({color}) =><FontAwesome size={28} name="user" color={"black"} />
        }}
        />
    </Tabs>
  )
}