let image_url;
let bite_id;

const photoDeleteButton = async (event) => {
  event.preventDefault();

  const photoDelete = event.target.getAttribute('data-id');
  console.log(photoDelete);
  const response = await fetch(`/api/photos/${photoDelete}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert('Failed to delete photo');
  }
};

const addPhotoButton = async (event) => {
  event.preventDefault();


  const fileInput = document.getElementById('photo-add-input');
  fileInput.click();
  

fileInput.addEventListener('change', async (event) => {
  event.preventDefault();
  const formData = new FormData();

  formData.append('photo', fileInput.files[0]);
    // const selectedFile = event.target.files[0];
    // console.log(selectedFile);
  const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      const data = await response.json();
      console.log('file sent to server');
      image_url = data.url;
    } else {
      console.log('file failed to send to server');

    }
photoAddButton = document.getElementById('photo-add-button');
    bite_id = photoAddButton.getAttribute('data-id');
console.log(image_url);
console.log(bite_id);


    const newPhoto = await fetch(`/api/bites`, {
      method: 'POST',
      body: JSON.stringify({ image_url, bite_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (newPhoto.ok) {
      document.location.reload();
    } else {
      alert('Failed to add photo');
    }

  


})


};



// function for photo delete button
if (document.querySelector('#photo-delete')) {
  document
    .querySelector('#photo-delete')
    .addEventListener('click', photoDeleteButton);
}

document
.querySelector('#photo-add-button')
.addEventListener('click', addPhotoButton);