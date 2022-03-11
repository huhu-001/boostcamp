/**
 * @ Author: dqhu
 * @ Create Time: 2022-03-10 22:33:17
 * @ Modified time: 2022-03-11 09:27:39
 * @ Description: WorkOutsItem
 */

import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  Text,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
const screenWidth = Dimensions.get('screen').width;
import {Week} from '@/interfaces/programfaceDetail';

interface Props {
  week: Week;
}

const up_image = require('../../assets/up_image.png');
const light = require('../../assets/light.png');
const temp_image = require('../../assets/temp_image.png');

export const WorkOutsItem = ({week}: Props) => {
  const [rotate, setRotate] = useState(new Animated.Value(0));
  const [callHeight, setCallHeight] = useState(new Animated.Value(0));
  const [isInReverseState, setIsInReverseState] = useState(false);
  const [switchIsOpen, setSwitchIsOpen] = useState(false);
  const {days = [], subTitle = '', title = ''} = week;

  // 按钮旋转
  const doRotate = () => {
    rotate.setValue(0);
    Animated.timing(rotate, {
      useNativeDriver: true,
      toValue: 1,
      duration: 150,
    }).start(() => {
      setIsInReverseState(true);
    });
  };

  // 恢复旋转
  const revertRotate = () => {
    rotate.setValue(1);
    Animated.timing(rotate, {
      useNativeDriver: true,
      toValue: 0,
      duration: 150,
    }).start(() => {
      setIsInReverseState(false);
    });
  };

  // 点击按钮展开或关闭
  const _executeTransYAnim = () => {
    let endHeight = 0;
    if (!switchIsOpen) {
        endHeight = 60 * days.length;
    }
    Animated.timing(callHeight, {
      toValue: endHeight,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver:false,
    }).start(() => {
      setSwitchIsOpen(!switchIsOpen);
    });
  };

  const _openOrCloseCell = () => {
    _executeTransYAnim();
    // 只有当按钮不处于翻转状态才执行动画
    if (!isInReverseState) {
      doRotate();
    } else {
      revertRotate();
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image style={styles.tipImage} source={light} />
        <View style={styles.center}>
          <Text style={styles.centerFont}>{title}</Text>
        </View>
        <TouchableOpacity onPress={_openOrCloseCell}>
          <Animated.Image
            style={[
              styles.upImage,
              {
                transform: [
                  {
                    rotate: rotate.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '180deg'],
                    }),
                  },
                ],
              },
            ]}
            source={up_image}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <Animated.View style={[styles.bottom, {height: callHeight}]}>
        {days.map((item, index) => (
          <View key={String(index)} style={styles.bottomItem}>
            <Image style={styles.tipImage} source={temp_image} />
            <View style={styles.center}>
              <Text style={styles.centerFont}>{item.title}</Text>
            </View>
            <View style={styles.startButton}>
              <Text style={styles.centerFont}>Start</Text>
            </View>
          </View>
        ))}
      </Animated.View>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    width: screenWidth - 32,
    marginTop: 12,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    overflow:'hidden'
  },
  tipImage: {
    height: 30,
    width: 30,
    backgroundColor: 'blue',
  },
  upImage: {
    height: 30,
    width: 30,
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 12,
  },
  centerFont: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottom: {
    backgroundColor:'#ffffff'
  },
  bottomItem: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  startButton: {
    width: 60,
    height: 40,
    borderRadius: 6,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
