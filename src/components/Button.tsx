import React, { FunctionComponent } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Button as KittenButton, Spinner } from '@ui-kitten/components';

interface IProps {
  text: string;
  onPress?: () => void;
  loading?: boolean;
  style?: ViewStyle;
}

const LoadingIndicator = () => (
  <View style={styles.indicator}>
    <Spinner size="small" />
  </View>
);

const Button: FunctionComponent<IProps> = ({
  text,
  onPress,
  loading,
  style,
}: IProps) => {
  return (
    <KittenButton
      style={[styles.button, style]}
      appearance="outline"
      onPress={onPress}
      accessoryLeft={loading ? LoadingIndicator : undefined}>
      {text.toUpperCase()}
    </KittenButton>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    margin: 2,
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Button;
