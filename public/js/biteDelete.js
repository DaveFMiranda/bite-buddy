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

document
  .querySelector('#bite-delete')
  .addEventListener('click', delButtonHandler);
