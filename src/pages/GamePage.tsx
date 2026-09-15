import React, { useEffect, useRef, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';
import { firebaseConfig } from '../app/firebase-config';
import { useHistory } from 'react-router-dom';

initializeApp(firebaseConfig);

const BORDER_THICKNESS = 20;
const CANVAS_WIDTH = 320;
const CANVAS_HEIGHT = 480;

const OBSTACLES = [
  // interior obstacles
  { x: 80, y: 100, w: 40, h: 40 },
  { x: 200, y: 250, w: 40, h: 40 },
  { x: 50, y: 300, w: 60, h: 20 },
  { x: 130, y: 150, w: 60, h: 20 },
  { x: 220, y: 80, w: 30, h: 60 },
  { x: 130, y: 200, w: 50, h: 20 },
  { x: 60, y: 380, w: 40, h: 40 },
  { x: 240, y: 350, w: 30, h: 30 },
  { x: 150, y: 350, w: 20, h: 50 },
  // full perimeter walls
  { x: 0, y: 0, w: CANVAS_WIDTH, h: BORDER_THICKNESS },
  { x: 0, y: CANVAS_HEIGHT - BORDER_THICKNESS, w: CANVAS_WIDTH, h: BORDER_THICKNESS },
  { x: 0, y: 0, w: BORDER_THICKNESS, h: CANVAS_HEIGHT },
  { x: CANVAS_WIDTH - BORDER_THICKNESS, y: 0, w: BORDER_THICKNESS, h: CANVAS_HEIGHT },
];

const GamePage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);

  const gameOver = useRef(false);
  const history = useHistory();

  const ball = useRef({ x: 150, y: 150, vx: 0, vy: 0 });
  const startTime = useRef(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let loopHandle: any;

    const setup = async () => {

      loopHandle = setInterval(() => tick(canvas, ctx), 33);
    };

    const tick = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
      if (gameOver.current) return;

      const b = ball.current;
      b.vx *= 0.95;
      b.vy *= 0.95;
      b.x += b.vx;
      b.y += b.vy;

      b.x = Math.max(0, Math.min(canvas.width, b.x));
      b.y = Math.max(0, Math.min(canvas.height, b.y));

      for (const o of OBSTACLES) {
        if (b.x > o.x && b.x < o.x + o.w && b.y > o.y && b.y < o.y + o.h) {
          endGame();
          return;
        }
      }

      const currentScore = Math.floor((Date.now() - startTime.current) / 1000);
      setScore(currentScore);
      draw(canvas, ctx, b);
    };

    const draw = (
      canvas: HTMLCanvasElement,
      ctx: CanvasRenderingContext2D,
      b: any,
    ) => {
      ctx.fillStyle = "#eee";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "red";
      for (const o of OBSTACLES) {
        ctx.fillRect(o.x, o.y, o.w, o.h);
      }

      ctx.beginPath();
      ctx.arc(b.x, b.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = "blue";
      ctx.fill();
    };

    const endGame = async () => {
      gameOver.current = true;
      clearInterval(loopHandle);

      const finalScore = Math.floor((Date.now() - startTime.current) / 1000);
      const name =
        prompt("You crashed! Enter your name for the leaderboard:") ||
        "Anonymous";

      const db = getDatabase();
      await push(ref(db, "scores"), {
        name,
        score: finalScore,
        timestamp: Date.now(),
      });

      history.push("/leaderboard");
    };

    setup();

    return () => {
      clearInterval(loopHandle);
    };
  }, [history]);

  useEffect(() => {
    const handleMotion = (event: DeviceMotionEvent) => {
      console.log('devicemotion fired', event.accelerationIncludingGravity);
      const acc = event.accelerationIncludingGravity;
      if (!acc) return;
      ball.current.vx += (acc.x ?? 0) * 0.5;
      ball.current.vy -= (acc.y ?? 0) * 0.5;
    };
    window.addEventListener('devicemotion', handleMotion);
    return () => window.removeEventListener('devicemotion', handleMotion);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        const force = 1;
        if (e.key === 'ArrowLeft') ball.current.vx -= force;
        if (e.key === 'ArrowRight') ball.current.vx += force;
        if (e.key === 'ArrowUp') ball.current.vy -= force;
        if (e.key === 'ArrowDown') ball.current.vy += force;
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tilt Maze</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <canvas
          ref={canvasRef}
          width={320}
          height={480}
          style={{ border: "1px solid black", touchAction: "none" }}
        />
        <p>Score: {score}</p>
      </IonContent>
    </IonPage>
  );
};

export default GamePage;
