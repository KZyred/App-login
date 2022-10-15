import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, Image, Pressable  } from 'react-native'
import React, { Component,useState, useEffect} from 'react'
import { FlatGrid } from 'react-native-super-grid';
import { firebase } from '../config'

class BottomTab extends Component{
    constructor(props){
      super(props)
    }
    render(){ 
		const { navigation } = this.props; //props nhảy sang màn hình khác ?????????????
		return (
        <View style = {styles.navContainer}>
            <View style = {styles.navbar}>

                <TouchableOpacity onPress={()=>{navigation.navigate('NotificationsScreen')}} style={styles.IconBehave}>
                    <Image style ={{width: 50, height: 50, alignSelf: 'center',justifyContent:'center',left:'10%'}} source={require('../ICON/BELL.jpg')}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.IconBehave}>
                    <Image style ={{width: 50, height: 50, alignSelf: 'center',justifyContent:'center',left: '-3%',bottom:'8%'}} source={require('../ICON/home.jpg')}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('SettingScreen')} style={styles.IconBehave}>
                    <Image style ={{width: 45, height: 45, alignSelf: 'center',justifyContent:'center'}} source={require('../ICON/setting.png')}/>
                </TouchableOpacity>

            </View>
        </View> 
		)
    }
}

export default BottomTab;

const styles = StyleSheet.create({
    navContainer: {
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
        bottom: 30,
        width: '65%',
        height: 70,
    },
    navbar:{
        backgroundColor: '#ffffff',
        width: '100%',
        justifyContent: 'space-between',
        borderRadius: 40, 
        flexDirection: 'row',
    },
    IconBehave:{
        padding: 14
    },
});
