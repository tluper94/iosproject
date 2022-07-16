import { LayoutAnimation, View, Text, StyleSheet } from 'react-native';
import { useRef, useEffect, useState } from 'react';
import tw from '../../libs/TailwindConfig';
import { Dimensions } from 'react-native';

const Cart = ({ navHeight }) => {
  const [pullDownHeight, setPullDownHeight] = useState(60);
  const [cartWidth, setCartWidth] = useState(0);

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

  return (
    <View
      onLayout={getCartWidth}
      style={tw`top-[${navHeight}px] px-1 pb-1 z-10 rounded-b-3xl absolute h-${pullDownHeight} w-full bg-primary`}
    >
      <View style={tw`flex flex-row w-full justify-end h-5`}>
        <View style={{ flexDirection: 'row', marginRight: cartWidth * 0.18 }}>
          <Text
            style={{ ...styles.cartTopLabel, marginRight: cartWidth * 0.06 }}
          >
            Unit Price
          </Text>

          <Text
            style={{ ...styles.cartTopLabel, marginRight: cartWidth * 0.04 }}
          >
            Quantity
          </Text>

          <Text
            style={{ ...styles.cartTopLabel, marginRight: cartWidth * 0.08 }}
          >
            Sub Total
          </Text>

          <Text style={{ ...styles.cartTopLabel }}>Discount</Text>
        </View>
      </View>
      <View style={tw`h-${pullDownHeight - 15} w-full bg-gray-white`}></View>
      <View
        style={tw`flex-1 flex flex-row justify-evenly items-center rounded-b-3xl w-full bg-gray-black `}
      >
        <View style={styles.cartLabelContainer}>
          <Text style={styles.cartLabel}>Sub Total:</Text>
          <Text style={styles.cartLabelAmount}>$0.00</Text>
        </View>

        <View style={styles.cartLabelContainer}>
          <Text style={styles.cartLabel}>Taxes:</Text>
          <Text style={styles.cartLabelAmount}>$0.00</Text>
        </View>

        <View style={styles.cartLabelContainer}>
          <Text style={styles.cartLabel}>Total:</Text>
          <Text style={styles.cartLabelAmount}>$0.00</Text>
        </View>

        <View style={styles.cartLabelContainer}>
          <Text style={styles.cartLabel}>Balance:</Text>
          <Text style={styles.cartLabelAmount}>$0.00</Text>
        </View>
      </View>
      <View
        onStartShouldSetResponder={() => true}
        onResponderMove={onMove}
        onResponderEnd={onMoveEnd}
        hitSlop={{ top: 25, bottom: 40, left: 40, right: 25 }}
        style={styles.arrow(cartWidth)}
      >
        <View style={styles.insideArrow}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  arrow: cartwidth => ({
    position: 'absolute',
    width: 200,
    height: 0,
    top: '100%',
    left: cartwidth * 0.5 - 100,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#4597F6',
    borderTopWidth: 10
  }),
  insideArrow: {
    position: 'relative',
    width: 185,
    height: 0,
    top: -7.5,
    left: -2,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'white',
    borderTopWidth: 5
  },
  cartLabelContainer: tw`flex flex-row`,
  cartLabel: tw`text-xl font-bold text-primary mr-4`,
  cartLabelAmount: tw`text-xl font-bold text-white mr-4`,
  cartTopLabel: tw`text-base font-bold text-white mr-4`
});

export default Cart;
