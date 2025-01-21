import './App.css';
import { useState } from 'react';
import TemplateSelector from './TemplateSelector';

export default function App() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [template, setTemplate] = useState('');
  const [templateList, setTemplateList] = useState([]);

  function handleFormSubmit(event) {
    event.preventDefault();
    setTemplate(selectedTemplate);
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
          setSelectedTemplate={setSelectedTemplate}
          onChange={() => console.log('Changes')}
        />
        <input type="submit" hidden />
      </form>
      <br />
      <img
        src={`https://api.memegen.link/images/${template}/${topText}/${bottomText}.png`}
        alt="Generated Meme"
      />
    </>
  );
}
