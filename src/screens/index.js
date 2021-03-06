import {
  StackNavigator,
  TabNavigator,
} from 'react-navigation';
import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { HeaderBackButton, NavigationActions } from 'react-navigation';

import Router from '../router';

import ShelfScreen from './ShelfScreen';
import RecommandScreen from './RecommandScreen';
import RankingScreen from './RankingScreen';
import SettingScreen from './SettingScreen';

import BookScreen from './BookScreen';
import BookForum from './BookForum';

import { theme } from '../theme';

const options = (props) => {
  const { navigation, navigationOptions, screenProps } = props;
  if (navigation.state.index === 0) {
    return {
      headerStyle: theme.styles.navContainer,
      headerTitleStyle: theme.styles.navTitle,
    };
  }
  return {
    headerStyle: theme.styles.navContainer,
    headerTitleStyle: theme.styles.navTitle,
    headerLeft: (
      <HeaderBackButton
        title='返回'
        tintColor={theme.styles.navButton.color}
        onPress={() => {
          screenProps.router.goBack(navigation);
        }}
      />
    ),
  }
};

const BookTabNavigator = TabNavigator({
  Shelf: {
    screen: ShelfScreen,
  },
  Recommand: {
    screen: RecommandScreen,
  },
  Ranking: {
    screen: RankingScreen,
  },
  Setting: {
    screen: SettingScreen,
  },
}, {
  mode: 'screen',
  tabBarPosition: 'bottom',
});

const BookNavigator = StackNavigator({
  Info: {
    screen: BookScreen,
  },
  Forum: {
    screen: BookForum,
  },
}, {
  headerMode: 'screen',
  navigationOptions: options,
  initialRouteName: 'Info',
});

const MainNavigator = StackNavigator({
  Home: {
    screen: BookTabNavigator,
  },
  Book: {
    screen: BookNavigator,
    navigationOptions: (props) => {
      return {
        ...options(props),
        header: null,
      }
    },
  },
}, {
  mode: 'screen',
  headerMode: 'screen',
  navigationOptions: options,
  initialRouteName: 'Home',
});

const MainScreen = (props) => {
  return (
    <MainNavigator 
      screenProps={{
        ...props.screenProps,
        router: new Router(),
      }}
    />
  );
}

const TopNavigator = StackNavigator({
  Main: {
    screen: MainScreen,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: false,
  },
  initialRouteName: 'Main',
});

export default TopNavigator;