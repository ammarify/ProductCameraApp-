import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProductDetail = ({route}) => {
    const {product} = route.params;
  return (
    <ScrollView contentContainerStyle={styles.Container}>
      <Image source={{uri : product.image}} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>Price : ${product.price}</Text>
      <Text style={styles.category}>Category: {product.category}</Text>
      <Text style={styles.description}>{product.description}</Text>
 
    </ScrollView>
  )
}

export default ProductDetail

const styles = StyleSheet.create({
  Container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: 320,
    resizeMode: 'contain',
    marginBottom: 24,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2e8b57',
    textAlign: 'center',
    marginBottom: 12,
  },
  category: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#777',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
  fontSize: 14,
  lineHeight: 20,
  color: '#444',
  backgroundColor: '#fefefe',
  padding: 16,
  textAlign: 'center',
  
    
  },
});