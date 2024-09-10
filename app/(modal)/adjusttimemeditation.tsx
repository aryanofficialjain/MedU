import { View, Text, Pressable } from 'react-native'
import React, { useContext } from 'react'
import AppGradient from '@/components/AppGradient'
import { useRouter } from 'expo-router'
import Feather from '@expo/vector-icons/Feather';
import CustomButton from '@/components/CustomButton';
import { TimeContext } from '@/context/TimeContext';

const AdjustTimeMeditation = () => {

    const {duration, setDuration} = useContext(TimeContext);

    const handlepress = (duration: number) => {
        setDuration(duration);
        router.back();

    }
    const router = useRouter();
    return (
        <View className='flex-1 relative '>
            <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]}>
                <Pressable onPress={() => router.back()} className='absolute top-8 left-6 z-10 '>
                    <Feather name="arrow-left-circle" size={40} color="white" />
                </Pressable>
                <View className='justify-center h-4/5'>
                    <Text className='text-center font-bold text-3xl text-white mb-8 '>Set Your Time</Text>

                    <View>
                        <CustomButton onPress={() => handlepress(10)} title='10 Sec' containerStyles='mb-5'/>
                        <CustomButton onPress={() => handlepress(5 * 60)} title='5 min' containerStyles='mb-5'/>
                        <CustomButton onPress={() => handlepress(10 * 60)} title='10 min' containerStyles='mb-5'/>
                        <CustomButton onPress={() => handlepress(30)} title='30 sec' containerStyles='mb-5'/>
                        <CustomButton onPress={() => handlepress(45)} title='45 sec' containerStyles='mb-5'/>
                    </View>
                </View>
            </AppGradient>
        </View>
    )
}

export default AdjustTimeMeditation