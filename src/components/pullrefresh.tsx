import React, { useCallback, useState, memo } from "react";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet, View, RefreshControl, ScrollViewProps, FlatList, FlatListProps, ScrollView, SectionList, SectionListProps, Alert } from "react-native";
import MessageTile from "./messageTile";

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
  data,
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
        data={data}
        ListHeaderComponent={(!data || data.length <= 0 ) ? <MessageTile style={styles.message} message="NO DATA" /> : <></>}
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
  sections,
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
        sections={sections}
        ListHeaderComponent={sections.length <= 0 ? <MessageTile style={styles.message} message="NO DATA IN THE CART" /> : <></>}
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

const styles = StyleSheet.create({
  message: {
    elevation: 10,
    backgroundColor: "#fff",
    marginTop: hp("1%"),
    paddingVertical: hp("2%"),
    marginHorizontal: wp("3%"),
    borderRadius: wp("2%"),
  },
});
