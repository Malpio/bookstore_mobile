import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Menu, MenuItem, IndexPath } from '@ui-kitten/components';
import Colors from '../styles/Colors';
import { useDispatch } from 'react-redux';
import { removeUserData } from '../store/userSlice';
import { UserRoleType } from '../types/api/UserType';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { NavigationProp } from '@react-navigation/native';
import { MoreNavigatorParamsType } from '../types/navigation/NavigationTypes';

const BookIcon = (props: any) => <Icon {...props} name="book-outline" />;

const ForwardIcon = (props: any) => (
  <Icon {...props} name="arrow-ios-forward" />
);

const LogoutIcon = (props: any) => <Icon {...props} name="log-out-outline" />;

const RemoveIcon = (props: any) => <Icon {...props} name={'trash-2-outline'} />;

type Props = {
  navigation: NavigationProp<MoreNavigatorParamsType>;
};

const MenuScreen: React.FC<Props> = ({ navigation }) => {
  const role = useSelector<RootState>(
    (state) => state.user.roles,
  ) as UserRoleType[];
  const dispatch = useDispatch();

  const isAdmin = role.includes('ROLE_ADMIN');

  return (
    <Menu
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      {isAdmin ? (
        <>
          <MenuItem
            style={styles.item}
            title="Dodaj książkę"
            accessoryLeft={BookIcon}
            accessoryRight={ForwardIcon}
            onPress={() => navigation.navigate('AddNewBookScreen')}
          />
          <MenuItem
            style={styles.item}
            title="Zarządzaj książkami"
            accessoryLeft={RemoveIcon}
            accessoryRight={ForwardIcon}
            onPress={() => navigation.navigate('ManageBookScreen')}
          />
        </>
      ) : (
        <></>
      )}
      <MenuItem
        style={styles.item}
        title="Wyloguj"
        accessoryLeft={LogoutIcon}
        onPress={() => dispatch(removeUserData())}
      />
    </Menu>
  );
};

export default MenuScreen;

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
  item: {
    marginBottom: 5,
  },
});
