/**
 * @ Author: dqhu
 * @ Create Time: 2022-03-10 22:33:17
 * @ Modified time: 2022-03-11 09:06:28
 * @ Description: OverViewItem
 */

import React from 'react';
import {Image, StyleSheet, View,Dimensions, Text} from 'react-native';
const screenWidth = Dimensions.get('screen').width;
import {Instructor, DetailData} from '@/interfaces/programfaceDetail';

interface Props {
  instructor: Instructor;
}

export const OverViewItem = ({instructor}: Props) => {
  const {avatar = '', name = '', tagline=''} = instructor;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <View style={styles.content}>
        <Image style={styles.avatar} source={{uri: avatar}} />
        <View style={styles.rightContent}>
          <Text style={styles.des}>{tagline}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    width: screenWidth - 32,
    marginTop: 12,
    borderRadius: 8,
    minHeight: 120,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  content: {
    flexDirection: 'row',
    marginTop:4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: 'red',
  },
  rightContent: {
    flex: 1,
    marginLeft: 14,
  },
  des: {
    fontSize: 14,
  },
});
