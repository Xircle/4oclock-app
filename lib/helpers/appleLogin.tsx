import React from "react";
import {
  AppleButton,
  appleAuth,
} from "@invertase/react-native-apple-authentication";

async function onAppleButtonPress() {
  // performs login request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  // get current authentication state for user
  // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
  const credentialState = await appleAuth.getCredentialStateForUser(
    appleAuthRequestResponse.user
  );

  // use credentialState response to ensure the user is authenticated
  if (credentialState === appleAuth.State.AUTHORIZED) {
    // user is authenticated
    // HY:::::log the user in this case
  }
}

export const AppleLoginButton = () => {
  return (
    <AppleButton
      buttonStyle={AppleButton.Style.WHITE}
      buttonType={AppleButton.Type.SIGN_IN}
      style={{
        width: 160, // You must specify a width
        height: 45, // You must specify a height
      }}
      onPress={() => onAppleButtonPress()}
    />
  );
};
