/**
 * @ Author: dqhu
 * @ Create Time: 2022-03-10 22:17:28
 * @ Modified time: 2022-03-11 09:33:46
 * @ Description:
 */

import React, {useContext, useEffect} from 'react';
import {RootStackNavigation} from '@/navigator/index';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import {OverViewItem} from '@/components/OverViewItem';
import {Instructor} from '@/interfaces/programfaceDetail';
import {postFetch, getFetch} from '@/request/index';

interface Props {
  tabLabel: string;
  instructor: Instructor;
}
/**
 * 
 * @param param0 
 * @returns 
 * 看文档 这里像是个列表，目前数据不太对，暂时这样显示
 */

const OverView = ({instructor}: Props) => {

  const onTestNetError=()=>{
      postFetch('/coach_program/workout/get', {}).then((response: any) => {
        console.log(response)
      });
  }

  return (
    <View style={styles.container}>
      <OverViewItem instructor={instructor} />
      <TouchableOpacity style={styles.button} onPress={onTestNetError}>
        <Text style={styles.buttonFont}>模拟网络错误请求</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OverView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e2e2e2',
    alignItems: 'center',
  },
  button: {
    width: 200,
    height: 60,
    borderRadius: 10,
    marginTop: 40,
    backgroundColor: 'yellow',
    justifyContent:'center',
    alignItems:'center'
  },
  buttonFont:{
    fontSize:16,
  },
});