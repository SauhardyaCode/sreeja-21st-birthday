/**
 * Lightweight, zero-dependency offline Canvas Confetti engine
 * Supports bursts, cannons, hearts, and celebratory showers
 */
(function(window) {
  const canvas = document.createElement('canvas');
  canvas.id = 'confetti-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '99999';
  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(canvas);
    resize();
  });

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationFrameId = null;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);

  const colors = [
    '#FF6B8B', '#FF8E53', '#FFA07A', '#FFD166', '#06D6A0',
    '#118AB2', '#9B5DE5', '#F15BB5', '#FEE440', '#00BBF9'
  ];

  class Particle {
    constructor(x, y, options = {}) {
      this.x = x !== undefined ? x : canvas.width / 2;
      this.y = y !== undefined ? y : canvas.height / 2;
      this.color = options.color || colors[Math.floor(Math.random() * colors.length)];
      this.size = (Math.random() * 8 + 6) * (options.scalar || 1);
      
      const angle = options.angle !== undefined ? options.angle : (Math.random() * Math.PI * 2);
      const velocity = (Math.random() * 14 + 10) * (options.velocityMultiplier || 1);
      
      this.vx = Math.cos(angle) * velocity;
      this.vy = Math.sin(angle) * velocity - (options.upwardBoost || 4);
      this.gravity = 0.4;
      this.drag = 0.96;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 15;
      this.opacity = 1;
      this.decay = Math.random() * 0.015 + 0.01;
      this.isHeart = options.isHeart || false;
    }

    update() {
      this.vx *= this.drag;
      this.vy *= this.drag;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotationSpeed;
      this.opacity -= this.decay;
    }

    draw(ctx) {
      if (this.opacity <= 0) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.opacity);
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);

      if (this.isHeart) {
        ctx.fillStyle = this.color;
        const s = this.size * 0.6;
        ctx.beginPath();
        ctx.moveTo(0, s * 0.3);
        ctx.bezierCurveTo(-s, -s * 0.6, -s * 1.4, s * 0.5, 0, s * 1.5);
        ctx.bezierCurveTo(s * 1.4, s * 0.5, s, -s * 0.6, 0, s * 0.3);
        ctx.fill();
      } else {
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2);
      }
      ctx.restore();
    }
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw(ctx);
      if (particles[i].opacity <= 0) {
        particles.splice(i, 1);
      }
    }
    if (particles.length > 0) {
      animationFrameId = requestAnimationFrame(loop);
    } else {
      animationFrameId = null;
    }
  }

  function triggerBurst(x, y, count = 80, options = {}) {
    resize();
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(x, y, options));
    }
    if (!animationFrameId) {
      loop();
    }
  }

  function cannonBlast() {
    triggerBurst(canvas.width * 0.2, canvas.height * 0.8, 60, {
      angle: -Math.PI / 4 + (Math.random() - 0.5) * 0.5,
      velocityMultiplier: 1.4,
      upwardBoost: 10
    });
    triggerBurst(canvas.width * 0.8, canvas.height * 0.8, 60, {
      angle: -Math.PI * 0.75 + (Math.random() - 0.5) * 0.5,
      velocityMultiplier: 1.4,
      upwardBoost: 10
    });
  }

  function heartBurst(x, y, count = 25) {
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(x, y, {
        isHeart: true,
        color: ['#FF1493', '#FF69B4', '#FF477E', '#FF70A6', '#E01E5A'][Math.floor(Math.random() * 5)],
        velocityMultiplier: 0.8,
        upwardBoost: 6
      }));
    }
    if (!animationFrameId) {
      loop();
    }
  }

  window.confetti = {
    burst: triggerBurst,
    cannon: cannonBlast,
    hearts: heartBurst
  };
})(window);
