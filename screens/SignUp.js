import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import AuthLayout from '../components/AuthLayout';

const SignUp = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = () => {
    Alert.alert("signin button clicked")
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
          title='Sign In'
          isLoading={isSubmitting}
          onPress={submit}
        />
        <View className="flex justify-center mt-5 flex-row gap-2">
          <Text className="base-regular text-gray-100">Already Have an account?</Text>
          <Text className="base-bold text-primary">Sign In</Text>
          {/* here link have to change */}
        </View>
      </View>
    </AuthLayout>
  )
}


export default SignUp

const styles = StyleSheet.create({})