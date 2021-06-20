import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { UserTabNavigatorParamsType } from '../types/navigation/NavigationTypes';

import BooksNavigator from './BooksNavigator';

import Colors from '../styles/Colors';

const Tab = createBottomTabNavigator<UserTabNavigatorParamsType>();

type IconActiveType = 'active' | 'inactive';
type IconColor = { [key in IconActiveType]: Colors };

const iconColor: IconColor = {
  active: Colors.GRAY,
  inactive: Colors.BLACK,
};

const UserTabNavigator: React.FC = () => {
  const getIcon = (
    focused: boolean,
    route: RouteProp<
      UserTabNavigatorParamsType,
      keyof UserTabNavigatorParamsType
    >,
  ) => {
    const type: IconActiveType = focused ? 'active' : 'inactive';
    switch (route.name) {
      case 'BooksTab':
        return null;
    }
  };

  return (
    <Tab.Navigator
      initialRouteName={'BooksTab'}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        style: styles.tabStyle,
        activeTintColor: Colors.GRAY,
        inactiveTintColor: Colors.BLACK,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => getIcon(focused, route),
      })}>
      <Tab.Screen
        options={{ tabBarLabel: 'Lista książek' }}
        name={'BooksTab'}
        component={BooksNavigator}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabStyle: {
    marginBottom: 3,
  },
});

export default UserTabNavigator;
