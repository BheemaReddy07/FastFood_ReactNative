import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { images } from '../utils/constants'
// flex items-center justify-center size-10 rounded-full bg-dark-100
// absolute -top-2 -right-1 flex items-center justify-center size-5 bg-primary rounded-full
// text-xs font-quicksand-bold
const CartButton = () => {
    const totalItems = 4
  return (
   <TouchableOpacity className="flex items-center justify-center size-10 rounded-full bg-dark-100">
    <Image source={images.bag} className="size-5" resizeMode='contain' />
    {totalItems > 0 && (
                <View className="absolute -top-2 -right-1 flex items-center justify-center size-5 bg-primary rounded-full">
                    <Text className=" text-xs font-quicksand-bold text-white">{totalItems}</Text>
                </View>
            )}
   </TouchableOpacity>
  )
}

export default CartButton

const styles = StyleSheet.create({})