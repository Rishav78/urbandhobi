import React from "react";
import AddressView from "@urbandhobi/components/address/Address";
import { Modal, ModalProps } from "react-native";
import { Address } from "@urbandhobi/@types";

export interface AddressPickerProps extends ModalProps {
  onSelect: (address: Address) => void;
}

export const AddressPicker: React.FC<AddressPickerProps> = ({ onSelect, children, ...rest }) => {
  return (
    <Modal {...rest}>
      <AddressView onSelect={onSelect} mode="select" />
    </Modal>
  );
};
