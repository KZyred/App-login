import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect} from 'react'
import { firebase } from '../config'


const Dashboard = () => {
	const [name, setName] = useState('')

    // tạo các hàm để gọi phía dưới
	// change the password
	const changePassword = () => {
		firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email) // reset password với tài khoản hiện tại trên máy đang dùng
		.then(() => {
			alert('Đã gửi thư thay đổi mật khẩu thành công')
		})
		.catch((error) => {
			alert(error.message)
		});
	}
	// thực thi ngay lúc render ra giao diện 
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
		<SafeAreaView style={styles.container}>
			<Text style={{fontSize: 20, fontWeight: 'bold'}}>
				Hello, {name.firstName}
			</Text>
			<TouchableOpacity 
				onPress={() => {changePassword()}} // gọi hàm thay đổi mật khẩu người dùng
				style={styles.button}
			>
				<Text style={{fontSize:20, fontWeight:'bold'}}>Change Password</Text>
			</TouchableOpacity>
			<TouchableOpacity 
				onPress={() => {firebase.auth().signOut()}}  // đăng xuất 
				style={styles.button}
			>
				<Text style={{fontSize:20, fontWeight:'bold'}}>Sign Out</Text>
			</TouchableOpacity>
		</SafeAreaView>
	)
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        marginTop: 100,
    },
    button: {
        marginTop: 50,
        height: 70,
        width:250,
        backgroundColor: '#026efd',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
})
export default Dashboard