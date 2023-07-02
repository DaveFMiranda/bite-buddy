console.log('hello!');
const submitId = document.querySelector('#comment-submit');
const biteId = submitId.getAttribute('data-id');
console.log(biteId);


const biteDeleteId = document.querySelector('#bite-delete');
const biteDelete = biteDeleteId.getAttribute('data-id');
console.log(biteDelete);







const newFormHandler = async (event) => {
  event.preventDefault();
 
  const content = document.querySelector('#comment-content').value.trim();
  console.log(content);

  if (content) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ content, biteId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(content, biteId);
    // Update alert below
    if (response.ok) {
      document.location.replace(`/bites/${biteId}`);
      console.log(biteId);
    } else {
      alert('Failed to create comment');
    }
  }
};


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

const delButtonHandler2 = async (event) => {
  event.preventDefault();

  const commentId = event.target.getAttribute('data-id');
  console.log(commentId);
  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace(`/bites/${biteDelete}`);
  } else {
    alert('Failed to delete comment');
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
  .querySelector('.new-comment-form')
  .addEventListener('submit', newFormHandler);


document
  .querySelector('#bite-delete')
  .addEventListener('click', delButtonHandler);



const commentDeleteButtons = document.querySelectorAll('.delete-buttons');
if (commentDeleteButtons) {
  commentDeleteButtons.forEach((commentDeleteButton) => {
    commentDeleteButton.addEventListener('click', delButtonHandler2);
  });
}
// function for photo delete button
if (document.querySelector('#photo-delete')) {
  document
    .querySelector('#photo-delete')
    .addEventListener('click', photoDeleteButton);
}