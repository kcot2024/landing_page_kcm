const canvas = document.getElementById('fogCanvas');
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles = [];
    const numParticles = 180;
    const mouse = { x: -1000, y: -1000 };

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 100 + 50,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.15 + 0.05
      });
    }

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('resize', () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });

    function draw() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        // Reacción al cursor
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.x += dx / dist * 1.5;
          p.y += dy / dist * 1.5;
        }

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < -p.radius || p.x > width + p.radius) p.dx *= -1;
        if (p.y < -p.radius || p.y > height + p.radius) p.dy *= -1;

        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        gradient.addColorStop(0, `rgba(0, 0, 0, ${p.alpha})`);
        gradient.addColorStop(1, `rgba(80, 80, 80, 0)`); // Gris oscuro transparente
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    draw();