import React from 'react';
import LangSelector from '../General/LangSelector';
import { View } from 'react-native';
function ProfileScreen(props) {
    return (
        <View className="flex-col items-center justify-center p-4">
            <LangSelector />
        </View>
    );
}

export default ProfileScreen;