import { useRef, useEffect } from 'react';

const AuroraCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    let animationFrameId: number;

    const setCanvasSize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const colors = [
      { r: 45, g: 212, b: 191 },   // Teal
      { r: 168, g: 85, b: 247 },   // Purple
      { r: 59, g: 130, b: 246 },   // Blue
      { r: 236, g: 72, b: 153 }    // Pink
    ];

    class Orb {
      x: number;
      y: number;
      radius: number;
      color: { r: number; g: number; b: number };
      vx: number;
      vy: number;

      constructor() {
        if (!canvas) {
          this.x = 0;
          this.y = 0;
        } else {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        }
        this.radius = Math.random() * 400 + 100;
        const randomIndex = Math.floor(Math.random() * colors.length);
        this.color = colors[randomIndex] || { r: 45, g: 212, b: 191 };
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
      }

      draw() {
        if (!ctx) return;
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius
        );
        gradient.addColorStop(
          0,
          `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.3)`
        );
        gradient.addColorStop(
          1,
          `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`
        );

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      update() {
        if (!canvas) return;
        this.x += this.vx + Math.sin(time * 0.001) * 0.5;
        this.y += this.vy + Math.cos(time * 0.001) * 0.5;

        if (
          this.x < -this.radius ||
          this.x > canvas.width + this.radius ||
          this.y < -this.radius ||
          this.y > canvas.height + this.radius
        ) {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        }
      }
    }

    const orbs: Orb[] = [];
    for (let i = 0; i < 10; i++) {
      orbs.push(new Orb());
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;

      orbs.forEach((orb) => {
        orb.update();
        orb.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default AuroraCanvas;
