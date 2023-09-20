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

const TaskManager = () => {
  const { name } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [isChecked, setChecked] = useState(tasks.map(() => false));

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
  };
  
  const handleToggleCheckbox = (index) => {
    const updateChecked = [...isChecked];
    updateChecked[index] = !updateChecked[index];
    setChecked(updateChecked);
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome back {name}! </Text>
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
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    marginVertical: 10,
    color: '#994408'

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
  }
})