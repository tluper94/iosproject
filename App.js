import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import tw from './libs/TailwindConfig';
import Cart from './components/cart/Cart';
import Navbar from './components/navbar/Navbar';
import * as ScreenOrientation from 'expo-screen-orientation';
import SquareBtn from './components/squareBtn/SquareBtn';

//Icon imports
import {
  Food,
  Calendar,
  Clipboard,
  Waiter,
  PaperStack,
  BoxSearch,
  Search,
  Printer,
  DollarSign,
  SquareCheck,
  ThreeDots
} from './components/icons/Icons';
import { Icon } from '@rneui/themed';

export default function App() {
  const [navHeight, setNavHeight] = useState(0);

  const getNavHeight = e => {
    setNavHeight(e.nativeEvent.layout.height);
  };

  useEffect(() => {
    const changeScreenOrientation = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    };
    changeScreenOrientation();
  }, []);

  return (
    <View style={tw`bg-gray-black flex-1 flex-col`}>
      <Navbar getNavHeight={getNavHeight} />
      <Cart navHeight={navHeight} />
      <View style={tw`w-full mb-2 -z-1 h-59`} />
      <View style={tw`w-full flex-1 flex flex-row`}>
        <View
          style={tw`flex justify-center w-35 pl-2 pr-3 pt-1 mr-1 h-full bg-darkGrey`}
        >
          {greenBtns.map((btn, idx) => (
            <View key={idx + btn.title} style={tw`mb-2 `}>
              <SquareBtn {...btn} />
            </View>
          ))}
        </View>
        <View style={tw`flex-1 h-full bg-darkGrey`}></View>
        <View
          style={tw`flex justify-center w-32 px-1 mr-1  ml-1 h-full bg-darkGrey`}
        >
          {blueBtns.map((btn, idx) => (
            <View
              key={idx + Math.floor(Math.random() * 10000000)}
              style={tw`mb-2  `}
            >
              <SquareBtn {...btn} />
            </View>
          ))}
        </View>
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const greenBtns = [
  {
    title: 'New Order',
    color: '#44944A',
    icon: (
      <Food
        width={50}
        height={50}
        stroke="#e7e7e7"
        strokeWidth={1.9}
        fill="#e7e7e7"
      />
    ),
    width: 115,
    height: 92
  },
  {
    title: 'Status Filter',
    color: '#44944A',
    header: 'All',
    icon: (
      <Clipboard
        marginLeft={15}
        width={45}
        height={45}
        stroke="#e7e7e7"
        strokeWidth={10}
        fill="#e7e7e7"
      />
    ),
    width: 115,
    height: 92
  },
  {
    title: 'Server Filter',
    color: '#44944A',
    header: 'All',
    icon: (
      <Waiter
        width={45}
        height={45}
        stroke="#e7e7e7"
        strokeWidth={5}
        fill="#e7e7e7"
      />
    ),
    width: 115,
    height: 92
  },
  {
    title: 'Type Filter',
    color: '#44944A',
    header: 'All',
    icon: (
      <PaperStack
        width={45}
        height={45}
        stroke="#e7e7e7"
        strokeWidth={5}
        fill="#e7e7e7"
      />
    ),
    width: 115,
    height: 92
  },
  {
    title: 'Date Filter',
    color: '#44944A',
    header: 'All',
    icon: (
      <Calendar
        width={45}
        height={45}
        stroke="#e7e7e7"
        strokeWidth={10}
        fill="#e7e7e7"
      />
    ),
    width: 115,
    height: 92
  }
];

const blueBtns = [
  {
    color: '#4597F6',
    width: 115,
    height: 92,
    icon: (
      <View>
        <View
          style={{
            position: 'relative',
            marginTop: 12,
            zIndex: 1,
            marginRight: 10
          }}
        >
          <BoxSearch
            width={75}
            height={75}
            stroke="#e7e7e7"
            strokeWidth={2}
            fill="#e7e7e7"
          />
        </View>
        <View style={{ position: 'absolute', left: 30, top: 20 }}>
          <Search
            width={40}
            height={40}
            stroke="#e7e7e736"
            strokeWidth={1}
            fill="#e7e7e7c7"
          />
        </View>
      </View>
    )
  },
  {
    color: '#4597F6',
    width: 115,
    height: 92,
    icon: (
      <Printer
        marginTop={10}
        width={75}
        height={75}
        stroke="#e7e7e7"
        strokeWidth={5}
        fill="#e7e7e7"
      />
    )
  },
  {
    color: '#4597F6',
    width: 115,
    height: 92,
    icon: (
      <ThreeDots
        marginTop={15}
        width={65}
        height={65}
        stroke="#e7e7e7"
        fill="#e7e7e7"
      />
    )
  },
  {
    color: '#4597F6',
    width: 115,
    height: 92,
    icon: (
      <DollarSign
        marginTop={10}
        width={75}
        height={75}
        stroke="#e7e7e7"
        fill="#e7e7e7"
      />
    )
  },
  {
    color: '#4597F6',
    icon: (
      <SquareCheck
        marginTop={10}
        width={75}
        height={75}
        stroke="#e7e7e7"
        fill="#e7e7e7"
      />
    ),
    width: 115,
    height: 92
  }
];
