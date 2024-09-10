import { View, Text, ImageBackground, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import meditationImages from '@/constants/meditation-images'
import AppGradient from '@/components/AppGradient'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Feather from '@expo/vector-icons/Feather';
import CustomButton from '@/components/CustomButton';
import { Audio } from "expo-av";
import { MEDITATION_DATA, AUDIO_FILES } from '@/constants/MeditationData'
import { TimeContext } from '@/context/TimeContext'

const Meditate = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { duration: secondRemaining, setDuration } = useContext(TimeContext);

  const [IsMeditation, setIsMeditation] = useState(false); // Controls whether the meditation is active (timer and audio)
  const [audioSound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [wasPlayingBeforeAdjust, setWasPlayingBeforeAdjust] = useState(false); // Track if audio was playing before time adjustment

  // Adjust time functionality
  const handleAdjustTime = () => {
    if (IsMeditation) {
      stopMeditationSession(); // Stop both the timer and audio before adjusting time
    }
    setWasPlayingBeforeAdjust(isPlayingAudio); // Save audio state before adjusting time
    router.push("/(modal)/adjusttimemeditation");
  };

  // Resume meditation after returning from adjusting time
  useEffect(() => {
    if (wasPlayingBeforeAdjust) {
      startMeditationSession(); // Resume session automatically if audio was playing
      setWasPlayingBeforeAdjust(false);
    }
  }, [secondRemaining]);

  // Control the timer (countdown) and clear it on unmount
  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (IsMeditation && secondRemaining > 0) {
      timerId = setTimeout(() => {
        setDuration(secondRemaining - 1);
      }, 1000);
    }

    if (secondRemaining === 0) {
      stopMeditationSession(); // Stop session when time reaches 0
    }

    return () => clearTimeout(timerId);
  }, [secondRemaining, IsMeditation]);

  // Format time for display
  const formattedTimeMinutes = String(Math.floor(secondRemaining / 60)).padStart(2, "0");
  const formattedSeconds = String(secondRemaining % 60).padStart(2, "0");

  // Toggle meditation session status and sound
  const toggleMeditationSessionStatus = () => {
    if (IsMeditation) {
      stopMeditationSession(); // Stop both timer and audio
    } else {
      startMeditationSession(); // Start both timer and audio
    }
  };

  // Start the meditation session: timer and audio
  const startMeditationSession = async () => {
    if (secondRemaining === 0) return; // Do not start if time is 0

    setIsMeditation(true); // Start the timer
    await playAudio(); // Start the audio
  };

  // Stop the meditation session: timer and audio
  const stopMeditationSession = async () => {
    setIsMeditation(false); // Stop the timer
    await pauseAudio(); // Pause the audio
  };

  // Initialize sound
  const initializeSound = async () => {
    try {
      const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;
      const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName]);
      setSound(sound);
      return sound;
    } catch (error) {
      console.error("Error loading sound:", error);
    }
  };

  // Play the audio
  const playAudio = async () => {
    let sound = audioSound;

    if (!sound) {
      sound = await initializeSound();
    }

    if (!sound) return; // Exit if sound not available

    const status = await sound.getStatusAsync();

    if (status?.isLoaded && !status.isPlaying) {
      await sound.playAsync();
      setIsPlayingAudio(true);
    }
  };

  // Pause the audio
  const pauseAudio = async () => {
    if (audioSound) {
      const status = await audioSound.getStatusAsync();
      if (status?.isLoaded && status.isPlaying) {
        await audioSound.pauseAsync();
        setIsPlayingAudio(false);
      }
    }
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      audioSound?.unloadAsync();
    };
  }, [audioSound]);

  return (
    <View className='flex-1'>
      <ImageBackground source={meditationImages[Number(id) - 1]} resizeMode='cover' className='flex-1'>
        <AppGradient colors={["transparent", "rgba(0, 0, 0, 0.8)"]}>
          <Pressable onPress={() => router.back()} className='absolute top-10 left-6 z-10'>
            <Feather name="arrow-left-circle" size={60} color="white" />
          </Pressable>

          <View className='flex-1 justify-center'>
            <View className='mx-auto bg-black text-white border border-white rounded-3xl w-44 h-44 justify-center items-center'>
              <Text className='text-4xl text-white'>{formattedTimeMinutes}:<Text className='text-red-500'>{formattedSeconds}</Text></Text>
            </View>
          </View>

          <View className='mb-5'>
            <CustomButton title="Adjust Time" onPress={handleAdjustTime} />
            <CustomButton
              containerStyles='mt-4'
              title={IsMeditation ? "Stop" : "Start"}
              onPress={toggleMeditationSessionStatus}
            />
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default Meditate;