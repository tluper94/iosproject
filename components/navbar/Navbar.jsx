import { Text, View } from 'react-native';
import tw from '../../libs/TailwindConfig';
import { Header, Icon } from '@rneui/themed';

const Navbar = ({ getNavHeight }) => {
  return (
    <View onLayout={getNavHeight} style={tw`pt-4 bg-gray-black`}>
      <Header
        backgroundColor="black"
        containerStyle={{ borderBottomColor: '#919191', marginBottom: 2 }}
        leftComponent={
          <View style={tw`flex flex-row items-center`}>
            <Icon
              style={tw`mr-5`}
              color="#2c7be5"
              type="entypo"
              name="menu"
              size={30}
            />
            <Text style={tw`text-primary text-lg`}>Simply POS</Text>
          </View>
        }
      />
    </View>
  );
};

export default Navbar;
