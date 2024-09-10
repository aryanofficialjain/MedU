import { View, Text, ImageBackground, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import meditationImages from '@/constants/meditation-images'
import AppGradient from '@/components/AppGradient'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Feather from '@expo/vector-icons/Feather';
import CustomButton from '@/components/CustomButton';
import {Audio} from "expo-av";
import { MEDITATION_DATA , AUDIO_FILES} from '@/constants/MeditationData'



const Meditate = () => {
  const router = useRouter();
  const {id} = useLocalSearchParams();

  const [secondRemaining, setsecondRemaining] = useState(10);
  const [Button, setButton] = useState(false);
  const [audioSound, setSound] = useState<Audio.Sound>();
  const [isPlayingAudio, setisPlayingAudio] = useState(false);


  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if(secondRemaining === 0){
      return;
    }

    if(Button){
      timerId = setTimeout(() => {
        setsecondRemaining(secondRemaining - 1);
        
      }, 1000);

    }

    


    return () => {
      clearTimeout(timerId);

    }



  }, [secondRemaining, Button]);

// forAT THE TIME to digits 

  const formattedTimeMinutes = String(Math.floor(secondRemaining / 60)).padStart(2, "0");

  const formattedSeconds = String(secondRemaining % 60).padStart(2, "0");




// make a mediattaion session fucntion working and check it staus 
const toggleMeditationSessionStatus = async() => {
    if(secondRemaining === 0) setsecondRemaining(10)

      setButton(!Button);
    await toggleSound();

}

const initializeSound = async() => {
  const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;
  const {sound} = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName]);

  setSound(sound)
  return sound;

}

useEffect(() => {
  return () => {
    audioSound?.unloadAsync()
  }
}, [audioSound])


const toggleSound = async () => {
  const sound = audioSound ? audioSound : await initializeSound();

  const status = await sound?.getStatusAsync();

  if(status?.isLoaded && !isPlayingAudio){
    await sound.playAsync();
    setisPlayingAudio(true);
  }else {
    await sound.pauseAsync();
    setisPlayingAudio(false);
  }
}


  return (
    <View className='flex-1'>
      <ImageBackground source={meditationImages[Number(id) - 1]} resizeMode='cover' className='flex-1'>
        <AppGradient colors={["transparent", "rgba(0, 0, 0, 0.8)"]}>
          <Pressable onPress={() => router.back()} className='absolute top-10 left-6 z-10'>
          <Feather name="arrow-left-circle" size={60} color="white" />
          </Pressable>

          <View className='flex-1 justify-center'>
            <View className='mx-auto bg-black text-white shadow-slate-50  rounded-3xl w-44 h-44 justify-center items-center '>
              <Text className='text-4xl text-white '>{formattedTimeMinutes}:{formattedSeconds}</Text>

            </View>
          </View>

          <View className='mb-5'>
            <CustomButton title={isPlayingAudio ? "Stop" : "Start"} onPress={toggleMeditationSessionStatus}
            />
          </View>
        </AppGradient>

      </ImageBackground>
    </View>
  )
}

export default Meditate