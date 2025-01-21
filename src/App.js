import './App.css';
import { useState } from 'react';
import TemplateSelector from './TemplateSelector';

export default function App() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [templateList, setTemplateList] = useState([]);

  function handleFormSubmit(event) {
    event.preventDefault();
    setSelectedTemplate(templateList);
  }

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="top-text-input">Top text</label>
        <input
          id="top-text-input"
          value={topText}
          onChange={(event) => setTopText(event.currentTarget.value)}
        />
        <br />
        <label htmlFor="bottom-text-input">Bottom text</label>
        <input
          id="bottom-text-input"
          value={bottomText}
          onChange={(event) => setBottomText(event.currentTarget.value)}
        />
        <br />
        <TemplateSelector
          templateList={templateList}
          setTemplateList={setTemplateList}
          onChange={() => console.log('Changes')}
        />
        <input type="submit" hidden />
      </form>
      <br />
      <img
        src={`https://api.memegen.link/images/${selectedTemplate}/${topText}/${bottomText}.png`}
        alt="Generated Meme"
      />
    </>
  );
}
