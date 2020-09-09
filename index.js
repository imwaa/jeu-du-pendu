const wordEl = document.getElementById("word");
const WrongLettersEL = document.getElementById("wrong-letters") ;
const playAgainBtn = document.getElementById("play-again");
const popup =document.getElementById("popup-container");
const notification =document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const foundWord = document.getElementById("word-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = ['application','jouer','magicien','lion','Belgique','linux','fitness','princesse','montagne','monde','afrique'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

function displayWord(){

    wordEl.innerHTML = 
    selectedWord
      .split('')
      .map(
          letter => `
            <span class="letter">
              ${correctLetters.includes(letter) ? letter : ''}
            </span>`
      )
      .join('');
      const innerWord = wordEl.innerText.replace(/\n/g, '');
      if (innerWord === selectedWord) {
        finalMessage.innerText ="Bravo! T'a trouvé le bon mot 👏";
        foundWord.innerText=selectedWord;
        popup.style.display = "flex";
      }
}

//update the wrong letters
function updateWrongLettersEl(){
  //Display Wrong Letters
  WrongLettersEL.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;
  //Display Parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    
    if (index<errors) {
      part.style.display = 'block';
    }
    else{
      part.style.display = 'none';
    }
  });
    // Check if he lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Tu a Perdud😒";
    foundWord.innerText=selectedWord;

    popup.style.display ="flex";
  }
}

function showNotification(){
  notification.classList.add("show");
  notification.style.display = "block";
  setTimeout(()=>{
    notification.classList.remove("show");
    notification.style.display = "none";
  },2000);
}

//keydown letter press
window.addEventListener("keydown", e => {
    if (e.keyCode >=65 && e.keyCode <= 95) {
      const letter = e.key;

      if(selectedWord.includes(letter)){
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);
          displayWord();
        }
        else{
          showNotification();
        }
      }
      else{
        if(!wrongLetters.includes(letter)){
          wrongLetters.push(letter);

          updateWrongLettersEl();
        }
        else{
          showNotification();
        }
      }
    }

  
});

//Restart the game
playAgainBtn.addEventListener("click", ()=> {
  // Empty arrays
  wrongLetters.splice(0);
  correctLetters.splice(0);
  

  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLettersEl();

  popup.style.display = "none";

})


displayWord();

        // On pourrait faire ca aussi dans la fonction DisplayWord:
        //
        // function(letter) {
        //   if (correctLetters.includes(letter)) {
        //     return <span class="letter">letter</span>;
        //   }
        //   else{
        //     return <span class="letter"></span>;
        //   }
        // }









