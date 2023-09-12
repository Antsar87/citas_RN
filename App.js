import { useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Formulario, InfoComponent, PacienteComponent } from './components';

export default function App() {
  const [open, setOpen] = useState(false);
  const [pacientes, setPacientes] = useState([]);

  const [paciente, setPaciente] = useState({});
  const [info, setInfo] = useState({});

  const editar = (id) => {
    const data = pacientes.filter((item) => item.id === id);

    setPaciente(data[0]);
  };

  const borrar = (id) => {
    Alert.alert(
      'Deseas eliminar este paciente?',
      'Un paciente eliminado no se puede recuperar',
      [
        { text: 'Cancelar' },
        {
          text: 'Si, eliminar',
          onPress: () => {
            const data = pacientes.filter((item) => item.id !== id);

            setPacientes(data);
          },
        },
      ]
    );
  };

  const nuevaCita = () => {
    setOpen(!open);
  };

  // console.log(pacientes);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>
        Administradaor de Citas{' '}
        <Text style={styles.tituloBold}>Veterinaria</Text>
      </Text>

      {/* <Button title='Nueva Cita' onPress={() => {console.log("Presionado")}}/> */}
      <Pressable onPress={nuevaCita} style={styles.btnNuevaCita}>
        <Text style={styles.btnNuevaCitaTexto}>Nueva Cita</Text>
      </Pressable>

      <View style={styles.lista}>
        {pacientes.length === 0 ? (
          <Text style={styles.noPacientes}>No hay pacientes aun</Text>
        ) : (
          <FlatList
            data={pacientes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PacienteComponent
                {...item}
                editar={editar}
                setOpen={setOpen}
                borrar={borrar}
                setInfo={setInfo}
              />
            )}
          />
        )}
      </View>

      <InfoComponent setInfo={setInfo} info={info}/>

      <Formulario
        paciente={paciente}
        setPaciente={setPaciente}
        open={open}
        nuevaCita={nuevaCita}
        setPacientes={setPacientes}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#f3f4f6', flex: 1, paddingTop: 30 },

  titulo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#374151',
    fontWeight: '600',
  },

  tituloBold: {
    fontWeight: '900',
    color: '#6d28d9',
  },

  btnNuevaCita: {
    backgroundColor: '#6d28d9',
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10,
  },

  btnNuevaCitaTexto: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
    textTransform: 'uppercase',
  },

  noPacientes: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },

  lista: {
    marginHorizontal: 30,
    marginVertical: 40,
  },
});
