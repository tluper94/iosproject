import { View, Text, Pressable, StyleSheet } from 'react-native';

const SquareBtn = ({ header, icon, footer, color, width, height, title }) => {
  return (
    <Pressable style={styles.button(color, width, height)}>
      {header && (
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{header}</Text>
        </View>
      )}
      {icon}
      <Text style={styles.title}>{title}</Text>
      {footer && <Text>{footer}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: (color, width, height) => ({
    flexDirection: 'column',
    shadowColor: '#000000ad',
    shadowOffset: { width: 6, height: 5 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: color
  }),
  title: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white'
  },
  headerContainer: {
    width: '80%',
    backgroundColor: '#971a1a',
    borderRadius: 10,
    marginBottom: 2
  },
  header: {
    color: '#e2e2e2',
    textAlign: 'center',
    fontWeight: '600'
  }
});
export default SquareBtn;
