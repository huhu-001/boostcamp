/**
 * @ Author: dqhu
 * @ Create Time: 2022-03-10 15:54:27
 * @ Modified time: 2022-03-11 09:59:34
 * @ Description: 入口文件
 */

import {AppRegistry} from 'react-native';
import App from './src/index'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
