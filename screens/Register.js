import React, {useState} from 'react'
import { View, Text } from 'react-native'
import { TextInput } from 'react-native-paper';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View>
            <TextInput
                label="Email"
                value={email}
                onChangeText={email => setEmail(email)}
            />
            <TextInput
                label="Password"
                value={password}
                onChangeText={password => setPassword(password)}
            />
            </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});