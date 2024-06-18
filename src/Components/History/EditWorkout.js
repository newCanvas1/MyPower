import React from 'react';
import { View } from 'react-native';
import DatePicker from 'react-native-date-picker';

function EditWorkout({workout}) {
    const date = new Date(workout.date);
    return (
        <View>
            <DatePicker
                date={date}
                mode="datetime"

            />
        </View>
    );
}

export default EditWorkout;