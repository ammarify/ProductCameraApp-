import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProductDetail = () => {
  return (
    <View style={styles.Container}>
      <Text>ProductDetail</Text>
       <Text style={styles.text}>This is Product Detail Screen</Text>
    </View>
  )
}

export default ProductDetail

const styles = StyleSheet.create({
    Container : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center"

    },
    text: {
        fontSize : 20
    }
})