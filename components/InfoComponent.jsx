import React from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';

export const InfoComponent = ({ info, setInfo }) => {
  return (
    <Modal animationType="slide" visible={!!info?.paciente}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text>{info?.paciente}</Text>

          <Pressable onPress={() => setInfo({})}>
            <Text>Cerrar Modal</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#6d28d9',
    flex: 1,
  },
});
