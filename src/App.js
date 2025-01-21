import './App.css';
import { useState } from 'react';

export default function App() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  return (
    <>
      <label htmlFor="top-text">Top text</label>
      <input
        id="top-text"
        value={topText}
        onChange={(event) => setTopText(event.currentTarget.value)}
      />{' '}
      <br />
      <label htmlFor="bottom-text">Bottom text</label>
      <input
        id="bottom-text"
        value={bottomText}
        onChange={(event) => setBottomText(event.currentTarget.value)}
      />
      <img
        src={`https://api.memegen.link/images/buzz/${topText}/${bottomText}.png`}
        alt="Generated Meme"
      />
    </>
  );
}
