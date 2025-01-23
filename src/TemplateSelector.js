import { useEffect } from 'react';

export default function TemplateSelector({
  setTemplateList,
  templateList,
  setSelectedTemplate,
}) {
  // Fetches the templates array only once after the first render
  useEffect(() => {
    fetch('https://api.memegen.link/templates/')
      .then((response) => response.json())
      .then((data) => {
        /* Set templateList only with unique templates (the fetched templates array contains double-entries) */
        setTemplateList([...new Map(data.map((v) => [v.id, v])).values()]);
      })
      .catch((error) => console.log(error));
  }, [setTemplateList]);

  return (
    <>
      {/* Show input field for the Meme template with select dropdown menu */}
      <label htmlFor="template-input">Meme template</label>
      <input
        id="template-input"
        list="templates"
        onChange={(event) => setSelectedTemplate(event.currentTarget.value)}
        placeholder="Select template"
      />
      {/* Uses the value of the "id" property from the objects in the fetched templates array for the select dropdown menu */}
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
