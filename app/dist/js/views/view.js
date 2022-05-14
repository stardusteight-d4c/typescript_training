export class View {
    constructor(seletor) {
        const elemento = document.querySelector(seletor);
        if (elemento) {
            this.elemento = elemento;
        }
        else {
            throw Error(`Seletor ${seletor} não existe no DOM.`);
        }
    }
    atualizar(model) {
        let template = this.template(model);
        this.elemento.innerHTML = template;
    }
}
