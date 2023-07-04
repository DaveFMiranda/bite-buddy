let image_url;

const newFormHandler = async (event) => {
  event.preventDefault();

  // TO DO: update querySelectors to match names in the views. Also remove "needed funding"
  const headline = document.querySelector('#bite-headline').value.trim();
  // const needed_funding = document.querySelector('#project-funding').value.trim();
  const content = document.querySelector('#bite-content').value.trim();
  //photos
  // const image_url = document.querySelector('#bite-image_url').value.trim();
console.log(headline);
console.log(content);
  // Make sure the fetch route is accurate and make sure the fields after body: below match the model you're trying to update

  if (headline && content) {
    const response = await fetch(`/api/bites`, {
      method: 'POST',
      body: JSON.stringify({ headline, content, image_url }),
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
  event.preventDefault();

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

const uploadHandler = async (event) => {
  event.preventDefault();
  const fileInput = document.getElementById('bite-image_url');
  const formData = new FormData();
  formData.append('photo', fileInput.files[0]);
    if (fileInput.files.length) {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData

      })
      .then(response => {
        if (response.ok) {
          console.log('file sent to server');
          console.log(response);
return response.json();         
        } else {
          console.log('file failed to send to server');
        }
      })
      .then(data => {
        console.log(data);
         image_url = data.url;
        console.log(image_url);

      })
      .catch(error => {
        console.error(error);
      });
      
    }

};

// TO DO: make sure querySelectors match handlebars docs
document
  .querySelector('#new-bite')
  .addEventListener('click', newFormHandler);

document
  .querySelectorAll('.delete-list').forEach((button) => {
  button.addEventListener('click', delButtonHandler);
  });

  document
  .querySelector('#bite-image-form')
  .addEventListener('submit', uploadHandler);
