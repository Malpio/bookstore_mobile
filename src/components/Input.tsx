import React, {
  FunctionComponent,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import {
  Input as KittenInput,
  Icon as KittenIcon,
  IconProps,
} from '@ui-kitten/components';
import { Controller } from 'react-hook-form';

export enum InputType {
  DEFAULT = 'default',
  USERNAME = 'username',
  PASSWORD = 'password',
  EMAIL = 'email',
}

interface IProps {
  defaultValue?: string;
  placeholder?: string;
  type?: InputType;
  control: any;
  name: string;
  error: any;
  required?: boolean;
  onIconPress?: () => void;
}

const useInputConfig = (
  type: InputType,
  onPress?: () => void,
): {
  renderInputIcon?: (props: IconProps) => JSX.Element;
  secureTextEntry?: boolean;
} => {
  const [secureTextEntry, setSecureTextEntry] = useState(
    type === InputType.PASSWORD,
  );

  const changeSecureState = useCallback(() => {
    setSecureTextEntry(!secureTextEntry);
  }, [secureTextEntry]);

  const name: { [key in InputType]?: string } = useMemo(
    () => ({
      password: secureTextEntry ? 'eye-off' : 'eye',
      email: 'email-outline',
      username: 'person-outline',
    }),
    [secureTextEntry, type],
  );

  const onIconPress: { [key in InputType]: (() => void) | undefined } = useMemo(
    () => ({
      password: onPress || changeSecureState,
      email: onPress,
      username: onPress,
      default: onPress,
    }),
    [changeSecureState],
  );

  const renderInputIcon = name[type]
    ? (props: IconProps) => (
        <TouchableWithoutFeedback onPress={onIconPress[type]}>
          <KittenIcon {...props} name={name[type]} />
        </TouchableWithoutFeedback>
      )
    : undefined;

  return {
    renderInputIcon,
    secureTextEntry,
  };
};

const Input: FunctionComponent<IProps> = ({
  defaultValue = '',
  placeholder,
  control,
  name,
  error,
  type = InputType.DEFAULT,
  required,
  onIconPress,
}: IProps) => {
  const { renderInputIcon, secureTextEntry } = useInputConfig(
    type,
    onIconPress,
  );

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      rules={{ required }}
      render={({ field: { onChange, onBlur, value } }) => (
        <KittenInput
          style={styles.input}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          value={value}
          status={error && 'danger'}
          onChangeText={(value) => onChange(value)}
          onBlur={onBlur}
          accessoryRight={renderInputIcon}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 2,
  },
});

export default Input;
