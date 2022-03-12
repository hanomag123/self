import {GET} from '../const.js';
import {newRenderData, getData} from './renderData.js';
import edit from './edit.js';


let cur = null;



export const MainLayout = () => {
    // getData().then(() => newRenderData())
    if (localStorage.getItem('persons')) {
        getData().then(() => newRenderData())

        const container = document.createElement('div');
    container.id = 'container';
    
    return container;
    } else {
            getData().then(() => newRenderData())

        const container = document.createElement('div');
    container.id = 'container';
    
    return container;
    }

}

document.addEventListener('click', find)

function find() {
    let modal = document.createElement('div')
    modal.classList.add('modal')
    if (event.target.closest('.cont')) {
    let ids = event.target.closest('.cont').id
    let arr = JSON.parse(localStorage.getItem('persons'));
    arr = arr.find(v => v.id === ids)
    window.history.pushState({},'','/' + arr.id)
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
        window.history.pushState({},'','/main')
        document.querySelector('.modal').remove()
    } else if(event.target.dataset.type === 'edit') {
        let input = document.querySelectorAll('input')
        input.forEach(v => {
            v.removeAttribute('readonly')
            v.addEventListener('change', edit)
        })
        
    }
}

export {cur}