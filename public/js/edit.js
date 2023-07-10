const biteEditId = document.querySelector('#bite-edit');
const biteEdit = biteEditId?.getAttribute('data-id');
const commentEditButtons = document.querySelectorAll('.edit-buttons');

const editButtonHandler = async (event) => {
  event.preventDefault();

  const oldTitle = document.querySelector('#bite-title');
  const oldTitleText = oldTitle.textContent;
  const newTitle = document.querySelector('#bite-title-update');
  oldTitle.style.display = 'none';
  newTitle.style.display = 'block';
  newTitle.value = oldTitleText;
  newTitle.focus();

  const oldContent = document.querySelector('#bite-content');
  const oldContentText = oldContent.textContent;
  const newContent = document.querySelector('#bite-content-update');
  oldContent.style.display = 'none';
  newContent.style.display = 'block';
  newContent.value = oldContentText;
  newContent.focus();

  const submitEditButton = document.querySelector('#edit-submit');
  submitEditButton.style.display = 'block';
  submitEditButton.addEventListener('click', editContentSubmission);
};

const editContentSubmission = async (event) => {
  event.preventDefault();
  const newContent = document
    .querySelector('#bite-content-update')
    .value.trim();
  const newTitle = document.querySelector('#bite-title-update').value.trim();

  if (newContent || newTitle) {
    let content = newContent;
    let headline = newTitle;

    const response = await fetch(`/api/bites/${biteEdit}`, {
      method: 'POST',
      body: JSON.stringify({ headline, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to edit bite entry');
    }
  }
};
const editCommentButtonHandler = async (event) => {
  event.preventDefault();
  const commentEditId = event.target.getAttribute('data-id');

  const oldContent = document.querySelector(
    `[data-id="${commentEditId}"]#ebite-content`
  );
  oldContentText = oldContent.textContent;
  const newContent = document.querySelector(
    `[data-id="${commentEditId}"]#ebite-update`
  );
  oldContent.style.display = 'none';
  newContent.style.display = 'block';
  newContent.value = oldContentText;
  newContent.focus();

  const submitEditButton = document.querySelector(
    `[data-id="${commentEditId}"]#eedit-submit`
  );
  submitEditButton.style.display = 'block';
  submitEditButton.addEventListener('click', editCommentSubmission);
};

const editCommentSubmission = async (event) => {
  event.preventDefault();
  const button = event.target;
  const commentEditID = button.getAttribute('data-id');
  const newContent = document
    .querySelector(`[data-id="${commentEditID}"]#ebite-update`)
    .value.trim();

  if (newContent) {
    let content = newContent;

    const response = await fetch(`/api/comments/${commentEditID}`, {
      method: 'POST',
      body: JSON.stringify({ content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to update comment entry');
    }
  }
};

if (biteEditId) {
  biteEditId.addEventListener('click', editButtonHandler);
}

if (commentEditButtons) {
  commentEditButtons.forEach((commentEditButton) => {
    commentEditButton.addEventListener('click', editCommentButtonHandler);
  });
}
