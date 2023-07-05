
const newFormHandler = async (event) => {
  event.preventDefault();
  const headline = document.querySelector('#bite-headline').value.trim();
  const content = document.querySelector('#bite-content').value.trim();
  console.log(headline);
  console.log(content);

  if (headline && content) {
    const fileInput = document.getElementById('bite-image_url');
    const image_url = [];


    console.log(fileInput.files.length);
    for (let i = 0; i<fileInput.files.length; i++){
      const formData = new FormData();

        formData.append('photo', fileInput.files[i]);

    if (fileInput.files.length) {
      
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        console.log('file ' + i + ' sent to server');
        image_url.push(data.url);
        console.log(image_url);
      } else {
        console.log('file ' + i + ' failed to send to server');
      }
    }

    };
    console.log(image_url);

    const biteResponse = await fetch(`/api/bites`, {
      method: 'POST',
      body: JSON.stringify({ headline, content, image_url }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (biteResponse.ok) {
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

document.querySelector('#new-bite').addEventListener('click', newFormHandler);

document.querySelectorAll('.delete-list').forEach((button) => {
  button.addEventListener('click', delButtonHandler);
});
