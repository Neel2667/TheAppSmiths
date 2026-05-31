import { useEffect, useRef } from 'react';

export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates
    const mouse = { x: null, y: null, targetX: null, targetY: null, radius: 150 };

    // 3D Grid Parameters
    const rows = 35;
    const cols = 35;
    const spacingX = width / (cols - 1);
    const spacingY = height / (rows - 1);
    
    // Points array
    const points = [];

    // Initialize points
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // base coordinates
        const baseX = c * spacingX;
        const baseY = r * spacingY;
        points.push({
          x: baseX,
          y: baseY,
          baseX,
          baseY,
          z: 0,
          vx: 0,
          vy: 0,
          vz: 0
        });
      }
    }

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = null;
      mouse.targetY = null;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // Perspective Projection helper
    const project = (x, y, z) => {
      const fov = 800; // Field of view / focal length
      // Shift origin to center of screen for perspective calculations
      const cx = width / 2;
      const cy = height / 2;
      
      const scale = fov / (fov + z);
      const projX = (x - cx) * scale + cx;
      const projY = (y - cy) * scale + cy;

      return { x: projX, y: projY, scale };
    };

    // Render loop
    let time = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Smooth mouse tracking
      if (mouse.targetX !== null) {
        if (mouse.x === null) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else {
          mouse.x += (mouse.targetX - mouse.x) * 0.1;
          mouse.y += (mouse.targetY - mouse.y) * 0.1;
        }
      } else {
        mouse.x = null;
        mouse.y = null;
      }

      time += 0.02;

      // Update points
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        
        // Base sinewave animation for terrain feel
        const waveX = Math.sin(p.baseX * 0.005 + time) * 20;
        const waveY = Math.cos(p.baseY * 0.005 + time) * 20;
        let targetZ = waveX + waveY;

        // Interaction with mouse
        if (mouse.x !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            // Push point inwards (away from mouse) and downwards in 3D
            targetZ += force * 120; // push depth
          }
        }

        // Spring physics to return back to terrain wave
        const kz = 0.08; // spring constant
        const damping = 0.85; // friction damping
        
        const fz = -kz * (p.z - targetZ);
        p.vz = (p.vz + fz) * damping;
        p.z += p.vz;
      }

      // Draw grid lines
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.06)'; // Glowing Cyan lines
      ctx.lineWidth = 0.5;

      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const p = points[i];
          const proj = project(p.x, p.y, p.z);
          
          if (c === 0) {
            ctx.moveTo(proj.x, proj.y);
          } else {
            ctx.lineTo(proj.x, proj.y);
          }
        }
        ctx.stroke();
      }

      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const i = r * cols + c;
          const p = points[i];
          const proj = project(p.x, p.y, p.z);
          
          if (r === 0) {
            ctx.moveTo(proj.x, proj.y);
          } else {
            ctx.lineTo(proj.x, proj.y);
          }
        }
        ctx.stroke();
      }

      // Draw small glowing dots at intersections
      for (let i = 0; i < points.length; i += 2) { // Skip every other node to prevent crowding
        const p = points[i];
        
        // Only draw nodes closer to mouse, or draw all with varying opacity
        const proj = project(p.x, p.y, p.z);

        if (proj.x >= 0 && proj.x <= width && proj.y >= 0 && proj.y <= height) {
          const depthColor = Math.max(0.1, 1 - p.z / 300); // deeper points are dimmer
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, 1.2 * proj.scale, 0, Math.PI * 2);
          
          // Hover nodes glow cyan, rest are subtle white/indigo
          if (mouse.x !== null) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius) {
              const hoverGlow = (mouse.radius - dist) / mouse.radius;
              ctx.fillStyle = `rgba(6, 182, 212, ${depthColor * hoverGlow * 0.8})`;
              ctx.arc(proj.x, proj.y, 2.5 * proj.scale * hoverGlow, 0, Math.PI * 2);
            } else {
              ctx.fillStyle = `rgba(139, 92, 246, ${depthColor * 0.25})`; // purple accent
            }
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${depthColor * 0.12})`;
          }
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10 pointer-events-none" />;
}
