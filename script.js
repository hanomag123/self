import { App} from './components/App.js'
import {newRenderData as render} from './components/renderData.js'
if (localStorage.getItem('persons')){
    const container = document.createElement('div');
    container.id = 'container'
    document.body.appendChild(container)
    render()
} else {
        App();
    }
