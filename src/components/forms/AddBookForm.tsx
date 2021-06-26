import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useForm } from 'react-hook-form';

import Button from '../Button';
import Input, { InputType } from '../Input';

import { AddBookFormType } from '../../types/components/forms/AddBookFormType';

type Props = {
  onSubmit: (data: AddBookFormType) => void;
  loading?: boolean;
  defaultData?: AddBookFormType;
  buttonText?: string;
};

const AddBookForm: React.VFC<Props> = ({
  onSubmit,
  loading,
  defaultData,
  buttonText,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddBookFormType>();

  return (
    <View>
      <Input
        name={'title'}
        control={control}
        error={errors.title}
        type={InputType.DEFAULT}
        placeholder={'tytuł książki'}
        required
        defaultValue={defaultData?.title}
      />
      <Input
        name={'author'}
        control={control}
        error={errors.author}
        type={InputType.DEFAULT}
        placeholder={'autor książki'}
        required
        defaultValue={defaultData?.author}
      />
      <Input
        name={'price'}
        control={control}
        error={errors.price}
        type={InputType.PRICE}
        placeholder={'cena książki'}
        required
        defaultValue={defaultData?.price ? `${defaultData.price}` : undefined}
      />
      <Button
        onPress={handleSubmit(onSubmit)}
        style={styles.buttonContainer}
        text={buttonText || 'Dodaj książkę'}
        loading={loading}
      />
    </View>
  );
};

export default AddBookForm;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 30,
  },
});
