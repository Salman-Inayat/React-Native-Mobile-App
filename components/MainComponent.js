import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Reservation from './ReservationComponent';
import {View, Text, ScrollView, Image, StyleSheet, ToastAndroid } from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, SafeAreaView} from 'react-navigation';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';
import { createDrawerNavigator , DrawerItems} from 'react-navigation-drawer';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import NetInfo from "@react-native-community/netinfo";

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

const ReservationNavigator = createStackNavigator({
  Reservation: { screen: Reservation },
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

const FavoritesNavigator = createStackNavigator({
  Favorites: { screen: Favorites }
}, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff",
    headerLeft: <Icon name="menu" size={24}
      iconStyle={{ color: 'white' }} 
      onPress={ () => navigation.navigate('DrawerToggle') } />    
  })
})

const LoginNavigator = createStackNavigator({
  Login: { screen: Login }
}, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    title: 'Login',
    headerTintColor: "#fff",
    headerLeft: <Icon name="menu" size={24}
      iconStyle={{ color: 'white' }} 
      onPress={ () => navigation.toggleDrawer() } />    
  })
});

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
  Login: 
  { screen: LoginNavigator,
    navigationOptions: {
      title: 'Login',
      drawerLabel: 'Login',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon
          name='sign-in'
          type='font-awesome'            
          size={24}
          iconStyle={{ color: tintColor }}
        />
      ),
    }
  },
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
  },
  Favorites:
  { screen: FavoritesNavigator,
    navigationOptions: {
      title: 'My Favorites',
      drawerLabel: 'My Favorites',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon
          name='heart'
          type='font-awesome'            
          size={24}
          iconStyle={{ color: tintColor }}
        />
      ),
    }
  },
  Reservation:
  { screen: ReservationNavigator,
    navigationOptions: {
      title: ' Reserve Table',
      drawerLabel: 'Reserve Table',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon
          name='cutlery'
          type='font-awesome'            
          size={24}
          color={tintColor}
        />
      ),
    }
  }
}, {
  initialRouteName: 'Home',
  drawerBackgroundColor: '#D1C4E9',
  contentComponent: CustomDrawerContentComponent
});

const MainNavigatorContainer = createAppContainer(MainNavigator);
class Main extends Component {

  onDishSelect(dishId){
      this.setState({selectedDish : dishId})
  }


  componentDidMount() {
    console.log("app started");
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();

    NetInfo.fetch().then(connectionInfo => {
      ToastAndroid.show(
        'Initial Network Connectivity Type: ' + connectionInfo.type,
        ToastAndroid.LONG,
      );
    });

    this.suscription = NetInfo.addEventListener(this.handleConnectivityChange);
  }

  componentWillUnmount() {
    this.suscription && this.suscription();
  }

  handleConnectivityChange = connectionInfo => {
    switch (connectionInfo.type) {
      case 'none':
        ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
        break;
      case 'wifi':
        ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
        break;
      case 'cellular':
        ToastAndroid.show(
          'You are now connected to Cellular!',
          ToastAndroid.LONG,
        );
        break;
      case 'unknown':
        ToastAndroid.show(
          'You now have unknown connection!',
          ToastAndroid.LONG,
        );
        break;
      default:
        break;
    }
  };

  render() {
 
    return (
        <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : 0}}>
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