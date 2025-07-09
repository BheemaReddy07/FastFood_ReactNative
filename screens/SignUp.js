import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import AuthLayout from '../components/AuthLayout';
import { createUser } from '../lib/appwrite';
import { useNavigation } from '@react-navigation/native';
import useAuthStore from '../store/auth.store';

const SignUp = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const {setUser} = useAuthStore()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = async () => {
    const { name, email, password } = form;
    if (!name || !email || !password) return Alert.alert('Error', 'Please enter valid email & password')
    setIsSubmitting(true)
    try {
    const newUser =  await createUser({ email, password, name })
    setUser(newUser)
    navigation.replace('MainTab')
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false)
    }

  }

  return (
    <AuthLayout>
      <View className="gap-10 bg-white rounded-lg p-5 mt-5">
        <CustomInput
          placeholder='Enter your Name'
          value={form.name}
          onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
          label="Name"

        />
        <CustomInput
          placeholder='Enter your Email'
          value={form.email}
          onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
          label="Email"
          keyboardType='email-address'
        />
        <CustomInput
          placeholder='Enter your password'
          value={form.password}
          onChangeText={(text) => setForm((prev) => ({ ...prev, password: text }))}
          label="Password"
          secureTextEntry={true}
        />
        <CustomButton
          title='Sign Up'
          isLoading={isSubmitting}
          onPress={submit}
        />
        <View className="flex justify-center mt-5 flex-row gap-2">
          <Text className="base-regular text-gray-100">Already Have an account?</Text>
          <Text onPress={() => navigation.navigate('SignIn')} className="base-bold text-primary">Sign In</Text>

        </View>
      </View>
    </AuthLayout>
  )
}


export default SignUp

const styles = StyleSheet.create({})