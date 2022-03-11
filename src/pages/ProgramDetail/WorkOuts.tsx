import React, {useContext, useEffect} from 'react';
import {Button, Text, View, StyleSheet, FlatList} from 'react-native';
import {WorkOutsItem} from '@/components/WorkOutsItem';
import {Week} from '@/interfaces/programfaceDetail';

interface Props {
  tabLabel: string;
  weeks:Week[];
}

const WorkOuts = ({weeks}: Props) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={weeks}
        keyExtractor={(item, index) => item.title + index}
        renderItem={({item}) => <WorkOutsItem week={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default WorkOuts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e2e2e2',
    alignItems: 'center',
  },
});
