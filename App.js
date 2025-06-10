import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

export default function App() {
  const [time, setTime] = useState(0); // milissegundos
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  const start = () => {
    if (!running) {
      setRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
  };

  const pause = () => {
    if (running) {
      clearInterval(intervalRef.current);
      setRunning(false);
    }
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setTime(0);
    setLaps([]);
  };

  const lap = () => {
    if (running) {
      setLaps((prevLaps) => [time, ...prevLaps]);
    }
  };

  const formatTime = (t) => {
    const minutes = Math.floor(t / 60000);
    const seconds = Math.floor((t % 60000) / 1000);
    const milliseconds = (t % 1000).toString().padStart(3, '0');
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${milliseconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatTime(time)}</Text>

      <View style={styles.buttons}>
        <TouchableOpacity onPress={start} style={styles.button}>
          <Text style={styles.buttonText}>Iniciar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={pause} style={styles.button}>
          <Text style={styles.buttonText}>Pausar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={reset} style={styles.button}>
          <Text style={styles.buttonText}>Reiniciar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={lap} style={[styles.button, !running && styles.disabledButton]}>
          <Text style={styles.buttonText}>Volta</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={laps}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Text style={styles.lapText}>Volta {laps.length - index}: {formatTime(item)}</Text>
        )}
        style={styles.lapList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 30,
    fontFamily: 'monospace',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    margin: 5,
  },
  disabledButton: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  lapList: {
    marginTop: 20,
    width: '100%',
  },
  lapText: {
    fontSize: 16,
    textAlign: 'left',
    marginVertical: 2,
    fontFamily: 'monospace',
  },
});
