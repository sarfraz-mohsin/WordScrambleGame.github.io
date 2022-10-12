const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b")
refreshBtn = document.querySelector(".refresh"),
checkBtn = document.querySelector(".check"),
userInput = document.querySelector("input")

let correctWord,timer;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(()=> {
        if(maxTime > 0 ){
            maxTime--;
            timeText.innerText = maxTime;
        }
        else{
        clearInterval(timer)
        alert(`Time out! ${correctWord.toUpperCase()} was the correct word`)
        initGame()
    }
    }, 1000)
}

const initGame = () => {
    initTimer(30); //calling initTimer function with passing 30 as maxTime value

    let randomObj = words[Math.floor(Math.random()*words.length)] //Getting random object from words
    let wordArray = randomObj.word.split(""); //splitting each letter of the ranom word

    for(let i = wordArray.length - 1; i > 0; i--){
        let j  = Math.floor(Math.random()* (i+1)) //Getting random number
        //shuffling and swiping wordArray letters randomly
        //Shorthand for swiping array values -[wordArray[i],wordArray[j]] = [wordArray[j],wordArray[i]]

        let temp = wordArray[i];
        wordArray[i] = wordArray[j];
        wordArray[j] = temp;
    }
    
    const upper = wordArray.map(element =>{
        return element.toUpperCase(); //making all the letters uppercase
    });

    wordText.innerText = upper.join("")//passing the shuffled uppercase word as word text
    hintText.innerText = randomObj.hint; //passing random object hint as hint text
    correctWord = randomObj.word.toLowerCase();
    userInput.setAttribute("maxlength", correctWord.length)//it wont alllow the user to input more letter than the given word
}

initGame();

const checkWord = () =>{
    let userWord = userInput.value.toLocaleLowerCase();//getting user value
    if(!userWord)
        return alert("Please enter a word")
    else if(userWord !== correctWord){
        return alert(`Opps! ${userWord} is not the correct word`)}
    else{
        alert(`Congrats! ${userWord.toUpperCase()} is the correct word`)
        initGame()
        userInput.value = ""

    }
}

refreshBtn.addEventListener("click",initGame);
checkBtn.addEventListener("click", checkWord);