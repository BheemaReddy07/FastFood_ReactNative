import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useCartStore } from '../store/cart.store'
import { images } from '../utils/constants';

const CartItem = ({ item }) => {
  const { increaseQty, decreaseQty, removeItem } = useCartStore();
  return (
    <View className="flex flex-row items-end justify-between mb-4 bg-white rounded-xl p-3 shadow-md shadow-dark-100/10">
      <View className="flex flex-row items-center gap-x-3">
        <View className="size-24 bg-primary/30 rounded-lg flex items-center justify-center">
          <Image source={{ uri: item.image_url }} className="size-4/5 rounded-lg" resizeMode='cover' />
        </View>
        <View>
          <Text className="base-bold text-dark-100">{item.name}</Text>
          <Text>${item.price}</Text>
          <View className="flex flex-row items-center gap-x-4 mt-2">
            <TouchableOpacity onPress={() => decreaseQty(item.id, item.customizations)} className="flex flex-row items-center justify-center size-5 bg-primary/10 rounded-md">
              <Image source={images.minus} className="size-1/2" resizeMode='contain' tintColor={"#FF9C01"} />
            </TouchableOpacity>
            <Text className="base-bold text-dark-100">{item.quantity}</Text>
            <TouchableOpacity onPress={() => increaseQty(item.id, item.customizations)} className="flex flex-row items-center justify-center size-5 bg-primary/10 rounded-md">
              <Image source={images.plus} className="size-1/2" resizeMode='contain' tintColor={"#FF9C01"} />
            </TouchableOpacity>

          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => removeItem(item.id, item.customizations)} className="flex-center">
        <Image source={images.trash} className="size-5 " resizeMode='contain' />
      </TouchableOpacity>
    </View>
  )
}

export default CartItem

const styles = StyleSheet.create({})