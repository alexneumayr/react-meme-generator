import './App.css';
import { useState } from 'react';
import { DownloadImage, DownloadLink } from './DownloadImage';
import TemplateSelector from './TemplateSelector';

export default function App() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [template, setTemplate] = useState('');
  const [templateList, setTemplateList] = useState([]);
  const [initialPreview, setInitialPreview] = useState(true);

  function handleFormSubmit(event) {
    event.preventDefault();
    setTemplate(selectedTemplate);
    if (initialPreview) {
      setInitialPreview(false);
    }
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
      {initialPreview ? (
        <img
          src={`https://api.memegen.link/images/boat/let's_make/some_memes.png`}
          alt="Generated Meme"
          data-test-id="meme-image"
        />
      ) : (
        <img
          src={`https://api.memegen.link/images/${template}/${topText}/${bottomText}.png`}
          alt="Generated Meme"
          data-test-id="meme-image"
        />
      )}
      <DownloadImage
        url="https://api.memegen.link/images/boat/let's_make/some_memes.png"
        fileName="meme.png"
      />
    </>
  );
}
