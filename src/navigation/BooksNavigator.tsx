import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BooksNavigatorParamsType } from '../types/navigation/NavigationTypes';

import BooksListScreen from '../screens/BooksListScreen';

const BooksNavigator = createStackNavigator<BooksNavigatorParamsType>();

const Navigator: React.FC = () => {
  return (
    <BooksNavigator.Navigator>
      <BooksNavigator.Screen
        name={'BooksListScreen'}
        component={BooksListScreen}
        options={{ headerTitle: 'Lista książek' }}
      />
    </BooksNavigator.Navigator>
  );
};

export default Navigator;
