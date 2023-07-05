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
  console.log(newTitle);

  const oldContent = document.querySelector('#bite-content');
  const oldContentText = oldContent.textContent;
  const newContent = document.querySelector('#bite-content-update');
  oldContent.style.display = 'none';
  newContent.style.display = 'block';
  newContent.value = oldContentText;
  newContent.focus();
  console.log(newContent);

  const submitEditButton = document.querySelector('#edit-submit');
  submitEditButton.style.display = 'block';
  submitEditButton.addEventListener('click', editContentSubmission);
};

const editContentSubmission = async (event) => {
  event.preventDefault();
  const newContent = document.querySelector('#bite-content-update').value.trim();
  const newTitle = document.querySelector('#bite-title-update').value.trim();
  console.log(newContent);
  console.log(newTitle);


  if (newContent || newTitle) {
    let content = newContent;
    let headline = newTitle;
    console.log(content);
    console.log(headline);

    const response = await fetch(`/api/bites/${biteEdit}`, {
      method: 'POST',
      body: JSON.stringify({ headline, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(biteEdit);

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
  // commentEditId is the number of the comment here
  console.log(commentEditId);

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
  console.log(newContent);

  const submitEditButton = document.querySelector(
    `[data-id="${commentEditId}"]#eedit-submit`
  );
  submitEditButton.style.display = 'block';
  // Add data-id to editsubmit button here.
  submitEditButton.addEventListener('click', editCommentSubmission);
};

const editCommentSubmission = async (event) => {
  event.preventDefault();

  const button = event.target;
  const commentEditID = button.getAttribute('data-id');

  const newContent = document
    .querySelector(`[data-id="${commentEditID}"]#ebite-update`)
    .value.trim();
  console.log(newContent);

  if (newContent) {
    let content = newContent;
    console.log(content);

    const response = await fetch(`/api/comments/${commentEditID}`, {
      method: 'POST',
      body: JSON.stringify({ content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(commentEditID);

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
