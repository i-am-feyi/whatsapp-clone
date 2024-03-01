import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import Colors from "@/constants/Colors";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const Page = () => {
  const { phone, signin } = useLocalSearchParams<{
    phone: string;
    signin: string;
  }>();
  const [code, setCode] = useState("");
  const ref = useBlurOnFulfill({ value: code, cellCount: 6 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  useEffect(() => {
    if (code.length === 6) {
      if (signin === "true") {
        verifySigIin();
      } else {
        verifyCode();
      }
    }
  }, [code]);

  const verifyCode = async () => {};
  const verifySigIin = async () => {};
  const resendCode = async () => {};
  return (
    <>
      <Stack.Screen options={{ headerTitle: phone }} />
      <View style={styles.container}>
        <Text style={styles.legal}>
          We have sent you an SMS with a code to the number above.
        </Text>
        <Text style={styles.legal}>
          To complete your phone number verification, please enter the 6-digit
          activation code.
        </Text>

        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={code}
          onChangeText={setCode}
          cellCount={6}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <>
              <View
                key={index}
                style={[
                  styles.cellRoot,
                  index === 2 && styles.codeGapLeft,
                  index === 3 && styles.codeGapRight,
                  isFocused && styles.focusCell,
                ]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                <Text style={styles.cellText}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            </>
          )}
        />

        <TouchableOpacity style={styles.button} onPress={resendCode}>
          <Text style={styles.buttonText}>
            Didn't receive a verification code?
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.background,
    gap: 20,
  },
  legal: {
    color: Colors.gray,
    fontSize: 14,
    textAlign: "center",
  },
  button: {
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: Colors.primary,
  },
  codeFieldRoot: {
    marginTop: 20,
    width: 260,
    marginLeft: "auto",
    marginRight: "auto",
    gap: 8,
    justifyContent: "center",
  },
  codeGapLeft: {
    marginRight: 16,
  },
  codeGapRight: {
    marginLeft: 16,
  },
  cellRoot: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#ccc",
    borderBottomWidth: 3,
  },
  cellText: {
    color: "#000",
    fontSize: 36,
    textAlign: "center",
  },
  focusCell: {
    paddingBottom: 4,
    borderBottomColor: "#000",
    borderBottomWidth: 0,
  },
});
