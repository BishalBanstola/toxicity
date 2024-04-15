import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

export const ImageClassification = () => {
  const [model, setModel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [classificationResult, setClassificationResult] = useState("");

  useEffect(() => {
    const loadModel = async () => {
      const model = await mobilenet.load();
      setModel(model);
      setIsLoading(false);
    };

    loadModel();

    return () => {
      if (model) {
        model.dispose();
      }
    };
  }, []);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const img = document.createElement("img");
    const reader = new FileReader();
    reader.onload = async (e) => {
      img.src = e.target.result;
      img.onload = async () => {
        const tensor = tf.browser.fromPixels(img).toFloat();
        const result = await model.classify(tensor);
        setClassificationResult(result[0].className);
        tensor.dispose();
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <Container>
      {isLoading ? (
        <p>Loading Model...</p>
      ) : (
        <div>
            <p>Upload an image for classification</p>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <p>Result: {classificationResult}</p>
        </div>
      )}
    </Container>
  );
};

