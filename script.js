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
let camiseta;
let camisaPrePronta;
let camisetaSelecionadaPronta = [];
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
    camiseta = resposta.data;
    for(let i = 0; i < 10; i++) {
        template = `<li><div class="cardCamisetas" id="${resposta.data[i].id}" onclick="pedidoCamisetaPronta(this)">
            <div class="imagCamisetaPronta"> <img class="blusaModelo" src=${resposta.data[i].image}/></div>
            <div class="donoCamiseta"> <p class="negrito">Criador:</p>&nbsp&nbsp<p class="normal">${resposta.data[i].owner}</p></div>
        </div></li>`;
        camisetas.innerHTML += template;
    }
}
let idCamisetaProntaSelecionada;
let objCamisetaProntaSelecionada;
function pedidoCamisetaPronta(camisetaProntaSelecionada){    
    const confimarCamisetaPronta = confirm("Você deseja fazer o pedido dessa camiseta?");
    if(confimarCamisetaPronta === true){
        idCamisetaProntaSelecionada = camisetaProntaSelecionada.id;
        const idMesmaCamiseta = camiseta.filter(mesmoID);
        camisetaSelecionadaPronta = idMesmaCamiseta;
        montarPedido();
    }
    if(confimarCamisetaPronta === false){
        alert("Você não realizou o pedido da camiseta selecionada");
    }
}
function mesmoID(idCamiseta){
    if(idCamiseta.id  === Number(idCamisetaProntaSelecionada)){        
        return true;        
    }
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

const input = document.querySelector('input');
input.addEventListener('change', pegarLink);

function pegarLink(){
    var padrao = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    var regex = new RegExp(padrao);
    linkImg = document.getElementById("urlModelo").value;
    if(linkImg.match(regex)){
        liberarBotao();
    } else { alert("O link deve vir no formato 'https://wwww.suaimage.com'")}
    
}

function liberarBotao(){    
    if(camisetaSelecionada !== undefined){
        if(golaSelecionada !== undefined){
            if(tecidoSelecionado !== undefined){
                if(linkImg !== undefined){        
                    const botaoOff = document.getElementById("botaoFim");
                    const filhosBotao = botaoOff.childNodes;
                    botaoOff.classList.add("botaoOn");
                }                
            }
        }
    }
}
function montarPedido(){
    if (camisetaSelecionadaPronta.length === 0){
            if(camisetaSelecionada === "T-shirt"){
        modelo = "t-shirt";
        }
        if(camisetaSelecionada === "Manga Longa"){
            modelo = "long";
        }
        if(camisetaSelecionada === "Camiseta"){
            modelo = "top-tank";
        }
        if(golaSelecionada === "Gola V"){
            gola = "v-neck";
        }
        if(golaSelecionada === "Gola Redonda"){
            gola = "round";
        }
        if(golaSelecionada === "Gola Polo"){
            gola = "polo";
        }
        if(tecidoSelecionado === "Seda"){
            tecido = "silk";
        }
        if(tecidoSelecionado === "Algodão"){
            tecido = "cotton";
        }
        if(tecidoSelecionado === "Poliéster"){
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
    } else {
        pedidoCompleto = {
            "model": camisetaSelecionadaPronta[0].model,
            "neck": camisetaSelecionadaPronta[0].neck,
            "material": camisetaSelecionadaPronta[0].material, 
            "image": camisetaSelecionadaPronta[0].image,
            "owner": nome,
            "author": nome,
        };
    }
    alert("Seu pedido foi feito!");
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts", pedidoCompleto);
    promise.then(pedidoFeito);
    promise.catch(erroPedido);
    camisetaSelecionadaPronta = [];
}
function pedidoFeito(pedidoCompleto){
    alert("Seu pedido foi confirmado!");
    carregarCamisetas();    
}
function erroPedido(erroPedido){
    alert("Ops, não conseguimos processar sua encomenda!");
    const tipoErro = erroPedido.response.status;
    if(tipoErro === 422){
        alert("Ocorreu o erro 422! Por favor, preencha seu pedido novamente no formato correto!");
    } 
}
pegarNome();
carregarCamisetas();