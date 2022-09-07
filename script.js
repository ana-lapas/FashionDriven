let urlAPI = "https://mock-api.driven.com.br/api/v4/shirts-api/shirts";
let camisetaSelecionada;
let golaSelecionada;
let tecidoSelecionado;
let linkImg;
let pedidoCompleto;
let modelo;
let gola;
let tecido;
let template;
let nome;
function pegarNome(){
    nome = prompt("Qual seu nome?");
}
function carregarCamisetas(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts");
    promise.then(renderCamisetas);
}
function renderCamisetas(resposta){
    const camisetas = document.querySelector(".camisetas");
    camisetas.innerHTML = `<div class="tituloCamisetas">Ultimos pedidos</div>`;
    for(let i = 0; i < 10; i++) {
        template = `<li><div class="cardCamisetas">
        <img class="blusaModelo" src=${resposta.data[i].image}/>
        <span class="negrito">Criador:</span><span class="normal">${resposta.data[i].owner}</span>
    </div></li>`;
        camisetas.innerHTML += template;
    }
}
function pegarUltimaCamisetas(){
    const ultimaCamiseta = document.querySelector(".camisetas li:last-child");
    renderCamisetas();
}
function escolhaModelo(modeloCamiseta){
    let opAnterior = document.querySelector(".modelos1 .selecionado");
    if(opAnterior !== null) {
        opAnterior.classList.remove("selecionado");
    }    
    let opSelecionada = modeloCamiseta;
    let listas = opSelecionada.childNodes[1];
    listas.classList.add("selecionado");
    camisetaSelecionada = opSelecionada.childNodes[3].innerHTML;
    liberarBotao();
}
function escolhaGola(modeloGola){
    let opAnterior = document.querySelector(".modelos2 .selecionado");
    if(opAnterior !== null) {
        opAnterior.classList.remove("selecionado");
    }    
    let opSelecionada = modeloGola;
    let listas = opSelecionada.childNodes[1];
    listas.classList.add("selecionado");
    golaSelecionada = opSelecionada.childNodes[3].innerHTML;    
    liberarBotao();
}
function escolhaTecido(modeloTecido){
    let opAnterior = document.querySelector(".modelos3 .selecionado");
    if(opAnterior !== null) {
        opAnterior.classList.remove("selecionado");
    }    
    let opSelecionada = modeloTecido;
    let listas = opSelecionada.childNodes[1];
    listas.classList.add("selecionado")
    tecidoSelecionado = opSelecionada.childNodes[3].innerHTML;
    liberarBotao();
}
function pegarLink(){
    linkImg = document.getElementById("urlModelo").value;
    liberarBotao();
}
function liberarBotao(){    
    if(camisetaSelecionada !== undefined){
        if(golaSelecionada !== undefined){
            if(tecidoSelecionado !== undefined){
                if(linkImg !== undefined){                    
                    const botaoOff = document.getElementById("botaoFim");
                    const filhosBotao = botaoOff.childNodes;
                    botaoOff.classList.add("botaoOn");montarPedido();
                    }                
            }
        }
    }
}
function montarPedido(){
    if(camisetaSelecionada = "T-shirt"){
        modelo = "t-shirt";
    }
    if(camisetaSelecionada = "Manga Longa"){
        modelo = "long"
    }
    if(camisetaSelecionada = "Camiseta"){
        modelo = "top-tank"
    }
    if(golaSelecionada = "Gola V"){
        gola = "v-neck"
    }
    if(golaSelecionada = "Gola Redonda"){
        gola = "round"
    }
    if(golaSelecionada = "Gola Polo"){
        gola = "polo"
    }
    if(tecidoSelecionado = "Seda"){
        tecido = "silk"
    }
    if(tecidoSelecionado = "Algodão"){
        tecido = "cotton"
    }
    if(tecidoSelecionado = "Poliéster"){
        tecido = "polyester";
    }
    pedidoCompleto = {
        "model": modelo,
        "neck": gola,
        "material": tecido, 
        "image": linkImg,
        "owner": nome,
        "author": nome            
    }
    alert("Seu pedido foi feito!");
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts", pedidoCompleto);
    promise.then(pedidoFeito);
    promise.catch(erroPedido);

}
function pedidoFeito(){
    alert("Seu pedido foi confirmado!");
    pegarUltimaCamisetas();
}
function erroPedido(erroPedido){
    alert("Ops, não conseguimos processar sua encomenda!");
    const tipoErro = erroPedido.response.status;
   if(tipoErro = 422){
        alert("Ocorreu o erro 422! Por favor, preencha seu pedido novamente no formato correto!");
    } 
}
pegarNome();
carregarCamisetas();