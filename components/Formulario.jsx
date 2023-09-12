import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const opciones = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

export const Formulario = ({
  paciente: pacienteEditar,
  setPaciente: setPacienteEditar,
  open,
  nuevaCita,
  setPacientes,
}) => {
  console.log(pacienteEditar);

  const [paciente, setPaciente] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [date, setDate] = useState(new Date());

  const [show, setShowDate] = useState(false);

  const handleCita = () => {
    if ([paciente, propietario, email, date, sintomas].includes('')) {
      console.log('Todos los campos son obligatorios');
      Alert.alert('Error', 'Todos los campos son obligatorios');

      return;
    }

    const nuevoPaciente = {
      paciente,
      propietario,
      email,
      telefono,
      sintomas,
      date: date.toLocaleDateString('es-ES', opciones),
      id: new Date(),
    };

    if (pacienteEditar.paciente) {
      setPacientes((prev) =>
        prev.map((item) =>
          item.id === pacienteEditar.id ? nuevoPaciente : item
        )
      );

      setPacienteEditar({});
      console.log(pacienteEditar, 'editancod');
    } else {
      setPacientes((prev) => [...prev, nuevoPaciente]);

      console.log('agregando');
    }

    setPaciente('');
    setPropietario('');
    setTelefono('');
    setSintomas('');
    setEmail('');
    // setDate(new Date());
    nuevaCita();
  };

  useEffect(() => {
    setPaciente(pacienteEditar.paciente);
    setEmail(pacienteEditar.email);
    setPropietario(pacienteEditar.propietario);
    setTelefono(pacienteEditar.telefono);
    setSintomas(pacienteEditar.sintomas);
    // setDate(pacienteEditar.date);
  }, [pacienteEditar]);

  return (
    <Modal animationType="slide" visible={open}>
      <SafeAreaView style={styles.contenido}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.container}
        >
          <ScrollView>
            <Text style={styles.titulo}>
              Nueva <Text style={styles.tituloBold}>Cita</Text>
            </Text>

            <Pressable
              style={styles.btnCancelar}
              onLongPress={() => {
                setPacienteEditar({});
                nuevaCita();
              }}
            >
              <Text style={styles.btnCancelarTexto}>X Cancelar</Text>
            </Pressable>

            <View style={styles.viewContenedor}>
              <Text style={styles.label}>Nombre Paciente</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre Paciente"
                placeholderTextColor="#666"
                value={paciente}
                onChangeText={setPaciente}
              />
            </View>
            <View style={styles.viewContenedor}>
              <Text style={styles.label}>Nombre Propietario</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre Propietario"
                placeholderTextColor="#666"
                value={propietario}
                onChangeText={setPropietario}
              />
            </View>
            <View style={styles.viewContenedor}>
              <Text style={styles.label}>Email Propietario</Text>
              <TextInput
                style={styles.input}
                placeholder="Email Propietario"
                placeholderTextColor="#666"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View style={styles.viewContenedor}>
              <Text style={styles.label}>Telefono Propietario</Text>
              <TextInput
                style={styles.input}
                placeholder="Telefono Propietario"
                placeholderTextColor="#666"
                keyboardType="number-pad"
                value={telefono}
                onChangeText={setTelefono}
              />
            </View>

            <View style={styles.viewContenedor}>
              <Text style={styles.label}>Fecha Alta</Text>

              {/* {show && ( */}
              {Platform.OS === 'ios' && (
                <View style={styles.fechaAlta}>
                  <RNDateTimePicker
                    mode="datetime"
                    value={date}
                    // minimumDate={date}
                    onChange={(e, selected) => {
                      setDate(selected);
                    }}
                    display="spinner"
                    locale="es-ES"
                  />
                </View>
              )}

              {Platform.OS === 'android' && (
                <>
                  <Pressable onPress={() => setShowDate(true)}>
                    <Text style={styles.input}>
                      {date.toLocaleDateString('es-ES', opciones)}
                    </Text>
                  </Pressable>

                  {show && (
                    <RNDateTimePicker
                      mode="date"
                      value={date}
                      onChange={(e, selected) => {
                        setShowDate(false);
                        setDate(selected);
                      }}
                      display="spinner"
                      locale="es-ES"
                      minimumDate={date}
                    />
                  )}
                </>
              )}
            </View>

            <View style={styles.viewContenedor}>
              <Text style={styles.label}>Telefono Propietario</Text>
              <TextInput
                style={[styles.input, styles.sintomas]}
                placeholder="Telefono Propietario"
                placeholderTextColor="#666"
                multiline={true}
                numberOfLines={4}
                value={sintomas}
                onChangeText={setSintomas}
              />
            </View>

            <Pressable
              style={styles.btnSubmit}
              // onLongPress={() => nuevaCita(false)}
              onPress={handleCita}
            >
              <Text style={styles.btnSubmitTexto}>Agregar Paciente</Text>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contenido: {
    backgroundColor: '#6d28d9',
    flex: 1,
  },

  container: {
    flex: 1,
  },

  titulo: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: '#fff',
  },

  tituloBold: {
    fontWeight: 'bold',
  },

  btnCancelar: {
    marginVertical: 20,
    marginHorizontal: 20,
    padding: 15,
    backgroundColor: '#5827a4',
    borderRadius: 10,
  },

  btnCancelarTexto: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },

  viewContenedor: {
    marginHorizontal: 20,
  },

  label: {
    color: '#fff',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: '600',
  },

  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },

  sintomas: {
    height: 100,
  },

  fechaAlta: {
    backgroundColor: '#fff',
    borderRadius: 20,
  },

  btnSubmit: {
    marginVertical: 50,
    backgroundColor: '#f59e0b',
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 10,
  },

  btnSubmitTexto: {
    color: '#5827a4',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});
