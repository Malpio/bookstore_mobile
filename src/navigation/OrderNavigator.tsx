import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OrderNavigatorParamsType } from '../types/navigation/NavigationTypes';

import OrderListScreen from '../screens/OrderListScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';

const OrderNavigator = createStackNavigator<OrderNavigatorParamsType>();

const Navigator: React.FC = () => {
  return (
    <OrderNavigator.Navigator>
      <OrderNavigator.Screen
        name={'OrderListScreen'}
        component={OrderListScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'Lista zamówień',
        }}
      />
      <OrderNavigator.Screen
        name={'OrderDetailsScreen'}
        component={OrderDetailsScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'Szczegóły zamówienia',
        }}
      />
    </OrderNavigator.Navigator>
  );
};

export default Navigator;
