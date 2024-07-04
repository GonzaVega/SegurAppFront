import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { oAuthCredentialsAndroid } from "../googleCredentials/oAuthCredentials";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// import GoogleAuth from "../Auth/GoogleAuth";
// import { GoogleSigninButton } from "@react-native-google-signin/google-signin";

WebBrowser.maybeCompleteAuthSession();

const Landing: React.FC = () => {
  const [userInfo, setUserInfo] = useState<any>(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: oAuthCredentialsAndroid,
  });

  console.log(
    "esto es request",
    request,
    "esto es response",
    response,
    "esto es promptAsync",
    promptAsync
  );

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    console.log("local user running");
    return JSON.parse(data);
  };

  const getUserInfo = async (token: any) => {
    if (!token) return;
    try {
      const response: any = await axios.get(
        "https://www.googleapis.com/userinfo/v2/me",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("GET to google running", response);

      const user = response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  const handleSignInWithGoogle = async () => {
    const user = await getLocalUser();
    if (!user) {
      if (response?.type === "success") {
        getUserInfo(response.authentication?.accessToken);
      }
      console.log("user present");
      console.log(user);
    } else {
      setUserInfo(user);
    }
  };

  const handleGoogleSignIn = () => {
    // Lógica para manejar la autenticación con Google
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a mi aplicación</Text>
      <View style={styles.formContainer}>
        <TextInput placeholder="Correo electrónico" style={styles.input} />
        <TextInput
          placeholder="Contraseña"
          secureTextEntry
          style={styles.input}
        />
        <Button title="Iniciar sesión" onPress={() => {}} />
        <View style={styles.googleButtonContainer}>
          {/* <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={handleGoogleSignIn}
          /> */}
          <Button
            title="Iniciar sesión con Google"
            disabled={!request}
            onPress={() => {
              promptAsync();
            }}
          />
        </View>
        {/* <GoogleAuth /> */}
        {userInfo != null && <View>{userInfo}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  formContainer: {
    width: "80%",
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "gray",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  googleButtonContainer: {
    marginTop: 20,
  },
});

export default Landing;
