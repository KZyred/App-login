import {  View, Text, TextInput, TouchableOpacity, StyleSheet ,Image } from 'react-native'
import React, { useState, useEffect} from 'react'
import { firebase } from '../config'
import { useNavigation } from '@react-navigation/native'

const HeaderDashoard = (props) => {
    const navigation = useNavigation(); //dùng điều hướng trang
	const [name, setName] = useState('')
  	useEffect(() => {
		firebase.firestore().collection('users') // kết nối với bộ sưu tập người dùng (user) trong kho lưu trữ của firebase
		.doc(firebase.auth().currentUser.uid).get() // lấy theo uid người dùng hiện tại
		.then((snapshot) => {
			if (snapshot.exists){  // kiểm tra xem người dùng tồn tại hay không
				setName(snapshot.data())  // lấy dữ liệu người dùng hiện tại => name.firstName (rồi mới lấy từng key bên trong đó nếu cần)
			}
			else {
				console.log('Người dùng không tồn tại')
			}
		})
	},[]) // chỉ gọi 1 lần khi render
  return (
    <View style={{marginLeft:15,flexDirection:'row',justifyContent:"space-between"}}>
		<TouchableOpacity
                onPress={() => navigation.navigate('Profilescreen')}   //////////// chuyển hướng sang trang Registration
        >
      		<Image style ={{width: 60, height: 60}} source={require('../ICON/USER.png')}/>
        </TouchableOpacity>
      	<Text style={{fontWeight:'bold',fontSize:28,marginLeft:15}}>
        	Hello, {name.firstName}
      	</Text>
    </View>
  )
}

export default HeaderDashoard
