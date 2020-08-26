import React, { useState } from "react";
import { StyleSheet, View, Text, ToastAndroid } from "react-native";
import { Input, Image, Button, Overlay } from "react-native-elements";
import DatePicker from "react-native-datepicker";
var login = require("./fetchs").login;
var registro = require("./fetchs").registro;
var hacerRegistro = require("./fetchs").hacerRegistro;

//React usando funciones
export default function App() {
  //Toast
  const showToast = (texto) => {
    ToastAndroid.show(texto, ToastAndroid.LONG);
  };
  //Variables
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [visible, toggleOverlay] = useState(false);
  const [opcion, setOpcion] = useState(1);
  const [date, setDate] = useState(new Date());
  const [token, setToken] = useState("");
  const [C1, setC1] = useState("");
  const [C2, setC2] = useState("");
  const [C3, setC3] = useState("");
  const [C4, setC4] = useState("");

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
      <Button
        buttonStyle={styles.button}
        onPress={() => {
          toggleOverlay(!visible);
          setOpcion(3);
        }}
        title="Agregar registro"
      />
      <Button
        buttonStyle={styles.button}
        onPress={() => {
          toggleOverlay(!visible);
          setOpcion(4);
          hacerRegistro(token, (res) => {
            if (res.message) {
              showToast("Token invalido");
            } else {
              if (res) {
                setC1(res.campo1);
                setC2(res.campo2);
                setC3(res.campo3);
                setC4(res.campo4);
                setDate(res.fecha);
              } else {
                showToast(res.resultado);
              }
            }
          });
        }}
        title="Ver ultimo registro"
      />
      <Text>{token}</Text>
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
              login(usuario, password, (res) => {
                if (res.token != "") {
                  showToast("Login exitoso");
                  setToken(res.token);
                  toggleOverlay(!visible);
                } else {
                  showToast("Login fallido");
                }
              });
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
            onChangeText={(value) => () => setUsuario(value)}
          />
          <Input
            leftIcon={{ type: "font-awesome", name: "lock" }}
            placeholder="Contraseña"
            secureTextEntry={true}
            onChangeText={(value) => () => setPassword(value)}
          />
          <Input
            leftIcon={{ type: "font-awesome", name: "lock" }}
            placeholder="Confirmar contraseña"
            secureTextEntry={true}
            onChangeText={(value) => () => setPassword2(value)}
          />
          <Button
            buttonStyle={styles.button}
            title="Registrar"
            onPress={() => {
              if (password != password2) {
                registro(usuario, password, (res) => {
                  if (res.resultado === "ok") {
                    toggleOverlay(!visible);
                  }
                  showToast(res.resultado);
                });
              } else {
                showToast("Las contraseñas no coinciden");
              }
            }}
          />
        </Overlay>
      )}
      {opcion == 3 && (
        <Overlay
          overlayStyle={styles.overlay}
          isVisible={visible}
          onBackdropPress={() => toggleOverlay(!visible)}
        >
          <Text style={styles.titulo}>Registro</Text>
          <Input
            placeholder="Campo 1"
            style={styles.button}
            onChangeText={(value) => setC1(value)}
          />
          <Input
            placeholder="Campo 2"
            style={styles.button}
            onChangeText={(value) => setC2(value)}
          />
          <Input
            placeholder="Campo 3"
            style={styles.button}
            onChangeText={(value) => setC3(value)}
          />
          <Input
            placeholder="Campo 4"
            style={styles.button}
            onChangeText={(value) => setC4(value)}
          />
          <DatePicker
            date={date}
            mode="date"
            placeholder="Elige una fecha"
            format="YYYY-MM-DD"
            minDate="2016-05-01"
            maxDate={date}
            confirmBtnText="Confirmar"
            cancelBtnText="Cancelar"
            onDateChange={(date) => {
              setDate(date);
            }}
          />
          <Button
            buttonStyle={styles.button}
            title="Registrar"
            onPress={() => {
              hacerRegistro(C1, C2, C3, C4, date.toString(), token, (res) => {
                if (res.message) {
                  showToast("Token invalido");
                } else {
                  if (res.resultado === "ok") {
                    toggleOverlay(!visible);
                    showToast("Registro dado de alta");
                  } else {
                    showToast(res.resultado);
                  }
                }
              });
            }}
          />
        </Overlay>
      )}
      {opcion == 4 && (
        <Overlay
          overlayStyle={styles.overlay}
          isVisible={visible}
          onBackdropPress={() => toggleOverlay(!visible)}
        >
          <Text style={styles.titulo}>Registro</Text>
          <Text>{C1}</Text>
          <Text>{C2}</Text>
          <Text>{C3}</Text>
          <Text>{C4}</Text>
          <Text>{date}</Text>
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
