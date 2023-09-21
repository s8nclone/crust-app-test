import React, { useContext, useState } from "react";
import { AuthContext } from "../hooks/context";
import { 
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";

const TaskManager = () => {
  const { name } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [isChecked, setChecked] = useState(tasks.map(() => false));
  const [count, setCount] = useState(0);

  const navigation = useNavigation();

  const handleAddTask = () => {
    if (task && title) {
      if (editIndex !== -1) {
        // Edit existing task
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = { title, task };
        setTasks(updatedTasks);
        setEditIndex(-1);
      } else {
        // Add new task
        setTasks([...tasks, { title, task }]);
        setCount(count + 1);
      }
      setTitle("");
      setTask("");
    }
  };

  const handleEditTask = (index) => {
    const taskToEdit = tasks[index];
    setTitle(taskToEdit.title);
    setTask(taskToEdit.task);
    setEditIndex(index);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    setCount(count - 1);
  };
  
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

  const handleLogout = () => {
    // Then navigate back to the previous screen using navigation.goBack()
    navigation.goBack();
  };

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
        <TouchableOpacity onPress={() => handleEditTask(index)}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteTask(index)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
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
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>
          {editIndex !== -1 ? 'Update Task' : 'Add Task'}
        </Text>
      </TouchableOpacity>
      <Text style={styles.countTask}>You have {count} task(s) left.</Text>
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