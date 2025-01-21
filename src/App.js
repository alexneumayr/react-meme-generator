import './App.css';
import { useState } from 'react';
import { DownloadImage } from './DownloadImage';
import TemplateSelector from './TemplateSelector';

export default function App() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
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

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="top-text-input">Top text</label>
        <input
          id="top-text-input"
          value={topText}
          onChange={handleTopTextChange}
        />
        <br />
        <label htmlFor="bottom-text-input">Bottom text</label>
        <input
          id="bottom-text-input"
          value={bottomText}
          onChange={handleBottomTextChange}
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
      <img src={memeImageUrl} alt="Generated Meme" data-test-id="meme-image" />
      <DownloadImage url={memeImageUrl} fileName="meme.png" />
    </>
  );
}
