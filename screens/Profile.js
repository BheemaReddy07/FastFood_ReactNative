import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import useAuthStore from '../store/auth.store'
import { logout } from '../lib/appwrite'
import CustomButton from '../components/CustomButton'

const Profile = () => {
  const navigation = useNavigation();
  const { user, logout: clearUser } = useAuthStore();
  console.log(user)
  const handleLogout = async () => {
    try {
      await logout();
      clearUser();
      navigation.getParent().reset({
        index: 0,
        routes: [{ name: 'SignIn' }]
      })
    } catch (error) {
      Alert.alert('Error', error.message)
    }
  }
  return (
    <SafeAreaView>
      <View className="flex-1 justify-center items-center p-5">
        <Text className="text-2xl font-bold mb-5">
          Welcome, {user?.name || 'User'}
        </Text>
        <CustomButton
          title="Logout"
          onPress={handleLogout}
          className="bg-red-500 w-40"
        />
      </View>
      <Text>{user.name}</Text>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})