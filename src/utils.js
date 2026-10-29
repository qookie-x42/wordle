export function getLetterStates(guess, solution){
    if(!guess || !solution){
        return Array(5).fill("");
    }
    const states = Array(5).fill("absent");
    const solutionLetters = [...solution];
    const guessLetters = [...guess];

    // if letter is at right position => green
    guessLetters.forEach((letter, i) => {
        if(letter == solutionLetters[i]){
            states[i] = "correct";
            solutionLetters[i] = null;
        }
    });

    // if word contains letter but elsewhere => yellow
    guessLetters.forEach((letter, i) => {
        if(states[i] == "correct"){
            return;
        }
        const solutionIndex = solutionLetters.indexOf(letter);
        if(solutionIndex != -1){
            states[i] = "present";
            solutionLetters[solutionIndex] = null;
        }
    });
    return states;
}

export function getKeyboardStates(guesses, solution){
    const keyStates = {};

    guesses.forEach((guess) => {
        if(!guess) { return;}
        const states = getLetterStates(guess, solution);

        [...guess].forEach((letter, i) => {
            const currentState = keyStates[letter] || 'unused';
            const newState = states[i];

            if(currentState == "correct"){ return;}
            if(currentState == "present" && newState != "correct"){ return;}

            keyStates[letter] = newState;
        });
    });

    return keyStates;
}
