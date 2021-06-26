import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MoreNavigatorParamsType } from '../types/navigation/NavigationTypes';

import MenuScreen from '../screens/MenuScreen';
import AddNewBookScreen from '../screens/AddNewBookScreen';
import ManageBookScreen from '../screens/ManageBookScreen';
import EditBookScreen from '../screens/EditBookScreen';

const MoreNavigator = createStackNavigator<MoreNavigatorParamsType>();

const Navigator: React.FC = () => {
  return (
    <MoreNavigator.Navigator>
      <MoreNavigator.Screen
        name={'MenuScreen'}
        component={MenuScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'Więcej',
        }}
      />
      <MoreNavigator.Screen
        name={'AddNewBookScreen'}
        component={AddNewBookScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'Dodaj nową książkę',
        }}
      />
      <MoreNavigator.Screen
        name={'ManageBookScreen'}
        component={ManageBookScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'Zarządzaj książkami',
        }}
      />
      <MoreNavigator.Screen
        name={'EditBookScreen'}
        component={EditBookScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'Edytuj książkę',
        }}
      />
    </MoreNavigator.Navigator>
  );
};

export default Navigator;
