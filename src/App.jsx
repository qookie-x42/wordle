import { useEffect, useState } from "react"
import { Grid } from "./components/Grid"
import { Keyboard } from "./components/Keyboard"
import { getKeyboardStates } from "./utils";
import { getRandomWord } from "./wordService";

export function App() {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [solution, setSolution] = useState("");
  const  [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    async function getSolution(){
      const newSolution = await getRandomWord();
      setSolution(newSolution);
    };
    getSolution();
  }, []);

  function handleKeyPress(key){
    if(guesses.length == 6){
      return;
    }
    if(key == "Enter"){
      if(currentGuess.length == 5){        
        setGuesses([...guesses, currentGuess]);
        setCurrentGuess("");

        if(currentGuess == solution){
          setTimeout(() => {
            alert("Congratulations, you have won!");
          }, 200);
          setIsGameOver(true);
          location.reload();
        }
        else if(guesses.length == 5){
          setTimeout(() => {
            alert(`The mystery word was: ${solution}\nYou'll get it next time :)`);
          }, 200);
          setIsGameOver(true);
          location.reload();
        }
      } else {
        return;
      }
    }
    if(key == "Backspace"){
      setCurrentGuess((guess) => guess.slice(0, -1));
      return;
    }
    if(currentGuess.length < 5){
      setCurrentGuess((guess) => guess + key);
    }
  }
  const keyboardStates = getKeyboardStates(guesses, solution);

  return (
    <main>
      <Grid 
        guesses={guesses}
        currentGuess={currentGuess}
        solution={solution}
      />
      <Keyboard
        onKeyPress={handleKeyPress}
        keyboardStates={keyboardStates}
        isGameOver={isGameOver}
      />
    </main>
  )
}
