// UsersScreen.js
import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList } from 'react-native';
import { useDatabase } from '../context/DataContext';

const HomeScreen = () => {
  const { users, addUser } = useDatabase();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  return (
    <View>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <Button
        title="Add User"
        onPress={() => {
          addUser(name, parseInt(age));
          setName('');
          setAge('');
        }}
      />
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.age}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;
