import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, Image, Pressable  } from 'react-native'
import React, { Component,useState, useEffect} from 'react'
import { FlatGrid } from 'react-native-super-grid';
import { firebase } from '../config'

class Home extends Component{
    constructor(props){
      super(props)
      this.state = {
          devices:[
               {
                 type: 'Temperature',
                 icon: require('../ICON/thermometer.png'),
                 name: 'Temp Screen',
               },
               {
                 type: 'Humid',
                 name: 'HumidScreen',
                 icon: require('../ICON/humidity.png'),
               },
              {
                icon: require('../ICON/aircon.png'),
                name: 'Aircon Screen'
              },
              {
                icon: require('../ICON/Curtain.png'),
                name: 'Light Screen'
              },
              {
                icon: require('../ICON/Windows.png'),
		            name: 'Windows Screen'
              },
              {
                icon: require('../ICON/door.png'),
                name: 'Door Screen' 
              },
          ],
          status:[
              {
                type: 'Temperature'
              },
              {
                type: 'Light'
              }
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
				<View style = {styles.navContainer}>
						<View style = {styles.navbar}>
							<Pressable onPress={() => this.props.navigation.navigate('Home Screen')} style={styles.IconBehave}>
								<Image style ={{width: 50, height: 50, alignSelf: 'center', bottom: '-65%'}} source={require('../ICON/home.jpg')}/>
							</Pressable>

							<Pressable onPress={() => this.props.navigation.navigate('Setting Screen')} style={styles.IconBehave}>
								<Image style ={{width: 40, height: 40, right: '-78%', top: '0%'}} source={require('../ICON/setting.png')}/>
							</Pressable>

							<Pressable onPress={()=>{this.props.navigation.navigate('Notification Screen')}} style={styles.IconBehave}>
								<Image style ={{width: 50, height: 50, right: '-5%', top: '-70%'}} source={require('../ICON/BELL.jpg')}/>
							</Pressable>
						</View>
				</View>
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

  text:{
    color: "#000",
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
    top: '-1.5%',
    right: '5%'
  },
  tab:{
    backgroundColor: '#ffffff', 
    height: 130, 
    top: '15%', 
    borderRadius: 15, 
    elevation: 3
  },
  tab1:{
    backgroundColor: '#ffffff', 
    height: 100, 
    top: '10%', 
    borderRadius: 15, 
    elevation: 3
  },
  tabText:{
    fontWeight: 'bold',
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  navContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 30,
    width: '70%',
    height: 70
  },

  navbar:{
    backgroundColor: '#ffffff',
    width: '100%',
    justifyContent: 'space-evenly',
    borderRadius: 40, 
  },
  IconBehave:{
    padding: 14
  } 
});
