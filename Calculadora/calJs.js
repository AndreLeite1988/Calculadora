// Selecionar o display e o histórico
const display = document.getElementById('display');
const history = document.getElementById('history');
const themeSwitcher = document.getElementById('themeSwitcher');
const body = document.body;

// Adicionar valores ao display
function appendValue(value) {
    display.value += value;
}

// Limpar o display
function clearDisplay() {
    display.value = '';
}

// Realizar o cálculo
function calculate() {
    try {
        const result = Function('"use strict"; return (' + display.value + ')')();
        history.innerHTML += `<p>${display.value} = ${result}</p>`;
        display.value = result;
    } catch (error) {
        display.value = 'Erro!';
    }
}

// Adicionar suporte ao teclado
document.addEventListener('keydown', (event) => {
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.', 'Enter', 'Backspace'];

    if (allowedKeys.includes(event.key)) {
        event.preventDefault(); // Evita ações padrão do navegador para algumas teclas
        if (event.key === 'Enter') {
            calculate(); // Pressionar Enter realiza o cálculo
        } else if (event.key === 'Backspace') {
            display.value = display.value.slice(0, -1); // Remove o último caractere
        } else {
            appendValue(event.key); // Adiciona o valor digitado ao display
        }
    }
});

// Alternar temas
themeSwitcher.addEventListener('click', () => {
    body.classList.toggle('dark-theme');

    // Opcional: Salvar a preferência do usuário no localStorage
    const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
});

// Carregar tema salvo (se houver)
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    }
});
