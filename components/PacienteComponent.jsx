import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const opciones = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

export const PacienteComponent = ({
  email,
  date,
  id,
  editar,
  setOpen,
  borrar,
  paciente,
  setInfo,
}) => {
  // console.log(email);

  return (
    <Pressable onPress={() => setInfo({ paciente })}>
      <View style={styles.contenedor}>
        <Text style={styles.label}>Paciente: </Text>
        <Text style={styles.texto}>{email} ff</Text>
        <Text style={styles.fecha}>{date}</Text>

        <View style={styles.contenedorBtn}>
          <Pressable
            style={[styles.btn, styles.btnEditar]}
            onLongPress={() => {
              editar(id);
              setOpen(true);
            }}
          >
            <Text style={styles.btnText}>Editar</Text>
          </Pressable>

          <Pressable
            style={[styles.btn, styles.btnEliminar]}
            onLongPress={() => borrar(id)}
          >
            <Text style={styles.btnText}>Elimnar</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contenedor: { backgroundColor: '#fff', padding: 20 },
  label: { color: '#374151', textTransform: 'uppercase' },

  contenedorBtn: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  btn: {
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  btnText: {
    color: 'white',
    fontSize: 15,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },

  btnEditar: {
    backgroundColor: 'blue',
  },

  btnEliminar: {
    backgroundColor: 'red',
  },
});
