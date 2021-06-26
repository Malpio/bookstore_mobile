import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { UserTabNavigatorParamsType } from '../types/navigation/NavigationTypes';
import { SafeAreaView } from 'react-native-safe-area-context';

import BooksNavigator from './BooksNavigator';
import MoreNavigator from './MoreNavigator';
import OrderNavigator from './OrderNavigator';

import Colors from '../styles/Colors';

import { Icon } from '@ui-kitten/components';

const Tab = createBottomTabNavigator<UserTabNavigatorParamsType>();

type IconActiveType = 'active' | 'inactive';
type IconColor = { [key in IconActiveType]: Colors };

const iconColor: IconColor = {
  active: Colors.LIGHT_BLUE,
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
        return (
          <Icon
            style={styles.tabIcon}
            name={'book-outline'}
            fill={iconColor[type]}
          />
        );
      case 'MyBooksTab':
        return (
          <Icon
            style={styles.tabIcon}
            name={'book-open-outline'}
            fill={iconColor[type]}
          />
        );
      case 'OrdersTab':
        return (
          <Icon
            style={styles.tabIcon}
            name={'shopping-cart-outline'}
            fill={iconColor[type]}
          />
        );
      case 'MoreTab':
        return (
          <Icon
            style={styles.tabIcon}
            name={'more-horizontal-outline'}
            fill={iconColor[type]}
          />
        );
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: 'white' }}
      edges={['bottom']}>
      <Tab.Navigator
        initialRouteName={'BooksTab'}
        tabBarOptions={{
          keyboardHidesTabBar: true,
          style: styles.tabStyle,
          activeTintColor: Colors.LIGHT_BLUE,
          inactiveTintColor: Colors.BLACK,
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => getIcon(focused, route),
        })}>
        <Tab.Screen
          options={{ tabBarLabel: 'Lista książek' }}
          name={'BooksTab'}
          component={BooksNavigator}
          initialParams={{ type: 'all' }}
        />
        <Tab.Screen
          options={{ tabBarLabel: 'Moje książki' }}
          name={'MyBooksTab'}
          component={BooksNavigator}
          initialParams={{ type: 'my' }}
        />
        <Tab.Screen
          options={{ tabBarLabel: 'Zamówienia' }}
          name={'OrdersTab'}
          component={OrderNavigator}
        />
        <Tab.Screen
          options={{ tabBarLabel: 'Więcej' }}
          name={'MoreTab'}
          component={MoreNavigator}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabStyle: {
    marginBottom: 3,
  },
  tabIcon: {
    width: 25,
    height: 25,
  },
});

export default UserTabNavigator;
