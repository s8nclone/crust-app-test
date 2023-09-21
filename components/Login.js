import React, { useState, useEffect, useContext } from "react";
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Alert, } from "react-native"
import { AuthContext } from "../hooks/context";

const LoginScreen = ({navigation}) => {
    const { hasUser, setUser, name, setName } = useContext(AuthContext);

    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Trigger form validation when name or password changes
        validateForm();
    }, [name, password]);
  
    const validateForm = () => {
        let errors = {};
  
        // Validate name field
        if (!name) {
            errors.name = 'Name is required.';
        }
  
        // Validate password field
        if (!password) {
            errors.password = 'Password is required.';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters.';
        }
  
        // Set the errors and update form validity
        setErrors(errors);
        setUser(Object.keys(errors).length === 0);
    };

    const handleSubmit = () => {
        if (hasUser) {
            // if form is valid, perform the submission logic
            Alert.alert(
                'Login Succesful',
                'You have logged in successfully'
            ),
            Alert.prompt(
                'Login Succesful',
                'You have logged in successfully'
            )
            navigation.navigate("Task Manager")
            console.log('Form submitted successfully!');
        } else {
            // if form is invalid, display error messages
            console.log('Form has errors. Please correct them.');
        }
    };

    return (
        <View style={styles.layout}>
            <Text style={styles.title}>Welcome Back!</Text>
            <View style={styles.container}>
                <View>
                    <View>
                        <TextInput 
                            style={styles.inputField}
                            placeholder="Username"
                            onChangeText={text => setName(text)} 
                        />
                    </View>
                    <View>
                        <TextInput 
                            style={styles.inputField}
                            placeholder="Password"
                            onChangeText={text => setPassword(text)}
                            secureTextEntry 
                        />
                    </View>
                </View>
                <TouchableOpacity
                    style={[styles.button, { opacity: hasUser ? 1 : 0.5 }]}
                    disabled={!hasUser}
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                {/* display error messages */}
                {Object.values(errors).map((error, index) => (
                    <Text key={index} style={styles.error}>
                        {error}
                    </Text>
                ))}
            </View>
      </View>
    );
};

export default LoginScreen

const styles = StyleSheet.create({
    layout: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#b86023'
    },
    title: {
      fontSize: 32,
      marginBottom: 16,
      fontWeight: '600'
    },
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 350,
        minHeight: 150,
        padding: 10
    },
    button: {
        width: 100,
        backgroundColor: '#994408',
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 12,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    inputField: {
        padding: 8,
        backgroundColor: 'beige',
        width: 300,
        borderColor: '#994408',
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 5,
        color: '#000',
        borderWidth: 0.3
    },
    error: {
        color: 'red',
        fontSize: 15,
        marginBottom: 12,
    },
  });