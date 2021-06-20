import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { removeUserData } from '../store/userSlice';

const BooksListScreen = () => {
  const dispatch = useDispatch();

  return (
    <View>
      <Text onPress={() => dispatch(removeUserData())}>WYLOGUJ</Text>
    </View>
  );
};

export default BooksListScreen;

const styles = StyleSheet.create({});
