import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Item} from '@/interfaces/programface';
import {RootStackNavigation} from '@/navigator/index';
const screenWidth = Dimensions.get('screen').width;

interface Props {
  item: Item;
  navigation: RootStackNavigation;
}

export const ProgramItem = ({item, navigation}: Props) => {

  // 点击事件
  const goProgramDetail = () => {
    navigation.navigate('ProgramDetail', {id:item.id});
  };

  return (
    <TouchableOpacity style={styles.container} onPress={goProgramDetail}>
      {item?.banner ? (
        <Image source={{uri: item?.banner}} style={styles.image} />
      ) : (
        <View style={styles.image}>
          <Text>没有图片显示占位图</Text>
        </View>
      )}
      <View style={styles.content}>
        <View style={styles.titleView}>
          <Text style={styles.leftTitle}>{item?.difficulty}</Text>
          <Text style={styles.rightTitle}>{item?.equipments}</Text>
        </View>
        <Text style={styles.centerFont}>{item?.tagline}</Text>
        <View style={styles.contentBottom}>
          {item?.weekdays.map((element, index) => (
            <View key={String(index)} style={styles.item}>
              <Text style={styles.itemFont}>{element}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth - 32,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginTop: 15,
    paddingBottom:16
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: 'white',
    borderRadius: 4,
    borderColor: 'blue',
    borderWidth: 2,
    justifyContent:'center',
    alignItems:'center'
  },
  content: {
    width: '100%',
    marginTop: 10,
  },
  titleView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  leftTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  actorInfo: {
    marginLeft: 10,
    marginTop: 4,
  },
  centerFont:{
    marginLeft:10,
    marginTop:8
  },
  contentBottom: {
    flexDirection: 'row',
    marginTop:20,
    flexWrap:'wrap',
  },
  item: {
    height: 26,
    backgroundColor: '#000000',
    borderRadius: 4,
    marginLeft:10
  },
  itemFont:{
    fontSize:14,
    color:'#ffffff',
    paddingHorizontal:10,
    paddingVertical:4,
  }
});
function params(arg0: string, params: any, arg2: { id: number; }) {
    throw new Error('Function not implemented.');
}

