import React, { useContext, useState } from "react";
import { AuthContext } from "../hooks/context";
import { 
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";

const TaskManager = () => {
  //Get user's name from authentication context
  const { name } = useContext(AuthContext);

  //Set state variables
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1); // Index of the task being edited (-1 means no task)
  const [isChecked, setChecked] = useState(tasks.map(() => false));
  const [count, setCount] = useState(0);

  // Get navigation functionality for moving between screens
  const navigation = useNavigation();

  const handleAddTask = () => {
    if (task && title) {
      if (editIndex !== -1) {
        // Edit existing task if an index is set
        if (editIndex < tasks.length) {
          const updatedTasks = [...tasks];
          updatedTasks[editIndex] = { title, task };
          setTasks(updatedTasks);
          setEditIndex(-1); // Clear the edit index
        } else {
          console.log('Invalid edit index');
        }
      } else {
        // Add new task
        setTasks([...tasks, { title, task }]);
        setCount(count + 1);
      }
      setTitle("");
      setTask("");
    } else {
      Alert.alert(
        'Input Error!',
        'Enter both Title and Task'
      ),
      Alert.prompt(
        'Input Error!',
        'Enter both Title and Task'
      )
    }
  };

  //Function to edit a task
  const handleEditTask = (index) => {
    const taskToEdit = tasks[index];
    setTitle(taskToEdit.title);
    setTask(taskToEdit.task);
    setEditIndex(index);
    
  };

  //Function to delete a task
  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);

    const updateChecked = [...isChecked];
    updateChecked[index] = !updateChecked[index];
    
    if (updateChecked[index] === false) {
      setCount((prevState)=> prevState - 1 );
    } else {
      setCount((prevState)=> prevState + 0)
    }
    
  };
  
  //Function to toggle the completion status of a task
  const handleToggleCheckbox = (index) => {
    const updateChecked = [...isChecked];
    updateChecked[index] = !updateChecked[index];
    setChecked(updateChecked);

    if (updateChecked[index] === false) {
      setCount((prevState)=> prevState + 1 );
    } else {
      setCount((prevState)=> prevState - 1)
    }
  };

  //Function to handle logout/go back
  const handleLogout = () => {
    //Navigate back to the previous screen using navigation.goBack()
    navigation.goBack();
  };

  //Function to render each task item
  const renderItem = ({ item, index }) => (
    <View style={styles.task}>
      <Checkbox
        style={styles.checkbox}
        value={isChecked[index]}
        onValueChange={() => handleToggleCheckbox(index)}
      />

      <View style={[styles.tasks, { opacity: isChecked[index] ? 0.3 : 1 }]}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemList}>{item.task}</Text>
      </View>

      <View style={styles.taskButtons}>
      <TouchableOpacity
        onPress={() => handleEditTask(index)}
        disabled={isChecked[index]} // Disable the "Edit" button when the checkbox is checked
      >
        <Text style={[styles.editButton, isChecked[index] && {opacity: 0.3}]}>
          Edit
        </Text>
      </TouchableOpacity>

        <TouchableOpacity onPress={() => handleDeleteTask(index)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Display the user's name and a logout button */}
      <View style={styles.header}>
        <Text style={styles.title}>Welcome back <Text style={styles.username}>{name}</Text>!</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutButton}>Logout</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={task}
        onChangeText={(text) => setTask(text)}
      />

      {/* Input fields for title and task */}
      <TouchableOpacity 
        style={[styles.addButton, { opacity: task && title ? 1 : 0.3 }]} 
        onPress={handleAddTask}
      >
        <Text style={styles.addButtonText}>
          {editIndex !== -1 ? 'Update Task' : 'Add Task'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.countTask}>You have {count} task(s) left.</Text>

      {/* Display the list of tasks */}
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};


export default TaskManager


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'flex-start'
  },
  header: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 25,
    fontWeight: "500",
    marginVertical: 10,
    color: '#000',
    maxWidth: '80%'
  },
  username:{
    fontSize: 30,
    color: "#994408"
  },
  input: {
    borderWidth: 3,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 18,
  },
  addButton: {
    backgroundColor: "#994408",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    fontSize: 18,
    backgroundColor: '#d9c6b8',
    padding: 10,
    borderRadius: 10
  },
  tasks: {
    width: 250,
  },
  itemTitle: {
    fontSize: 25,
    fontWeight: '600'
  },
  itemList: {
    fontSize: 19,
  },
  editButton: {
    marginRight: 10,
    color: "green",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5
  },
  deleteButton: {
    color: "red",
    fontWeight: "bold",
    fontSize: 18,
  },
  countTask: {
    fontSize: 20
  },
  logoutButton: {
    backgroundColor:"#994408",
    color: '#fff',
    borderRadius: 5,
    width: 60,
    height: 30,
    textAlign: "center",
    textAlignVertical: "center"
  }
})