import './App.css';
import { useState } from 'react';
import { DownloadImage } from './DownloadImage';
import TemplateSelector from './TemplateSelector';

export default function App() {
  const [topText, setTopText] = useState(''); // State of the top text
  const [bottomText, setBottomText] = useState(''); // State of the bottom text
  const [selectedTemplate, setSelectedTemplate] = useState('boat'); // State of the selected template
  const [templateList, setTemplateList] = useState([]); // State of the fetched template list
  const [memeImageUrl, setMemeImageUrl] = useState(
    "https://api.memegen.link/images/boat/let's_make/some_memes.png",
  ); // State of the image url

  // Form submit handler which prevents reloading of site and calls a function which leads to an updated memeImageUrl state
  function handleFormSubmit(event) {
    event.preventDefault();
    makeNewImage();
  }

  // Function that conditionally sets the setMemeImageUrl state
  function makeNewImage() {
    // Checks if there is a top text (otherwise the API doesn't work)
    if (topText) {
      // Sets the setMemeImageUrl according to the inputted values leading to a re-rendering
      // Also converts the characters #, ? and / to their escape characters in the top text and bottom text
      setMemeImageUrl(
        `https://api.memegen.link/images/${selectedTemplate}/${topText.replace('#', '~h').replace('?', '~q').replace('/', '~s')}/${bottomText.replace('#', '~h').replace('?', '~q').replace('/', '~s')}.png`,
      );
    }
  }

  return (
    <div className="main">
      <div className="form-and-button">
        <form onSubmit={handleFormSubmit}>
          {/* Top text input field and label */}
          <div className="user-input">
            <label htmlFor="top-text-input-field">Top text</label>
            <input
              id="top-text-input-field"
              value={topText}
              onChange={(event) => setTopText(event.currentTarget.value)}
              placeholder="Type in the top text (required)"
              required
            />
          </div>
          <br />
          {/* Bottom text input field and label */}
          <div className="user-input">
            <label htmlFor="bottom-text-input-field">Bottom text</label>
            <input
              id="bottom-text-input-field"
              value={bottomText}
              onChange={(event) => setBottomText(event.currentTarget.value)}
              placeholder="Type in the bottom text"
            />
          </div>
          <br />
          {/* TemplateSelector Component which enables the user to select a template */}
          <div className="user-input">
            <TemplateSelector
              templateList={templateList}
              setTemplateList={setTemplateList}
              setSelectedTemplate={setSelectedTemplate}
            />
          </div>
          {/* Hidden submit button to enable form submit when you press the Enter key */}
          <input type="submit" hidden />{' '}
        </form>
        <div className="button-area">
          {/* "Generate" button which triggers makeNewImage() */}
          <button
            data-test-id="generate-meme"
            onClick={() => {
              makeNewImage();
            }}
          >
            Generate
          </button>
          {/* "Download" button from the DownloadImage component */}
          <DownloadImage url={memeImageUrl} fileName="meme.png" />
        </div>
      </div>
      <br />
      <div className="image-area">
        {/* Shows the Meme image */}
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
