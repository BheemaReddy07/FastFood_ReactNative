import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import seed from '../lib/seed'

const Search = () => {

  return (
    <SafeAreaView>

      <Button title="click here" onPress={() => seed().catch((error) => console.log(error.message))} />
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({})