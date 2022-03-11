import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  View,
  Animated,
  StyleSheet,
  ViewPropTypes,
} from 'react-native';
import TabBar from './TabBar';

export default class ScrollableTabView extends PureComponent {
  static TabBar = TabBar;

  scrollOnMountCalled = false;
  isGoingToPage = false;

  static defaultProps = {
    initialPage: 0,
    page: -1,
    onChangeTab: () => {},
    onClickTab: () => {},
  };

  static propTypes = {
    initialPage: PropTypes.number,
    page: PropTypes.number,
    onChangeTab: PropTypes.func,
    onClickTab: PropTypes.func,
  };

  constructor(props:any) {
    super(props);
    const containerWidth = Dimensions.get('window').width;
    let scrollValue;
    let scrollXIOS;
    scrollXIOS = new Animated.Value(this.props.initialPage * containerWidth);
    const containerWidthAnimatedValue = new Animated.Value(containerWidth);
    containerWidthAnimatedValue.__makeNative();
    scrollValue = Animated.divide(scrollXIOS, containerWidthAnimatedValue);

    this.state = {
      currentPage: this.props.initialPage,
      scrollValue,
      scrollXIOS,
      containerWidth,
      sceneKeys: this.newSceneKeys({currentPage: this.props.initialPage}),
    };
  }

  goToPage = (pageNumber: number) => {
    const offset = pageNumber * this.state.containerWidth;
    if (this.scrollView) {
      this.isGoingToPage = true;
      this.scrollView.scrollTo({
        x: offset,
        y: 0,
        animated: true,
      });
    }

    const currentPage = this.state.currentPage;
    this.updateSceneKeys({
      page: pageNumber,
      callback: this._onChangeTab.bind(this, currentPage, pageNumber),
    });
  };

  onClickTab = (pageNumber: any) => {
    this.props.onClickTab && this.props.onClickTab(pageNumber);
  };

  updateSceneKeys = ({
    page,
    children = this.props.children,
    callback = () => {},
  }) => {
    let newKeys = this.newSceneKeys({
      previousKeys: this.state.sceneKeys,
      currentPage: page,
      children,
    });
    this.setState({currentPage: page, sceneKeys: newKeys}, callback);
  };

  newSceneKeys = ({
    previousKeys = [],
    currentPage = 0,
    children = this.props.children,
  }) => {
    let newKeys = [];
    this._children(children).forEach((child, idx) => {
      let key = this._makeSceneKey(child, idx);
      if (
        this._keyExists(previousKeys, key) ||
        this._shouldRenderSceneKey(idx, currentPage)
      ) {
        newKeys.push(key);
      }
    });
    return newKeys;
  };

  _shouldRenderSceneKey = (idx: number, currentPageKey: number) => {
    return (
      idx < currentPageKey +  1 &&
      idx > currentPageKey -  1
    );
  };

  _keyExists = (sceneKeys: any[], key: string) => {
    return sceneKeys.find(sceneKey => key === sceneKey);
  };

  _makeSceneKey = (child: {}, idx: string | number) => {
    return child.props.tabLabel + '_' + idx;
  };

  renderScrollableContent() {
    const scenes = this._composeScenes();
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        automaticallyAdjustContentInsets={false}
        contentOffset={{x: this.props.initialPage * this.state.containerWidth}}
        ref={scrollView => {
          this.scrollView = scrollView;
        }}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: this.state.scrollXIOS}}}],
          {useNativeDriver: true, listener: this._onScroll},
        )}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        alwaysBounceVertical={false}
        keyboardDismissMode="on-drag"
        >
        {scenes}
      </Animated.ScrollView>
    );
  }

  _composeScenes = () => {
    return this._children().map((child, idx) => {
      let key = this._makeSceneKey(child, idx);
      return (
        <View
          key={child.key}
          shouldUpdated={this._shouldRenderSceneKey(
            idx,
            this.state.currentPage,
          )}
          style={{width: this.state.containerWidth}}>
          {this._keyExists(this.state.sceneKeys, key) ? (
            child
          ) : (
            <View tabLabel={child.props.tabLabel} />
          )}
        </View>
      );
    });
  };

  _updateSelectedPage = (nextPage: { nativeEvent: { position: any; }; }) => {
    let localNextPage = nextPage;
    if (typeof localNextPage === 'object') {
      localNextPage = nextPage.nativeEvent.position;
    }

    const currentPage = this.state.currentPage;
    this.updateSceneKeys({
      page: localNextPage,
      callback: this._onChangeTab.bind(this, currentPage, localNextPage),
    });
  };

  _onChangeTab = (prevPage: any, currentPage: string | number) => {
    this.props.onChangeTab({
      i: currentPage,
      ref: this._children()[currentPage],
      from: prevPage,
    });
  };

  _onScroll = (e: { nativeEvent: { contentOffset: { x: any; }; }; }) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    if (offsetX === 0 && !this.scrollOnMountCalled) {
      this.scrollOnMountCalled = true;
    }
  };


  _children = (children = this.props.children) => {
    return React.Children.map(children, child => child);
  };

  render() {
    let tabBarProps = {
      onClickTab: this.onClickTab,
      goToPage: this.goToPage,
      tabs: this._children().map(child => child.props.tabLabel),
      badges: this._children().map(child => child.props.tabBadge || 0),
      activeTab: this.state.currentPage,
      scrollValue: this.state.scrollValue,
      containerWidth: this.state.containerWidth,
    };
    return (
      <View style={styles.container}>
        <TabBar {...tabBarProps} />
        {this.renderScrollableContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
