import './App.css';
import { useState } from 'react';
import { DownloadImage } from './DownloadImage';
import TemplateSelector from './TemplateSelector';

export default function App() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('boat');
  const [template, setTemplate] = useState('boat');
  const [templateList, setTemplateList] = useState([]);
  const [memeImageUrl, setMemeImageUrl] = useState(
    "https://api.memegen.link/images/boat/let's_make/some_memes.png",
  );

  function handleTopTextChange(event) {
    setTopText(event.currentTarget.value);
    setMemeImageUrl(
      `https://api.memegen.link/images/${template}/${event.currentTarget.value}/${bottomText}.png`,
    );
  }

  function handleBottomTextChange(event) {
    setBottomText(event.currentTarget.value);
    setMemeImageUrl(
      `https://api.memegen.link/images/${template}/${topText}/${event.currentTarget.value}.png`,
    );
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    setTemplate(selectedTemplate);
    setMemeImageUrl(
      `https://api.memegen.link/images/${selectedTemplate}/${topText}/${bottomText}.png`,
    );
  }

  function handleGenerateButtonClick() {
    setMemeImageUrl(
      `https://api.memegen.link/images/${template}/${topText}/${bottomText}.png`,
    );
  }

  return (
    <div className="main">
      <form onSubmit={handleFormSubmit}>
        <div className="user-input">
          <label htmlFor="top-text-input-field">Top text</label>
          <input
            id="top-text-input-field"
            value={topText}
            onChange={handleTopTextChange}
          />
        </div>
        <br />
        <div className="user-input">
          <label htmlFor="bottom-text-input-field">Bottom text</label>
          <input
            id="bottom-text-input-field"
            value={bottomText}
            onChange={handleBottomTextChange}
          />
        </div>
        <br />
        <div className="user-input">
          <TemplateSelector
            templateList={templateList}
            setTemplateList={setTemplateList}
            setSelectedTemplate={setSelectedTemplate}
          />
        </div>
        <div className="button-area">
          <button onClick={handleGenerateButtonClick}>Generate</button>
          <DownloadImage url={memeImageUrl} fileName="meme.png" />
        </div>
        <input type="submit" hidden />
      </form>
      <br />
      <div className="image-area">
        <img
          src={memeImageUrl}
          alt="Generated Meme"
          data-test-id="meme-image"
        />
        <br />
      </div>
    </div>
  );
}
