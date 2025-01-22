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

  function handleFormSubmit(event) {
    event.preventDefault();
    setTemplate(selectedTemplate);
    if (topText) {
      setMemeImageUrl(
        `https://api.memegen.link/images/${selectedTemplate}/${topText.replace('#', '~h').replace('?', '~q').replace('/', '~s')}/${bottomText.replace('#', '~h').replace('?', '~q').replace('/', '~s')}.png`,
      );
    }
  }

  function handleGenerateButtonClick() {
    if (topText) {
      setMemeImageUrl(
        `https://api.memegen.link/images/${selectedTemplate}/${topText.replace('#', '~h').replace('?', '~q').replace('/', '~s')}/${bottomText.replace('#', '~h').replace('?', '~q').replace('/', '~s')}.png`,
      );
    }
  }

  return (
    <div className="main">
      <div className="form-and-button">
        <form onSubmit={handleFormSubmit}>
          <div className="user-input">
            <label htmlFor="top-text-input-field">Top text</label>
            <input
              id="top-text-input-field"
              value={topText}
              onChange={(event) => setTopText(event.currentTarget.value)}
              required
            />
          </div>
          <br />
          <div className="user-input">
            <label htmlFor="bottom-text-input-field">Bottom text</label>
            <input
              id="bottom-text-input-field"
              value={bottomText}
              onChange={(event) => setBottomText(event.currentTarget.value)}
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
          <input type="submit" hidden />
        </form>
        <div className="button-area">
          <button
            data-test-id="generate-meme"
            onClick={handleGenerateButtonClick}
          >
            Generate
          </button>
          <DownloadImage url={memeImageUrl} fileName="meme.png" />
        </div>
      </div>
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
