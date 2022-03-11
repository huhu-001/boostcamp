import React, {useContext, useEffect} from 'react';
import { RootStackNavigation } from '@/navigator/index';
import { Button, Text, View,StyleSheet } from 'react-native';

import  ScrollableTabView from '@/components/ScrollableTabView';
import OverView from './OverView';
import WorkOuts from './WorkOuts';
import {Banner} from '@/components/Banner'
import {useProgramDetail} from '@/hooks/useProgramDetail';
import {Route} from '@/interfaces/programfaceDetail'
import {Loading} from '@/components/Loading';

interface IProps {
  navigation: RootStackNavigation;
  route: Route;
}

const ProgramDetail = (props: IProps) => {

  useEffect(()=>{
    console.log(props)
  })

  const {data, isLoading} = useProgramDetail(props?.route?.params.id);
  const {banner, instructor, weeks} = data;

  // 点击事件
  const handlePress = () => {
    const { navigation } = props;
    
  };

  useEffect(()=>{
    console.log(props)
  })

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Banner banner={banner!} />
      <ScrollableTabView>
        <OverView tabLabel="OverView" instructor={instructor} />
        <WorkOuts tabLabel="WorkOuts" weeks={weeks} />
      </ScrollableTabView>
    </View>
  );
};

export default ProgramDetail;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#ffffff'
  },
  imageContainer: {
    width: '100%',
    height: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 9,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
})