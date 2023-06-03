import PushNotificationIOS from '@react-native-community/push-notification-ios';
import React, {useEffect, useState} from 'react';

export default function Notification = () => {
    const [permissions, setPermissions] = useState({});
  
    /**
     * By calling this function, notification with category `userAction` will have action buttons
     */
    const setNotificationCategories = () => {
      PushNotificationIOS.setNotificationCategories([
        {
          id: 'userAction',
          actions: [
            {id: 'open', title: 'Open', options: {foreground: true}},
            {
              id: 'ignore',
              title: 'Desruptive',
              options: {foreground: true, destructive: true},
            },
            {
              id: 'text',
              title: 'Text Input',
              options: {foreground: true},
              textInput: {buttonTitle: 'Send'},
            },
          ],
        },
      ]);
    };
  
    useEffect(() => {
      const type = 'notification';
      PushNotificationIOS.addEventListener(type, onRemoteNotification);
      return () => {
        PushNotificationIOS.removeEventListener(type);
      };
    });
  
    const onRemoteNotification = (notification) => {
      const actionIdentifier = notification.getActionIdentifier();
  
      if (actionIdentifier === 'open') {
        // Perform action based on open action
      }
  
      if (actionIdentifier === 'text') {
        // Text that of user input.
        const userText = notification.getUserText();
        // Perform action based on textinput action
      }
      // Use the appropriate result based on what you needed to do for this notification
      const result = PushNotificationIOS.FetchResult.NoData;
      notification.finish(result);
    };
  };