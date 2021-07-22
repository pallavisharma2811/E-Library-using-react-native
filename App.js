
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { RFValue } from "react-native-responsive-fontsize";

import TransactionScreen from './screens/TransactionsScreen';
import SearchScreen from './screens/SearchScreen';

export default class App extends React.Component {
  render() {
    return (

      <AppContainer />

    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Transactions: {
    screen: TransactionScreen, navigationOptions: {
      tabBarIcon:
        <Image
          source={require("./assets/book.png")}
          style={{
            width: RFValue(30),
            height: RFValue(30),
          }}
        />
    }
  },
  Search: {
    screen: SearchScreen, navigationOptions: {
      tabBarIcon:
        <Image
          source={require("./assets/searchingbook.png")}
          style={{
            width: RFValue(30),
            height: RFValue(30),
          }}
        />
    }
  }
})

const AppContainer = createAppContainer(TabNavigator)


