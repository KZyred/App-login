import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, Image, Pressable  } from 'react-native'
import React, { Component,useState, useEffect} from 'react'
import { FlatGrid } from 'react-native-super-grid';
import { firebase } from '../config'
import BottomTab from '../screen/bottomTab'
class Home extends Component{
    constructor(props){
      super(props)
      this.state = {
          devices:[
               {
                 type: 'Temperature',
                 icon: require('../ICON/thermometer.png'),
                 name: 'TempScreen',
               },
               {
                 type: 'Humid',
                 name: 'HumidScreen',
                 icon: require('../ICON/humidity.png'),
               },
              {
                icon: require('../ICON/aircon.png'),
                name: 'AirconScreen'
              },
              {
                icon: require('../ICON/Curtain.png'),
                name: 'LightScreen'
              },
              {
                icon: require('../ICON/Windows.png'),
		            name: 'WindowsScreen'
              },
              {
                icon: require('../ICON/door.png'),
                name: 'DoorScreen' 
              },
          ],  
      };
    }
    render(){ 
		const { navigation } = this.props; //props nhảy sang màn hình khác ?????????????
    const { devices } = this.state; // ????????????????????????????????????????????????????
		return (
			<View style = {styles.container}>
				<View style = {styles.User}>
					<FlatGrid
						style ={{flex: 1, marginTop: '10%'}}
						itemDimension ={120}
						data = {devices}
						renderItem ={({item}) => (
							<TouchableOpacity onPress={() => navigation.navigate(item.name)} style = {styles.tab}>
								<Image style ={{width: 50, height: 50, alignSelf: 'center', top: '25%'}} source={item.icon}/>
								{/* <Text style = {styles.tabText}>{item.connect}</Text> */}
							</TouchableOpacity>                
						)}
					/>
				</View>
        <BottomTab navigation={navigation}/>
			</View>
		)
    }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1', 
  },
  User:{
    flex: 1,
    margin: 20
  },
  tab:{
    backgroundColor: '#ffffff', 
    height: 130, 
    top: '15%', 
    borderRadius: 15, 
    elevation: 3
  },
  tabText:{
    fontWeight: 'bold',
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
});
