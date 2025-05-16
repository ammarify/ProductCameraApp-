import { StyleSheet, Text, View , Button, FlatList, Image, ActivityIndicator, Dimensions, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'

const Productlist = ({navigation}) => {
    const [products,setProducts] = useState([])
    const [error , setError ] = useState(null)
    const[loading, setLoading] = useState(true)

useEffect(() => {
    fetchProducts();
  }, []);
    const fetchProducts = async () => {
        try {
           const response = await fetch('https://fakestoreapi.com/products')
           const data = await response.json() 
           setProducts(data);
        } catch (error) {
           setError('Error fetching data')
        }finally{
            setLoading(false)
        }
    };
    if(loading){
        return(
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#000" />
        </View>
    );
        
        
    }
    if(error) {
        return (
      <Text style={styles.errorText}>
        {error}
      </Text>)
    }
 const renderItem = ({item}) => (
   <TouchableOpacity
   style={styles.card}
   onPress={() => navigation.navigate('ProductDetail', { product: item })}>
        
    <Image source={{uri : item.image}} style={styles.image}/>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.price}>$Price:{item.price}</Text>
 </TouchableOpacity>
)
  return (
  
    <View style={{flex: 1}}>
    <Button
      title="Open Camera"
      onPress={() => navigation.navigate('CameraScreen')}
    />
    <FlatList 
      data={products} 
      renderItem={renderItem} 
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={styles.container}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
    />
  </View>
);
  
  
}

export default Productlist

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 48) / 2; 

const styles = StyleSheet.create({
    container : {
        padding: 16,
        backgroundColor: '#f7f7f7'
      
    },
    loadingContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText : {
        color: 'red',
        textAlign: 'center',
        marginTop: 50,
        fontSize: 18,
    },
    text : {
        fontSize : 20,
        marginBottom : 20
    },
    image: {
        height: 120,
        resizeMode: 'contain',
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
    },
    title : {
        fontWeight: '600',
        fontSize: 14,
        marginTop: 10,
        color: '#333',
        textAlign: 'center',
        
    },
    price : {
        marginTop: 6,
        fontWeight: 'bold',
        color: '#2e8b57',
        fontSize: 16,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 10,
        marginBottom: 16,
        width: cardWidth,
  },
})