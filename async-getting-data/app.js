const filter = document.querySelector('#filter');
const listElement = document.querySelector('#list');
let USERS = [];

filter.addEventListener('input', (event) => {
    const value = event.target.value.toLowerCase();
    // const {value} = event.target;
    const filteredUsers = USERS.filter((user) => {
        return user.name.toLowerCase().includes(value);
    })
    render(filteredUsers);
})

async function start() {
    listElement.innerHTML = 'Loading...';
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        // console.log(response);
        const data = await response.json();
        // console.log(data);
        setTimeout(() => {
            USERS = data;
            render(data);
        }, 2000);
    } catch (error) {

    }
};

function render(users = []) {
    if(users.length === 0) {
        listElement.innerHTML = 'no matched users!'
    }else {
        const html = users.map(user => toHTML(user)).join(' ');
        listElement.innerHTML = html;
    }
};

function toHTML(user) {
    return `
        <li class="list-group-item">${user.name}</li>
    `;
};

start();