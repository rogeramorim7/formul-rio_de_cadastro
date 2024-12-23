// Função para validar CPF
function calcularDV(cpfSemDV) {
    let soma1 = 0;
    for (let i = 0; i < 9; i++) {
        soma1 += parseInt(cpfSemDV[i]) * (10 - i);
    }
    let dv1 = 11 - (soma1 % 11);
    if (dv1 >= 10) dv1 = 0;

    let soma2 = 0;
    for (let i = 0; i < 9; i++) {
        soma2 += parseInt(cpfSemDV[i]) * (11 - i);
    }
    soma2 += dv1 * 2;
    let dv2 = 11 - (soma2 % 11);
    if (dv2 >= 10) dv2 = 0;

    return `${dv1}${dv2}`;
}

function verificarCpf(cpf) {
    if (cpf.length !== 11 || /(\d)\1{10}/.test(cpf)) {
        return false;
    }

    const cpfSemDV = cpf.slice(0, 9);
    const dvCalculado = calcularDV(cpfSemDV);
    const dvRecebido = cpf.slice(9);

    return dvCalculado === dvRecebido;
}

// Função para validar E-mail
function validarEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

// Função para verificar idade
function verificarIdade(dataNascimento) {
    const nascimento = new Date(dataNascimento);
    const idade = new Date().getFullYear() - nascimento.getFullYear();
    return idade >= 18;
}

// Evento para submeter o formulário
document.getElementById('formCadastro').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const cpf = document.getElementById('cpf').value.replace(/\D/g, ''); // Remove caracteres não numéricos
    const resultDiv = document.getElementById('result');
    
    if (!validarEmail(email)) {
        resultDiv.textContent = "E-mail inválido!";
        resultDiv.classList.remove('valid');
        resultDiv.classList.add('invalid');
        return;
    }

    if (!verificarCpf(cpf)) {
        resultDiv.textContent = "CPF inválido!";
        resultDiv.classList.remove('valid');
        resultDiv.classList.add('invalid');
        return;
    }

    if (!verificarIdade(dataNascimento)) {
        resultDiv.textContent = "Você é menor de idade. Não pode prosseguir.";
        resultDiv.classList.remove('valid');
        resultDiv.classList.add('invalid');
        return;
    }

    resultDiv.textContent = `Cadastro realizado com sucesso, ${nome}!`;
    resultDiv.classList.remove('invalid');
    resultDiv.classList.add('valid');
});
