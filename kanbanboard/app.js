const items = document.querySelectorAll('.item');
const placeholders = document.querySelectorAll('.placeholder');

for (const item of items) {
    item.addEventListener('dragstart', dragstart);
    item.addEventListener('dragend', dragend);
}


for (const placeholder of placeholders) {
    placeholder.addEventListener('dragover', dragover);
    placeholder.addEventListener('dragenter', dragenter);
    placeholder.addEventListener('dragleave', dragleave);
    placeholder.addEventListener('drop', dragdrop);
}

function dragstart(event) {
    event.target.classList.add('hold');
    setTimeout(() => event.target.classList.add('hide'), 0);
};

function dragend(event) {
    // event.target.classList.remove('hold', 'hide');
    event.target.className = 'item';
};

function dragover(event) {
    event.preventDefault();
};

function dragenter(event) {
    let item = getCurrenItem();
    if(event.target.parentElement.className === 'placeholder') {
        event.target.parentElement.childNodes.entries.apply(item)
    } else {
        event.target.childNodes.entries.apply(item)
    }
    // event.target.append(item)
    event.target.classList.add('hovered');
};

function dragleave(event) {
    event.target.classList.remove('hovered');
};

function dragdrop(event) {
    let item = getCurrenItem();

    event.target.parentElement.className === 'placeholder'
        ? event.target.parentElement.append(item)
        : event.target.append(item);
    // event.target.append(currentItem);
    event.target.classList.remove('hovered');
};

function getCurrenItem() {
    for (const item of items) {
        if(item.classList.contains('hide')) {
            return item;
        }
    }
};