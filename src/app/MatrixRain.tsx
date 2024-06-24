"use client"

import React, { useEffect, useRef } from 'react';

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Get the canvas and context
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;

    // Set canvas dimensions to fill the window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Characters to be used in the rain effect
    const katakana = 'アカサタナハマヤラワガザダバパイキシチニヒミリギジヂビピウクスツヌフムユルグズヅブプエケセテネヘメレゲゼデベペオコソトノホモヨロヲゴゾドボポ'.split('');
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const nums = '0123456789'.split('');

    const alphabet = katakana.concat(latin).concat(nums);

    // Set the font size and calculate the number of columns
    const fontSize = 16;
    const columns = canvas.width / fontSize;

    // Initialize the raindrops
    const rainDrops: number[] = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    // Function to draw the rain effect
    const draw = () => {
      context.fillStyle = 'rgba(0, 0, 0, 0.05)';
      context.fillRect(0, 0, canvas.width, canvas.height);

       // Set the text color and font
      context.fillStyle = '#0F0';
      context.font = `${fontSize}px monospace`;

      // Draw each raindrop
      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        context.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        // Randomly reset raindrop to the top after it falls past the bottom
        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }

        // Move the raindrop down
        rainDrops[i]++;
      }
    };

    // Set an interval to repeatedly draw the rain effect
    const interval = setInterval(draw, 30);
    
    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
  );
};

export default MatrixRain;