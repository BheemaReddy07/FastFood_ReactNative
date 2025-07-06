import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import { Link } from '@react-navigation/native'
import AuthLayout from '../components/AuthLayout'
import { signIn } from '../lib/appwrite'
import * as Sentry from '@sentry/react-native'
const SignIn = () => {
    const [form, setForm] = useState({ email: '', password: '' })
    const [isSubmitting, setIsSubmitting] = useState(false);
    const submit = async () => {
        const { email, password } = form;
        if (!email || !password) return Alert.alert('Error', "please enter a valid Email and Password")
        setIsSubmitting(true)
        try {
            await signIn({ email, password })
            // go to home page
        } catch (error) {
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
                    <Text className="base-bold text-primary">Sign Up</Text>
                    {/* here link have to change */}
                </View>
            </View>
        </AuthLayout>
    )
}

export default SignIn

const styles = StyleSheet.create({})