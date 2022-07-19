import { Dimensions } from 'react-native';
import { useState, useEffect } from 'react';

const useScreenOrientation = () => {
  const { width, height } = Dimensions.get('window');

  const intialOrientation = width < height ? 'portrait' : 'landscape';

  const [orientation, setOrientation] = useState(intialOrientation);

  useEffect(() => {
    const orientationChangeHandler = e => {
      const { width, height } = e.window;
      width < height ? setOrientation('portrait') : setOrientation('landscape');
    };
    const subsciption = Dimensions.addEventListener(
      'change',
      orientationChangeHandler
    );

    return () => subsciption.remove();
  }, []);

  return orientation;
};

export default useScreenOrientation;
