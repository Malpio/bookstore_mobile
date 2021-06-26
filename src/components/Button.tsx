import React, { FunctionComponent } from 'react';
import { StyleSheet, View, ViewStyle, ImageProps } from 'react-native';
import { Button as KittenButton, Spinner } from '@ui-kitten/components';
import { RenderProp, EvaStatus } from '@ui-kitten/components/devsupport';

interface IProps {
  text: string;
  onPress?: () => void;
  loading?: boolean;
  style?: ViewStyle;
  status?: EvaStatus;
  accessoryRight?: RenderProp<Partial<ImageProps>>;
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
  status,
  accessoryRight,
}: IProps) => {
  return (
    <KittenButton
      style={[styles.button, style]}
      appearance="outline"
      onPress={onPress}
      status={status}
      accessoryRight={accessoryRight}
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
