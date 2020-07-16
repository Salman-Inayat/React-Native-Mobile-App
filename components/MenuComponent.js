import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Tile , Card, CardItem} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      dishes: state.dishes
    }
  }

class Menu extends Component {

    static navigationoptions = {
        title : 'Menu'
    }

    render(){
        const { navigate } = this.props.navigation;

        const renderMenuItem = ({item, index}) => {
            return (
                <Animatable.View animation="fadeInRightBig" duration={2000}>     
                    <Card image={{ uri: baseUrl + item.image }} >
                        
                            <Text style={{ margin: 10 }} onPress={() => navigate('Dishdetail', { dishId: item.id })}>
                                {item.description} 
                            </Text>
                        {/* //  <Tile
                        //     key={index}
                        //     title={item.name}
                        //     caption={item.description}
                        //     featured
                        //     onPress={() => navigate('Dishdetail', { dishId: item.id })}
                        //     imageSrc={{ uri: baseUrl + item.image}}
                        // />  */}
                    </Card>
                </Animatable.View>
            );
        };

        if (this.props.dishes.isLoading) {
            return(
                <Loading />
            );
        }
        else if (this.props.dishes.errMess) {
            return(
                <View>            
                    <Text>{this.props.dishes.errMess}</Text>
                </View>            
            );
        }
        else {
            return (
               
                    <FlatList 
                    data={this.props.dishes.dishes}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                    />
              
                
            );
        }
    }
}

export default connect(mapStateToProps)(Menu);