import React, { useContext, useEffect } from 'react';
import { Text, View } from 'react-native';
import { DatabaseContext } from '../../context/DataContext';

function History(props) {
    const {getAllWorkouts} = useContext(DatabaseContext);
    useEffect(() => { 
        getAllWorkouts().then((data) => {
            console.log(data);
        });
    }, []);   
    return (
        <View>
            <Text>History</Text>
        </View>
    );
}

export default History;