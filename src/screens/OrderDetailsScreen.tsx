import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';

import { OrderDetailsType } from '../types/api/BookTypes';
import { OrderNavigatorParamsType } from '../types/navigation/NavigationTypes';

import { Text, Spinner, Icon } from '@ui-kitten/components';

import useApiFetching from '../hooks/useApiFetching';
import Colors from '../styles/Colors';

type Props = {
  route: RouteProp<OrderNavigatorParamsType, 'OrderDetailsScreen'>;
};

const OrderDetailsScreen: React.FC<Props> = ({ route }) => {
  const { id } = route.params;

  const { data, isFetching } = useApiFetching<OrderDetailsType>(
    'order',
    undefined,
    id,
  );

  if (isFetching || !data) {
    return (
      <View style={styles.loaderContainer}>
        <Spinner size="medium" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.section}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text category={'h6'}>{data.book.title}</Text>
            <Text style={styles.authorText} category={'s2'}>
              {data.book.author}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 15,
            }}>
            <Icon
              fill={Colors.BLACK}
              name={'shopping-cart-outline'}
              style={{ height: 25, width: 25, marginRight: 10 }}
            />
            <Text category={'s1'}>{`Cena: ${data.book.price.toFixed(
              2,
            )} zł`}</Text>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text category={'h6'}>Dane dostawy</Text>
        <Text
          style={{ marginTop: 10 }}
          category={'s2'}>{`Imie i nazwisko: ${data.customerFullName}`}</Text>
        <Text
          style={{ marginTop: 10 }}
          category={'s2'}>{`Adres wysyłki:\n${data.deliverFullAddress}`}</Text>
      </View>
    </ScrollView>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authorText: {
    marginTop: 5,
  },
});
