import {
  LayoutAnimation,
  View,
  FlatList,
  Text,
  StyleSheet
} from 'react-native';
import getStyles from './Cart.styles';
import { useEffect, useState } from 'react';
import Item from './Item';
import tw from '../../libs/TailwindConfig';
import { cart } from './MockData';

const Cart = ({ navHeight }) => {
  const [pullDownHeight, setPullDownHeight] = useState(60);
  const [cartWidth, setCartWidth] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [balance, setBalance] = useState(0);
  const [cartItems, setCartItems] = useState(cart);

  const styles = getStyles(cartWidth);

  useEffect(() => {
    const subTotal = cartItems
      .map(({ quantity, price }) => price * quantity)
      .reduce((prev, curr) => prev + curr);

    setSubtotal(subTotal);
    setTaxes(subTotal * 0.0625);
  }, [cartItems]);

  const onMove = e => {
    const height = pullDownHeight + e.nativeEvent.locationY * 0.1;
    if (height > 60) {
      setPullDownHeight(height);
    }
  };

  const onMoveEnd = e => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    if (e.nativeEvent.locationY <= 0) {
      setPullDownHeight(60);
    } else {
      setPullDownHeight(160);
    }
  };

  console.log(cartWidth * 0.02);

  const getCartWidth = e => {
    setCartWidth(e.nativeEvent.layout.width);
  };

  const renderItem = ({ item }) => <Item {...item} cartWidth={cartWidth} />;

  return (
    <View
      onLayout={getCartWidth}
      style={tw`top-[${navHeight}px] px-1 pb-1 z-10 rounded-b-3xl absolute h-${pullDownHeight} w-full bg-primary`}
    >
      <View style={tw`flex flex-row w-full content-center justify-end h-5`}>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
            height: '100%',
            marginRight: cartWidth * 0.18
          }}
        >
          <View
            style={{
              ...styles.cartTopLabel,
              marginRight: cartWidth * 0.06
            }}
          >
            <Text style={styles.cartLabelText}>Unit Price</Text>
          </View>
          <View
            style={{
              ...styles.cartTopLabel,
              marginRight: cartWidth * 0.04
            }}
          >
            <Text style={styles.cartLabelText}>Quantity</Text>
          </View>
          <View
            style={{
              ...styles.cartTopLabel,
              marginRight: cartWidth * 0.08
            }}
          >
            <Text style={styles.cartLabelText}>Sub Total</Text>
          </View>
          <View style={styles.cartTopLabel}>
            <Text style={styles.cartLabelText}>Discount</Text>
          </View>
        </View>
      </View>
      <View style={tw`h-${pullDownHeight - 15} w-full bg-gray-white`}>
        <FlatList
          data={cart}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      <View
        style={tw`flex-1 flex flex-row justify-evenly items-center rounded-b-3xl w-full bg-gray-black `}
      >
        <View style={styles.cartLabelContainer}>
          <Text style={styles.cartLabel}>Sub Total:</Text>
          <Text style={styles.cartLabelAmount}>${subtotal.toFixed(2)}</Text>
        </View>

        <View style={styles.cartLabelContainer}>
          <Text style={styles.cartLabel}>Taxes:</Text>
          <Text style={styles.cartLabelAmount}>${taxes.toFixed(2)}</Text>
        </View>

        <View style={styles.cartLabelContainer}>
          <Text style={styles.cartLabel}>Total:</Text>
          <Text style={styles.cartLabelAmount}>
            ${(+subtotal + +taxes).toFixed(2)}
          </Text>
        </View>

        <View style={styles.cartLabelContainer}>
          <Text style={styles.cartLabel}>Balance:</Text>
          <Text style={styles.cartLabelAmount}>
            ${(+subtotal + +taxes - +balance).toFixed(2)}
          </Text>
        </View>
      </View>
      <View
        onStartShouldSetResponder={() => true}
        onResponderMove={onMove}
        onResponderEnd={onMoveEnd}
        hitSlop={{ top: 25, bottom: 40, left: 40, right: 25 }}
        style={styles.arrow}
      >
        <View style={styles.insideArrow}></View>
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
//   cartTopLabel: tw` text-base font-bold text-white mr-4`
// });

export default Cart;
