import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Modal,Switch, Button, Alert } from 'react-native';
// import DaaeTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import * as Calendar from 'expo-calendar';

class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date: new Date(),
            showModal: false
        }
    }

    // addReservationToCalendar(date){

    // }
    

    obtainNotificationPermission = async() => {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS)
        if(permission.status !== 'granted'){
          permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS)
          if(permission.status !== 'granted'){
            Alert.alert('Permission not granted to show notifications')
          }
        }
        return permission
      }
    
    presentLocalNotification = async(date) => {
    await this.obtainNotificationPermission()
    Notifications.presentLocalNotificationAsync({
        title: 'Your Reservation',
        body: `Reservation for ${date} requested`,
        ios: {
            sound: true
        },
            android: {
            sound: true,
            vibrate: true,     //REVIEW: does not work
            color: '#512DA8'   //REVIEW: does not work
            },
        })
    }

    static navigationOptions = {
        title: 'Reserve Table'
    };

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    handleReservation() {
        Alert.alert(
            'Your reservation OK?',
            'Your reservation guest:'+this.state.guests+"\n"+'Smoking:'+this.state.smoking+'\n'+'Date of the time:'+this.state.date,
            // 'Smoking:'+this.state.smoking?'true':'false'+
            // 'Date of the time:'+this.state.date,
            [
            {text: 'Cancel', onPress: () => this.resetForm(), style: 'cancel'},
            {text: 'OK', onPress: () => {
                this.resetForm(), 
                this.presentLocalNotification(this.state.date)
                },style: 'cancel'
            },
        ],
            { cancelable: false }
        );
        this.addReservationToCalendar(this.state.date);
    }

    obtainCalendarPermission = async() => {
        let permission = await Permissions.getAsync(Permissions.CALENDAR)
        if(permission.status !== 'granted'){
          permission = await Permissions.askAsync(Permissions.CALENDAR)
          if(permission.status !== 'granted'){
            Alert.alert('Permission not granted to access Calendar')
          }
        }
        return permission;
      }

    getCalendarId = async() => {
    
        await Calendar.getCalendarsAsync()
        .then( (calArray)=>{ id = calArray.find( (val)=>{return val.title==='My calendar'} ) } )
        .catch( (error)=>{console.log('could not get calendar object, : '+error.message)} )
        id = id.id
        console.log('Id :'+id)
        return id
    }      

    addReservationToCalendar = async(date) => {
        await this.obtainCalendarPermission()
        id = await this.getCalendarId()
        
        var details = {}
        details.title = 'Con Fusion Table Reservation'
        details.timeZone = 'Asia/Hong_Kong'
        details.location = '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
        details.startDate = new Date(Date.parse(date))
        details.endDate = new Date(Date.parse(date)+2*60*60*1000)
        console.log('details: '+JSON.stringify(details))
    
        Calendar.createEventAsync(id, details)
        .then( ()=>{console.log("Event created")} )
        .catch( (error)=>{console.log("Event not saved: "+error.message)} )
      }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
        });
    }
    
    render() {
        return(
            <Animatable.View animation="zoomIn" duration={2000}> 
                <ScrollView>
                    <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Guests</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.guests}
                        onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                    </Picker>
                    </View>
                    <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.smoking}
                        trackColor='#512DA8'
                        onValueChange={(value) => this.setState({smoking: value})}>
                    </Switch>
                    </View>
                    <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date and Time</Text>
                    <DatePicker 
                        //iso format = YYYY-MM-DDTHH:mm:ss.sssZ
                        style={{flex: 2, marginRight: 20}}
                        date={this.state.date}
                        format='YYYY-MM-DDTHH:mmZ'
                        mode='datetime'
                        placeholder='select date and time'
                        minDate='2020-7-15'
                        maxDate='2020-7-30'
                        confirmBtnText='Confirm'
                        cancelBtnText='Cancel'
                        customStyles={{
                            dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                            },
                            dateInput: {
                            marginLeft: 36
                            }
                        }}
                        onDateChange={ (date)=>{this.setState({date: date})} }
                    />
                    </View>
                    <View style={styles.formRow}>
                    <Button
                        onPress={() => this.handleReservation()}
                        title="Reserve"
                        color="#512DA8"
                        accessibilityLabel="Learn more about this purple button"
                        />
                    </View>
                    <Modal animationType = {"slide"} transparent = {false}
                        visible = {this.state.showModal}
                        onDismiss = {() => this.toggleModal() }
                        onRequestClose = {() => this.toggleModal() }>
                        <View style = {styles.modal}>
                            <Text style = {styles.modalTitle}>Your Reservation</Text>
                            <Text style = {styles.modalText}>Number of Guests: {this.state.guests}</Text>
                            <Text style = {styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
                            <Text style = {styles.modalText}>Date and Time: {this.state.date}</Text>
                            
                            <Button 
                                onPress = {() =>{this.toggleModal(); this.resetForm();}}
                                
                                color="#512DA8"
                                title="Close" 
                                />
                        </View>
                    </Modal>
                </ScrollView>
            </Animatable.View>
        );
    }

};

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }
});

export default Reservation;