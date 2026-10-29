import { getLetterStates } from "../utils";
import "./Grid.css"

const rows = 6;
const cols = 5;

export function Grid({guesses, currentGuess, solution}){
	const allGuesses = [...guesses];
	if(currentGuess){
		allGuesses.push(currentGuess);
	}
	while(allGuesses.length < rows){
		allGuesses.push("");
	}
	return (
		<table className="grid">
			<tbody>
				{Array(rows).fill().map((value, rowIndex) => {
					const isComplete = guesses.length > rowIndex
					const states = isComplete 
					? getLetterStates(allGuesses[rowIndex], solution)
					: Array(5).fill("");
					return (
						<tr key={rowIndex}>
							{Array(cols).fill().map((value, colIndex) => {
								const letter = allGuesses[rowIndex]?.[colIndex] || "";
								return (
									<td 
										key={`${rowIndex} / ${colIndex}`}
										className={states[colIndex]}
									>
										{letter}
									</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	)
}
