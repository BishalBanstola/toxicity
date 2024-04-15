import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as qna from "@tensorflow-models/qna";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const QnA = () => {
  const [model, setModel] = useState(null);
  const [passage, setPassage] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const loadModel = async () => {
      const model = await qna.load();
      console.log(model)
      setModel(model);
    };

    loadModel();
  }, []);

  const handlePassageChange = (event) => {
    setPassage(event.target.value);
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleAnswerQuestion = async () => {
    if (model && passage.trim() !== "" && question.trim() !== "") {
      const answers = await model.findAnswers(question.trim(), passage.trim());
      console.log(answers)
      if (answers && answers.length > 0) {
        setAnswer(answers[0].text);
      } else {
        setAnswer("No answer found.");
      }
    }
  };

  return (
    <Container>
      <InputContainer>
        <textarea
          rows="10"
          cols="200"
          value={passage}
          onChange={handlePassageChange}
          placeholder="Enter the passage"
        />
      </InputContainer>
      <InputContainer>
        <input
          type="text"
          value={question}
          onChange={handleQuestionChange}
          placeholder="Enter your question"
        />
        <button onClick={handleAnswerQuestion}>Ask</button>
      </InputContainer>
      <p>{answer}</p>
    </Container>
  );
};
