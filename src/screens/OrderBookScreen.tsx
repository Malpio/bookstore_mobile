import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RouteProp, NavigationProp } from '@react-navigation/native';
import { BooksNavigatorParamsType } from '../types/navigation/NavigationTypes';
import Colors from '../styles/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, Icon } from '@ui-kitten/components';
import OrderForm from '../components/forms/OrderForm';
import { OrderFormType } from '../types/components/forms/OrderFormType';
import {
  request,
  points,
  AxiosRequestConfig,
} from '../core/services/ApiService';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

type Props = {
  route: RouteProp<BooksNavigatorParamsType, 'OrderBookScreen'>;
  navigation: NavigationProp<BooksNavigatorParamsType>;
};

const OrderBookScreen: React.FC<Props> = ({ route, navigation }) => {
  const { id, title, author, price } = route.params;
  const [loading, setLoading] = useState(false);
  const token = useSelector<RootState>((state) => state.user.token) as string;

  const order = async (data: OrderFormType) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const config: AxiosRequestConfig = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      await request.post(points.order, { bookId: id, ...data }, config);
      navigation.goBack();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.section}>
        <View style={styles.header}>
          <View>
            <Text category={'h6'}>{title}</Text>
            <Text style={styles.authorText} category={'s2'}>
              {author}
            </Text>
          </View>
          <View style={styles.orderContainer}>
            <Icon
              fill={Colors.BLACK}
              name={'shopping-cart-outline'}
              style={styles.icon}
            />
            <Text category={'s1'}>{`Cena: ${price.toFixed(2)} zł`}</Text>
          </View>
        </View>
      </View>
      <OrderForm onSubmit={order} loading={loading} style={styles.form} />
    </KeyboardAwareScrollView>
  );
};

export default OrderBookScreen;

const styles = StyleSheet.create({
  icon: {
    height: 25,
    width: 25,
    marginRight: 10,
  },
  orderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingVertical: 25,
  },
  section: {
    width: '100%',
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 5,
    marginBottom: 10,
  },
  authorText: {
    marginTop: 5,
  },
  form: {
    marginTop: 15,
  },
});
