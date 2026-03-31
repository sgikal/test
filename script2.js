// 1. CONFIGURACIÓN
const MI_API_URL = "https://sheetdb.io/api/v1/29bg5nsb96dqg";

const portales = [
    "https://www.wikipedia.org", // Botella 1
    "https://nochesdekukulkan.com.mx/evento/3",     // Botella 2
    "https://www.disneylatino.com/"                         // Botella 3
];

// 2. ELEMENTOS DEL DOM 
const bottles = document.querySelectorAll('.bottle');
const overlay = document.getElementById('modal-overlay');
const paper = document.getElementById('main-paper');
const webContent = document.getElementById('web-content');
const webPortal = document.getElementById('web-portal');
const specialContent = document.getElementById('special-content');
const randomMsgDisplay = document.getElementById('random-message');
const userInput = document.getElementById('user-input');
const saveBtn = document.getElementById('save-btn');
const seaSound = document.getElementById('sea-sound');
const hint = document.getElementById('start-hint');

// 3. SONIDO 
document.body.addEventListener('click', () => {
    if (seaSound) {
        seaSound.play().catch(e => console.log("Sonido bloqueado aún"));
    }
    if (hint) {
        hint.style.display = 'none';
    }
}, { once: true });

// 4. CLIC EN BOTELLAS
bottles.forEach((bottle, index) => {
    bottle.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // BOTELLAS 1, 2 y 3
        if (index < 3) { 
            specialContent.style.display = 'none';
            webContent.style.display = 'block';
            paper.classList.add('wide'); 
            webPortal.src = portales[index];
        } 
        // BOTELLA 4 (Mensajes)
        else { 
            webContent.style.display = 'none';
            specialContent.style.display = 'block';
            paper.classList.remove('wide');
            obtenerMensajeDeGoogle(); 
        }
        
        overlay.style.display = 'flex';
    });
});

// 5. FUNCIÓN 1
function obtenerMensajeDeGoogle() {
    randomMsgDisplay.innerText = "Buscando en la marea...";
    
    fetch(MI_API_URL)
    .then(response => response.json())
    .then(data => {
        if (data && data.length > 0) {
            const randomIdx = Math.floor(Math.random() * data.length);
            // IMPORTANTE
            randomMsgDisplay.innerText = `"${data[randomIdx].mensaje}"`;
        } else {
            randomMsgDisplay.innerText = "La botella está vacía... ¡sé el primero en escribir!";
        }
    })
    .catch(err => {
        console.error("Error al leer:", err);
        randomMsgDisplay.innerText = "Hubo un error al conectar con el mar digital.";
    });
}

// 6. FUNCIÓN 2
saveBtn.addEventListener('click', () => {
    const texto = userInput.value.trim();
    if (texto !== "") {
        saveBtn.innerText = "Lanzando...";
        saveBtn.disabled = true;
        
        fetch(MI_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "mensaje": texto })
        })
        .then(() => {
            userInput.value = "";
            saveBtn.innerText = "Lanzar al mar";
            saveBtn.disabled = false;
            alert("¡Mensaje lanzado al océano de Memorias!");
            overlay.style.display = 'none';
        })
        .catch(err => {
            console.error("Error al guardar:", err);
            saveBtn.innerText = "Reintentar";
            saveBtn.disabled = false;
        });
    }
});

// 7. CERRAR MODAL
const cerrarModal = () => {
    overlay.style.display = 'none';
    webPortal.src = ""; 
};

document.querySelector('.close-btn').onclick = cerrarModal;

window.onclick = (e) => {
    if (e.target === overlay) {
        cerrarModal();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const bottles = document.querySelectorAll('.bottle');
    
    
    const lightningFlash = document.createElement('div');
    lightningFlash.className = 'lightning-flash';
    document.body.appendChild(lightningFlash);

    bottles.forEach(bottle => {
        const effect = bottle.getAttribute('data-effect');
        let effectContainer;

        
        if (effect === 'rain' || effect === 'wind') {
            effectContainer = document.createElement('div');
            effectContainer.className = 'effect-container';
            bottle.appendChild(effectContainer); 
        }

        bottle.addEventListener('mouseenter', () => {
            if (!effectContainer && effect !== 'lightning') return;

            if (effect === 'rain') {
                createRain(effectContainer);
            } else if (effect === 'wind') {
                createWind(effectContainer);
            } else if (effect === 'lightning') {
                triggerLightning(lightningFlash);
            }
        });

    
        bottle.addEventListener('mouseleave', () => {
            if (effectContainer) {
                effectContainer.innerHTML = '';
            }
        });
    });
});


function createRain(container) {
    container.innerHTML = ''; 
   
    for (let i = 0; i < 80; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        
       drop.style.left = Math.random() * 300 + 'px'; 
        
        drop.style.animationDelay = Math.random() * 2 + 's';
        drop.style.animationDuration = (Math.random() * 0.3 + 0.5) + 's'; 
        container.appendChild(drop);
    }
}

function createWind(container) {
    container.innerHTML = ''; 
    
    for (let i = 0; i < 25; i++) {
        const swirl = document.createElement('div');
        swirl.className = 'wind-swirl';
        
        
        const size = Math.random() * 60 + 30 + 'px';
        swirl.style.width = size;
        swirl.style.height = size;
        
        
        swirl.style.left = Math.random() * 250 + 'px';
        swirl.style.top = Math.random() * 300 + 'px';
        
        swirl.style.animationDelay = Math.random() * 4 + 's';
        swirl.style.animationDuration = (Math.random() * 3 + 2) + 's';
        container.appendChild(swirl);
    }
}

function triggerLightning(flashElement) {
    
    flashElement.classList.add('active');
    
    
    setTimeout(() => {
        flashElement.classList.remove('active');
    }, 300); 
}
