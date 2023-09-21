import React, { useContext } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./Login";
import TaskManager from "./TaskManager";

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {

  return (
    <Stack.Navigator >
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
      <Stack.Screen name="Task Manager" component={TaskManager} />
    </Stack.Navigator>
  );
};