import { StatusBar } from 'expo-status-bar';
import * as Notifications from "expo-notifications";

import AppHome from './Pages/AppHome'

export default function App() {
  //Iniciando as notificações
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
  
  return (
    <>
      <AppHome />
      <StatusBar style='light' />
    </>
  );
}
