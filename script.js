const faces = document.querySelectorAll('.face');
const dropAreas = document.querySelectorAll('.drop-area');
const cardboardFaces = document.querySelectorAll('.cardboard-face');
let cubePlaced = {
    top: false,
    left: false,
    middle: false,
    right: false,
    bottom: false,
    center: false
};

faces.forEach(face => {
    face.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', face.textContent);
    });
});

dropAreas.forEach(dropArea => {
    dropArea.addEventListener('dragover', e => {
        e.preventDefault();
    });

    dropArea.addEventListener('drop', e => {
        e.preventDefault();
        const droppedNumber = e.dataTransfer.getData('text/plain');
        const dropId = dropArea.id.replace('-drop', '');
        if (!cubePlaced[dropId]) {
            cubePlaced[dropId] = true;
            dropArea.textContent = droppedNumber;
            dropArea.classList.add('filled');
            const correspondingCardboardFace = document.getElementById(droppedNumber + '-cardboard');
            correspondingCardboardFace.style.display = 'none';
        
            checkCompletion();
            updateRemainingFaces(dropId);
        }        
    });
});

function checkCompletion() {
    const allPlaced = Object.values(cubePlaced).every(value => value === true);
    if (allPlaced) {
        const cardboard = document.querySelector('.cardboard');
        // cardboard.style.animation = 'rotateCube 5s linear infinite';

        cardboard.style.display = 'none';
        const cube = document.querySelector('.box');
        cube.style.display = 'flex';
        document.getElementById("derivation_box").style.display="flex";
        document.getElementById("before_derivation_box").style.display="none";
    }
}

function updateRemainingFaces(droppedId) {
    const droppedCardboardFace = document.getElementById(droppedId + '-cardboard');
    droppedCardboardFace.style.display = 'none';

    cardboardFaces.forEach(cardboardFace => {
        if (cardboardFace.id !== droppedId + '-cardboard') {
            cardboardFace.style.display = 'block';
        }
    });
}
