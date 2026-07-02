class pessoa {
    constructor(nome, dataNacimento) {
        this.nome = nome;
        this.dataNacimento = new Date(dataNacimento);   
}


calculaIdade() {
    const hoje = new Date();
    let idade = hoje.getFullYear() - this.dataNacimento.getFullYear();
    const difencaMeses = hoje.getMonth() - this.dataNacimento.getMonth();
    const aniversarioAindaNaoPassou =
    difencaMeses < 0 ||
 (difencaMeses === 0 && hoje.getDate() < this.dataNacimento.getDate());
    if (aniversarioAindaNaoPassou) {
        idade--;
    }
    return idade;
}  
toJSON() {
    return {
        nome: this.nome,
        dataNacimento: this.dataNacimento.toISOString().split('T')[0],
        idade: this.calculaIdade(),
    };
}
}
module.exports = pessoa;
