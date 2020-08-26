import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Image, Button, Overlay, Tooltip } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//React usando funciones
export default function App() {
  //Variables
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [visible, toggleOverlay] = useState(false);
  const [opcion, setOpcion] = useState(1);
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Prueba</Text>
      <Image
        source={require("./assets/gato.png")}
        style={{ width: 200, height: 200 }}
      />
      <Button
        buttonStyle={styles.button}
        title="Login"
        onPress={() => {
          toggleOverlay(!visible);
          setOpcion(1);
        }}
      />
      <Button
        buttonStyle={styles.button}
        onPress={() => {
          toggleOverlay(!visible);
          setOpcion(2);
        }}
        title="Sign up"
      />
      {opcion == 1 && (
        <Overlay
          overlayStyle={styles.overlay}
          isVisible={visible}
          onBackdropPress={() => toggleOverlay(!visible)}
        >
          <Text style={styles.titulo}>Login</Text>
          <Input
            placeholder="Usuario"
            leftIcon={{ type: "font-awesome", name: "user" }}
            style={styles.button}
            onChangeText={(value) => setUsuario(value)}
          />
          <Input
            leftIcon={{ type: "font-awesome", name: "lock" }}
            placeholder="Contraseña"
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
          />
          <Button
            buttonStyle={styles.button}
            title="Entrar"
            onPress={() => {
              //toggleOverlay(!visible);
              setPassword(usuario + password);
            }}
          />
        </Overlay>
      )}
      {opcion == 2 && (
        <Overlay
          overlayStyle={styles.overlay}
          isVisible={visible}
          onBackdropPress={() => toggleOverlay(!visible)}
        >
          <Text style={styles.titulo}>Registro</Text>
          <Input
            placeholder="Usuario"
            leftIcon={{ type: "font-awesome", name: "user" }}
            style={styles.button}
            onChangeText={(value) => () => setComment(value)}
          />
          <Input
            leftIcon={{ type: "font-awesome", name: "lock" }}
            placeholder="Contraseña"
            secureTextEntry={true}
          />
          <Input
            leftIcon={{ type: "font-awesome", name: "lock" }}
            placeholder="Confirmar contraseña"
            secureTextEntry={true}
          />
          <Button
            buttonStyle={styles.button}
            title="Registrar"
            onPress={() => toggleOverlay(!visible)}
          />
        </Overlay>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 30,
    marginRight: 30,
  },
  button: {
    width: 300,
    marginBottom: 15,
    marginTop: 15,
  },
  overlay: {
    alignItems: "center",
    justifyContent: "center",
    width: 350,
  },
  titulo: {
    fontSize: 35,
  },
});
