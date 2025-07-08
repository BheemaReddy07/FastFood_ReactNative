import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import seed from '../lib/seed'

const Cart = () => {
  return (
 <SafeAreaView>
  <Button title='title' onPress={()=>seed().catch((err)=>console.log(err))} />
 </SafeAreaView>
  )
}

export default Cart

const styles = StyleSheet.create({})