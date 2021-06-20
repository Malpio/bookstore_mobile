import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useForm } from 'react-hook-form';

import Button from '../Button';
import Input, { InputType } from '../Input';

import { RegisterFormType } from '../../types/components/forms/RegisterFormType';

type Props = {
  onSubmit: (data: RegisterFormType) => void;
};

const RegisterForm: React.VFC<Props> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>();

  return (
    <View>
      <Input
        name={'email'}
        control={control}
        error={errors.email}
        type={InputType.EMAIL}
        placeholder={'e-mail'}
        required
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
        required
      />
      <Button
        onPress={handleSubmit(onSubmit)}
        style={styles.buttonContainer}
        text={'Zarejestruj'}
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
