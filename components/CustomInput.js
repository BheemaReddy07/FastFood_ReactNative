import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import cn from 'clsx'
const CustomInput = ({
    placeholder = 'Enter Text',
    value,
    onChangeText,
    label,
    secureTextEntry = false,
    keyboardType = 'default'
}) => {

    const [isFocused, setIsFocused] = useState(false)
    // rounded-lg p-3 w-full text-base font-quicksand-semibold text-dark-100 border-b leading-5
    return (
        <View className="w-full">
            <Text className="text-base text-start w-full font-quicksand-medium text-gray-500 pl-2">{label}</Text>
            <TextInput
                autoCapitalize='none'
                autoCorrect={false}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                placeholderTextColor="#888"
                secureTextEntry={secureTextEntry}
                className={cn('w-full border-b rounded-lg p-3 text-base font-quicksand-semibold text-dark-100 leading-5', isFocused ? "border-primary" : "border-gray-300")}
            />
        </View>
    )
}

export default CustomInput

const styles = StyleSheet.create({})