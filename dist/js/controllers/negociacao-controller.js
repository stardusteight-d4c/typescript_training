import { DiaDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
export class NegociacaoController {
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacoesView = new NegociacoesView('#negociacoesView', true);
        this.mensagemView = new MensagemView('#mensagemView', true);
        this.inputData = document.querySelector('#data');
        this.inputQuantidade = document.querySelector('#quantidade');
        this.inputValor = document.querySelector('#valor');
        this.negociacoesView.update(this.negociacoes);
    }
    adicionar() {
        const negociacao = Negociacao.criarNegociacao(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);
        if (!this.validarDiaUtil(negociacao.data)) {
            this.mensagemView
                .update('Apenas negociações em dias úteis são aceitas!');
            return;
        }
        this.negociacoes.adicionar(negociacao);
        this.limparFormulario();
        this.atualizarView();
    }
    validarDiaUtil(data) {
        return data.getDay() > DiaDaSemana.domingo
            && data.getDay() < DiaDaSemana.sabado;
    }
    limparFormulario() {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }
    atualizarView() {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso!');
    }
}
