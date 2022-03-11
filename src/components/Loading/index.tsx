/**
 * @ Author: dqhu
 * @ Create Time: 2022-03-10 21:40:26
 * @ Modified time: 2022-03-11 10:02:03
 * @ Description: 临时加载中的页面
 */

import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

export const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#00ff00" />
    <Text style={styles.loading}>
      加载中~
    </Text>
  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading:{
    fontSize:14,
    fontWeight:'bold',
    marginTop:6,
  },
});