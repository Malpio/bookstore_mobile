import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, NavigationProp } from '@react-navigation/native';

import { Icon, Text } from '@ui-kitten/components';
import LoginForm from '../components/forms/LoginForm';

import Colors from '../styles/Colors';
import GlobalStyles from '../styles/GlobalStyles';

import { LoginFormType } from '../types/components/forms/LoginFormType';
import { UserType } from '../types/api/UserType';
import { RootStackParamsType } from '../types/navigation/NavigationTypes';

import { request, points } from '../core/services/ApiService';

import { useDispatch } from 'react-redux';
import { setUserData } from '../store/userSlice';

type Props = {
  route: RouteProp<RootStackParamsType, 'LoginScreen'>;
  navigation: NavigationProp<RootStackParamsType>;
};

const LoginScreen: React.FC<Props> = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (route.params?.register) {
      Toast.show({
        type: 'info',
        text1: 'Rejestracja przebiegła pomyślnie.',
        visibilityTime: 3000,
      });
    }
  }, [route.params]);

  const login = async (data: LoginFormType) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await request.post<UserType>(points.login, data);
      dispatch(setUserData(response.data));
      console.log(response);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Nieprawidłowe dane logowania!',
        visibilityTime: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer} edges={['top']}>
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={styles.contentContainer}
        style={styles.container}>
        <View>
          <View style={styles.headerContainer}>
            <Icon
              style={styles.icon}
              fill={Colors.GRAY}
              name="log-in-outline"
            />
            <Text category={'h1'} style={GlobalStyles.header}>
              Logowanie
            </Text>
          </View>
          <LoginForm loading={loading} onSubmit={login} />
        </View>
        <View style={styles.bottomContainer}>
          <Text style={GlobalStyles.information}>Nie masz jeszcze konta?</Text>
          <Text
            onPress={() => navigation.navigate('RegisterScreen')}
            style={[GlobalStyles.information, GlobalStyles.link]}>
            {' '}
            Zarejestruj się!
          </Text>
        </View>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 15,
  },
  contentContainer: {
    width: '100%',
    justifyContent: 'space-between',
    flexGrow: 1,
    paddingVertical: 40,
  },
  icon: {
    width: 100,
    height: 100,
  },
  headerContainer: {
    alignItems: 'center',
    marginVertical: 50,
  },
  bottomContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default LoginScreen;
