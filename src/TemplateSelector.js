import { useEffect, useState } from 'react';

export default function TemplateSelector({ setTemplateList, templateList }) {
  useEffect(() => {
    fetch('https://api.memegen.link/templates/')
      .then((response) => response.json())
      .then((data) => {
        setTemplateList([...new Map(data.map((v) => [v.id, v])).values()]);
      })
      .catch((error) => console.log(error));
  }, [setTemplateList]);

  return (
    <>
      <label htmlFor="template-input">Meme template</label>
      <input id="template-input" list="templates" onChange={set/>
      <datalist id="templates">
        {templateList.map((singleTemplate) => {
          return (
            <option
              key={`template-${singleTemplate.id}`}
              value={singleTemplate.id}
            />
          );
        })}
      </datalist>
    </>
  );
}
