import { color } from '@rneui/base';
import { View, Text } from 'react-native';
import getStyles from './Cart.styles';

const styles = getStyles();

const Item = ({ price, item, discount, quantity, modifier, cartWidth }) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'flex-end',
      height: 50,
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: '#cfcfcf',
      paddingTop: 4
    }}
  >
    <Text
      style={{
        fontSize: 18.5,
        width: 150,
        fontWeight: '600',
        marginRight: 'auto',
        alignContent: 'center'
      }}
    >
      {item}
    </Text>
    <View
      style={{
        flexDirection: 'row',
        alignContent: 'center',
        height: '100%',
        marginRight: cartWidth * 0.18
      }}
    >
      <Text>M</Text>
      <View
        style={{
          ...styles.cartTopLabel,
          marginRight: cartWidth * 0.06
        }}
      >
        <Text style={{ ...styles.cartLabelText, color: 'black' }}>
          ${price}
        </Text>
      </View>
      <View
        style={{
          ...styles.cartTopLabel,
          marginRight: cartWidth * 0.04
        }}
      >
        <Text style={{ ...styles.cartLabelText, color: 'black' }}>
          {quantity}
        </Text>
      </View>
      <View
        style={{
          ...styles.cartTopLabel,
          marginRight: cartWidth * 0.08
        }}
      >
        <Text style={{ ...styles.cartLabelText, color: 'black' }}>
          ${(price * quantity).toFixed(2)}
        </Text>
      </View>
      <View
        style={{
          ...styles.cartTopLabel
        }}
      >
        <Text style={{ ...styles.cartLabelText, color: 'black' }}>
          {discount}
        </Text>
      </View>
    </View>
  </View>
);

export default Item;
