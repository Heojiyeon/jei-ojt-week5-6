import { useRef } from 'react';

const Game = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);

  return (
    <div>
      <canvas id="game-canvas"></canvas>
    </div>
  );
};
export default Game;
