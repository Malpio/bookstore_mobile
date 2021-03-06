import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import {
  RouteProp,
  NavigationProp,
  useFocusEffect,
} from '@react-navigation/native';

import { Divider, List, ListItem, Text, Spinner } from '@ui-kitten/components';

import { BookListItemType } from '../types/api/BookTypes';
import { BooksNavigatorParamsType } from '../types/navigation/NavigationTypes';

import useApiFetching from '../hooks/useApiFetching';
import Colors from '../styles/Colors';

type Props = {
  route: RouteProp<BooksNavigatorParamsType, 'BooksListScreen'>;
  navigation: NavigationProp<BooksNavigatorParamsType>;
};

const BooksListScreen: React.FC<Props> = ({ route, navigation }) => {
  const { type } = route.params;
  const { isFetching, data, refresh } = useApiFetching<BookListItemType[]>(
    type === 'all' ? 'books' : 'myBooks',
  );

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

  const goToBookDetails = (id: number) => {
    navigation.navigate('BookDetailsScreen', { id });
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: BookListItemType;
    index: number;
  }) => (
    <ListItem
      accessoryLeft={() => (
        <Image
          source={require('../assets/images/book-cover-placeholder.png')}
          style={styles.image}
        />
      )}
      title={`${item.title}`}
      description={`${item.author}`}
      style={styles.listItem}
      onPress={() => goToBookDetails(item.id)}
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
          Brak książek na liście
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
