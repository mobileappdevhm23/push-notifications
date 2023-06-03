import React, { useEffect } from 'react';
import { Button, Platform, View } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Theater App",
            body: 'Wolltest du nicht wieder ins Theater gehen?',
            data: { data: 'goes here' },
        },
        trigger: { seconds: 2 },
    });
}

export default function App() {
    useEffect(() => {
        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
    }, []);

    useEffect(() => {
        async function requestPermissions() {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('No notification permissions!');
                return;
            }
        }
        requestPermissions();
    }, []);

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-around',
            }}>
            <Button
                title="Press to schedule a notification"
                // inline code for the onPress event which runs the
                // schedulePushNotification function 10 times when the button is pressed
                onPress={ () => {
                    let i = 0;
                    while (i < 10) {
                        setTimeout(() => {schedulePushNotification()}, i*100);
                        i++;
                    }}}
            />
        </View>
    );
}