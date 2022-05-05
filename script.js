//Elementos
let btIniciar
let bola
let jogador
let cpu
let vidas, pontos
let tempoDisplay
let vidasDisplay, pontosDisplay
let modal
let msg, mensagemDisplay

//Controles de Animações
let games, frames

//Posições
let posBolaX, posBolaY
let posJogX, posJogY
let posCpuX, posCpuxY

//Reset
let posJogInitY = 180, posJogInitX = 10
let posCpuInitY = 180, posCpuInitX = 930
let posBolaInitX = 480, posBolaInitY = 250
let pontosInit = 0
let vidasInit = 3
let velIncInit = 64
let dificultAnt = "n1"

//Tamanhos
let campoX = 0, campoY = 0, campoW = 960, campoH = 500
let barraW = 20, barraH = 140, bolaW = 20, bolaH = 20

//Direções
let bolaX, bolaY
let cpuY = 0, dirJy

//Velocidade
let velBola, velCpu, velJogador, velInc

//Controle
let tecla
let jogo = false
let perdeu = false
let desafio = false
let pause = false
let continuar = false
let dificult
let contador = 3

//Movimentação Jogador
function controlarJ() {
    if ((jogo) && (!pause)) {
        posJogY += velJogador * dirJy
        //Movimentação Jogador - Cima OU Baixo
        if (((posJogY + barraH) >= campoH) || (posJogY) <= 0) {
            posJogY += (velJogador * dirJy) * (-1)
        }
        jogador.style.top = posJogY + "px"
    }
}

//Movimentação Bola
function controlarB() {
    if (jogo) {
        posBolaX += velBola * bolaX
        posBolaY += velBola * bolaY
        //Colisão com Jogador
        if (
            (posBolaX <= posJogX + barraW) &&
            (posBolaY + bolaH >= posJogY) &&
            (posBolaY <= posJogY + barraH)
        ) {
            bolaX *= -1
            bolaY = (((posBolaY + (bolaH / 2)) - (posJogY + (barraH / 2))) / velInc)
        }
        //Colisão com Cpu
        if (
            (posBolaX >= posCpuX - barraW) &&
            (posBolaY + bolaH >= posCpuY) &&
            (posBolaY <= posCpuY + barraH)
        ) {
            bolaX *= -1
            bolaY = (((posBolaY + (bolaH / 2)) - (posCpuY + (barraH / 2))) / velInc)
        }
        //Limites: Superior e Inferior
        if ((posBolaY >= 480) || (posBolaY <= 0)) {
            bolaY *= -1
        }
        //Pontuação - Jogador
        if (posBolaX >= (campoW - bolaW)) {
            velBola = 0
            posBolaX = posBolaInitX
            posBolaY = posBolaInitY
            posJogY = posJogInitY
            posCpuY = posCpuInitY
            jogador.style.top = posJogInitY + "px"
            cpu.style.top = posCpuInitY + "px"
            pontos++
            pontosDisplay.innerHTML = pontos
            jogo = true
            if (pontos == 1) {
                msg = "Parabéns, Você venceu!<br>Você pode continuar jogando ou...<br>Recomeçar em uma dificuldade ainda mais desafiadora!"
                continuar = true
                jogo=false
                pontosDisplay.style.background = "#1d9bf0"
                desafio = true
                iniciarModal(msg)
            } reiniciar()
            //Pontuação - Cpu
        } else if (posBolaX <= 0) {
            velBola = 0
            posBolaX = posBolaInitX
            posBolaY = posBolaInitY
            posJogY = posJogInitY
            posCpuY = posCpuInitY
            jogador.style.top = posJogInitY + "px"
            cpu.style.top = posCpuInitY + "px"
            vidas--
            vidasDisplay[vidas].style.display = "none"
            jogo = true
            if ((vidas <= 0) && (!desafio)) {
                perdeu = true
                jogo = false
                msg = "Game Over!<br>Você pode tentar outra vez ou diminuir a dificuldade!"
                iniciarModal(msg)
            } else if ((vidas <= 0) && (desafio)) {
                perdeu = true
                jogo = false
                msg = `Game Over!<br>Bem jogado, sua pontuação foi de ${pontos}.<br>Tente supera-la recomeçando o jogo!`
                iniciarModal(msg)
            } reiniciar()
        }
        bola.style.top = posBolaY + "px"
        bola.style.left = posBolaX + "px"
    }
}

//Movimentação Cpu
function controlarC() {
    if (jogo) {
        if ((posBolaY > (posCpuY + (barraH / 2)) + velCpu)) {
            //Mover para Baixo
            if ((posCpuY + barraH) <= (campoH - 13)) {
                posCpuY += velCpu
            }
            //Mover para Cima
        } else if (posBolaY < (posCpuY + (barraH / 2)) - velCpu) {
            if (posCpuY >= 13) {
                posCpuY -= velCpu
            }
        }
        cpu.style.top = posCpuY + "px"
    }
}

//Leitura de Movimento
function teclaD(event) {
    console.log(event)
    tecla = event.keyCode
    if (tecla == 38) {
        dirJy = -1
    } else if (tecla == 40) {
        dirJy = +1
    }
}

function teclaU(event) {
    tecla = event.keyCode
    if (tecla == 38) {
        dirJy = 0
    } else if (tecla == 40) {
        dirJy = 0
    }
}

//Recursividade para Animação
function game() {
    if (jogo) {
        controlarJ()
        controlarB()
        controlarC()
    }
    frames = requestAnimationFrame(game)
}

//Inicio do Jogo
function iniciar() {
    btRecomecar.style.display = "inline"
    tempoDisplay.innerHTML = ""
    contador = 3
    btIniciar.style.display = "none"
    velBola = 8
    cancelAnimationFrame(frames)
    jogo = true
    dirJy = 0
    bolaY = 0
    if ((Math.random() * 10) < 5) {
        bolaX = -1
    } else {
        bolaX = 1
    }
    posBolaX = posBolaInitX
    posBolaY = posBolaInitY
    posJogX = posJogInitX
    posJogY = posJogInitY
    posCpuX = posCpuInitX
    posCpuY = posCpuInitY
    game()
}


//Restart do Jogo
function recomecar() {
    if (!pause) {
        continuar=false
        removerModal()
        desafio=0
        btIniciar.style.display = "inline"
        tempoDisplay.innerHTML = ""
        for (let i = 0; i < vidasDisplay.length; i++) {
            vidasDisplay[i].style.display = "inline"
        }
        pontosDisplay.innerHTML = "0"
        pontosDisplay.style.background = "#00ba7c"
        bola.style.left = posBolaInitX + "px"
        bola.style.top = posBolaInitY + "px"
        jogador.style.left = posJogInitX + "px"
        jogador.style.top = posJogInitY + "px"
        cpu.style.left = posCpuInitX + "px"
        cpu.style.top = posCpuInitY + "px"
        vidas = vidasInit
        pontos = pontosInit
        perdeu = false
        jogo = false
        btRecomecar.style.display = "none"
    }
}

//Selecionar Dificuldade
function nivel() {
    if ((!jogo) && (contador == 3)) {
        switch (dificult.value) {
            case "n1":
                velCpu = 4
                velJogador = 8
                velInc = 64
                break

            case "n2":
                velCpu = 6
                velJogador = 8
                velInc = 64
                break

            case "n3":
                velCpu = 8
                velJogador = 8
                velInc = 32
                break

            case "n4":
                velCpu = 10
                velJogador = 8
                velInc = 32
                break

            case "n5":
                velCpu = 12
                velJogador = 8
                velInc = 32
                break
        }
        dificultAnt = dificult.value
        perdeu = true
        recomecar()
    } else {
        alert("Mude o nível apenas quando não estiver jogando!")
        dificult.value = dificultAnt
    }
}

//Reinicio Automático
function reiniciar() {
    if ((!perdeu) && (jogo)) {
        pause = true
        if (contador > 0) {
            tempoDisplay.innerHTML = `${contador}...`
            contador--
            setTimeout(reiniciar, 1000)
        } else {
            tempoDisplay.innerHTML = "Vai!"
            jogo = false
            pause = false
            setTimeout(iniciar, 100)
        }
    }
}

//Controle do Modal
function iniciarModal(msg){
    mensagemDisplay.innerHTML = msg
    bola.style.display = "none"
    modal.classList.add("mostrar")
}

function removerModal(){
    bola.style.display = "inline"
    if((!perdeu)&&(continuar)){
        jogo=true
        reiniciar()
    }
    modal.classList.remove("mostrar")
}

//Inicialização
function inicializar() {
    velJogador = 8
    velCpu = 4
    velInc = velIncInit
    vidas = vidasInit
    pontos = pontosInit
    modal = document.getElementById("msgModal")
    mensagemDisplay = document.getElementById("mensagem")
    vidasDisplay = document.getElementsByClassName("vidas")
    pontosDisplay = document.getElementById("pontos")
    tempoDisplay = document.getElementById("tempo")
    btIniciar = document.getElementById("iniciar")
    btIniciar.addEventListener("click", iniciar)
    btRecomecar = document.getElementById("recomecar")
    btRecomecar.addEventListener("click", recomecar)
    btRecomecar.style.display = "none"
    dificult = document.getElementById("nivel")
    bola = document.getElementById("bola")
    jogador = document.getElementById("jogador")
    cpu = document.getElementById("cpu")
    document.addEventListener("keydown", teclaD)
    document.addEventListener("keyup", teclaU)
}

window.addEventListener("load", inicializar)
