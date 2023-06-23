const newFormHandler = async (event) => {
  event.preventDefault();

  // TO DO: update querySelectors to match names in the views. Also remove "needed funding"
  const name = document.querySelector('#project-name').value.trim();
  const needed_funding = document.querySelector('#project-funding').value.trim();
  const description = document.querySelector('#project-desc').value.trim();

  // Make sure the fetch route is accurate and make sure the fields after body: below match the model you're trying to update
  if (name && needed_funding && description) {
    const response = await fetch(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify({ name, needed_funding, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Update alert below
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    // TO DO: make sure the route below is correct
    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    // TO DO: update alert
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

// TO DO: make sure querySelectors match handlebars docs
document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);
