/*
Gruppe: Gruppe 03
Beschreibung: Auf dieser Seite wird das Spiel Hangman/Hangrobo erstellt
Version: 1.5
Autor/en: Manuel Wittmann
Tutorial: Udemy - Brad Traversy
*/

//Alle benoetigten HTML Elemente fuer die weitere Verarbeitung in Konstanten speichern
const wortElement = document.getElementById('wort');
const falscherBuchstabeElement = document.getElementById('falscheBuchstaben');
const nochmalBtn = document.getElementById('play-button');
const popupElement = document.getElementById('popupContainer');
const notificationElement = document.getElementById('notificationContainer');
const finalMessage = document.getElementById('finalMessage');

//NodeList mit allen SVG Elementen
const roboParts = document.querySelectorAll('.roboPart');

//Zu ratende Woerter
const words = ['drm', 'cms', 'onboard', 'mosaic'];

//Zufaelliges Auswählen eines zu ratenden Wortes
let selectedWord = words[Math.floor(Math.random() * words.length)];

//Arrays in denen die richtigen und falschen Buchastaben gespeichert werden
const richtigeBuchstaben = [];
const falscheBuchstaben = [];

//Ausgeblendetes Wort anzeigen
function wortAnzeigen() {

   //1. schritt: ausgewaehltes Wort in einzelne Buchstaben zerlegen und in array speichern
   //2. schritt: array durchlaufen jeden Buchstaben, der sich auch im richtigeBuchstaben array befindet anzeigen
    wortElement.innerHTML = `
        
        ${selectedWord.split('').map(letter => `<span class="buchstabe">${richtigeBuchstaben.includes(letter) ? letter : ''}</span>`).join('')}
    `;

    //Zeilenumbruch entfernen
    const innerWord = wortElement.innerText.replace(/\n/g, '');
    console.log(wortElement.innerText);

    //Wenn alle Woerter gefunden wurden wird dem Anwender ein overlay mit einer entsprechenden Meldung angezeigt.
    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations, you won';
        popupElement.style.display = 'flex';
    }

}

function updateWrongLettersElement() {
    falscherBuchstabeElement.innerHTML = `
    ${falscheBuchstaben.length > 0 ? '<p>Wrong letter</p>' : ''}
    ${falscheBuchstaben.map(letter => `<span>${letter}</span>`)}
    `;

    roboParts.forEach((part, index) => {
        const errors = falscheBuchstaben.length;

        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    //Check if lost
    if (falscheBuchstaben.length === roboParts.length) {
        finalMessage.innerText = "You lost";
        popupElement.style.display = 'flex';

    }
}

function showNotification() {
    notificationElement.classList.add('show');

    setTimeout(() => {
        notificationElement.classList.remove('show');
    }, 2000);
}

//Abfangen der Eingabe der Buchstaben über die Tastatur
window.addEventListener('keydown', e => {
    //nur Buchstaben werden akzeptiert
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;
        //ist eingegebener Buchstabe korrekt und wurde noch nicht gewaehlt, dann wird dieser in das richtigeBuchstaben-Array gespeichert.
        //Wurde der Buchstabe schon gewaehlt, wird ein entsprechender Hinweis ausgegeben. 
        if (selectedWord.includes(letter)) {
            if (!richtigeBuchstaben.includes(letter)) {
                richtigeBuchstaben.push(letter);

                wortAnzeigen();
            } else {
                showNotification()
            }
            //ist ein eingegebener Buchstabe nicht korrekt und wurde noch nicht gewaehlt, dann wird dieser in das falsche Buchstaben-Array gespeichert.
            //Wurde der Buchstabe schon gewaehlt, wird ein entsprechender Hinweis ausgegeben.
       } else {
            if (!falscheBuchstaben.includes(letter)) {
                falscheBuchstaben.push(letter);

                updateWrongLettersElement()
            } else {
                showNotification();
            }
        }
    }
});

//Erneuter Start des Spiels
nochmalBtn.addEventListener('click', () => {
    richtigeBuchstaben.splice(0);
    falscheBuchstaben.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    wortAnzeigen();

    updateWrongLettersElement();

    popupElement.style.display = 'none';
})

wortAnzeigen();