import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { RootStackParamsType } from '../types/navigation/NavigationTypes';
import { UserType } from '../types/api/UserType';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import UserTabNavigator from './UserTabNavigator';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Stack = createStackNavigator<RootStackParamsType>();

const Navigation: React.FC = () => {
  const user = useSelector<RootState>((state) => state.user) as UserType;
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user.token ? (
          <>
            <Stack.Screen
              name={'UserTabNavigator'}
              component={UserTabNavigator}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name={'LoginScreen'}
              component={LoginScreen}
              options={{
                animationEnabled: true,
                gestureEnabled: true,
                cardOverlayEnabled: true,
              }}
            />
            <Stack.Screen
              name={'RegisterScreen'}
              component={RegisterScreen}
              options={{
                animationEnabled: true,
                gestureEnabled: true,
                cardOverlayEnabled: true,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
