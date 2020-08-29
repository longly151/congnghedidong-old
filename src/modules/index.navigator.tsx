import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/Main';
import DetailScreen from './screens/Detail';
import rootStack from './routes';

const Stack = createStackNavigator();

const ModuleStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={rootStack.mainScreen}
      component={MainScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name={rootStack.detailScreen}
      component={DetailScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default ModuleStack;
