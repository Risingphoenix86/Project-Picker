const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#project-name').value.trim();
    const content = document.querySelector('#project-desc').value.trim();

    if (title && content) {
      const response = await fetch(`/api/projects`, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/projects');
      } else {
        alert(response.statusText);
      }
    }
  };

    const addButtonHandler = async (event) => {
      if (event.target.hasAttribute('data-id')) {
          const id = event.target.getAttribute('data-id');
  
          const response = await fetch(`/api/projects/${id}`, {
              method: 'POST',
          });
  
          if (response.ok) {
              document.location.replace('/projects');
          } else {
              alert('Failed to render posts');
          }
      }
  };

  document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);