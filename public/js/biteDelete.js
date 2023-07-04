const biteDeleteId = document.querySelector('#bite-delete');
const biteDelete = biteDeleteId?.getAttribute('data-id');

const delButtonHandler = async (event) => {
  event.preventDefault();

  const response = await fetch(`/api/bites/${biteDelete}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace(`/profile`);
  } else {
    alert('Failed to delete bite entry');
  }
};

if (biteDeleteId) {
  biteDeleteId.addEventListener('click', delButtonHandler);
};
