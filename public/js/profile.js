/*
const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#project-name').value.trim();
  const needed_funding = document.querySelector('#project-funding').value.trim();
  const description = document.querySelector('#project-desc').value.trim();

  if (name && needed_funding && description) {
    const response = await fetch(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify({ name, needed_funding, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);
*/

const deleteButtons = document.querySelectorAll('.delete-btn');

deleteButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const id = button.getAttribute('data-id');

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete post');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete post');
    }
  });
});

const commentButtons = document.querySelectorAll('.comment-btn');

commentButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const id = button.getAttribute('data-id');
    const postElement = button.closest('.post'); // find the parent post element

    const form = document.createElement('form');
    const textarea = document.createElement('textarea');
    textarea.name = 'comment';
    const submitButton = document.createElement('button');
    submitButton.innerText = 'Submit';

    form.appendChild(textarea);
    form.appendChild(submitButton);

    form.addEventListener('submit', async (event) => {
      event.preventDefault(); // prevent form submission from reloading the page

      const commentData = {
        comment: textarea.value,
        post_id: id,
      };

      try {
        const response = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify(commentData),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const comment = await response.json();

          // Add the new comment to the comments section
          const commentsSection = button.parentElement.querySelector('.comments');
          const commentElement = document.createElement('div');
          commentElement.innerText = `${comment.author}: ${comment.text}`;
          commentsSection.appendChild(commentElement);

          // Clear the form
          textarea.value = '';
          form.innerHTML = '';
        } else {
          alert('Failed to add comment');
        }
      } catch (err) {
        console.error(err);
        alert('Failed to add comment');
      }
    });

    postElement.appendChild(form);
  });
});
// When the edit button is clicked, it sends a PUT request to the server to update the associated post with new data, and updates the post on the client side if successful.

const editButton = document.querySelector('.edit-btn');

editButton.addEventListener('click', async () => {
  const postId = editButton.dataset.id;
  const updatedPostData = {
    title: 'New Title',
    content: 'New Content',
    // add more properties to update as needed
  };

  try {
    const response = await fetch(`/api/posts/${postId}/edit`, {
      method: 'PUT',
      body: JSON.stringify(updatedPostData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const post = await response.json();
      // update post on the client side with new data
      // e.g. update the post title, content, etc.
    } else {
      alert('Failed to update post');
    }
  } catch (err) {
    console.error(err);
    alert('Failed to update post');
  }
});