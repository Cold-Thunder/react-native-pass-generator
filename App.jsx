import React from 'react'
import { SafeAreaView, StyleSheet, ScrollView, View, Text } from 'react-native'

import PassForm from './components/passGenerator/PassForm'

const App = () =>{
  return(
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <PassForm />
      </ScrollView>
    </SafeAreaView>
  )
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})