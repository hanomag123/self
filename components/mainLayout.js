import {GET} from '../const.js';

let taskList = [];
let cur = null;

const getData = async() => {
    const data = await fetch(GET);
    taskList = await data.json();
    localStorage.setItem('persons', JSON.stringify(taskList))
}

const renderData = () => {
    const container = document.querySelector('#container');
    console.log(taskList)
    container.innerHTML = `
    ${
        taskList.map(el => `<div class="cont" id="${el.id}"><div 
        class="${el.id ?? 'isDone'} 
        id="${el.id}"
        >
        ${el.id}
        ${el.name}
        </div>
        <p>${el.name}</p>
        <p>${el.fathername}</p>
        <p>${el.surname}</p>
        <p>${el.proffesion}</p>
        <img src="${el.img}"></div>`)
    }
    `
}

const newRenderData = () => {
    const container = document.querySelector('#container');
    taskList = JSON.parse(localStorage.getItem('persons'))
    container.innerHTML = `
    ${
        taskList.map(el => `<div class="cont" id="${el.id}"><div 
        class="${el.id ?? 'isDone'} 
        id="${el.id}"
        >
        ${el.id}
        ${el.name}
        </div>
        <p>${el.name}</p>
        <p>${el.fathername}</p>
        <p>${el.surname}</p>
        <p>${el.proffesion}</p>
        <img src="${el.img}"></div>`)
    }
    `
}
export const MainLayout = () => {
    getData().then(() => renderData())

    const container = document.createElement('div');
    container.id = 'container';
    
    return container;
}

document.addEventListener('click', find)

function find() {
    let modal = document.createElement('div')
    modal.classList.add('modal')
    if (event.target.closest('.cont')) {
    let ids = event.target.closest('.cont').id
    let arr = JSON.parse(localStorage.getItem('persons'));
    arr = arr.find(v => v.id === ids)
    console.log(arr)
    cur = arr;
    let newArr = document.querySelectorAll('.cont')
    newArr.forEach(v => v.remove())
    modal.innerHTML = `
        <input name="name" value="${arr.name}" readonly></input>
        <input name="fathername" value="${arr.fathername}" readonly></input>
        <input name="surname" value="${arr.surname}" readonly></input>
        <input name="proffesion" value="${arr.proffesion}" readonly></input>
        <button data-type="save">Save</button>
        <button data-type="edit">Edit</button>
        <img src="${arr.img}">
    `
    console.log(modal)
    document.body.appendChild(modal)
    } else if(event.target.dataset.type === 'save') {
        newRenderData()
        document.querySelector('.modal').remove()
    } else if(event.target.dataset.type === 'edit') {
        let input = document.querySelectorAll('input')
        input.forEach(v => {
            v.removeAttribute('readonly')
            v.addEventListener('change', edit)
        })
        
    }
}

function edit() {
    console.log(cur.id)
    console.log(event.target.value)
    console.log(event.target.name)
    let local = JSON.parse(localStorage.getItem('persons'))
    console.log(local)
    local.map(v => v.id === cur.id ? v[event.target.name] = event.target.value : v)
    localStorage.setItem('persons', JSON.stringify(local))
}