import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useForm } from 'react-hook-form';

import Button from '../Button';
import Input, { InputType } from '../Input';

import { RegisterFormType } from '../../types/components/forms/RegisterFormType';

type Props = {
  onSubmit: (data: RegisterFormType) => void;
  loading?: boolean;
};

const RegisterForm: React.VFC<Props> = ({ onSubmit, loading }) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormType>();

  const passwordValidate = (password: string) => {
    return password === getValues('repeatPassword');
  };

  const repeatPasswordValidate = (password: string) => {
    return password === getValues('password');
  };

  const emailValid = (email: string) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  };

  return (
    <View>
      <Input
        name={'email'}
        control={control}
        error={errors.email}
        type={InputType.EMAIL}
        placeholder={'e-mail'}
        required
        validate={emailValid}
      />
      <Input
        name={'username'}
        control={control}
        error={errors.username}
        type={InputType.USERNAME}
        placeholder={'nazwa użytkownika'}
        required
      />
      <Input
        name={'password'}
        control={control}
        error={errors.password}
        type={InputType.PASSWORD}
        placeholder={'hasło'}
        validate={passwordValidate}
        required
      />
      <Input
        name={'repeatPassword'}
        control={control}
        error={errors.repeatPassword}
        type={InputType.PASSWORD}
        placeholder={'powtórz hasło'}
        validate={repeatPasswordValidate}
        required
      />
      <Button
        onPress={handleSubmit(onSubmit)}
        style={styles.buttonContainer}
        text={'Zarejestruj'}
        loading={loading}
      />
    </View>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 30,
  },
});
