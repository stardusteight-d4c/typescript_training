var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { domInjector } from "../decorators/dom-injector.js";
import { DiaDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { NegociacoesService } from "../services/negociacoes-service.js";
import { imprimir } from "../utils/imprimir.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
export class NegociacaoController {
    constructor() {
        this.negociacaoDeHoje = new Negociacoes();
        this.negociacoesView = new NegociacoesView('#negociacoesView');
        this.mensagemView = new MensagemView('#mensagemView');
        this.negociacoesService = new NegociacoesService();
        this.negociacoesView.atualizar(this.negociacaoDeHoje);
    }
    adicionar() {
        const negociacao = Negociacao.criarNegociacao(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);
        if (!this.validarDiaUtil(negociacao.data)) {
            this.mensagemView
                .atualizar('Apenas negociações em dias úteis são aceitas!');
            return;
        }
        this.negociacaoDeHoje.adicionarNegociacao(negociacao);
        imprimir(negociacao, this.negociacaoDeHoje);
        this.limparFormulario();
        this.atualizarView();
    }
    importarDados() {
        this.negociacoesService.obterNegociacoesDoDia()
            .then(negociacoes => {
            return negociacoes.filter(negociacoesRealizadas => {
                return !this.negociacaoDeHoje
                    .listaDeNegociacoes()
                    .some(negociacao => negociacao
                    .encontrarNegociacoesIguais(negociacoesRealizadas));
            });
        })
            .then(negociacoes => {
            for (let negociacao of negociacoes) {
                this.negociacaoDeHoje.adicionarNegociacao(negociacao);
            }
            this.negociacoesView.atualizar(this.negociacaoDeHoje);
        });
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
        this.negociacoesView.atualizar(this.negociacaoDeHoje);
        this.mensagemView.atualizar('Negociação adicionada com sucesso!');
    }
}
__decorate([
    domInjector('#data')
], NegociacaoController.prototype, "inputData", void 0);
__decorate([
    domInjector('#quantidade')
], NegociacaoController.prototype, "inputQuantidade", void 0);
__decorate([
    domInjector('#valor')
], NegociacaoController.prototype, "inputValor", void 0);
