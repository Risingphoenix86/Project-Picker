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
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
};

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/projects/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete post');
        }
    }
};


document
    .querySelector('.project-list')
    .addEventListener('click', delButtonHandler);