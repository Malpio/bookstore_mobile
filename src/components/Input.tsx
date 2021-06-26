import React, {
  FunctionComponent,
  useState,
  useCallback,
  useMemo,
} from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardTypeOptions,
} from 'react-native';
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
  PRICE = 'price',
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
  validate?: (value: string) => boolean;
}

const useInputConfig = (
  type: InputType,
  onPress?: () => void,
): {
  renderInputIcon?: (props: IconProps) => JSX.Element;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
} => {
  const [secureTextEntry, setSecureTextEntry] = useState(
    type === InputType.PASSWORD,
  );

  const keyboardTypes: { [key in InputType]: KeyboardTypeOptions } =
    React.useMemo(
      () => ({
        default: 'default',
        username: 'default',
        password: 'default',
        email: 'email-address',
        price: 'numeric',
      }),
      [type],
    );

  const changeSecureState = useCallback(() => {
    setSecureTextEntry(!secureTextEntry);
  }, [secureTextEntry]);

  const name: { [key in InputType]?: string } = useMemo(
    () => ({
      password: secureTextEntry ? 'eye-off' : 'eye',
      email: 'email-outline',
      username: 'person-outline',
      price: 'pricetags-outline',
    }),
    [secureTextEntry, type],
  );

  const onIconPress: { [key in InputType]: (() => void) | undefined } = useMemo(
    () => ({
      password: onPress || changeSecureState,
      email: onPress,
      username: onPress,
      default: onPress,
      price: onPress,
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
    keyboardType: keyboardTypes[type],
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
  validate,
}: IProps) => {
  const { renderInputIcon, secureTextEntry, keyboardType } = useInputConfig(
    type,
    onIconPress,
  );

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      rules={{ required, validate }}
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
          keyboardType={keyboardType}
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
