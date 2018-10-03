This is a tutorial project from the *React Fundamentals* chapter of **Fullstack React Native: The Complete Guide to React Native**.

The data is a set of timers with title and project name properties that are either running or paused.  EditableTimer components are displayed in a ScrollView (N.B. not performant!). The EditableTimer can be in one of two modes. In presentational mode, the timer name, project and current value are displayed along with buttons (TouchableOpacity) to start/stop the timer, remove it or edit it.  In editing mode, a TimerForm is displayed with TextInput fields for the title and project name.

The array of timer objects is owned by the App component, i.e. it is part of that component's STATE.  This class has methods for handling TimerForm submission (new Timers and updated timers) and timer removal.  It is important to note that we change the array of timers by creating a NEW array based on the old one and passing this to setState().  Adding a new one looks like: this.setState( { timers: \[aNewTimerTable, ...timers \] } ).  Note the use of the spread operator (...).

A timer is set in the componentWillMount() method of App.js using setInterval() that updates the running timers every second.  As a good practice, clearInterval() is called in componentWillUnmount().
