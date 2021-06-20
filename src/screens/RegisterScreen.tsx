import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { Icon, Text } from '@ui-kitten/components';
import RegisterForm from '../components/forms/RegisterForm';

import Colors from '../styles/Colors';
import GlobalStyles from '../styles/GlobalStyles';

import { request, points } from '../core/services/ApiService';

import { RootStackParamsType } from '../types/navigation/NavigationTypes';
import { RegisterFormType } from '../types/components/forms/RegisterFormType';

type Props = {
  navigation: NavigationProp<RootStackParamsType>;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const register = async (data: RegisterFormType) => {
    try {
      await request.post(points.register, { ...data, roles: ['user'] });
      navigation.navigate('LoginScreen', { register: true });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Błąd rejestracji!',
        text2: 'Użytkownik o tym e-mailu lub nazwie użytkownika już istnieje!',
        visibilityTime: 3000,
      });
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
              Rejestracja
            </Text>
          </View>
          <RegisterForm onSubmit={register} />
        </View>
        <View style={styles.bottomContainer}>
          <Text style={GlobalStyles.information}>Masz już konto?</Text>
          <Text
            onPress={() => navigation.navigate('LoginScreen')}
            style={[GlobalStyles.information, GlobalStyles.link]}>
            {' '}
            Zaloguj się!
          </Text>
        </View>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

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
