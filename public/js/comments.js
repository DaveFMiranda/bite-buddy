const submitId = document.querySelector('#comment-submit');
const biteId = submitId?.getAttribute('data-id');
const newCommentForm = document.getElementById('new-comment-form');

const newFormHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector('#comment-content').value.trim();

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

const delButtonHandler2 = async (event) => {
  event.preventDefault();

  const commentId = event.target.getAttribute('data-id');
  console.log(commentId);
  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace(`/bites/${biteId}`);
  } else {
    alert('Failed to delete comment');
  }
};

if (newCommentForm) {
  newCommentForm.addEventListener('submit', newFormHandler);
}

const commentDeleteButtons = document.querySelectorAll('.delete-buttons');
if (commentDeleteButtons) {
  commentDeleteButtons.forEach((commentDeleteButton) => {
    commentDeleteButton.addEventListener('click', delButtonHandler2);
  });
}
