import { View, Text, StyleSheet, FlatList } from 'react-native';
import colors from '../../theme/colors';
import { useState, useEffect } from 'react';

import { Dimensions } from 'react-native';

import cartData from '../../mockData';

import useScreenOrientation from '../../hooks/useScreenOrientaition';

const screenHeight = Dimensions.get('window').height;

const Cart = ({ navHeight }) => {
  const [cartWidth, setCartWidth] = useState(0);
  const [style, setStyle] = useState({});

  const orientation = useScreenOrientation();

  useEffect(() => {
    orientation === 'portrait' ? setStyle(portraitStyles) : setStyle(styles);
  }, [orientation]);

  const getCartWidth = e => {
    setCartWidth(e.nativeEvent.layout.width);
  };

  const displayTopLabels = () => {
    if (orientation === 'portrait') {
      return (
        <View style={{ flexDirection: 'row', marginRight: cartWidth * 0.14 }}>
          <View
            style={{
              width: cartWidth * 0.1,
              flexDirection: 'row',
              justifyContent: 'center',
              marginRight: cartWidth * 0.07
            }}
          >
            <Text style={style.topLabel}>Unit Price</Text>
          </View>
          <View
            style={{
              width: cartWidth * 0.1,
              flexDirection: 'row',
              justifyContent: 'center',
              marginRight: cartWidth * 0.07
            }}
          >
            <Text style={style.topLabel}>Quantity</Text>
          </View>
          <View
            style={{
              width: cartWidth * 0.1,
              flexDirection: 'row',
              justifyContent: 'center',
              marginRight: cartWidth * 0.05
            }}
          >
            <Text style={style.topLabel}>Subtotal</Text>
          </View>
          <View
            style={{
              width: cartWidth * 0.1,
              flexDirection: 'row',
              justifyContent: 'center'
            }}
          >
            <Text style={style.topLabel}>Discount</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ flexDirection: 'row', marginRight: cartWidth * 0.1 }}>
          <View
            style={{
              width: cartWidth * 0.2,
              flexDirection: 'row',
              justifyContent: 'center',
              marginRight: cartWidth * 0.07
            }}
          >
            <Text style={style.topLabel}>Qty</Text>
          </View>
          <View
            style={{
              width: cartWidth * 0.2,
              flexDirection: 'row',
              justifyContent: 'center'
            }}
          >
            <Text style={style.topLabel}>Subtotal</Text>
          </View>
        </View>
      );
    }
  };

  const getCartTotal = () => {
    const taxRate = 0.0625;
    const subTotal = cartData
      .map(({ price, quantity }) => price * quantity)
      .reduce((prev, curr) => prev + curr);
    const taxes = subTotal * taxRate;
    const total = subTotal + taxes;
    return {
      subTotal,
      total,
      taxes
    };
  };

  const Item = ({ item, price, quantity }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#a5a5a5',
          height: screenHeight * 0.07,
          paddingTop: screenHeight * 0.01,
          paddingLeft: cartWidth * 0.02
        }}
      >
        {orientation == 'portrait' ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              width: '100%'
            }}
          >
            <Text style={{ fontSize: 18, marginRight: 'auto' }}>{item}</Text>
            <View
              style={{ flexDirection: 'row', marginRight: cartWidth * 0.14 }}
            >
              <View
                style={{
                  width: cartWidth * 0.1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginRight: cartWidth * 0.07
                }}
              >
                <Text style={{ fontSize: 18 }}>${price}</Text>
              </View>
              <View
                style={{
                  width: cartWidth * 0.1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginRight: cartWidth * 0.07
                }}
              >
                <Text style={{ fontSize: 18 }}>{quantity}</Text>
              </View>
              <View
                style={{
                  width: cartWidth * 0.1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginRight: cartWidth * 0.05
                }}
              >
                <Text style={{ fontSize: 18 }}>
                  ${(price * quantity).toFixed(2)}
                </Text>
              </View>
              <View
                style={{
                  width: cartWidth * 0.1,
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}
              >
                <Text style={{ fontSize: 18 }}>0</Text>
              </View>
            </View>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              width: '100%'
            }}
          >
            <Text style={{ fontSize: 18, marginRight: 'auto' }}>{item}</Text>
            <View
              style={{ flexDirection: 'row', marginRight: cartWidth * 0.1 }}
            >
              <View
                style={{
                  width: cartWidth * 0.2,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginRight: cartWidth * 0.07
                }}
              >
                <Text style={{ fontSize: 18 }}>{quantity}</Text>
              </View>
              <View
                style={{
                  width: cartWidth * 0.2,
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}
              >
                <Text style={{ fontSize: 18 }}>
                  ${(price * quantity).toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };

  const renderItem = ({ item }) => <Item {...item} />;

  return (
    <View onLayout={getCartWidth} style={style.cartContainer}>
      <View style={style.topLabelsContainer}>{displayTopLabels()}</View>
      <View style={style.cartView}>
        <View style={{ height: '100%' }}>
          <FlatList
            data={cartData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
      <View style={style.cartFooter}>
        {orientation === 'portrait' ? (
          <>
            <View style={style.cartLabelContainer}>
              <Text style={style.cartLabel}>Sub Total:</Text>
              <Text style={style.cartLabelAmount}>
                ${getCartTotal().subTotal.toFixed(2)}
              </Text>
            </View>
            <View style={style.cartLabelContainer}>
              <Text style={style.cartLabel}>Taxes:</Text>
              <Text style={style.cartLabelAmount}>
                ${getCartTotal().taxes.toFixed(2)}
              </Text>
            </View>
            <View style={style.cartLabelContainer}>
              <Text style={style.cartLabel}>Total:</Text>
              <Text style={style.cartLabelAmount}>
                ${getCartTotal().total.toFixed(2)}
              </Text>
            </View>

            <View style={style.cartLabelContainer}>
              <Text style={style.cartLabel}>Balance:</Text>
              <Text style={style.cartLabelAmount}>$0.00</Text>
            </View>
          </>
        ) : (
          <View style={style.cartLabelContainer}>
            <Text style={style.cartLabel}>Total:</Text>
            <Text style={style.cartLabelAmount}>
              ${getCartTotal().total.toFixed(2)}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({
//   arrow: cartwidth => ({
//     position: 'absolute',
//     width: 200,
//     height: 0,
//     top: '100%',
//     left: cartwidth * 0.5 - 100,
//     borderLeftWidth: 10,
//     borderRightWidth: 10,
//     borderLeftColor: 'transparent',
//     borderRightColor: 'transparent',
//     borderTopColor: '#4597F6',
//     borderTopWidth: 10
//   }),
//   insideArrow: {
//     position: 'relative',
//     width: 185,
//     height: 0,
//     top: -7.5,
//     left: -2,
//     borderLeftWidth: 5,
//     borderRightWidth: 5,
//     borderLeftColor: 'transparent',
//     borderRightColor: 'transparent',
//     borderTopColor: 'white',
//     borderTopWidth: 5
//   },
//   cartLabelContainer: tw`flex flex-row`,
//   cartLabel: tw`text-xl font-bold text-primary mr-4`,
//   cartLabelAmount: tw`text-xl font-bold text-white mr-4`,
//   cartTopLabel: tw`text-base font-bold text-white mr-4`
// });

const portraitStyles = StyleSheet.create({
  cartContainer: {
    width: '100%',
    height: '40%',
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderRadius: 18,
    paddingLeft: '.6%',
    paddingRight: '.6%',
    paddingTop: '1%',
    paddingBottom: '.6%'
  },
  cartView: {
    width: '100%',
    flex: 1,
    backgroundColor: colors.white,
    borderTopEndRadius: 18,
    borderTopStartRadius: 18
  },
  cartFooter: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: colors.black,
    borderBottomEndRadius: 18,
    borderBottomStartRadius: 18
  },
  cartLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cartLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginRight: '.5%'
  },
  cartLabelAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: '1%'
  },
  orderNavContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row'
  },
  topLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  labelContainer: {
    flexDirection: 'row'
  },
  topLabel: {
    color: colors.white,
    fontSize: 18
  }
});

const styles = StyleSheet.create({
  cartContainer: {
    width: '100%',
    height: '88%',
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderRadius: 18,
    paddingLeft: '.6%',
    paddingRight: '.6%',
    paddingTop: '.09%',
    paddingBottom: '.6%',
    marginRight: '.2%'
  },
  cartView: {
    width: '100%',
    flex: 1,
    backgroundColor: colors.white,
    borderTopEndRadius: 18,
    borderTopStartRadius: 18
  },
  cartFooter: {
    width: '100%',
    height: '8%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: colors.black,
    borderBottomEndRadius: 18,
    borderBottomStartRadius: 18
  },
  cartLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '5%'
  },
  cartLabel: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
    marginRight: '1%'
  },
  cartLabelAmount: {
    fontSize: 23,
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: '1%'
  },
  orderNavContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row'
  },
  topLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  labelContainer: {
    flexDirection: 'row'
  },
  topLabel: {
    color: colors.white,
    fontSize: 20
  }
});

export default Cart;
