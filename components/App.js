import { MainLayout } from "./mainLayout.js";

export const App = () => {
    const container = document.createElement('div');
    const mainLayout = MainLayout();

    container.appendChild(mainLayout)
    // container.innerHTML = `
    // ${header}
    // ${footer}
    // `
    document.body.appendChild(container)
}