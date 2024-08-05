/* Theory ============= Array
const array = new Array(1, 2, 3, 5, 20, 42);
// const array = [1, 2, 3, 5, 20, 42];
// const arrayString = ['a', 'b', 1, null]; // в массив можно положить любое значение не одного типа
// console.log(array.length); // длина массива
// console.log(array[1]); // получение значения из массива по индесу

const newArray = [];
console.log(newArray.length);
*/

/* Theory ================ Object
const person = {
    firstName: 'Anastasia',
    lastName: 'Lazarenko',
    birthYear: 1994,
    isProgrammer: true,
    languages: ['ru', 'en'],

    getFullName: function() {
        return person.firstName + ' ' + person.lastName;
    }
};

console.log(person['languages']);
const key = 'isProgrammer';
console.log(person[key]);
*/

/* textContent и innerHTML
textContent - это свойство, которое содержит только текстовое содержимое элемента, включая все его детей.
Оно не содержит HTML-разметку, только обычный текст.

innerHTML - это свойство, которое содержит как текстовое, так и HTML-содержимое элемента, включая всех его детей.
Оно может содержать HTML-теги, которые будут интерпретироваться браузером при отображении содержимого.
 */

/*
Метод insertAdjacentHTML - это метод в JavaScript, который позволяет вставлять HTML-разметку в элемент DOM в
определенной позиции относительно этого элемента.
Он принимает два аргумента: позицию вставки и строку с HTML-разметкой для вставки.
 */

const inputElement = document.getElementById('title');
const createBtn = document.getElementById('create');
const listElement = document.getElementById('list');
// function render() {
//     // for (const note of notes) {
//     //     listElement.insertAdjacentHTML('beforeend', getNoteTemplate(note));
//     // }
//     for (let i = 0; i < notes.length; i++) {
//         listElement.insertAdjacentHTML('beforeend', getNoteTemplate(notes[i]));
//     }
// }
//
// render();

const notes = [
    {
        title: 'Записать блог про массивы',
        isCompleted: false
    },
    {
        title: 'Рассказать теорию про объекты',
        isCompleted: true
    },
];

createBtn.onclick = function () {
    if (inputElement.value.length === 0) {
        // return undefined;
        return;
    }
    ;
    const newNote = {
        title: inputElement.value,
        isCompleted: false
    };
    // listElement.insertAdjacentHTML('beforeend', getNoteTemplate(newNote));
    notes.push(newNote);
    inputElement.value = '';
    render();
};

// function getNoteTemplate(title) {
//     return `<li class="list-group-item d-flex justify-content-between align-items-center">
//                 <span>${title}</span>
//                 <span>
//                     <span class="btn btn-small btn-success">&check;</span>
//                     <span class="btn btn-small btn-danger">&times;</span>
//                 </span>
//             </li>`;
// }

function render() {
    listElement.innerHTML = '';
    // for (const note of notes) {
    //     listElement.insertAdjacentHTML('beforeend', getNoteTemplate(note));
    // }
    if(notes.length == 0) {
        listElement.innerHTML = '<p>Нет заметок</p>';
    }
    for (let i = 0; i < notes.length; i++) {
        listElement.insertAdjacentHTML('beforeend', getNoteTemplate(notes[i], i));
    }
};

listElement.onclick = function (event) {
    // console.log(event.target);
    // console.log(event.target.dataset); // объект с атрибутами кликнутого поля
    if (event.target.dataset.index) {
        const index = Number(event.target.dataset.index);
        const type = event.target.dataset.type;

        console.log(index);
        console.log(type);
        if (type == 'toggle') {
            notes[index].isCompleted = !notes[index].isCompleted;
        } else if (type == 'remove') {
            notes.splice(index, 1)
        }

        render();
    }
}

function getNoteTemplate(note, index) {
    return `<li class="list-group-item d-flex justify-content-between align-items-center">
        <span class="${note.isCompleted ? 'text-decoration-line-through' : ''}">${note.title}</span>
        <span>
            <span class="btn btn-small btn-${note.isCompleted ? 'warning' : 'success'}" 
            data-index="${index}" data-type="toggle">&check;</span>
            <span class="btn btn-small btn-danger" data-index="${index}" data-type="remove">&times;</span>
        </span>
    </li>`;
};

render();