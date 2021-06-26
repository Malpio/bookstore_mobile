import React from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { removeUserData } from '../store/userSlice';
import {
  RouteProp,
  NavigationProp,
  useFocusEffect,
} from '@react-navigation/native';

import { Divider, List, ListItem, Text, Spinner } from '@ui-kitten/components';

import { OrderType } from '../types/api/BookTypes';
import { OrderNavigatorParamsType } from '../types/navigation/NavigationTypes';

import useApiFetching from '../hooks/useApiFetching';
import Colors from '../styles/Colors';

type Props = {
  navigation: NavigationProp<OrderNavigatorParamsType>;
};

const BooksListScreen: React.FC<Props> = ({ navigation }) => {
  const { isFetching, data, refresh } = useApiFetching<OrderType[]>('myOrders');

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = refresh();
      return unsubscribe;
    }, [refresh]),
  );

  if (isFetching) {
    return (
      <View style={styles.loaderContainer}>
        <Spinner size="medium" />
      </View>
    );
  }

  const goToOrdersDetails = (id: number) => {
    navigation.navigate('OrderDetailsScreen', { id });
  };

  const renderItem = ({ item, index }: { item: OrderType; index: number }) => (
    <ListItem
      accessoryLeft={() => (
        <Image
          source={require('../assets/images/book-cover-placeholder.png')}
          style={styles.image}
        />
      )}
      title={`${item.book.title}`}
      description={`${item.book.author}`}
      style={styles.listItem}
      onPress={() => goToOrdersDetails(item.id)}
    />
  );

  return (
    <List
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={data || []}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
      ListEmptyComponent={
        <Text style={styles.emptyText} category={'h6'}>
          Brak zakupionych książek
        </Text>
      }
    />
  );
};

export default BooksListScreen;

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
  image: {
    height: 70,
    width: 50,
    marginRight: 10,
  },
  listItem: {
    marginBottom: 5,
  },
  emptyText: {
    marginTop: 20,
    textAlign: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
