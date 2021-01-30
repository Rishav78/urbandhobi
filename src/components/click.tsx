import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

export interface ClickProps extends TouchableOpacityProps {

}

export const Clickable: React.FC<ClickProps> = ({
  children,
  ...rest
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      {...rest}>
        {children}
    </TouchableOpacity>
  );
};
