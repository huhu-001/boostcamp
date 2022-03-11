/**
 * @ Author: dqhu
 * @ Create Time: 2022-03-10 16:29:19
 * @ Modified time: 2022-03-10 16:44:39
 * @ Description:
 */

import React from 'react';
import Navigator from '@/navigator/index';
import { StatusBar,View,Text } from 'react-native';

const Index = () => {
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />
      <Navigator/>
    </>
  );
};

export default Index;
