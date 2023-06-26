console.log('hello!');
const submitId = document.querySelector('#comment-submit');
const biteId = submitId.getAttribute('data-id');
console.log(biteId);
const biteEditId = document.querySelector('#bite-edit');
const biteEdit = biteEditId.getAttribute('data-id');
console.log(biteEdit);

const biteDeleteId = document.querySelector('#bite-delete');
const biteDelete = biteDeleteId.getAttribute('data-id');
console.log(biteDelete);
const commentId = document.querySelector('#comment-delete');

const newFormHandler = async (event) => {
  event.preventDefault();
  // TO DO: update querySelectors to match names in the views. Also remove "needed funding"
  // const needed_funding = document.querySelector('#project-funding').value.trim();
  const content = document.querySelector('#comment-content').value.trim();
  console.log(content);

  // Make sure the fetch route is accurate and make sure the fields after body: below match the model you're trying to update
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

const editButtonHandler = async (event) => {
  event.preventDefault();
  // TO DO: make sure the route below is correct
  
  
  const content = document.querySelector('#bite-content');
  const input = document.querySelector('#bite-update');
content.style.display = 'none';
input.style.display = 'block';
input.focus();
  console.log(content);
  console.log(input);

  const submitEditButton = document.querySelector('#edit-submit');
  submitEditButton.style.display = 'block';
  submitEditButton.addEventListener('click', editContentSubmission);
};

const editContentSubmission = async (event) => {
  event.preventDefault();
  const input = document.querySelector('#bite-update').value.trim();

if (input) {


  const response = await fetch(`/api/bites/${biteEdit}`, {
    method: 'POST',
    body: JSON.stringify({ input }),
      headers: {
        'Content-Type': 'application/json',
      },
  });

  console.log(biteEdit);

  if (response.ok) {
    // Change this to redirect to /profile
    document.location.replace(`/bites/${biteEdit}`);
  } else {
    alert('Failed to edit bite entry');
  }
};
};


const delButtonHandler = async (event) => {
  // TO DO: make sure the route below is correct
  const response = await fetch(`/api/bites/${biteDelete}`, {
    method: 'DELETE',
  });

  console.log(biteDelete);

  if (response.ok) {
    // Change this to redirect to /profile
    document.location.replace(`/profile`);
  } else {
    alert('Failed to delete bite entry');
  }
};

const delButtonHandler2 = async (event) => {
  const commentId = event.target.getAttribute('data-id');
  console.log(commentId);
  // TO DO: make sure the route below is correct
  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'DELETE',
  });

  // TO DO: update alert
  if (response.ok) {
    document.location.replace(`/bites/${biteDelete}`);
  } else {
    alert('Failed to delete comment');
  }
};

// TO DO: make sure querySelectors match handlebars docs
document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newFormHandler);


document
  .querySelector('#bite-edit')
  .addEventListener('click', editButtonHandler);


document
  .querySelector('#bite-delete')
  .addEventListener('click', delButtonHandler);

const commentDeleteButtons = document.querySelectorAll('.comment-list');
if (commentDeleteButtons) {
  commentDeleteButtons.forEach((commentDeleteButton) => {
    commentDeleteButton.addEventListener('click', delButtonHandler2);
  });
}
