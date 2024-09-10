import { View, Text, ImageBackground, Pressable } from 'react-native'
import React from 'react'
import meditationImages from '@/constants/meditation-images'
import AppGradient from '@/components/AppGradient'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Feather from '@expo/vector-icons/Feather';

const Meditate = () => {
  const router = useRouter();
  const {id} = useLocalSearchParams();


  return (
    <View className='flex-1'>
      <ImageBackground source={meditationImages[Number(id) - 1]} resizeMode='cover' className='flex-1'>
        <AppGradient colors={["transparent", "rgba(0, 0, 0, 0.8)"]}>
          <Pressable onPress={() => router.back()} className='absolute top-10 left-6 z-10'>
          <Feather name="arrow-left-circle" size={60} color="white" />
          </Pressable>
        </AppGradient>

      </ImageBackground>
    </View>
  )
}

export default Meditate