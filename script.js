let urlAPI = "https://mock-api.driven.com.br/api/v4/shirts-api/shirts";
let camisetaSelecionada;
let golaSelecionada;
let tecidoSelecionado;
let linkImg;
let pedidoCompleto;
let modelo;
let gola;
let tecido;
function escolhaModelo(modeloCamiseta){
    let opAnterior = document.querySelector(".modelos1 .selecionado");
    if(opAnterior !== null) {
        opAnterior.classList.remove("selecionado");
    }    
    let opSelecionada = modeloCamiseta;
    let listas = opSelecionada.childNodes[1];
    listas.classList.add("selecionado");
    camisetaSelecionada = opSelecionada.childNodes[3].innerHTML;
    console.log(camisetaSelecionada);
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
    
    console.log(golaSelecionada);
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
    console.log(tecidoSelecionado);
    liberarBotao();
}
function pegarLink(){
    linkImg = document.getElementById("urlModelo").value;
    console.log(linkImg)
    liberarBotao();
}
function liberarBotao(){    
    if(camisetaSelecionada !== undefined){
        if(golaSelecionada !== undefined){
            if(tecidoSelecionado !== undefined){
                if(linkImg !== undefined){
                    const botaoOff = document.getElementById("botaoFim");
                    console.log(botaoOff);
                    const filhosBotao = botaoOff.childNodes;
                    console.log(filhosBotao)
                    botaoOff.classList.add("botaoOn");
                    montarPedido();
                    console.log("todosDefinidos!");  
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
    if(tecidoSelecionado = "Gola Polo"){
        tecido = "cotton"
    }
    if(tecidoSelecionado = "Gola Polo"){
        tecido = "polyester"
    }
    pedidoCompleto = {
        "model": modelo,
        "neck": gola,
        "material": tecido, 
        "image": linkImg,
        "owner": string,
        "author": string            
        }
}