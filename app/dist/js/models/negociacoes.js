export class Negociacoes {
    constructor() {
        this.negociacoes = [];
    }
    adicionarNegociacao(negociacao) {
        this.negociacoes.push(negociacao);
    }
    listaDeNegociacoes() {
        return this.negociacoes;
    }
    exibirLog() {
        return JSON.stringify(this.negociacoes, null, 2);
    }
    encontrarNegociacoesIguais(negocioes) {
        return JSON.stringify(this.negociacoes) === JSON.stringify(negocioes.listaDeNegociacoes());
    }
}
