const photoDeleteButton = async (event) => {
  event.preventDefault();

  const photoDelete = event.target.getAttribute('data-id');
  const response = await fetch(`/api/photos/${photoDelete}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert('Failed to delete photo');
  }
};

if (document.querySelector('#photo-delete')) {
  document
    .querySelector('#photo-delete')
    .addEventListener('click', photoDeleteButton);
}
