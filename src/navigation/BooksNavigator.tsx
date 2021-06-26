import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BooksNavigatorParamsType } from '../types/navigation/NavigationTypes';

import BooksListScreen from '../screens/BooksListScreen';
import BookDetailsScreen from '../screens/BookDetailsScreen';
import OrderBookScreen from '../screens/OrderBookScreen';

import { RouteProp } from '@react-navigation/native';

const BooksNavigator = createStackNavigator<BooksNavigatorParamsType>();

type Props = {
  route: RouteProp<BooksNavigatorParamsType, 'BooksListScreen'>;
};

const Navigator: React.FC<Props> = ({ route }) => {
  const { type } = route.params;
  return (
    <BooksNavigator.Navigator>
      <BooksNavigator.Screen
        name={'BooksListScreen'}
        component={BooksListScreen}
        options={{
          headerBackTitle: '',
          headerTitle: type === 'all' ? 'Lista książek' : 'Moje książki',
        }}
        initialParams={{ type }}
      />
      <BooksNavigator.Screen
        name={'BookDetailsScreen'}
        component={BookDetailsScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'Szczegóły książki',
        }}
      />
      <BooksNavigator.Screen
        name={'OrderBookScreen'}
        component={OrderBookScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'Złóż zamówienie',
        }}
      />
    </BooksNavigator.Navigator>
  );
};

export default Navigator;
