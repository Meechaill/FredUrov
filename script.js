const canvas = document.getElementById('scratchCanvas');
const ctx = canvas.getContext('2d');
const hiddenImage = document.getElementById('hiddenImage');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const brushRadius = 40; // Размер "ластика"
let isDrawing = false;
let totalPixels = canvas.width * canvas.height; // Общее количество пикселей на канве
let erasedPixels = 0; // Стертые пиксели

// Загрузка изображения, которое будет скрыто
const img = new Image();
img.src = "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR4m_cYtfoMdUamXNFovM8gck-ucbhI-WJwaIIzKi7BzZCphtmF"; // Замените ссылку на ваше изображение

img.onload = () => {
    // Когда изображение загружено, рисуем его на канве
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};

// Функция для стирания
function erase(x, y) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, brushRadius, 0, Math.PI * 2, false);
    ctx.fill();

    // Считаем, сколько пикселей стерто
    erasedPixels += Math.PI * brushRadius * brushRadius;
    
    // Проверяем, если стерто 30% пикселей, скрываем изображение
    if (erasedPixels / totalPixels >= 0.3) {
        hiddenImage.style.display = 'none';
    }
}

// Получение координат относительно канвы
function getMousePos(event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

// События мыши
canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    const { x, y } = getMousePos(event);
    erase(x, y);
});

canvas.addEventListener('mousemove', (event) => {
    if (isDrawing) {
        const { x, y } = getMousePos(event);
        erase(x, y);
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

// События для сенсорных устройств
canvas.addEventListener('touchstart', (event) => {
    isDrawing = true;
    const touch = event.touches[0];
    const { x, y } = getMousePos(touch);
    erase(x, y);
});

canvas.addEventListener('touchmove', (event) => {
    if (isDrawing) {
        const touch = event.touches[0];
        const { x, y } = getMousePos(touch);
        erase(x, y);
    }
});

canvas.addEventListener('touchend', () => {
    isDrawing = false;
});


document.getElementById('copyButton').addEventListener('click', function() {
    var textToCopy = document.getElementById('textToCopy').innerText;

    navigator.clipboard.writeText(textToCopy).then(function() {
        alert('Текст скопирован: ' + textToCopy);
    }).catch(function(err) {
        alert('Ошибка копирования: ' + err);
    });
});