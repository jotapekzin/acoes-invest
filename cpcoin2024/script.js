let cpcoins = 1000; // Saldo inicial de Cpcoins

// Função para gerar preço aleatório de ações (números inteiros)
function getStockPrice() {
    return Math.floor(Math.random() * (100 - 10 + 1)) + 10; // Preço entre 10 e 100
}

// Função para exibir animação de subida ou descida das ações
function showAnimation(isProfit) {
    const arrowUp = document.getElementById('arrow-up');
    const arrowDown = document.getElementById('arrow-down');

    if (isProfit) {
        arrowUp.classList.add('show');
        setTimeout(() => arrowUp.classList.remove('show'), 2000); // Mostrar por 2 segundos
    } else {
        arrowDown.classList.add('show');
        setTimeout(() => arrowDown.classList.remove('show'), 2000); // Mostrar por 2 segundos
    }
}

// Função de investimento
function invest() {
    const stock = document.getElementById('stock').value;
    const amount = parseInt(document.getElementById('amount').value);

    // Validação do valor inserido
    if (isNaN(amount) || amount <= 0) {
        document.getElementById('result').innerHTML = "Por favor, insira um valor válido.";
        return;
    }

    if (amount > cpcoins) {
        document.getElementById('result').innerHTML = "Saldo insuficiente!";
        return;
    }

    const stockPrice = getStockPrice(); // Obter preço aleatório da ação
    const change = Math.random() < 0.5 ? -1 : 1; // Ação sobe ou desce
    const finalStockPrice = stockPrice + (change * Math.floor(Math.random() * 20)); // Variação do preço

    // Atualiza saldo de acordo com o resultado
    if (finalStockPrice > stockPrice) {
        const profit = Math.floor(amount * (finalStockPrice - stockPrice) / stockPrice); // Lucro inteiro
        cpcoins += profit;
        document.getElementById('result').innerHTML = `A ação subiu! Você ganhou ${profit} Cpcoins!`;

        // Mostrar animação de subida
        showAnimation(true);
    } else {
        const loss = Math.floor(amount * (stockPrice - finalStockPrice) / stockPrice); // Perda inteira
        cpcoins -= loss;
        document.getElementById('result').innerHTML = `A ação caiu! Você perdeu ${loss} Cpcoins.`;

        // Mostrar animação de descida
        showAnimation(false);
    }

    // Atualiza o saldo na tela como valor inteiro
    document.getElementById('cpcoins').textContent = cpcoins;
}
