import { Dimensions, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { images } from '../utils/constants'
import { Image } from 'react-native'

const AuthLayout = ({ children }) => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding':"height"}>
            <ScrollView className="bg-white h-full" keyboardShouldPersistTaps="handled">
                <View className="w-full relative" style={{height:Dimensions.get('screen').height/2.25}}>
                    <ImageBackground source={images.loginGraphic} className="size-full rounded-b-lg" resizeMode='stretch' />
                    <Image source={images.logo} className="self-center size-48 absolute -bottom-16 z-10" />
                </View>
                <View>
                    {children}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default AuthLayout

const styles = StyleSheet.create({})