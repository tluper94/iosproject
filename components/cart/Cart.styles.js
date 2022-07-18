import EStyleSheet from 'react-native-extended-stylesheet';
import { colors } from '../../theme/theme';

const getStyles = cartwidth => {
  return EStyleSheet.create({
    arrow: {
      position: 'absolute',
      width: 200,
      height: 0,
      top: '100%',
      left: cartwidth * 0.5 - 100,
      borderLeftWidth: 10,
      borderRightWidth: 10,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderTopColor: colors.primary,
      borderTopWidth: 10
    },
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
    cartLabelContainer: { flexDirection: 'row' },
    cartLabel: {
      fontSize: '1.25rem',
      lineHeight: '1.75rem',
      color: colors.primary,
      marginRight: 10
    },
    cartLabelAmount: {
      fontSize: '1.25rem',
      lineHeight: '1.75rem',
      fontWeight: '500',
      color: colors.white,
      marginRight: 10
    },
    cartTopLabel: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: 80
      // marginRight: '1rem'
    },
    cartLabelText: {
      fontSize: '1rem',
      lineHeight: '1.2rem',
      fontWeight: '600',
      color: colors.white
    }
  });
};

export default getStyles;
