const { contas, correntista } = require('../database/database');

let numeroConta = 1;

const cadastroCorrentista = (req, res) => {
    const { cpf, nome, endereco, profissao } = req.body;

    const novoCorrentista = {
        cpf,
        nome,
        endereco,
        profissao
    }

    correntista.push(novoCorrentista);

    return res.status(201).json({
        mensagem: "Cadastrado com sucesso",
        informacoes: novoCorrentista
    });
}

const listarConta = (req, res) => {
    const { cpf } = req.params

    const cliente = correntista.find(clientes => {
        return clientes.cpf === cpf
    })

    const contasCliente = contas.filter(conta => {
        return conta.cpfCliente === cpf
    })

    return res.status(200).json({ correntista: cliente, contasCliente });
}

const criarConta = async (req, res) => {
    const { cpfCliente, tipoConta } = req.body;

    let novaConta;
    if (tipoConta.toLowerCase() === "corrente") {
        novaConta = {
            cpfCliente,
            numeroConta,
            agencia: 1,
            saldo: 0,
            tipo: tipoConta
        }
    } else if (tipoConta.toLowerCase() === "poupanca") {
        novaConta = {
            cpfCliente,
            numeroConta,
            agencia: 1,
            saldo: 0,
            tipo: tipoConta.toLowerCase(),
            limite: 0
        }
    } else {
        return res.status(404).json({ mensagem: "Tipo de conta inválido" });
    }

    contas.push(novaConta)
    numeroConta++

    return res.status(201).json({ mensagem: "Conta criada com sucesso" });

}

const saque = (req, res) => {
    const { numeroConta, valor } = req.body;

    const conta = contas.find(conta => {
        return conta.numeroConta == numeroConta
    });
    console.log(conta.saldo)
    console.log(valor)

    if (conta.tipo === "corrente") {
        if (conta.saldo + limite >= valor) {
            conta.saldo -= valor
        } else {
            return res.status(400).json({ mensagem: "Saque não realizado" })
        }
    } else if (conta.tipo === "poupanca") {
        console.log(1)
        if (valor <= conta.saldo) {
            conta.saldo -= valor
            console.log(2)
        } else {
            return res.status(400).json({ mensagem: "Saque não realizado" })
        }
    }

    return res.status(200).json({ mensagem: "Saque realizado" });
}

const deposito = (req, res) => {
    const { numeroConta, valor } = req.body;

    const conta = contas.find(conta => {
        return conta.numeroConta == numeroConta
    });

    conta.saldo += valor

    return res.status(200).json({ mensagem: "Depósito realizado" });
}

module.exports = { cadastroCorrentista, criarConta, saque, deposito, listarConta }