import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useForm } from 'react-hook-form';

import Button from '../Button';
import Input, { InputType } from '../Input';

import { LoginFormType } from '../../types/components/forms/LoginFormType';

type Props = {
  onSubmit: (data: LoginFormType) => void;
  loading?: boolean;
};

const LoginForm: React.VFC<Props> = ({ onSubmit, loading }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>();

  return (
    <View>
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
        text={'Zaloguj'}
        loading={loading}
      />
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 30,
  },
});
