import { useEffect } from "react";
import "./Keyboard.css"

const keyboard_layout = [
	['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p'],
	['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
	["Enter", 'y', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace']
];

export function Keyboard({ onKeyPress, keyboardStates, isGameOver }) {
	useEffect(() => {
		function handleKeyDown(event){
			if(!isGameOver){
				if(event.key == "Enter" || event.key == "Backspace" || /^[a-z]$/.test(event.key)){
					event.preventDefault();
					onKeyPress(event.key);
				}
			}
		}

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown)
	});

	function handleClick(key){
		if(!isGameOver){
			onKeyPress(key);
		}
	}

	return (
		<section className="keyboard">
			{keyboard_layout.map((row, rowIndex) => {
				return (
					<div key={rowIndex} className="row">
						{row.map((key) => {
							const state = key.length == 1 ? keyboardStates[key.toLowerCase()] : "";
							return (
								<button 
									className={`key ${state}`}
									key={key}
									onClick={() => handleClick(key)}
								>
									{key == "Backspace" ? "⌫" : key}
								</button>
							);
						})}
					</div>
				);
			})}
		</section>
	);
}