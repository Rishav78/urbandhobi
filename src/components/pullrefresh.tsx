import React, { useCallback, useState, memo } from "react";
import { StyleSheet, View, RefreshControl, ScrollViewProps, FlatList, FlatListProps, ScrollView, SectionList, SectionListProps, Alert } from "react-native";

export interface PullRefreshProps {
  onRefreshHandler?: (cb: (err?: Error) => void) => (Promise<void> | void);
}

export interface RefreshScrollViewProps extends PullRefreshProps, ScrollViewProps { }

export const RefreshScrollView: React.FC<RefreshScrollViewProps> = ({
  children,
  onRefreshHandler,
  ...scrollViewProps
}) => {

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    if (onRefreshHandler) {
      setRefreshing(true);
      onRefreshHandler(onRefreshComplete);
    }
  }, []);

  const onRefreshComplete = (err?: Error) => {
    setRefreshing(false);
    if (err) {
      Alert.alert(err.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        {...scrollViewProps}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {children}
      </ScrollView>
    </View>
  );
};

export const RefreshFlatList: React.FC<PullRefreshProps & FlatListProps<any>> = memo(({
  onRefreshHandler,
  ...flatlistprops
}) => {

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    if (onRefreshHandler) {
      setRefreshing(true);
      onRefreshHandler(onRefreshComplete);
    }
  }, []);

  const onRefreshComplete = (err?: Error) => {
    setRefreshing(false);
    if (err) {
      Alert.alert(err.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        {...flatlistprops}
        removeClippedSubviews={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
});

export const RefreshSectionList: React.FC<PullRefreshProps & SectionListProps<any>> = memo(({
  onRefreshHandler,
  ...flatlistprops
}) => {

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    if (onRefreshHandler) {
      setRefreshing(true);
      onRefreshHandler(onRefreshComplete);
    }
  }, []);

  const onRefreshComplete = (err?: Error) => {
    setRefreshing(false);
    if (err) {
      Alert.alert(err.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SectionList
        {...flatlistprops}
        removeClippedSubviews={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
});

const styles = StyleSheet.create({});
