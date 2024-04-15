import React, { useState,useEffect } from "react";
import styled from "styled-components";
import * as speechCommands from '@tensorflow-models/speech-commands';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
  height: 50vh;
`;
const Title = styled.h2`
  margin-bottom: 20px;
  cursor: pointer;
`;
const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ isRecording }) => (isRecording ? '#ff3333' : '#00cc00')};
  }
`;

export const Speech = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedSpeech, setRecognizedSpeech] = useState('');
  const [recognizer, setRecognizer] = useState(null);

  // Load the speech recognition model when the component mounts
  useEffect(() => {
    async function loadSpeechModel() {
      const recognizer = speechCommands.create('BROWSER_FFT');
      await recognizer.ensureModelLoaded();
      setRecognizer(recognizer);
    }
    loadSpeechModel();
  }, []);

  const argMax=(arr)=>{
    return arr.map((x,i)=>[x,i]).reduce((r,a)=>(a[0]>r[0]?a:r))[1];
  }

  const startRecording = async () => {
    if (!recognizer) return;
    setIsRecording(true);
    setRecognizedSpeech('');

    try {
      await recognizer.listen(result => {
        const { scores } = result;
        const labels = recognizer.wordLabels();
        const indexOfMax = argMax(Object.values(scores))
        const label = labels[indexOfMax];
        setRecognizedSpeech(label);
      }, { includeSpectrogram: true, probabilityThreshold: 0.9 });
    } catch (error) {
      console.error('Error while recording:', error);
    }
  };

   // Stop recording when the "Record" button is clicked again
   const stopRecording = async () => {
    if (!recognizer) return;
    setIsRecording(false);
    await recognizer.stopListening();
  };

  return (
    <Container>
      <Button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </Button>
      <Title>Recognized Speech: {recognizedSpeech}</Title>
    </Container>
  );
};
