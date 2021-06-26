import React from 'react';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import { useForm } from 'react-hook-form';

import Button from '../Button';
import Input, { InputType } from '../Input';

import { OrderFormType } from '../../types/components/forms/OrderFormType';

type Props = {
  onSubmit: (data: OrderFormType) => void;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

const OrderForm: React.VFC<Props> = ({ onSubmit, loading, style }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormType>();

  return (
    <View style={style}>
      <Input
        name={'customerFullName'}
        control={control}
        error={errors.customerFullName}
        type={InputType.DEFAULT}
        placeholder={'imie i nazwisko'}
        required
      />
      <Input
        name={'deliverFullAddress'}
        control={control}
        error={errors.deliverFullAddress}
        type={InputType.DEFAULT}
        placeholder={'adres'}
        required
      />
      <Button
        onPress={handleSubmit(onSubmit)}
        style={styles.buttonContainer}
        text={'Zamów'}
        loading={loading}
      />
    </View>
  );
};

export default OrderForm;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 30,
  },
});
