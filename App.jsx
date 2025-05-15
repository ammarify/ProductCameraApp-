import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Productlist from './src/Screen/Productlist'
import ProductDetail from './src/Screen/ProductDetail'
import CameraScreen from './src/Screen/CameraScreen'


const Stack = createNativeStackNavigator()

const App = () => {
  return (
   <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name='ProductList' component={Productlist} />
    <Stack.Screen name='ProductDetail' component={ProductDetail} />
    <Stack.Screen name='CameraScreen' component={CameraScreen} />

    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})