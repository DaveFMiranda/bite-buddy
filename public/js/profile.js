



const uploadHandler = async (event) => {
  event.preventDefault();
  const image_url = document.querySelector('#bite-image_url');
  const image_files = image_url.files;
  console.log(image_files);
  if (image_files) {
    const uploadFile = () => {
      const file = image_files[0];
  
        if (file) {
          const fileRef = storageRef.child('images/' + file.name);
          fileRef.put(file)
          .then((snapshot) => {
            console.log('File uploaded');
          })
          .catch((error) => {
            console.error('Error uploading file', error);
  
          });
        }
  
    };
  uploadFile();
  };
};

const newFormHandler = async (event) => {
  event.preventDefault();

  const headline = document.querySelector('#bite-headline').value.trim();
  const content = document.querySelector('#bite-content').value.trim();
//photos


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

// TO DO: make sure querySelectors match handlebars docs
document
  .querySelector('.new-bite-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.delete-list')
  .addEventListener('click', delButtonHandler);

  document
  .querySelector('#bite-image_url')
  .addEventListener('change', uploadHandler);
