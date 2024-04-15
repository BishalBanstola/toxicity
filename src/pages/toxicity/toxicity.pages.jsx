import React, { useState,useEffect } from "react";
import styled from "styled-components";
import * as toxicity from '@tensorflow-models/toxicity';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
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

export const Toxicity = () => {
  const [inputText, setInputText] = useState('');
  const [toxicityResult, setToxicityResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function checkToxicity() {
    setIsLoading(true);
    const model = await toxicity.load();
    const predictions = await model.classify(inputText);
    setToxicityResult(predictions);
    setIsLoading(false);
  }

  return (
    <Container>
    <Title>Toxicity Checker</Title>
    <textarea
      value={inputText}
      onChange={(e) => setInputText(e.target.value)}
      rows={4}
      cols={50}
      placeholder="Enter text to check toxicity..."
    ></textarea>
    <br />
    <Button onClick={checkToxicity} disabled={isLoading}>
      {isLoading ? 'Checking...' : 'Check Toxicity'}
    </Button>
    <br />
    {toxicityResult && (
      <div>
        <Title>Toxicity Result:</Title>
        {toxicityResult.map((prediction, index) => (
          <div key={index}>
            <p>{prediction.label}: {prediction.results[0].match ? 'Toxic' : 'Not Toxic'}</p>
          </div>
        ))}
      </div>
    )}
  </Container>
  );
};
