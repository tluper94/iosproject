import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import tw from './libs/TailwindConfig';
import Cart from './components/cart/Cart';
import Navbar from './components/navbar/Navbar';
import colors from './theme/colors';
import useScreenOrientation from './hooks/useScreenOrientaition';

export default function App() {
  const [navHeight, setNavHeight] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);

  const orientation = useScreenOrientation();

  const getNavHeight = e => {
    setNavHeight(e.nativeEvent.layout.height);
  };

  const getScreenInfo = async () => {
    const screenHeight = Dimensions.get('window').height;
    // const getOrientation = await ScreenOrientation.getOrientationLockAsync();
    // console.log(getOrientation);
    setScreenHeight(screenHeight);
    // setOrientation(getOrientation);
  };

  const orderViewPortrait = () => (
    <View style={portraitStyles.orderViewContainer(navHeight, screenHeight)}>
      <Cart />
      <View style={portraitStyles.orderNavContainer}>
        <View style={portraitStyles.categoryContainer}></View>
        <View style={portraitStyles.menuItemsContainer}></View>
      </View>
    </View>
  );

  const orderViewLandscape = () => (
    <View style={styles.orderViewContainer(navHeight, screenHeight)}>
      <Cart />
      <View style={styles.categoryContainer}></View>
      <View style={styles.menuItemsContainer}></View>
    </View>
  );

  const displayOrderView = () => {
    return orientation === 'portrait'
      ? orderViewPortrait()
      : orderViewLandscape();
  };

  return (
    <View onLayout={getScreenInfo} style={styles.App}>
      <Navbar getNavHeight={getNavHeight} />
      {displayOrderView()}
      <StatusBar style="light" />
    </View>
  );
}

const portraitStyles = StyleSheet.create({
  orderViewContainer: (navHeight, screenHeight) => ({
    flexDirection: 'column',
    height: screenHeight - navHeight,
    width: '100%'
  }),
  orderNavContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row'
  },
  categoryContainer: {
    height: '100%',
    width: '25%',
    backgroundColor: colors.darkGrey,
    marginRight: '.2%',
    borderWidth: 1,
    borderRadius: 18
  },
  menuItemsContainer: {
    flex: 1,
    backgroundColor: colors.darkGrey,
    marginRight: '.2%',
    borderWidth: 1,
    borderRadius: 18
  }
});

const styles = StyleSheet.create({
  App: {
    backgroundColor: colors.black,
    height: '100%',
    flexDirection: 'column'
  },
  orderViewContainer: (navHeight, screenHeight) => ({
    flexDirection: 'row',
    height: screenHeight - navHeight,
    width: '100%'
  }),
  categoryContainer: {
    height: '100%',
    width: '18%',
    backgroundColor: colors.darkGrey,
    marginRight: '.2%',
    borderWidth: 1,
    borderRadius: 18
  },
  menuItemsContainer: {
    flex: 1,
    backgroundColor: colors.darkGrey,
    borderWidth: 1,
    borderRadius: 18
  }
});
