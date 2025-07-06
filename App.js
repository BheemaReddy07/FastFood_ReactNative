import "./global.css"
import { useFonts } from 'expo-font';
import { Text, View } from "react-native";
import HomeTab from "./screens/HomeTab";
import SignIn from "./screens/SignIn";
import AuthLayout from "./components/AuthLayout";
import SignUp from "./screens/SignUp";
export default function App() {
  const [fontsLoaded] = useFonts({
  'Quicksand-Regular': require('./assets/fonts/Quicksand-Regular.ttf'),
  'Quicksand-Bold': require('./assets/fonts/Quicksand-Bold.ttf'),
  'Quicksand-SemiBold': require('./assets/fonts/Quicksand-SemiBold.ttf'),
  'Quicksand-Medium': require('./assets/fonts/Quicksand-Medium.ttf'),
  'Quicksand-Light': require('./assets/fonts/Quicksand-Light.ttf'),
});

if (!fontsLoaded) return null;
  return (
        <SignIn />
  );
}