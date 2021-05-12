import React, { useCallback, useState, memo } from "react";
import {
  StyleSheet,
  View,
  RefreshControl,
  ScrollViewProps,
  FlatList,
  FlatListProps,
  ScrollView,
  SectionList,
  SectionListProps,
  Alert,
} from "react-native";
import MessageTile from "./messageTile";
import { globalStyles } from "@urbandhobi/lib/constants";

export interface PullRefreshProps {
  onRefreshHandler?: () => (Promise<void> | void);
}

export interface RefreshScrollViewProps extends PullRefreshProps, ScrollViewProps { }

export const RefreshScrollView: React.FC<RefreshScrollViewProps> = ({
  children,
  onRefreshHandler,
  ...scrollViewProps
}) => {

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    if (onRefreshHandler) {
      setRefreshing(true);
      try {
        await onRefreshHandler();
        console.log("complete");
      }
      catch (error) {
        Alert.alert(error.message);
      }
      finally {
        setRefreshing(false);
      }
    }
  }, []);

  return (
    <View style={styles.container}>
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

  const onRefresh = useCallback(async () => {
    if (onRefreshHandler) {
      setRefreshing(true);
      try {
        await onRefreshHandler();
        setRefreshing(false);
      }
      catch (error) {
        Alert.alert(error.message);
      }
    }
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        {...flatlistprops}
        data={data}
        ListHeaderComponent={(!data || data.length <= 0) ? <MessageTile style={globalStyles.message} message="NO DATA" /> : <></>}
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

  const isEmpty = !sections || sections.length === 0 || sections.filter(section => section.data.length !== 0).length === 0;

  const onRefresh = useCallback(async () => {
    if (onRefreshHandler) {
      setRefreshing(true);
      try {
        await onRefreshHandler();
        setRefreshing(false);
      }
      catch (error) {
        Alert.alert(error.message);
      }
    }
  }, []);

  return (
    <View style={styles.container}>
      {isEmpty ?
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          <MessageTile style={globalStyles.message} message="NO DATA IN THE CART" />
        </ScrollView> :
        <SectionList
          sections={sections}
          removeClippedSubviews={true}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          {...flatlistprops}
        />
      }
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
