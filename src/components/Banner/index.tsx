/**
 * @ Author: dqhu
 * @ Create Time: 2022-03-10 22:26:58
 * @ Modified time: 2022-03-10 22:32:40
 * @ Description:  详情banner图片
 */

import React from 'react';
import {Image, StyleSheet, View, Text, Dimensions} from 'react-native';
const screenWidth = Dimensions.get('screen').width;

interface Props {
  banner: string;
}

export const Banner = ({banner}: Props) => (
  <View style={styles.container}>
    {!!banner ? (
      <Image source={{uri: banner}} style={styles.image} />
    ) : (
      <View style={styles.image}>
        <Text>没有图片显示占位图</Text>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: screenWidth - 32,
    height: 180,
    backgroundColor: 'white',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'blue',
    borderWidth:1,
  },
});
