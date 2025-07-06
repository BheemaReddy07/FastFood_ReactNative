import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { ActivityIndicator } from 'react-native'
import cn from 'clsx'
const CustomButton = ({
  onPress,
  title = "Click Me",
  style,
  Textstyle,
  leftIcon,
  isLoading = false
}) => {
  return (
    <TouchableOpacity className={cn("bg-primary rounded-full p-3 w-full flex flex-row justify-center", style)} onPress={onPress}>
      {leftIcon}
      <View className="flex-center flex-row">
        {
          isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text className={cn("text-white-100 ext-base font-quicksand-semibold", Textstyle)}>
              {title}
            </Text>
          )
        }
      </View>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({})