import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function HomeLayout() {
  return (
    <Stack
    screenOptions={{
        headerShown: false
    }}
    >
        <Stack.Screen name='(tabs)'
        options={{
            headerShown: false
        }} />
        <Stack.Screen name='add_new_category'
        options={{
            presentation: 'modal',
            headerShown: true,
            headerTitle: 'Add New Category'
        }} />
        <Stack.Screen 
        name='AddNewCategoryItem'
        options={{
          presentation: 'modal',
          headerShown: true,
          headerTitle: 'Add New Item'
        }}
        />


    </Stack>
  )
}