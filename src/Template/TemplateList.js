import { useEffect, useState } from 'react';

export function useTemplates() {
  const [templates, setTemplates] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/template')
      .then(response => {
        console.log(response);
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }

        return response.json();
      })
      .then(json => {
        setTemplates(json);
      })
      .catch(error => {
        console.error("Can't retrieve the templates", error);
        setError(error);
      });
  }, []);

  return { templates, error };
}

export default function TemplateList() {
  const { templates, error } = useTemplates();
  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Last save</th>
          </tr>
        </thead>
        <tbody>
          {error &&
            <tr>
              <td colSpan="3">Can't retrieve the templates</td>
            </tr>
          }
          {!error && templates.map(template =>
            <tr key={template.id}>
              <td>{template.name}</td>
              <td>{template.type}</td>
              <td>{template.savedate}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
