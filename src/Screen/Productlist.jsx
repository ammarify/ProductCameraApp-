import { StyleSheet, Text, View , Button} from 'react-native'
import React from 'react'

const Productlist = ({navigation}) => {
  return (
    <View style={styles.Container}>
      <Text>This is a Productlist Screen</Text>
      <Button title='GO TO PD SCREEN' onPress={()=>navigation.navigate('ProductDetail')}/>
      <Button title='GO TO CameraScreen' onPress={()=>navigation.navigate('CameraScreen')}/>
    </View>
  )
}

export default Productlist

const styles = StyleSheet.create({
    Container : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center"
    },
    text :  {
        fontSize : 20,
        marginBottom : 20
    }
})