const newFormHandler = async (event) => {
    event.preventDefault();

    const comment_text = document.querySelector('textarea[name="comment_text"]').value.trim();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment_text }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response);
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document
    .querySelector('.new-comment-form')
    .addEventListener('click', newFormHandler);