const newFormHandler = async (event) => {
  event.preventDefault();

  // TO DO: update querySelectors to match names in the views. Also remove "needed funding"
  const headline = document.querySelector('#bite-headline').value.trim();
  // const needed_funding = document.querySelector('#project-funding').value.trim();
  const content = document.querySelector('#bite-content').value.trim();

  // Make sure the fetch route is accurate and make sure the fields after body: below match the model you're trying to update
  if (headline && content) {
    const response = await fetch(`/api/bites`, {
      method: 'POST',
      body: JSON.stringify({ headline, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Update alert below
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create bite entry');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    // TO DO: make sure the route below is correct
    const response = await fetch(`/api/bites/${id}`, {
      method: 'DELETE',
    });

console.log(id);

    // TO DO: update alert
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete bite entry');
    }
  }
};

// TO DO: make sure querySelectors match handlebars docs
document
  .querySelector('.new-bite-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.bite-list')
  .addEventListener('click', delButtonHandler);
