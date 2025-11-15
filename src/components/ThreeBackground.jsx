import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ORB_COUNT = 180;
const STAR_COUNT = 1200;

const ThreeBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#020617');
    scene.fog = new THREE.Fog('#020617', 10, 40);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      80
    );
    camera.position.set(0, 2.5, 10);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);

    const blueLight = new THREE.DirectionalLight(0x60a5fa, 1.2);
    blueLight.position.set(5, 8, 5);
    scene.add(blueLight);

    const purpleLight = new THREE.DirectionalLight(0xa855f7, 0.9);
    purpleLight.position.set(-6, -4, -6);
    scene.add(purpleLight);

    const torusGeometry = new THREE.TorusKnotGeometry(1.7, 0.45, 220, 32);
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: '#a855f7',
      metalness: 0.65,
      roughness: 0.25,
      emissive: '#4f46e5',
      emissiveIntensity: 0.9,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(0, 0.1, 0);
    scene.add(torus);

    const orbGeometry = new THREE.SphereGeometry(1, 16, 16);
    const orbMaterial = new THREE.MeshStandardMaterial({
      color: '#7dd3fc',
      emissive: '#1d4ed8',
      emissiveIntensity: 0.9,
      roughness: 0.2,
      metalness: 0.4,
    });
    const orbs = new THREE.InstancedMesh(orbGeometry, orbMaterial, ORB_COUNT);
    scene.add(orbs);

    const orbPositions = new Float32Array(ORB_COUNT * 3);
    const orbScales = new Float32Array(ORB_COUNT);
    const orbSpeeds = new Float32Array(ORB_COUNT);

    const matrix = new THREE.Matrix4();
    const scaleVector = new THREE.Vector3();

    for (let i = 0; i < ORB_COUNT; i += 1) {
      const radius = 6 + Math.random() * 7;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 6;

      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      orbPositions[i * 3] = x;
      orbPositions[i * 3 + 1] = y;
      orbPositions[i * 3 + 2] = z;

      const s = 0.08 + Math.random() * 0.2;
      orbScales[i] = s;
      orbSpeeds[i] = 0.15 + Math.random() * 0.35;

      scaleVector.set(s, s, s);
      matrix.identity().setPosition(x, y, z);
      matrix.scale(scaleVector);
      orbs.setMatrixAt(i, matrix);
    }

    orbs.instanceMatrix.needsUpdate = true;

    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(STAR_COUNT * 3);

    for (let i = 0; i < STAR_COUNT; i += 1) {
      const radius = 12 + Math.random() * 22;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 16;

      starPositions[i * 3] = Math.cos(angle) * radius;
      starPositions[i * 3 + 1] = y;
      starPositions[i * 3 + 2] = Math.sin(angle) * radius;
    }

    starGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(starPositions, 3)
    );

    const starMaterial = new THREE.PointsMaterial({
      size: 0.04,
      color: '#f9fafb',
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.7,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      const rotationOffset = elapsed * 0.2;
      torus.rotation.x = Math.sin(rotationOffset * 0.6) * 0.3;
      torus.rotation.y = rotationOffset;
      torus.position.y = 0.1 + Math.sin(rotationOffset * 0.8) * 0.3;

      for (let i = 0; i < ORB_COUNT; i += 1) {
        const baseX = orbPositions[i * 3];
        const baseY = orbPositions[i * 3 + 1];
        const baseZ = orbPositions[i * 3 + 2];

        const speed = orbSpeeds[i];
        const offset = elapsed * speed;

        const cosOffset = Math.cos(0.05 * offset);
        const sinOffset = Math.sin(0.05 * offset);

        const x = baseX * cosOffset + baseZ * sinOffset;
        const z = -baseX * sinOffset + baseZ * cosOffset;
        const y = baseY + Math.sin(offset * 1.2) * 0.6;

        const s = orbScales[i];
        scaleVector.set(s, s, s);
        matrix.identity().setPosition(x, y, z);
        matrix.scale(scaleVector);
        orbs.setMatrixAt(i, matrix);
      }

      orbs.instanceMatrix.needsUpdate = true;

      stars.rotation.y = elapsed * 0.02;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);

      torusGeometry.dispose();
      torusMaterial.dispose();
      orbGeometry.dispose();
      orbMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
};

export default ThreeBackground;



