'use client';

import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

interface ChartData {
  label: string;
  value: number;
  max: number;
}

function AnimatedBarChart({ data, title }: { data: ChartData[]; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const bars = Array.from(containerRef.current.querySelectorAll('.chart-bar'));
    
    bars.forEach((bar, i) => {
      const item = data[i];
      if (item) {
        (bar as HTMLElement).style.height = `${(item.value / item.max) * 100}%`;
        animate(bar as HTMLElement, {
          opacity: [0, 1],
          duration: 800,
          delay: i * 100,
          easing: 'outExpo',
        });
      }
    });
  }, [data]);

  return (
    <div className="bg-white/5 border border-white/10 p-4">
      <h4 className="text-xs font-mono text-white/60 uppercase tracking-wider mb-4">{title}</h4>
      <div ref={containerRef} className="flex items-end justify-between gap-2 h-32">
        {data.map((item, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <div 
              className="chart-bar w-full bg-gradient-to-t from-teal-500/30 to-teal-400/60 rounded-t-sm opacity-0 min-h-[4px]"
              style={{ height: '0%' }}
            />
            <span className="text-[10px] text-white/40">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnimatedLineChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const points = Array.from({ length: 20 }, (_, i) => ({
      x: i * (canvas.width / 19),
      y: canvas.height - Math.random() * (canvas.height * 0.6) - canvas.height * 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(20, 184, 166, 0.3)');
      gradient.addColorStop(1, 'rgba(20, 184, 166, 0)');

      ctx.beginPath();
      ctx.moveTo(points[0]?.x || 0, canvas.height);
      points.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.lineTo(points[points.length - 1]?.x || canvas.width, canvas.height);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.strokeStyle = '#14b8a6';
      ctx.lineWidth = 2;
      ctx.stroke();

      points.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#14b8a6';
        ctx.fill();
      });
    };

    draw();

    const interval = setInterval(() => {
      points.forEach(p => {
        p.y = canvas.height - Math.random() * (canvas.height * 0.6) - canvas.height * 0.1;
      });
      draw();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white/5 border border-white/10 p-4">
      <h4 className="text-xs font-mono text-white/60 uppercase tracking-wider mb-4">Activity Trend</h4>
      <canvas 
        ref={canvasRef} 
        width={300} 
        height={120} 
        className="w-full h-30"
      />
    </div>
  );
}

function AnimatedCounter({ value, label }: { value: string; label: string }) {
  const displayValue = value;

  return (
    <div className="bg-white/5 border border-white/10 p-4 text-center">
      <div className="text-2xl font-light text-white animate-pulse">
        {displayValue}
      </div>
      <div className="text-[10px] text-white/40 uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
}

export default function ChartsWidget() {
  const barData: ChartData[] = [
    { label: 'Mon', value: 72, max: 100 },
    { label: 'Tue', value: 85, max: 100 },
    { label: 'Wed', value: 63, max: 100 },
    { label: 'Thu', value: 91, max: 100 },
    { label: 'Fri', value: 78, max: 100 },
    { label: 'Sat', value: 45, max: 100 },
    { label: 'Sun', value: 32, max: 100 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <AnimatedCounter value="12.4K" label="Total Tasks" />
      <AnimatedCounter value="98%" label="Accuracy" />
      <AnimatedCounter value="2.1M" label="Tokens" />
      <AnimatedCounter value="99.9%" label="Uptime" />
      
      <div className="md:col-span-2">
        <AnimatedLineChart />
      </div>
      
      <div className="md:col-span-2">
        <AnimatedBarChart data={barData} title="Weekly Performance" />
      </div>
    </div>
  );
}
