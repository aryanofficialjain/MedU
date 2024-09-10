
import { ImageBackground, SafeAreaView, Text, View } from 'react-native';
import beachImage from "@/assets/meditation-images/beach.webp";
import { StatusBar } from "react-native";
import CustomButton from '@/components/CustomButton';
import { useRouter } from 'expo-router';
import AppGradient from '@/components/AppGradient';

function App() {
    const router  = useRouter();
    return (
        <View className='flex-1'>
            <ImageBackground source={beachImage} resizeMode='cover' className='flex-1'>

                <AppGradient colors={["rgba(0,0,0,0.4) ", "rgba(0,0,0,0.8)"]}>
                    
                        <SafeAreaView className='flex-1 mx-10 my-8 justify-between'>
                            <View>
                                <Text className='text-center text-white font-bold text-4xl'>MedU</Text>
                                <Text className='text-center text-white'>simple Meditation App</Text>
                            </View>
                            <View>
                                <CustomButton title={"Get Started"} onPress={() => router.push('/nature-meditate')}/>
                            </View>
                            
                        </SafeAreaView>
                </AppGradient>
            </ImageBackground>
            <StatusBar barStyle="light-content" />
        </View>

    )
}

export default App