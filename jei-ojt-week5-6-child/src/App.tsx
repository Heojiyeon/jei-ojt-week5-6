import { useEffect, useRef } from 'react';
import './App.css';
import { fabric } from 'fabric';

function App() {
  const canvasRef = useRef<fabric.Canvas | null>(null);

  useEffect(() => {
    canvasRef.current = new fabric.Canvas('game-canvas', {
      width: 900,
      height: 700,
      backgroundColor: '#ffffff',
    });

    return () => {
      if (canvasRef.current !== null) {
        canvasRef.current.dispose();
      }
    };
  }, []);

  return (
    <>
      <canvas id="game-canvas"></canvas>
    </>
  );
}

export default App;
