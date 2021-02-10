import React, { useCallback, useState } from "react";
import { StyleSheet, View, RefreshControl, ScrollViewProps } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export interface PullRefreshProps {
  onRefresh?: (cb: () => void) => void;
}

export interface RefreshScrollViewProps extends PullRefreshProps, ScrollViewProps {}

export const RefreshScrollView: React.FC<RefreshScrollViewProps> = ({
  children,
  onRefresh,
  ...scrollViewProps
}) => {

  const [refreshing, setRefreshing] = useState(false);

  const onRefreshHandler = useCallback(() => {
    console.log("nkknkn")
    if (onRefresh) {
      setRefreshing(true);
      onRefresh(onRefreshComplete);
    }
  }, []);

  const onRefreshComplete = () => {
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        {...scrollViewProps}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefreshHandler}
          />
        }
      >
        {children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});
