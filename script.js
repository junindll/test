// Script para esconder o cabeçalho ao rolar a página
let prevScrollpos = window.pageYOffset; // posição inicial do scroll

window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;

    if (prevScrollpos > currentScrollPos) {
        // Se estiver rolando para cima, exibe o cabeçalho
        document.querySelector("header").classList.remove("hidden");
    } else {
        // Se estiver rolando para baixo, esconde o cabeçalho
        document.querySelector("header").classList.add("hidden");
    }

    prevScrollpos = currentScrollPos; // Atualiza a posição do scroll
}

// Função para marcar o link ativo
function setActiveLink() {
    const links = document.querySelectorAll('.nav-link'); // Todos os links de navegação
    const sections = document.querySelectorAll('section'); // Todas as seções da página
    
    let currentSection = ''; // Variável para armazenar a seção visível
    
    // Percorre as seções e verifica qual está visível
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight / 2) { // Verifica se a seção está visível na tela
            currentSection = section.id; // Pega o id da seção visível
        }
    });
    
    // Remove a classe 'active' de todos os links
    links.forEach(link => link.classList.remove('active'));
    
    // Adiciona a classe 'active' ao link correspondente
    const activeLink = document.querySelector(`a[href="#${currentSection}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Adiciona o evento de rolar para chamar a função de atualização
window.addEventListener('scroll', setActiveLink);

// Chama a função uma vez ao carregar a página para garantir que o link ativo inicial seja marcado
setActiveLink();

document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll('.fade-in');
    
    const checkVisibility = () => {
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                element.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Verifica se o elemento já está visível ao carregar a página
});

let currentSlide = 0;
let images = document.querySelectorAll('.gallery-item');
let modal = document.getElementById('imageModal');
let modalImg = document.getElementById('modalImg');
let caption = document.getElementById('caption');

// Abre o modal com a imagem clicada
images.forEach((image, index) => {
    image.addEventListener('click', function() {
        currentSlide = index;
        openModal();
    });
});

// Função para abrir o modal e mostrar a imagem
function openModal() {
    modal.style.display = "block";
    modalImg.src = images[currentSlide].src;
    caption.innerHTML = images[currentSlide].alt;
}

// Função para fechar o modal
document.querySelector('.close').addEventListener('click', () => {
    modal.style.display = "none";
});

// Navegação entre as imagens (próxima e anterior)
function moveSlide(direction) {
    currentSlide += direction;
    if (currentSlide >= images.length) {
        currentSlide = 0; // Volta para a primeira imagem
    } else if (currentSlide < 0) {
        currentSlide = images.length - 1; // Vai para a última imagem
    }
    modalImg.src = images[currentSlide].src;
    caption.innerHTML = images[currentSlide].alt;
}

// Função para ativar o modo tela cheia
function toggleFullscreen() {
    if (modal.requestFullscreen) {
        modal.requestFullscreen();
    } else if (modal.mozRequestFullScreen) { // Firefox
        modal.mozRequestFullScreen();
    } else if (modal.webkitRequestFullscreen) { // Chrome, Safari e Opera
        modal.webkitRequestFullscreen();
    } else if (modal.msRequestFullscreen) { // IE/Edge
        modal.msRequestFullscreen();
    }
}

// Fecha o modal ao clicar fora da imagem
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
