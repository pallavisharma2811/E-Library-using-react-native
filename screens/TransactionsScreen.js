import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import { RFValue } from "react-native-responsive-fontsize";

export default class TransactionScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasCameraPermissions: null,
      domState: "normal",
      scanned: false,
      scannedData: "",
      scannedStudentId: "",
      scannedBookId: "",
    };
  }

  getCameraPermission = async (domState) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      //granted is bool, true when allowed
      hasCameraPermissions: status === "granted",
      scanned: false,
      domState: domState,
    });
  };

  handleBarcodeScanned = async ({ type, data }) => {
    const { domState } = this.state;
    if (domState === "scannedBookId") {
      this.setState({
        scannedBookId: data,
        scanned: true,
        domState: "normal",
      });
    } else if (domState === "scannedStudentId") {
      this.setState({
        scannedStudentId: data,
        scanned: true,
        domState: "normal",
      });
    }

  };
  render() {
    const { hasCameraPermissions, domState, scanned, scannedData } = this.state;

    if (hasCameraPermissions && domState !== "normal") {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarcodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else {
      return (
        <View style={styles.container}>

          <View style={{ flexDirection: "row" }}>

            <TextInput
              value={this.state.scannedStudentId}
              placeholder="Student ID"
              onChangeText={(text) => { this.setState({ scannedStudentId: text }) }}
              style={styles.input}
              placeholderTextColor= "white"
            />
            <TouchableOpacity
              onPress={() => {
                this.getCameraPermission("scannedStudentId");
              }}
              style={styles.button}
            >
              <Text>Scan</Text>
            </TouchableOpacity>

          </View>

          <View style={{ flexDirection: "row" }}>

            <TextInput
              value={this.state.scannedBookId}
              placeholder="Book ID"
              onChangeText={(text) => { this.setState({ scannedBookId: text }) }}
              style={styles.input}
              placeholderTextColor= "white"
            />
            <TouchableOpacity
              onPress={() => {
                this.getCameraPermission("scannedBookId");
              }}
              style={styles.button}
            >
              <Text>Scan</Text>
            </TouchableOpacity>

          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15193c',
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "lightgreen",
    height: RFValue(40),
    width: RFValue(40),
    borderColor: 'white',
    borderWidth: RFValue(1),
    borderLeftWidth: 0,
    color: 'white',
    alignItems: "center",
    justifyContent: "center",
    marginTop: RFValue(20),
  },
  input: {
    marginTop: RFValue(20),
    height: RFValue(40),
    width: RFValue(100),
    borderColor: 'white',
    borderWidth: RFValue(1),
    paddingLeft: RFValue(10),
    borderRightWidth: 0,
    color: 'white',
    alignItems: "center",
    justifyContent: "center",
    color: "white"
  },
  submitButton: {
    width: RFValue(100),
    height: RFValue(30),
    backgroundColor: 'orange',
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    justifyContent: 'center',
    alignItems: "center",
    alignSelf: "center"
  },
});
