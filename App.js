import React from 'react';

import { StyleSheet, View, ScrollView, Text, KeyboardAvoidingView } from 'react-native'; 
import uuidv4 from 'uuid/v4';
import { newTimer } from './utils/TimerUtils';

import EditableTimer from './components/EditableTimer';
import ToggleableTimerForm from './components/ToggleableTimerForm';

export default class App extends React.Component {

  state = {
    timers: [
      {
        title: "Mow the lawn",
        project: "House chores",
        id: uuidv4(),
        elapsed: 9877665,
        isRunning: true,
      },
      {
        title: "Bake squash",
        project: "Cooking",
        id: uuidv4(),
        elapsed: 123456,
        isRunning: false,
      },
    ],
  };

  // state = {
  //   timers: [],
  // };

  componentDidMount(){

    const TIME_INTERVAL = 1000;

    this.intervalId = setInterval( () => {

      const { timers } = this.state;

      this.setState( {

        timers: timers.map( timer => {

          const { elapsed, isRunning } = timer;

          return {
            ...timer,
            elapsed: isRunning ? elapsed + TIME_INTERVAL : elapsed,
          };

        }),
      });




    }, TIME_INTERVAL);
  }

  componentWillUnmount(){
    clearInterval( this.intervalId );
  }


  handleCreateFormSubmit = timer => {

    const { timers } = this.state;

    //this.state.timers is set to a NEW array of timers
    //to AVOID MUTATING STATE
    //note the SPREAD SYNTAX (the ...)


    //using timers.push( newTimer(timer) ) woud mutute state and only
    // this.setState() can mutate state



    this.setState({
      timers: [ newTimer( timer ), ...timers ],
    });
  }


  handleFormSubmit = attrs => {
    
    const { timers } = this.state;


    this.setState({
      timers: timers.map( timer => {

        if ( timer.id === attrs.id ){
          const { title, project } = attrs;

          return {
            ...timer,
            title,
            project,
          };
        }

        return timer;

      }),
    });
  }

  handleRemovePress = timerId => {

    //this is ok because the array method filter() returns a NEW ARRAY
    //(ie. does not mutate state)

    this.setState({
      timers: this.state.timers.filter( t => t.id !== timerId ),
    })
  }

 
  toggleTimer = timerId => {

    this.setState( prevState => {

      const { timers } = prevState;

      return {

        timers: timers.map( timer => {

          const { id, isRunning } = timer;

          if ( id === timerId ){

            return {
              ...timer,
              isRunning: !isRunning,
            };

          }

          return timer;

        }),

      };

    });

  };



  render() {


    const { timers } = this.state  

    return (

      <View style={styles.appContainer}>
        
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Timers</Text>
        </View>

        <KeyboardAvoidingView
          behavior="padding"
          style={styles.timerListContainer}
        >

          <ScrollView style={styles.timerList}>

            <ToggleableTimerForm 
              onFormSubmit={this.handleCreateFormSubmit}
            /> 
      
            { timers.map( ({ title, project, id, elapsed, isRunning }) => (

              <EditableTimer
                key = {id}
                id = {id}
                title = {title}
                project = {project}
                elapsed = {elapsed}
                isRunning = {isRunning}
                onFormSubmit={this.handleFormSubmit}
                onRemovePress={this.handleRemovePress}
                onStartPress={this.toggleTimer}
                onStopPress={this.toggleTimer}
              />

            ))}
      
          </ScrollView>


        </KeyboardAvoidingView>
      </View> 

    );



  }
   
}



const styles = StyleSheet.create({ 
  appContainer: { 
    flex: 1, 
  },
  timerListContainer: {
    flex: 1,
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D7DA',
  }, 
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timerList: {
    paddingBottom: 15,
  }, 
});