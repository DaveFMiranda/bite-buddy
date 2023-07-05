let image_url;

const newFormHandler = async (event) => {
  event.preventDefault();
  const headline = document.querySelector('#bite-headline').value.trim();
  const content = document.querySelector('#bite-content').value.trim();
  console.log(headline);
  console.log(content);

  if (headline && content) {
    const fileInput = document.getElementById('bite-image_url');
    const formData = new FormData();
    formData.append('photo', fileInput.files[0]);
    if (fileInput.files.length) {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      })
      if (response.ok) {
        const data = await response.json();
        console.log('file sent to server');
        image_url = data.url;
      } else {
        console.log('file failed to send to server');
      }
    };

    
    const biteResponse = await fetch(`/api/bites`, {
      method: 'POST',
      body: JSON.stringify({ headline, content, image_url }),
      headers: {
        'Content-Type': 'application/json',
      },
    });




    // Update alert below
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

