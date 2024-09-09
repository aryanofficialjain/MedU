import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Colors from '@/constants/Colors'
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const TabsLayout = () => {
  return (
    <Tabs screenOptions={{
        headerShown:false,
        tabBarActiveTintColor: Colors.primary
    }}>

        <Tabs.Screen name='nature-meditate' options={{tabBarLabel: "Think", tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="meditation" size={40} color={color} />
        )}}>

        </Tabs.Screen>

        <Tabs.Screen name='affirmations' options={{tabBarLabel: "Quotes", tabBarIcon: ({color}) => (
            <Entypo name="open-book" size={40} color={color} />
        )}}>

        </Tabs.Screen>

    </Tabs>
  )
}

export default TabsLayout;