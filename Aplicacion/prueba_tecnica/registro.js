import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Input, Button, Overlay } from "react-native-elements";
//React usando funciones
export default function registro(props) {
  //Variables
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [visible, toggleOverlay] = useState(props.visible);
  const [opcion, setOpcion] = useState(1);
  return (
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
