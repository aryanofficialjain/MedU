import AppGradient from '@/components/AppGradient'
import React from 'react'
import { FlatList, ImageBackground, Pressable, StatusBar, Text, View } from 'react-native'
import { MEDITATION_DATA } from "@/constants/MeditationData";
import meditationImages from '@/constants/meditation-images';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';



function NatureMeditate() {
    
    const router = useRouter()
    return (
        <View className='flex-1 '>
            <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]}>
                <View className='my-8'>
                    <Text className='text-gray-200 font-bold text-4xl mb-3 text-left mx-6'>Welcome 👋</Text>
                    <Text className='text-indigo-100 text-xl font-medium mx-6'>Start You Day With Amazing Thoughts</Text>
                </View>

                <View>
                    <FlatList data={MEDITATION_DATA}
                        className='mb-20' keyExtractor={(item) => item.id.toString()} showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => router.push(`/meditate/${item.id}`)} className='h-48 my-3 rounded-2xl overflow-hidden'>
                                <ImageBackground source={meditationImages[item.id - 1]} resizeMode='cover' className='flex-1  justify-center'>
                                <LinearGradient colors={["transparent", "rgba(0,0,0,0.8)"]} className=''>
                                    <Text className='text-gray-100 text-3xl 
                                    font-bold text-center'>{item.title}</Text>
                                    
                                    </LinearGradient>    
                                
                                </ImageBackground>
                            </Pressable>
                        )}
                    />
                </View>
            </AppGradient>
            <StatusBar barStyle={"light-content"} />
        </View>
    )
}

export default NatureMeditate