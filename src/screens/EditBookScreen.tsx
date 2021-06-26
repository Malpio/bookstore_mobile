import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import AddBookForm from '../components/forms/AddBookForm';
import { Text, Spinner, Icon } from '@ui-kitten/components';
import Button from '../components/Button';

import { AddBookFormType } from '../types/components/forms/AddBookFormType';
import { MoreNavigatorParamsType } from '../types/navigation/NavigationTypes';
import { BookDetails } from '../types/api/BookTypes';

import {
  request,
  points,
  AxiosRequestConfig,
} from '../core/services/ApiService';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { NavigationProp, RouteProp } from '@react-navigation/native';

import useApiFetching from '../hooks/useApiFetching';

type Props = {
  route: RouteProp<MoreNavigatorParamsType, 'EditBookScreen'>;
  navigation: NavigationProp<MoreNavigatorParamsType>;
};

const RemoveIcon = (props: any) => <Icon {...props} name={'trash-2-outline'} />;

const EditBookScreen: React.FC<Props> = ({ route, navigation }) => {
  const { id } = route.params;

  const [loading, setLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);

  const token = useSelector<RootState>((state) => state.user.token) as string;

  const { data, isFetching, refresh } = useApiFetching<BookDetails>(
    'books',
    undefined,
    id,
  );

  const editBook = async (data: AddBookFormType) => {
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

      await request.put(`${points.books}${id}/`, data, config);
      Toast.show({
        type: 'info',
        text1: 'Zmiany zapisano pomyślnie',
        visibilityTime: 3000,
      });
    } catch (error) {
      console.log('error', error.response);
      Toast.show({
        type: 'error',
        text1: 'Wystąpił problem!',
        visibilityTime: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const removeBook = async () => {
    if (removeLoading) {
      return;
    }
    setRemoveLoading(true);
    try {
      const config: AxiosRequestConfig = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      await request.delete(`${points.books}${id}/`, config);
      navigation.goBack();
    } catch (error) {
    } finally {
      setRemoveLoading(false);
    }
  };

  if (isFetching || !data) {
    return (
      <View style={styles.loaderContainer}>
        <Spinner size="medium" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header} category={'h5'}>
        Edytuj książkę
      </Text>
      <AddBookForm
        buttonText={'Edytuj książkę'}
        defaultData={{
          author: data.book.author,
          price: data.book.price,
          title: data.book.title,
        }}
        loading={loading}
        onSubmit={editBook}
      />
      <Button
        style={styles.removeButton}
        status={'danger'}
        accessoryRight={RemoveIcon}
        text={'Usuń książkę'}
        loading={removeLoading}
        onPress={removeBook}
      />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

export default EditBookScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: 25,
    paddingTop: 50,
  },
  header: {
    marginBottom: 30,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButton: {
    marginTop: 20,
  },
});
