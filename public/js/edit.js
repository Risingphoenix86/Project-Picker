const editUserHandler = async function(event) {
    event.preventDefault();

    const usernameEl = document.getElementById('username');
    const emailEl = document.getElementById('email');

    fetch('/api/user/' + userId.value, {
        method: 'put',
        body: JSON.stringify({
            username: usernameEl.value,
            email: emailEl.value
        }),
        headers: { 'Content-Type': 'application/json'}
    })
    .then(function() {
        document.location.replace('/');
    })
    .catch(err => console.log(err));
}

document.querySelector('#edit-user').addEventListener("submit", editUserHandler);