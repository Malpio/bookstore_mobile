import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationProp, useFocusEffect } from '@react-navigation/native';

import {
  Divider,
  List,
  ListItem,
  Text,
  Spinner,
  Icon,
} from '@ui-kitten/components';

import useApiFetching from '../hooks/useApiFetching';
import Colors from '../styles/Colors';

import { BookListItemType } from '../types/api/BookTypes';

import { MoreNavigatorParamsType } from '../types/navigation/NavigationTypes';

type Props = {
  navigation: NavigationProp<MoreNavigatorParamsType>;
};

const BookIcon = (props: any) => <Icon {...props} name="book-outline" />;

const EditIcon = (props: any) => <Icon {...props} name="edit-2-outline" />;

const ManageBookScreen: React.FC<Props> = ({ navigation }) => {
  const { isFetching, data, refresh } =
    useApiFetching<BookListItemType[]>('books');

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

  const goToBookEdit = (id: number) => {
    navigation.navigate('EditBookScreen', { id });
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: BookListItemType;
    index: number;
  }) => (
    <ListItem
      accessoryLeft={BookIcon}
      accessoryRight={EditIcon}
      title={`${item.title}`}
      style={styles.listItem}
      onPress={() => goToBookEdit(item.id)}
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

export default ManageBookScreen;

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
