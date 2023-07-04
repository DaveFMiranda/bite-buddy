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

// function for photo delete button
if (document.querySelector('#photo-delete')) {
  document
    .querySelector('#photo-delete')
    .addEventListener('click', photoDeleteButton);
}
