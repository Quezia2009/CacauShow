document.addEventListener('DOMContentLoaded', () => {
    // Scroll suave para as seções
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Botão "Ver Produtos" na seção Home
    const verProdutosBtn = document.getElementById('verProdutosBtn');
    if (verProdutosBtn) {
        verProdutosBtn.addEventListener('click', () => {
            document.getElementById('produtos').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Formulário de Contato
    const contatoForm = document.getElementById('contatoForm');
    const formMessage = document.getElementById('formMessage');

    if (contatoForm) {
        contatoForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Impede o envio padrão do formulário

            // Simula o envio
            setTimeout(() => {
                formMessage.classList.remove('hidden', 'error', 'success'); // Limpa classes anteriores
                formMessage.classList.add('success');
                formMessage.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
                contatoForm.reset(); // Limpa o formulário
            }, 1000); // Atraso de 1 segundo para simular o processamento
        });
    }

    // Funcionalidade do Carrinho de Compras
    const adicionarCarrinhoBtns = document.querySelectorAll('.adicionar-carrinho');
    const carrinhoFlutuante = document.getElementById('carrinhoFlutuante');
    const listaCarrinho = document.getElementById('listaCarrinho');
    const totalCarrinhoSpan = document.getElementById('totalCarrinho');
    const fecharCarrinhoBtn = document.getElementById('fecharCarrinhoBtn');
    const finalizarCompraBtn = document.getElementById('finalizarCompraBtn');

    let carrinho = [];

    function atualizarCarrinhoUI() {
        listaCarrinho.innerHTML = ''; // Limpa a lista existente
        let total = 0;

        if (carrinho.length === 0) {
            listaCarrinho.innerHTML = '<li>Seu carrinho está vazio.</li>';
        } else {
            carrinho.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `${item.produto} (x${item.quantidade}) - <span>R$ ${(item.preco * item.quantidade).toFixed(2)}</span>`;
                listaCarrinho.appendChild(li);
                total += item.preco * item.quantidade;
            });
        }
        totalCarrinhoSpan.textContent = total.toFixed(2);
    }

    adicionarCarrinhoBtns.forEach(button => {
        button.addEventListener('click', function() {
            const produtoNome = this.dataset.produto;
            const produtoPreco = parseFloat(this.dataset.preco);

            const produtoExistente = carrinho.find(item => item.produto === produtoNome);

            if (produtoExistente) {
                produtoExistente.quantidade++;
            } else {
                carrinho.push({ produto: produtoNome, preco: produtoPreco, quantidade: 1 });
            }

            atualizarCarrinhoUI();
            carrinhoFlutuante.classList.remove('hidden'); // Mostra o carrinho
        });
    });

    if (fecharCarrinhoBtn) {
        fecharCarrinhoBtn.addEventListener('click', () => {
            carrinhoFlutuante.classList.add('hidden'); // Esconde o carrinho
        });
    }

    if (finalizarCompraBtn) {
        finalizarCompraBtn.addEventListener('click', () => {
            if (carrinho.length > 0) {
                alert('Compra finalizada! Total: R$ ' + totalCarrinhoSpan.textContent + '. Obrigado por comprar na Cacau Show!');
                carrinho = []; // Limpa o carrinho
                atualizarCarrinhoUI();
                carrinhoFlutuante.classList.add('hidden');
            } else {
                alert('Seu carrinho está vazio. Adicione produtos antes de finalizar a compra.');
            }
        });
    }
});