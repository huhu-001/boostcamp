import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
  StackNavigationProp,
} from '@react-navigation/stack';
import { Platform, StyleSheet } from 'react-native';
import {ProgramResponse} from '@/interfaces/programface';
import Program from '@/pages/Program'
import ProgramDetail from '@/pages/ProgramDetail';

export type RootStackParamsList = {
  Program: ProgramResponse;
  ProgramDetail: {
    id: string;
  };
};

export type RootStackNavigation = StackNavigationProp<RootStackParamsList>;

const Stack = createStackNavigator<RootStackParamsList>();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="float"
        screenOptions={{
          headerTitleAlign: 'center',
          // 设置安卓 头部导航 切换时使用ios效果
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
          // 设置安卓 主体导航 切换时使用ios效果
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          // 安卓使用滑动返回
          gestureEnabled: true,
          // 改变安卓返回手势的方向
          gestureDirection: 'horizontal',
          // 设置bar高度
          // headerStatusBarHeight: StatusBar.currentHeight,
          headerStyle: {
            ...Platform.select({
              android: {
                elevation: 0,
                borderBottomWidth: StyleSheet.hairlineWidth,
              },
            }),
          },
        }}>
        <Stack.Screen
          name="Program"
          options={{ title: '首页' }}
          component={Program}
        />
         <Stack.Screen
          name="ProgramDetail"
          options={{ title: '详情页' }}
          component={ProgramDetail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
