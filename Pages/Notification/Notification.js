import * as Device from 'expo-device';
import * as Notifications from "expo-notifications";
import { AndroidNotificationPriority } from 'expo-notifications';
import React, { useState, useEffect, useRef } from "react";
import {  Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function Notification() {
    const [expoPushToken, setExpoPushToken] = useState("");
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
  
    useEffect(() => {
      registerForPushNotificationsAsync().then((token) =>
        setExpoPushToken(token)
      );
  
      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
        });
  
      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
        });
  
      return () => {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);
  
    return (
      null
    );
  }

export async function schedulePushNotification( rotina, horas, minutos, dias ) {
  let listaDeDias = Object.keys(dias)

  if(listaDeDias[0] == 0){
    return await agendaNotificacaoTodosOsDias(rotina, horas, minutos)
  }

  return await agendaNotificacaoDiasEspecificos(rotina, horas, minutos, listaDeDias)
}

export async function agendaNotificacaoTodosOsDias( rotina, horas, minutos ) {
  let idsDasNotificacoes = []
  const notifId = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Rotina agendada",
      subtitle: "Mensagem de Rotinagem",
      body: `Não se esqueça, você definiu ${rotina} as ${horas}:${minutos}`,
      vibrate: true | 1000,
      priority: AndroidNotificationPriority.HIGH,
      // sound: 'default',
    },
    trigger: {
      hour: horas,
      minute: minutos,
      repeats: true,
    },
  });
  idsDasNotificacoes.push(notifId)
  return idsDasNotificacoes;
}

export async function agendaNotificacaoDiasEspecificos( rotina, horas, minutos, dias  ) {
  const notificationOptions = {
    title: "Rotina agendada",
        subtitle: "Mensagem de Rotinagem",
        body: `Não se esqueça, você definiu ${rotina} as ${horas}:${minutos}`,
        vibrate: true | 1000,
        priority: AndroidNotificationPriority.HIGH,
  }
  const scheduleArray = dias.map(dia => ({
    content: notificationOptions,
    trigger: {
      weekday: parseInt(dia),
      hour: horas,
      minute: minutos,
      repeats: true,
    },
  }));

  const notifId = await Promise.all(scheduleArray.map(notification => Notifications.scheduleNotificationAsync(notification)));
  return notifId;
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Falha na obtenção do token de notificação!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert("É necessário um dispositivo físico para receber a notificação");
    }
  
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        sound: true,
        lightColor: "#FF231F7C",
        lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
        bypassDnd: true,
      });
    }
  
    return token;
  }
  
  export async function cancelNotification(notifId){
    await Notifications.cancelScheduledNotificationAsync(notifId);
}