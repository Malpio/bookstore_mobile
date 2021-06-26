import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { Text } from '@ui-kitten/components';

import AddBookForm from '../components/forms/AddBookForm';

import { AddBookFormType } from '../types/components/forms/AddBookFormType';

import {
  request,
  points,
  AxiosRequestConfig,
} from '../core/services/ApiService';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

const AddNewBookScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const token = useSelector<RootState>((state) => state.user.token) as string;

  const addBook = async (data: AddBookFormType) => {
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

      await request.post(points.books, data, config);
      Toast.show({
        type: 'info',
        text1: 'Dodano pomyślnie',
        visibilityTime: 3000,
      });
    } catch (error) {
      console.log('error', error.response);
      Toast.show({
        type: 'error',
        text1: 'Książka już istnieje!',
        visibilityTime: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header} category={'h5'}>
        Dodaj nową książkę
      </Text>
      <AddBookForm loading={loading} onSubmit={addBook} />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

export default AddNewBookScreen;

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
});
