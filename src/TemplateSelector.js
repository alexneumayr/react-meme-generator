import { useEffect, useState } from 'react';

export default function TemplateSelector(props) {
  useEffect(() => {
    fetch('https://api.memegen.link/templates/')
      .then((response) => response.json())
      .then((data) => {
        props.setTemplateList([
          ...new Map(data.map((v) => [v.id, v])).values(),
        ]);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <label htmlFor="template-input">Meme template</label>
      <input id="template-input" list="templates" />
      <datalist id="templates">
        {props.templateList.map((singleTemplate) => {
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
