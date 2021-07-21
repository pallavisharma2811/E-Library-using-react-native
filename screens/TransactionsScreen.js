import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

export default class TransactionScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasCameraPermissions: null,
      domState: "normal",
      scanned: false,
      scannedData: "",
    };
  }

  getCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      //granted is bool, true when allowed
      hasCameraPermissions: status === "granted",
      scanned: false,
      domState: "scanner",
    });
  };

  handleBarcodeScanned = async ({ type, data }) => {
    this.setState({
      scannedData: data,
      scanned: true,
      domState: "normal",
    });
  };
  render() {
    const { hasCameraPermissions, domState, scanned, scannedData } = this.state;

    if (hasCameraPermissions && domState === "scanner") {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarcodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>
            {hasCameraPermissions ? scannedData : "Request Camera Permission"}
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.getCameraPermission();
            }}
          >
            <Text>Scan QR Code</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "lightgreen",
    width: 50,
    height: 30,
  },
});
