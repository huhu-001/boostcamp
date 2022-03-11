import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {ProgramItem}  from '@/components/ProgramItem';
import {Loading} from '@/components/Loading';
import { useProgram } from '@/hooks/useProgram';
import {RootStackNavigation} from '@/navigator/index';

interface IProps {
  navigation: RootStackNavigation;
}

const Program = (props: IProps) => {
  const {data, isLoading} = useProgram();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id.toString() + index}
        renderItem={({item}) => (
          <ProgramItem item={item} navigation={props.navigation} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Program;


const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center'
  }
})