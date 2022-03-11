/**
 * @ Author: dqhu
 * @ Create Time: 2022-03-10 17:03:31
 * @ Modified time: 2022-03-11 09:49:47
 * @ Description:
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ViewPropTypes,
  StyleSheet,
  Text,
  View,
  Animated,
  Button,
  TouchableOpacity,
} from 'react-native';

export default class TabBar extends Component {
  static defaultProps = {
    activeTextColor: 'navy',
    inactiveTextColor: 'black',
    backgroundColor: null,
  };

  static propTypes = {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    backgroundColor: PropTypes.string,
    tabStyle: ViewPropTypes.style,
    renderTab: PropTypes.func,
    underlineStyle: ViewPropTypes.style,
  };

  renderTab = (name: {} | null | undefined, page: any, isTabActive: any, onPressHandler: (arg0: any) => void) => {
    const textColor = isTabActive ? "blue" : "red";
    const fontWeight = isTabActive ? 'bold' : 'normal';

    return (
      <TouchableOpacity
        style={{flex: 1}}
        onPress={() => onPressHandler(page)}>
        <View style={[styles.tab]}>
          <Text style={[{color: textColor, fontWeight}]}>
            {name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = 2;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 4,
      backgroundColor: 'navy',
      bottom: 0,
    };

    const translateX = this.props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, containerWidth / numberOfTabs],
    });
    return (
      <View
        style={styles.tabs}>
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page;
          const renderTab = this.props.renderTab || this.renderTab;
          return renderTab(name, page, isTabActive, this.props.goToPage);
        })}
        <Animated.View
          style={[tabUnderlineStyle,{transform: [{translateX}]}]}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ccc',
  },
})