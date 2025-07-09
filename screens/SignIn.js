import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import { Link, useNavigation } from '@react-navigation/native'
import AuthLayout from '../components/AuthLayout'
import { signIn } from '../lib/appwrite'
import * as Sentry from '@sentry/react-native'
import useAuthStore from '../store/auth.store'
const SignIn = () => {
    const navigation = useNavigation();
    const [form, setForm] = useState({ email: '', password: '' })
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { setUser } = useAuthStore();
    const submit = async () => {
        const { email, password } = form;
        if (!email || !password) return Alert.alert('Error', "please enter a valid Email and Password")
        setIsSubmitting(true)
        try {
            const newUser = await signIn({ email, password })
            console.log('SignIn result:', newUser);
            setUser(newUser)
            console.log('Navigating to MainTab');
            navigation.replace('MainTab')
        } catch (error) {
            console.error('SignIn error:', error);
            Alert.alert('Error', error.message);
            Sentry.captureEvent(error);
        }
        finally {
            setIsSubmitting(false)
        }
    }

    return (
        <AuthLayout>
            <View className="gap-10 bg-white rounded-lg p-5 mt-5">
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
                    <Text className="base-regular text-gray-100">Don't have an account?</Text>
                    <Text onPress={() => navigation.navigate('SignUp')} className="base-bold text-primary">Sign Up</Text>
                </View>
            </View>
        </AuthLayout>
    )
}

export default SignIn

const styles = StyleSheet.create({})