import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./infrastructure/navigation/navigation";
import { Home } from "./pages/home/home.pages";
import { Speech } from "./pages/speech-commands/speech.pages";
import { Toxicity } from "./pages/toxicity/toxicity.pages";
import { ImageClassification } from "./pages/image-classification/image-classification.pages";
import { QnA } from "./pages/home/qna/qna.pages";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="speech" element={<Speech />} replace={true} />
          <Route path="toxic" element={<Toxicity />} replace={true} />
          <Route path="image-classification" element={<ImageClassification />} replace={true} />
          <Route path="qna" element={<QnA />} replace={true} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
