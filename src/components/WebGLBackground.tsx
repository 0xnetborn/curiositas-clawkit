'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * Lightweight WebGL particle background effect
 * Uses raw WebGL for minimal overhead - no external libraries
 */
export default function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Float32Array | null>(null);

  const initShaders = useCallback((gl: WebGLRenderingContext) => {
    const vertexShaderSource = `
      attribute vec2 a_position;
      attribute float a_size;
      attribute float a_alpha;
      varying float v_alpha;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        gl_PointSize = a_size;
        v_alpha = a_alpha;
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      varying float v_alpha;
      uniform vec3 u_color;
      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        float alpha = (0.5 - dist) * 2.0 * v_alpha;
        gl_FragColor = vec4(u_color, alpha);
      }
    `;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) return null;

    const program = gl.createProgram();
    if (!program) return null;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return null;
    }

    return program;
  }, []);

  const initParticles = useCallback((gl: WebGLRenderingContext, count: number) => {
    const positions = new Float32Array(count * 2);
    const sizes = new Float32Array(count);
    const alphas = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 2] = (Math.random() * 2 - 1) * 2; // Wider spread
      positions[i * 2 + 1] = Math.random() * 2 - 1;
      sizes[i] = Math.random() * 3 + 1;
      alphas[i] = Math.random() * 0.3 + 0.1;
    }

    particlesRef.current = positions;

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);

    const sizeBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);

    const alphaBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, alphaBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, alphas, gl.STATIC_DRAW);

    return { positionBuffer, sizeBuffer, alphaBuffer };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
    });

    if (!gl) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize);

    const program = initShaders(gl);
    if (!program) return;

    gl.useProgram(program);

    const colorLocation = gl.getUniformLocation(program, 'u_color');
    gl.uniform3f(colorLocation, 0.0, 0.8, 0.7); // Teal color

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const sizeLocation = gl.getAttribLocation(program, 'a_size');
    const alphaLocation = gl.getAttribLocation(program, 'a_alpha');

    const count = 80; // Number of particles
    const buffers = initParticles(gl, count);

    let time = 0;

    const animate = () => {
      time += 0.01;

      const positions = particlesRef.current;
      if (positions) {
        for (let i = 0; i < count; i++) {
          const px = i * 2;
          const py = i * 2 + 1;

          // Gentle floating motion
          positions[px] += Math.sin(time + i * 0.5) * 0.0005;
          positions[py] += Math.cos(time + i * 0.3) * 0.0005;

          // Mouse interaction
          const dx = mouseRef.current.x * 2 - positions[px];
          const dy = mouseRef.current.y * -2 - positions[py]; // Flip Y
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 0.5) {
            const push = (0.5 - dist) * 0.02;
            positions[px] -= dx * push;
            positions[py] -= dy * push;
          }

          // Wrap around edges
          if (positions[px] > 2) positions[px] = -2;
          if (positions[px] < -2) positions[px] = 2;
          if (positions[py] > 2) positions[py] = -2;
          if (positions[py] < -2) positions[py] = 2;
        }

        const positionBuffer = buffers.positionBuffer;
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);
      }

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      gl.enableVertexAttribArray(positionLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.positionBuffer);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      gl.enableVertexAttribArray(sizeLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.sizeBuffer);
      gl.vertexAttribPointer(sizeLocation, 1, gl.FLOAT, false, 0, 0);

      gl.enableVertexAttribArray(alphaLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.alphaBuffer);
      gl.vertexAttribPointer(alphaLocation, 1, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.POINTS, 0, count);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = e.clientY / window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initShaders, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
      style={{
        opacity: 0.6,
        mixBlendMode: 'screen' as const,
      }}
    />
  );
}
