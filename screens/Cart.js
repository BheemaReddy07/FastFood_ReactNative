import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useCartStore } from '../store/cart.store'
import { FlatList } from 'react-native'
import CartItem from '../components/CartItem'
import CustomerHeader from '../components/CustomerHeader'
import cn from 'clsx'

const PaymentInfo = ({ label, value, labelStyle, valueStyle }) => {
  return (
    <View className="flex items-center justify-between flex-row my-1">
      <Text className={cn("paragraph-medium text-gray-200", labelStyle)}>
        {label}
      </Text>
      <Text className={cn("paragraph-bold text-dark-100", valueStyle)}>
        {value}
      </Text>
    </View>
  )
}

const Cart = () => {
  const { items, getTotalItems, getTotalPrice } = useCartStore();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice()
  
  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={items}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerClassName="pb-28 px-5 pt-5"
        ListHeaderComponent={() => <CustomerHeader title='Your Cart' />}
        ListEmptyComponent={() => <Text>Cart Empty</Text>}
        ListFooterComponent={() => totalItems > 0 && (
          <View>
            <View>
              <Text>Payment Summary</Text>
              <PaymentInfo label={`Total Items (${totalItems})`} value={`$${totalPrice.toFixed(2)}`} />
              <PaymentInfo
                label={`Delivery Fee`}
                value={`$5.00`}
              />
              <PaymentInfo
                label={`Discount`}
                value={`- $0.50`}
                valueStyle="!text-success"
              />
              <View className="border-t border-gray-300 my-2" />
              <PaymentInfo
                label={`Total`}
                value={`$${(totalPrice + 5 - 0.5).toFixed(2)}`}
                labelStyle="base-bold !text-dark-100"
                valueStyle="base-bold !text-dark-100 !text-right"
              />
            </View>
          </View>
        )}
      />

    </SafeAreaView>
  )
}

export default Cart

const styles = StyleSheet.create({})