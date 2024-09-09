import { View, Text, ImageBackground, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { GalleryPreviewData } from '@/constants/models/AffirmationCategory';
import AFFIRMATION_GALLERY from '@/constants/affirmation-gallery';
import AppGradient from '@/components/AppGradient';
import Ionicons from '@expo/vector-icons/Ionicons';

const AffirmationPractice = () => {
    const { itemId } = useLocalSearchParams();
    const router = useRouter();


    const [affirmation, setAffirmation] = useState<GalleryPreviewData>();
    const [sentences, setSentences] = useState<string[]>();

    useEffect(() => {
        for (let idx = 0; idx < AFFIRMATION_GALLERY.length; idx++) {
            const affirmationData = AFFIRMATION_GALLERY[idx].data;

            const affirmationToStart = affirmationData.find((a) => a.id === Number(itemId));
            if (affirmationToStart) {
                setAffirmation(affirmationToStart);

                const affirmationArray = affirmationToStart.text.split(".");
                // Remove the last element if it is empty

                if(affirmationArray[affirmationArray.length - 1] === '' ){
                    affirmationArray.pop();

                }

                setSentences(affirmationArray);
                return;

            }


        }
    }, [])


    return (
        <View className='flex-1'>
            <ImageBackground source={affirmation?.image} className='flex-1' resizeMode='cover' >
                <AppGradient colors={["transparent", "rgba(0,0,0,0.8)"]}>
                    <Pressable onPress={() => router.back()} className='absolute top-16 left-6 z-10'>
                        <Ionicons name="arrow-back-circle-outline" size={50} color="white" />
                    </Pressable>
                    <ScrollView className='mt-20' showsVerticalScrollIndicator={false} >
                        <View className='h-full justify-center '>
                            <View className='h-4/5 justify-center'>
                            {sentences?.map((sentence, idx) => (
                                <Text className='text-white text-3xl mb-12 font-bold text-center'>
                                {sentence}.
                            </Text>

                            ))}
                                

                            </View>

                        </View>
                    </ScrollView>
                </AppGradient>
            </ImageBackground>
        </View>
    )
}

export default AffirmationPractice