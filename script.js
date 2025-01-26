// Função para armazenar os produtos no localStorage
function salvarCarrinho(carrinho) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
}

// Função para obter os produtos do carrinho do localStorage
function obterCarrinho() {
    return JSON.parse(localStorage.getItem('carrinho')) || [];
}

// Função para atualizar a quantidade de itens no carrinho na página inicial
function atualizarCarrinho() {
    const carrinho = obterCarrinho();
    const itemCount = carrinho.length;
    document.getElementById('item-count').innerText = itemCount;
}

// Função para exibir os produtos no carrinho
function exibirCarrinho() {
    const carrinho = obterCarrinho();
    const listaCarrinho = document.getElementById('lista-carrinho');
    const carrinhoVazio = document.getElementById('carrinho-vazio');
    const totalPreco = document.getElementById('total-preco');

    listaCarrinho.innerHTML = '';
    let total = 0;

    if (carrinho.length === 0) {
        carrinhoVazio.style.display = 'block';
    } else {
        carrinhoVazio.style.display = 'none';
        carrinho.forEach(item => {
            const li = document.createElement('li');
            li.innerText = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
            listaCarrinho.appendChild(li);
            total += item.preco;
        });
    }

    totalPreco.innerText = total.toFixed(2);
}

// Função para adicionar um produto ao carrinho
function adicionarAoCarrinho(event) {
    const button = event.target;
    const id = button.getAttribute('data-id');
    const nome = button.getAttribute('data-nome');
    const preco = parseFloat(button.getAttribute('data-preco'));

    const carrinho = obterCarrinho();
    carrinho.push({ id, nome, preco });
    salvarCarrinho(carrinho);
}

// Event listener para adicionar produtos ao carrinho
if (document.body.contains(document.getElementById('carrinho-link'))) {
    const buttonsAdicionar = document.querySelectorAll('.adicionar');
    buttonsAdicionar.forEach(button => {
        button.addEventListener('click', adicionarAoCarrinho);
    });
}

// Atualizar a visualização do carrinho ao carregar a página de produtos
if (document.body.contains(document.getElementById('item-count'))) {
    atualizarCarrinho();
}


// Exibir o carrinho na página de carrinho
if (document.body.contains(document.getElementById('lista-carrinho'))) {
    exibirCarrinho();
}
