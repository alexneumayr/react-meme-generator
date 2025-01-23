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

  // Function that sends a POST request to the API to get image url
  function requestImageURL() {
    fetch('https://api.memegen.link/images', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        /* Sends template id and texts as payload.
        Also converts the characters #, ? and / to their escape characters */
        template_id: selectedTemplate,
        text: [
          topText.replace('#', '~h').replace('?', '~q').replace('/', '~s'),
          bottomText.replace('#', '~h').replace('?', '~q').replace('/', '~s'),
        ],
      }),
    })
      .then(
        (response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Request failed!');
        },
        (networkError) => console.log(networkError.message),
      )
      .then((jsonResponse) => {
        // If request was successful it sets the memeImageUrl state accordingly
        setMemeImageUrl(jsonResponse.url);
      })
      .catch((error) => console.log(error));
  }

  // Form submit handler which prevents reloading of site and calls a function which leads to an updated memeImageUrl state
  function handleFormSubmit(event) {
    p;
    event.preventDefault();
    requestImageURL();
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
              placeholder="Type in the top text"
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
          <div className="button-area">
            {/* "Generate" button which triggers form submit */}
            <button data-test-id="generate-meme">Generate</button>
            {/* "Download" button from the DownloadImage component */}
            <DownloadImage url={memeImageUrl} fileName="meme.png" />
          </div>
        </form>
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
