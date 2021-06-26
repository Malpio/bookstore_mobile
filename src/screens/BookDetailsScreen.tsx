import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { RouteProp, NavigationProp } from '@react-navigation/native';

import {
  Divider,
  ListItem,
  Input,
  Text,
  Spinner,
  Select,
  SelectItem,
  IndexPath,
  Icon,
} from '@ui-kitten/components';

import {
  BookStatusEnum,
  BookDetails,
  BookReadingStatusType,
} from '../types/api/BookTypes';
import { BooksNavigatorParamsType } from '../types/navigation/NavigationTypes';

import useApiFetching from '../hooks/useApiFetching';
import Colors from '../styles/Colors';
import {
  AxiosRequestConfig,
  points,
  request,
} from '../core/services/ApiService';
import { RootState } from '../store/store';

import { AirbnbRating } from 'react-native-ratings';
import Button from '../components/Button';
import { useSelector } from 'react-redux';

type Props = {
  route: RouteProp<BooksNavigatorParamsType, 'BookDetailsScreen'>;
  navigation: NavigationProp<BooksNavigatorParamsType>;
};

const pickerValues: {
  [key in string]: { title: string; status: BookStatusEnum };
} = {
  '1': { title: 'Do przeczytania', status: BookStatusEnum.TO_READ },
  '2': { title: 'W trakcie czytania', status: BookStatusEnum.READING },
  '3': { title: 'Przeczytana', status: BookStatusEnum.READ },
  '4': { title: 'Porzucona', status: BookStatusEnum.ABANDONED },
};

const bookStatusIndexes: { [key in BookReadingStatusType]: number } = {
  TO_READ: 1,
  READING: 2,
  READ: 3,
  ABANDONED: 4,
};

const useInputState = (initialValue = '') => {
  const [value, setValue] = React.useState(initialValue);
  return { value, onChangeText: setValue };
};

const BookDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { id } = route.params;
  const token = useSelector<RootState>((state) => state.user.token) as string;

  const { data, isFetching, refresh } = useApiFetching<BookDetails>(
    'books',
    undefined,
    id,
  );

  const [rate, setRate] = useState(0);
  const [rateLoading, setRateLoading] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);

  const multilineInputState = useInputState();

  if (isFetching || !data) {
    return (
      <View style={styles.loaderContainer}>
        <Spinner size="medium" />
      </View>
    );
  }

  const sendRate = async () => {
    if (rateLoading) {
      return;
    }
    setRateLoading(true);
    try {
      const config: AxiosRequestConfig = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      await request.post(points.rateBook, { bookId: id, rate }, config);
    } catch (error) {
    } finally {
      setRateLoading(false);
      refresh();
    }
  };

  const sendReview = async () => {
    if (reviewLoading) {
      return;
    }
    setReviewLoading(true);
    try {
      const config: AxiosRequestConfig = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      await request.post(
        points.reviewBook,
        { bookId: id, review: multilineInputState.value },
        config,
      );
    } catch (error) {
    } finally {
      setReviewLoading(false);
      refresh();
    }
  };

  const changeReadingStatus = async (status: IndexPath | IndexPath[]) => {
    try {
      const config: AxiosRequestConfig = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      await request.post(
        points.status,
        { bookId: id, status: pickerValues[status.toString()].status },
        config,
      );
    } catch (error) {
    } finally {
      refresh();
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <View style={[styles.section, styles.header]}>
        <Image
          style={styles.image}
          source={require('../assets/images/book-cover-placeholder.png')}
        />
        <View style={styles.rightHeaderSection}>
          <Text category={'h6'}>{data.book.title}</Text>
          <Text style={styles.authorText} category={'s2'}>
            {data.book.author}
          </Text>
          <Select
            style={styles.select}
            label="Dodaj książkę na półkę"
            placeholder="Dodaj książkę"
            selectedIndex={
              data.status
                ? new IndexPath(bookStatusIndexes[data.status] - 1)
                : undefined
            }
            value={
              data.status
                ? pickerValues[bookStatusIndexes[data.status]].title
                : undefined
            }
            onSelect={changeReadingStatus}>
            <SelectItem title={pickerValues['1'].title} />
            <SelectItem title={pickerValues['2'].title} />
            <SelectItem title={pickerValues['3'].title} />
            <SelectItem title={pickerValues['4'].title} />
          </Select>
          <View style={styles.generalRateContainer}>
            <Text style={styles.rateText} category={'c2'}>
              {'Ocena książki'}
            </Text>
            <AirbnbRating
              defaultRating={data.rate}
              showRating={false}
              size={31}
              isDisabled
            />
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text category={'h6'}>Twoja ocena</Text>
        <AirbnbRating
          defaultRating={data.myRate}
          showRating={false}
          size={31}
          isDisabled={data.isRateByMe}
          onFinishRating={setRate}
          ratingContainerStyle={styles.inputStyle}
        />
        {!data.isRateByMe && (
          <Button
            loading={rateLoading}
            onPress={sendRate}
            text={'Wystaw ocene'}
          />
        )}
      </View>
      <View style={styles.section}>
        <Text category={'h6'}>Zamów książkę</Text>
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
        <Button
          onPress={() => navigation.navigate('OrderBookScreen', data.book)}
          text={'Złóż zamówienie'}
        />
      </View>
      {!data.isReviewByMe && (
        <View style={styles.section}>
          <Text category={'h6'}>Twoja recenzja</Text>
          <Input
            multiline={true}
            textStyle={styles.inputTextStyle}
            placeholder={'Zamieść swoją recenzję'}
            style={styles.inputStyle}
            {...multilineInputState}
          />
          <Button
            loading={reviewLoading}
            onPress={sendReview}
            text={'Wystaw recenczję'}
          />
        </View>
      )}
      {!!data.reviews.length && (
        <View style={styles.section}>
          <Text category={'h6'}>Wszystkie recenzje</Text>
          {data.reviews.map((review, index) => (
            <React.Fragment key={review.username}>
              <ListItem
                title={`${review.username}`}
                description={`${review.review}`}
              />
              {index !== data.reviews.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default BookDetailsScreen;

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
  header: {
    flexDirection: 'row',
  },
  image: {
    height: 200,
    width: 130,
    marginRight: 20,
  },
  select: {
    marginTop: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightHeaderSection: {
    flex: 1,
  },
  generalRateContainer: {
    marginTop: 20,
  },
  rateText: {
    marginBottom: 5,
  },
  inputTextStyle: {
    minHeight: 100,
  },
  inputStyle: {
    marginVertical: 15,
  },
  authorText: {
    marginTop: 5,
  },
});
