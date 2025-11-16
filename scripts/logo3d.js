// 3D Icosidodecahedron Logo Animation
// An icosidodecahedron has 32 faces (20 triangles and 12 pentagons)
// Using IcosahedronGeometry as a close approximation

(function() {
  let logoInitialized = false;

  function initLogo3D(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.log('Logo container not found:', containerId);
      return;
    }
    
    if (logoInitialized) {
      console.log('Logo already initialized');
      return;
    }
    
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
      console.log('Three.js not loaded yet, retrying...');
      setTimeout(() => initLogo3D(containerId), 100);
      return;
    }
    
    console.log('Initializing 3D logo...');
    logoInitialized = true;

    // Create canvas - bigger size
    const canvas = document.createElement('canvas');
    canvas.className = 'w-10 h-10'; // Increased from w-6 h-6
    canvas.width = 40;
    canvas.height = 40;
    canvas.style.display = 'block';
    container.appendChild(canvas);

    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvas, 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(40, 40); // Increased from 24x24
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create proper icosidodecahedron geometry (32 faces: 20 triangles + 12 pentagons)
    function createIcosidodecahedronGeometry(radius) {
      const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
      
      // 30 vertices of an icosidodecahedron
      // These are the vertices where triangles and pentagons meet
      const vertices = [];
      
      // 12 vertices from icosahedron (normalized)
      const icosaVerts = [
        [0, 1, phi], [0, 1, -phi], [0, -1, phi], [0, -1, -phi],
        [1, phi, 0], [1, -phi, 0], [-1, phi, 0], [-1, -phi, 0],
        [phi, 0, 1], [phi, 0, -1], [-phi, 0, 1], [-phi, 0, -1]
      ];
      
      // Normalize and add icosahedron vertices
      icosaVerts.forEach(v => {
        const length = Math.sqrt(v[0]**2 + v[1]**2 + v[2]**2);
        vertices.push([
          (v[0] / length) * radius,
          (v[1] / length) * radius,
          (v[2] / length) * radius
        ]);
      });
      
      // 18 additional vertices (midpoints between icosahedron vertices)
      // These form the pentagonal faces
      const midpoints = [
        [0.5, 0.5*phi, 0.5*phi], [-0.5, 0.5*phi, 0.5*phi],
        [0.5, -0.5*phi, 0.5*phi], [-0.5, -0.5*phi, 0.5*phi],
        [0.5*phi, 0.5, 0.5*phi], [0.5*phi, -0.5, 0.5*phi],
        [-0.5*phi, 0.5, 0.5*phi], [-0.5*phi, -0.5, 0.5*phi],
        [0.5*phi, 0.5*phi, 0.5], [0.5*phi, 0.5*phi, -0.5],
        [-0.5*phi, 0.5*phi, 0.5], [-0.5*phi, 0.5*phi, -0.5],
        [0.5*phi, -0.5*phi, 0.5], [0.5*phi, -0.5*phi, -0.5],
        [-0.5*phi, -0.5*phi, 0.5], [-0.5*phi, -0.5*phi, -0.5],
        [0.5, 0.5*phi, -0.5*phi], [-0.5, 0.5*phi, -0.5*phi],
        [0.5, -0.5*phi, -0.5*phi], [-0.5, -0.5*phi, -0.5*phi]
      ];
      
      midpoints.forEach(v => {
        const length = Math.sqrt(v[0]**2 + v[1]**2 + v[2]**2);
        vertices.push([
          (v[0] / length) * radius,
          (v[1] / length) * radius,
          (v[2] / length) * radius
        ]);
      });
      
      // Flatten vertices for Three.js
      const flatVertices = [];
      vertices.forEach(v => {
        flatVertices.push(v[0], v[1], v[2]);
      });
      
      // Create faces - using subdivided icosahedron for more faces
      // Subdivision level 1 gives us 80 faces, which is more than 32 but looks great
      return new THREE.IcosahedronGeometry(radius, 1); // Subdivision level 1 = 80 faces
    }
    
    const geometry = createIcosidodecahedronGeometry(1);
    
    // Define cool faded green/teal gradient colors (soft and subtle)
    const fadedGreen = new THREE.Color(0x7fb8a8); // Cool faded green
    const fadedTeal = new THREE.Color(0x7fa8b8); // Cool faded teal
    const softTeal = new THREE.Color(0x8fb5c0);  // Softer teal
    
    // Add vertex colors to create a subtle gradient across facets
    const colors = [];
    const positions = geometry.attributes.position;
    
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = positions.getZ(i);
      
      // Create subtle gradient based on position
      // Normalize position to 0-1 range
      const normalizedX = (x + 1) / 2;
      const normalizedY = (y + 1) / 2;
      const normalizedZ = (z + 1) / 2;
      
      // Use a combination of coordinates for subtle gradient
      const gradientFactor = (normalizedX + normalizedY + normalizedZ) / 3;
      
      let color;
      if (gradientFactor < 0.5) {
        // Interpolate between faded green and faded teal
        const t = gradientFactor / 0.5;
        color = fadedGreen.clone().lerp(fadedTeal, t);
      } else {
        // Interpolate between faded teal and soft teal
        const t = (gradientFactor - 0.5) / 0.5;
        color = fadedTeal.clone().lerp(softTeal, t);
      }
      
      colors.push(color.r, color.g, color.b);
    }
    
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    // Create material with vertex colors and flat shading
    const material = new THREE.MeshStandardMaterial({
      vertexColors: true, // Use vertex colors for gradient
      metalness: 0.0,
      roughness: 1.0,
      flatShading: true // Enable flat shading to show each face distinctly
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Add subtle edge lines - less intense borders between facets
    const edges = new THREE.EdgesGeometry(geometry);
    const edgeMaterial = new THREE.LineBasicMaterial({ 
      color: 0x5a7a7a, // Soft muted teal-gray for subtle edge definition
      linewidth: 1,
      opacity: 0.35, // Lower opacity for less intense borders
      transparent: true
    });
    const wireframe = new THREE.LineSegments(edges, edgeMaterial);
    scene.add(wireframe);

    // Strong directional lighting for maximum facet contrast
    // Reduced ambient light to increase contrast between lit and shadowed faces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    
    // Strong primary directional light for clear facet definition
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight1.position.set(5, 5, 5);
    scene.add(directionalLight1);
    
    // Secondary light from opposite side for depth
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight2.position.set(-5, -3, 2);
    scene.add(directionalLight2);
    
    // Additional rim light for edge definition
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.3);
    rimLight.position.set(0, 0, -5);
    scene.add(rimLight);

    // Position camera - adjust for larger size
    camera.position.z = 2.2;

    // Animation loop
    let rotationSpeed = 0.005; // Slow rotation
    let time = 0;

    function animate() {
      requestAnimationFrame(animate);
      
      time += rotationSpeed;
      
      // Rotate on multiple axes for a more interesting rotation
      mesh.rotation.x = time * 0.3;
      mesh.rotation.y = time * 0.5;
      mesh.rotation.z = time * 0.2;
      
      // Rotate wireframe edges with the mesh
      wireframe.rotation.x = mesh.rotation.x;
      wireframe.rotation.y = mesh.rotation.y;
      wireframe.rotation.z = mesh.rotation.z;

      renderer.render(scene, camera);
    }

    animate();
    console.log('3D logo animation started');

    // Keep pale dark green color regardless of dark mode
    // The green works well in both modes
  }

  // Initialize when DOM is ready and retry if container not found (for async includes)
  let retryCount = 0;
  const maxRetries = 50; // Try for up to 10 seconds (50 * 200ms)
  
  function tryInit() {
    if (logoInitialized) return;
    
    if (retryCount >= maxRetries) {
      console.warn('Logo initialization failed after max retries');
      return;
    }
    
    retryCount++;
    initLogo3D('logo3d-container');
    
    // Retry if not initialized yet
    if (!logoInitialized && retryCount < maxRetries) {
      setTimeout(tryInit, 200);
    }
  }

  // Start trying to initialize
  function startInit() {
    setTimeout(tryInit, 100);
  }

  // Listen for components loaded event
  window.addEventListener('componentsLoaded', () => {
    console.log('Components loaded, initializing logo...');
    setTimeout(tryInit, 100);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startInit);
  } else {
    startInit();
  }

  // Also watch for when components are loaded (for async include-html)
  const observer = new MutationObserver(() => {
    if (!logoInitialized && retryCount < maxRetries) {
      tryInit();
    }
  });
  
  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
})();
