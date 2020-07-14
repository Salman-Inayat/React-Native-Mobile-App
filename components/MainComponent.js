import React, { Component } from 'react';
import Menu from './MenuComponent';
import Constants from 'expo-constants';
import Dishdetail from './DishdetailComponent';
import {View, Platform, Text, ScrollView, Image, StyleSheet } from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, SafeAreaView} from 'react-navigation';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { createDrawerNavigator , DrawerItems} from 'react-navigation-drawer';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})

const HomeNavigator = createStackNavigator({
    Home: { screen: Home }
  }, {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff",
      headerLeft: () => <Icon name='menu' size = {24} 
        color = 'white'
        onPress = { () => navigation.toggleDrawer()} 
        />   
    })
});

const MenuNavigator = createStackNavigator({
  Menu: { screen: Menu,
      navigationOptions: ({ navigation }) => ({  
          headerLeft: () => <Icon name='menu' size={24}
              color='white'
              onPress={() => navigation.toggleDrawer()}
          />
      }) }, 
  Dishdetail: { screen: Dishdetail }, 
}, {
  initialRouteName: 'Menu',
  defaultNavigationOptions: {
      headerStyle: {
          backgroundColor: '#512DA8'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          color: '#fff'
      }
  }
});

const ContactUsNavigator = createStackNavigator({
  Contact: { screen: Contact },
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff",
    headerLeft: () => <Icon name='menu' size = {24} 
      color = 'white'
      onPress = { () => navigation.toggleDrawer()} 
      />   
  })
}
);

const AboutUsNavigator = createStackNavigator({
  About: { screen: About },
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff",
    headerLeft: () => <Icon name='menu' size = {24} 
      color = 'white'
      onPress = { () => navigation.toggleDrawer()} 
      />  
  })
}
);

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <View style={styles.drawerHeader}>
        <View style={{flex:1}}>
        <Image source={require('./images/logo.png')} style={styles.drawerImage} />
        </View>
        <View style={{flex: 2}}>
          <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
        </View>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const MainNavigator = createDrawerNavigator({
    Home: 
      { screen: HomeNavigator,
        navigationOptions: {
          title: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='home'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          ),
        }
      },
    AboutUs: 
    { screen: AboutUsNavigator,
      navigationOptions: {
        title: 'About Us',
        drawerLabel: 'About Us',
            drawerIcon: ({ tintColor, focused }) => (
              <Icon
                name='info-circle'
                type='font-awesome'            
                size={24}
                color={tintColor}
              />
            ),
      }
    },  
    Menu: 
      { screen: MenuNavigator,
        navigationOptions: {
          title: 'Menu',
          drawerLabel: 'Menu',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='list'
              type='font-awesome'            
              size={22}
              color={tintColor}
            />
          ),
        }
      },
    Contact:
      { screen: ContactUsNavigator,
        navigationOptions: {
          title: 'Contact Us',
          drawerLabel: 'Contact Us',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='address-card'
              type='font-awesome'            
              size={22}
              color={tintColor}
            />
          ),
        }
      }
}, {
  drawerBackgroundColor: '#D1C4E9',
  contentComponent: CustomDrawerContentComponent
});

const MainNavigatorContainer = createAppContainer(MainNavigator);

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null
    };
  }

  onDishSelect(dishId){
      this.setState({selectedDish : dishId})
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
 
    return (
        <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
            <MainNavigatorContainer/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);