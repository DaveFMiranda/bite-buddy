const biteDeleteId = document.querySelector('#bite-delete');
const biteDelete = biteDeleteId.getAttribute('data-id');
console.log(biteDelete);

const delButtonHandler = async (event) => {
  event.preventDefault();

  const response = await fetch(`/api/bites/${biteDelete}`, {
    method: 'DELETE',
  });

  console.log(biteDelete);

  if (response.ok) {
    document.location.replace(`/profile`);
  } else {
    alert('Failed to delete bite entry');
  }
};

const photoDeleteButton = async (event) => {
  event.preventDefault();

  const photoDelete = event.target.getAttribute('data-id');
  console.log(photoDelete);
  const response = await fetch(`/api/photos/${photoDelete}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace(`/bites/${biteDelete}`);
  } else {
    alert('Failed to delete photo');
  }
};

document
  .querySelector('#bite-delete')
  .addEventListener('click', delButtonHandler);

// function for photo delete button
if (document.querySelector('#photo-delete')) {
  document
    .querySelector('#photo-delete')
    .addEventListener('click', photoDeleteButton);
}
