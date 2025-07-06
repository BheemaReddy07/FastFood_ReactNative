import "./global.css"
import { useFonts } from 'expo-font';
import { Button, Text, View } from "react-native";
import HomeTab from "./screens/HomeTab";
import SignIn from "./screens/SignIn";
import AuthLayout from "./components/AuthLayout";
import SignUp from "./screens/SignUp";
import * as Sentry from '@sentry/react-native';
import { NavigationController } from "./navigation/navigator";
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
Sentry.init({
  dsn: 'https://02277b24b957813ad5dd4f923d4aab0f@o4509621400961024.ingest.us.sentry.io/4509621404303360',
  sendDefaultPii: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],
});
export default Sentry.wrap(function App() {
  const [fontsLoaded] = useFonts({
    'Quicksand-Regular': require('./assets/fonts/Quicksand-Regular.ttf'),
    'Quicksand-Bold': require('./assets/fonts/Quicksand-Bold.ttf'),
    'Quicksand-SemiBold': require('./assets/fonts/Quicksand-SemiBold.ttf'),
    'Quicksand-Medium': require('./assets/fonts/Quicksand-Medium.ttf'),
    'Quicksand-Light': require('./assets/fonts/Quicksand-Light.ttf'),
  });

  if (!fontsLoaded) return null;
  return (
    <SafeAreaProvider>
      <NavigationController />
    </SafeAreaProvider>
  );
});