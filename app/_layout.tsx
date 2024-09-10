import TimerProvider from "@/context/TimeContext";
import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <TimerProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{headerShown :false}}  />
                <Stack.Screen name="index" options={{headerShown :false}}  />
                <Stack.Screen name="meditate/[id]" options={{headerShown :false}}  />
                <Stack.Screen name="(modal)/adjusttimemeditation" options={{headerShown :false, presentation:"modal"}}  />
            </Stack>
        </TimerProvider>

        
    )
}