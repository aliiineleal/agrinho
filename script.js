// Aguarda o carregamento do DOM para manipulação segura
document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     1. SISTEMA SOCRÁTICO DO ACCORDION (EXPANSÍVEIS)
     ========================================================================== */
  const headers = document.querySelectorAll('.accordion-header');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const itemAtual = header.parentElement;
      const estaAtivo = itemAtual.classList.contains('active');
      
      // Fecha todos os itens abertos para manter uma interface limpa
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
      });

      // Se o item clicado não estava ativo, abre ele
      if (!estaAtivo) {
        itemAtual.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     2. PAINEL DE ACESSIBILIDADE INTEGRADO
     ========================================================================== */
  let tamanhoBase = 100; // Percentual padrão de tamanho da fonte (100% = 16px)
  const htmlElement = document.documentElement;
  const btnAumentar = document.getElementById('btn-aumentar');
  const btnDiminuir = document.getElementById('btn-diminuir');
  const btnTema = document.getElementById('btn-tema');

  // Aumentar Fonte
  btnAumentar.addEventListener('click', () => {
    if (tamanhoBase < 140) {
      tamanhoBase += 10;
      htmlElement.style.setProperty('--base-font-size', `${tamanhoBase}%`);
    }
  });

  // Diminuir Fonte
  btnDiminuir.addEventListener('click', () => {
    if (tamanhoBase > 80) {
      tamanhoBase -= 10;
      htmlElement.style.setProperty('--base-font-size', `${tamanhoBase}%`);
    }
  });

  // Alternador de Tema Escuro/Claro
  btnTema.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });

  /* ==========================================================================
     3. LEITURA POR VOZ (SpeechSynthesis API - Apenas Conteúdo Útil)
     ========================================================================== */
  const btnOuvir = document.getElementById('btn-ouvir');
  const btnParar = document.getElementById('btn-parar');
  let sintetizador = window.speechSynthesis;
  let comandoVoz = null;

  btnOuvir.addEventListener('click', () => {
    // Captura apenas o texto interpretativo da tag <main> excluindo controles e formulários
    const mainConteudo = document.querySelector('main');
    
    // Filtro para capturar textos de leitura limpos
    const paragrafos = mainConteudo.querySelectorAll('article p, article blockquote, .secao-ia p, .secao-ia .accordion-content p');
    let textoParaLer = "";
    
    paragrafos.forEach(p => {
      textoParaLer += p.innerText + " ";
    });

    // Se houver fala em andamento, cancela antes de reiniciar
    sintetizador.cancel();

    comandoVoz = new SpeechSynthesisUtterance(textoParaLer.trim());
    comandoVoz.lang = 'pt-BR';
    comandoVoz.rate = 1.0; // Velocidade natural

    // Gerenciador de Estados dos Botões de Acessibilidade
    comandoVoz.onstart = () => {
      btnOuvir.textContent = "⏳ Lendo...";
      btnOuvir.disabled = true;
      btnParar.disabled = false;
    };

    comandoVoz.onend = () => {
      btnOuvir.textContent = "🔊 Ouvir";
      btnOuvir.disabled = false;
      btnParar.disabled = true;
    };

    sintetizador.speak(comandoVoz);
  });

  btnParar.addEventListener('click', () => {
    sintetizador.cancel();
    btnOuvir.textContent = "🔊 Ouvir";
    btnOuvir.disabled = false;
    btnParar.disabled = true;
  });

  /* ==========================================================================
     4. INTERAÇÃO INTERATIVA - SISTEMA DE COMENTÁRIOS
     ========================================================================== */
  const formComentario = document.getElementById('form-comentario');
  const campoTexto = document.getElementById('txt-comentario');
  const listaComentarios = document.getElementById('lista-comentarios');

  formComentario.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const texto = campoTexto.value.trim();
    if (texto === "") return;

    // Criando elemento HTML dinâmico com boas práticas semânticas
    const cardComentario = document.createElement('div');
    cardComentario.className = 'comentario-item';
    cardComentario.innerHTML = `<p>${texto}</p>`;

    // Insere o comentário recente no topo da lista
    listaComentarios.insertBefore(cardComentario, listaComentarios.firstChild);
    
    // Reseta o campo
    campoTexto.value = "";
    console.log("Feedback enviado de forma limpa pelo leitor.");
  });

  /* ==========================================================================
     5. SIMULAÇÃO DE SUBMISSÃO DO FORMULÁRIO DE INSCRIÇÃO
     ========================================================================== */
  const formSeminario = document.getElementById('form-seminario');
  formSeminario.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Inscrição confirmada com sucesso para o seminário AgroFuturo 2026!');
    formSeminario.reset();
  });
});