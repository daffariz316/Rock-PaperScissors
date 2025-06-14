import React, { useState } from "react";

const choices = [
  { name: "Rock", emoji: "🪨", icon: "✊" },
  { name: "Paper", emoji: "📄", icon: "✋" },
  { name: "Scissors", emoji: "✂️", icon: "✌️" }
];

function getResult(player, computer) {
  if (player === computer) return "Draw";
  if (
    (player === "Rock" && computer === "Scissors") ||
    (player === "Paper" && computer === "Rock") ||
    (player === "Scissors" && computer === "Paper")
  ) {
    return "Win";
  }
  return "Lose";
}

function App() {
  const [playerChoice, setPlayerChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");
  const [score, setScore] = useState({ wins: 0, losses: 0, draws: 0 });
  const [isPlaying, setIsPlaying] = useState(false);

  const handleChoice = (choice) => {
    setIsPlaying(true);
    const compChoice = choices[Math.floor(Math.random() * choices.length)].name;
    
    // Add animation delay
    setTimeout(() => {
      setPlayerChoice(choice);
      setComputerChoice(compChoice);
      const gameResult = getResult(choice, compChoice);
      setResult(gameResult);
      
      // Update score
      setScore(prev => ({
        wins: gameResult === "Win" ? prev.wins + 1 : prev.wins,
        losses: gameResult === "Lose" ? prev.losses + 1 : prev.losses,
        draws: gameResult === "Draw" ? prev.draws + 1 : prev.draws
      }));
      
      setIsPlaying(false);
    }, 1000);
  };

  const resetGame = () => {
    setPlayerChoice("");
    setComputerChoice("");
    setResult("");
    setScore({ wins: 0, losses: 0, draws: 0 });
  };

  const getChoiceDisplay = (choiceName) => {
    const choice = choices.find(c => c.name === choiceName);
    return choice ? choice.emoji : "❓";
  };

  const getResultColor = () => {
    switch(result) {
      case "Win": return "text-green-400";
      case "Lose": return "text-red-400";
      case "Draw": return "text-yellow-400";
      default: return "text-white";
    }
  };

  const getResultMessage = () => {
    switch(result) {
      case "Win": return "🎉 You Win!";
      case "Lose": return "😔 You Lose!";
      case "Draw": return "🤝 It's a Draw!";
      default: return "Choose your weapon!";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center text-white p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
            Rock Paper Scissors
          </h1>
          <p className="text-xl text-gray-300">Choose your weapon and defeat the computer!</p>
        </div>

        {/* Score Board */}
        <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/10">
          <h2 className="text-2xl font-bold mb-4">Score Board</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{score.wins}</div>
              <div className="text-sm text-gray-300">Wins</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">{score.draws}</div>
              <div className="text-sm text-gray-300">Draws</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400">{score.losses}</div>
              <div className="text-sm text-gray-300">Losses</div>
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/10">
          {/* Choices Display */}
          <div className="flex justify-center items-center space-x-12 mb-8">
            {/* Player */}
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 text-blue-300">You</h3>
              <div className={`text-8xl transition-all duration-500 ${isPlaying ? 'animate-bounce' : ''}`}>
                {isPlaying ? "❓" : getChoiceDisplay(playerChoice)}
              </div>
              <p className="text-lg mt-2 text-gray-300">{playerChoice || "..."}</p>
            </div>

            {/* VS */}
            <div className="text-4xl font-bold text-yellow-400 animate-pulse">
              VS
            </div>

            {/* Computer */}
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 text-red-300">Computer</h3>
              <div className={`text-8xl transition-all duration-500 ${isPlaying ? 'animate-bounce' : ''}`}>
                {isPlaying ? "❓" : getChoiceDisplay(computerChoice)}
              </div>
              <p className="text-lg mt-2 text-gray-300">{computerChoice || "..."}</p>
            </div>
          </div>

          {/* Result */}
          <div className={`text-4xl font-bold mb-8 ${getResultColor()} transition-all duration-300`}>
            {getResultMessage()}
          </div>
        </div>

        {/* Choice Buttons */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {choices.map((choice) => (
            <button
              key={choice.name}
              onClick={() => handleChoice(choice.name)}
              disabled={isPlaying}
              className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-6 px-8 rounded-2xl transform transition-all duration-200 hover:scale-110 hover:-translate-y-2 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <div className="flex flex-col items-center space-y-2">
                <span className="text-4xl">{choice.emoji}</span>
                <span className="text-xl">{choice.name}</span>
              </div>
              <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>
          ))}
        </div>

        {/* Reset Button */}
        <button
          onClick={resetGame}
          className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-bold py-3 px-8 rounded-full transform transition-all duration-200 hover:scale-105 shadow-lg"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}

export default App;