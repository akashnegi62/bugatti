import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { RGBELoader } from "https://cdn.jsdelivr.net/npm/three@0.116.1/examples/jsm/loaders/RGBELoader.js";

function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,

    // for tablet smooth
    tablet: { smooth: true },

    // for mobile
    smartphone: { smooth: true },
  });
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  ScrollTrigger.refresh();
}
function elements() {
  // Scene setup

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  const three1 = document.querySelector(".three1");
  three1.appendChild(renderer.domElement);

  // 3D model

  const loader = new GLTFLoader();
  loader.load(
    "models/white.glb",
    (gltf) => {
      // Add the model to the scene
      const model = gltf.scene;

      // Set the position (x, y, z)
      model.position.set(0, 0, 0); // Adjust as needed

      // Set the scale (x, y, z)
      model.scale.set(0.03, 0.03, 0.03); // Adjust as needed

      // Set the rotation (x, y, z)
      model.rotation.y = Math.PI;

      camera.position.set(0, 1.3, 4.6);

      scene.add(model);

      // ----------------------------------------------

      // GSAP to animate the model
      gsap.to(model.rotation, {
        y: Math.PI * 6,
        duration: 60,
        repeat: -1,
        yoyo: true,
      });
      // ---------------------------------------------------
    },
    undefined,
    (error) => {
      console.error(error);
    }
  );

  // Create ambient light

  const ambientLight = new THREE.AmbientLight(0xffffff, 1); // white light at half intensity
  scene.add(ambientLight);

  // Create a directional light

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // white light at full intensity
  directionalLight.position.set(5, 10, 7); // Adjust position as needed
  directionalLight.castShadow = true; // Enable shadows

  // Optional: Set up shadow properties
  directionalLight.shadow.mapSize.width = 512; // Default
  directionalLight.shadow.mapSize.height = 512; // Default
  directionalLight.shadow.camera.near = 0.5; // Default
  directionalLight.shadow.camera.far = 50; // Default
  directionalLight.shadow.camera.left = -10; // Default
  directionalLight.shadow.camera.right = 10; // Default
  directionalLight.shadow.camera.top = 10; // Default
  directionalLight.shadow.camera.bottom = -10; // Default

  // Add light to the scene
  scene.add(directionalLight);

  // Create a hemisphere light
  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1); // Sky color, ground color, intensity
  scene.add(hemisphereLight);

  // Set up OrbitControls

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.enableZoom = false;

  // Load HDR environment map

  const rgbeLoader = new RGBELoader();
  rgbeLoader.load(
    "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/cobblestone_street_night_1k.hdr",
    (texture) => {
      texture.mapping = THREE.EquirectangularRefractionMapping;
      // scene.background = texture;
      scene.environment = texture;
    }
  );

  // Animation loop
  function animate() {
    controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  // Handle window resizing

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  animate();
}
function elements2() {
  // Scene setup

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  const three2 = document.querySelector(".three2");
  three2.appendChild(renderer.domElement);

  // 3D model

  const loader = new GLTFLoader();
  loader.load(
    "models/light.glb",
    (gltf) => {
      // Add the model to the scene
      const model = gltf.scene;

      // Set the position (x, y, z)
      model.position.set(0, -1, 0); // Adjust as needed

      // Set the scale (x, y, z)
      model.scale.set(2.2, 2.2, 2.2); // Adjust as needed

      // Set the rotation (x, y, z)
      model.rotation.y = (Math.PI / 2) * 3;

      camera.position.set(0, 3, 5);

      scene.add(model);

      // ----------------------------------------------

      // GSAP to animate the model
      gsap.to(model.rotation, {
        y: Math.PI * 6,
        duration: 50,
        repeat: -1,
        yoyo: true,
      });
      // ---------------------------------------------------
    },
    undefined,
    (error) => {
      console.error(error);
    }
  );

  // Create ambient light

  const ambientLight = new THREE.AmbientLight(0xffffff, 1); // white light at half intensity
  scene.add(ambientLight);

  // Create a directional light

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // white light at full intensity
  directionalLight.position.set(5, 10, 7); // Adjust position as needed
  directionalLight.castShadow = true; // Enable shadows

  // Optional: Set up shadow properties
  directionalLight.shadow.mapSize.width = 512; // Default
  directionalLight.shadow.mapSize.height = 512; // Default
  directionalLight.shadow.camera.near = 0.5; // Default
  directionalLight.shadow.camera.far = 50; // Default
  directionalLight.shadow.camera.left = -10; // Default
  directionalLight.shadow.camera.right = 10; // Default
  directionalLight.shadow.camera.top = 10; // Default
  directionalLight.shadow.camera.bottom = -10; // Default

  // Add light to the scene
  scene.add(directionalLight);

  // Create a hemisphere light
  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1); // Sky color, ground color, intensity
  scene.add(hemisphereLight);

  // Set up OrbitControls

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.25;
  controls.screenSpacePanning = false;
  controls.enableZoom = false;

  // Load HDR environment map

  const rgbeLoader = new RGBELoader();
  rgbeLoader.load(
    "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/hangar_interior_4k.hdr",
    (texture) => {
      texture.mapping = THREE.EquirectangularRefractionMapping;
      // scene.background = texture;
      scene.environment = texture;
    }
  );

  // Animation loop
  function animate() {
    controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  // Handle window resizing

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  animate();
}
function elements3() {
  // Scene setup

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  const three3 = document.querySelector(".three3");
  three3.appendChild(renderer.domElement);

  // 3D model

  const loader = new GLTFLoader();
  loader.load(
    "models/blue.glb",
    (gltf) => {
      // Add the model to the scene
      const model = gltf.scene;

      // Set the position (x, y, z)
      model.position.set(0, -2, 0); // Adjust as needed

      // Set the scale (x, y, z)
      model.scale.set(1.6, 1.6, 1.6); // Adjust as needed

      // Set the rotation (x, y, z)
      model.rotation.y = (Math.PI / 1) * 2;

      camera.position.set(0, 2, 5);

      scene.add(model);

      // ----------------------------------------------

      // GSAP to animate the model
      gsap.to(model.rotation, {
        y: Math.PI * 6,
        duration: 50,
        repeat: -1,
        yoyo: true,
      });

      // ---------------------------------------------------
    },
    undefined,
    (error) => {
      console.error(error);
    }
  );

  // Create ambient light

  const ambientLight = new THREE.AmbientLight(0xffffff, 1); // white light at half intensity
  scene.add(ambientLight);

  // Create a directional light

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // white light at full intensity
  directionalLight.position.set(5, 10, 7); // Adjust position as needed
  directionalLight.castShadow = true; // Enable shadows

  // Optional: Set up shadow properties
  directionalLight.shadow.mapSize.width = 512; // Default
  directionalLight.shadow.mapSize.height = 512; // Default
  directionalLight.shadow.camera.near = 0.5; // Default
  directionalLight.shadow.camera.far = 50; // Default
  directionalLight.shadow.camera.left = -10; // Default
  directionalLight.shadow.camera.right = 10; // Default
  directionalLight.shadow.camera.top = 10; // Default
  directionalLight.shadow.camera.bottom = -10; // Default

  // Add light to the scene
  scene.add(directionalLight);

  // Create a hemisphere light
  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1); // Sky color, ground color, intensity
  scene.add(hemisphereLight);

  // Set up OrbitControls

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.25;
  controls.screenSpacePanning = false;
  controls.enableZoom = false;

  // Load HDR environment map

  const rgbeLoader = new RGBELoader();
  rgbeLoader.load(
    "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/metro_noord_4k.hdr",
    (texture) => {
      texture.mapping = THREE.EquirectangularRefractionMapping;
      // scene.background = texture;
      scene.environment = texture;
    }
  );

  // Animation loop
  function animate() {
    controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  // Handle window resizing

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  animate();
}
function HoverEffect() {
  let hover = document.querySelector("#model1");
  let target = document.querySelector("#clone1");
  let hover2 = document.querySelector("#model2");
  let target2 = document.querySelector("#clone2");
  let hover3 = document.querySelector("#model3");
  let target3 = document.querySelector("#clone3");
  let hover4 = document.querySelector("#model4");
  let target4 = document.querySelector("#clone4");

  hover.addEventListener("mouseenter", () => {
    target.style.transform = "scaleY(1)";
  });

  hover.addEventListener("mouseleave", () => {
    target.style.transform = "scaleY(0)";
  });

  hover2.addEventListener("mouseenter", () => {
    target2.style.transform = "scaleY(1)";
  });

  hover2.addEventListener("mouseleave", () => {
    target2.style.transform = "scaleY(0)";
  });

  hover3.addEventListener("mouseenter", () => {
    target3.style.transform = "scaleY(1)";
  });

  hover3.addEventListener("mouseleave", () => {
    target3.style.transform = "scaleY(0)";
  });

  hover4.addEventListener("mouseenter", () => {
    target4.style.transform = "scaleY(1)";
  });

  hover4.addEventListener("mouseleave", () => {
    target4.style.transform = "scaleY(0)";
  });

  let model = document.querySelectorAll(".model");
  let shower = document.querySelector(".shower");

  model.forEach((e) => {
    e.addEventListener("mouseenter", () => {
      gsap.to(shower, {
        opacity: 1,
        scale: 1,
        y: 0,
        ease: "back",
        duration: 0.5,
      });
      let image = e.getAttribute("data-img");
      shower.style.backgroundImage = `url(${image})`;
    });

    e.addEventListener("mouseleave", () => {
      gsap.to(shower, {
        opacity: 0,
        scale: 0,
        y: 0,
        ease: "back",
        duration: 0.5,
      });
    });
  });
}
function gsapAnimation() {
  const tl = gsap.timeline();

  tl.to(".page2", {
    scrollTrigger: {
      trigger: ".page2",
      scroller: "#main",
      start: "top 0%",
      end: "top -60%",
      // markers: true,
      scrub: true,
      pin: true,
    },
  });

  tl.to(".img-container", {
    scale: 4,
    y: "-120%",
    x: "-4%",
    scrollTrigger: {
      trigger: ".page2",
      scroller: "#main",
      start: "top 0%",
      end: "top -60%",
      // markers: true,
      scrub: true,
    },
  });

  tl.to(".page4", {
    scrollTrigger: {
      trigger: ".page4",
      scroller: "#main",
      start: "top 0%",
      end: "top -100%",
      // markers: true,
      scrub: true,
      pin: true,
    },
  });

  tl.to(".moto", {
    x: "-200%",
    scrollTrigger: {
      trigger: ".page4",
      scroller: "#main",
      start: "top 0%",
      end: "top -100%",
      // markers: true,
      scrub: true,
    },
  });

  tl.to(".moto h1", {
    color: "blue",
    scrollTrigger: {
      trigger: ".page4",
      scroller: "#main",
      start: "top 0%",
      end: "top -70%",
      // markers: true,
      scrub: true,
    },
  });

  tl.to(".page7", {
    scrollTrigger: {
      trigger: ".page7",
      scroller: "#main",
      start: "top 0%",
      end: "top -50%",
      // markers: true,
      scrub: true,
      pin: true,
    },
  });

  tl.to(".page7", {
    backgroundColor: "white",
    scrollTrigger: {
      trigger: ".page7",
      scroller: "#main",
      start: "top 0%",
      end: "top -100%",
      // markers: true,
      scrub: true,
    },
  });

  tl.to(".wrapper", {
    scale: 60,
    rotate: 360,
    y: "800%",
    x: "-500%",
    backgroundColor: "white",
    scrollTrigger: {
      trigger: ".page7",
      scroller: "#main",
      start: "top 0%",
      end: "top -100%",
      // markers: true,
      scrub: true,
    },
  });

  tl.to(".asterisk", {
    backgroundColor: "white",
    scrollTrigger: {
      trigger: ".page7",
      scroller: "#main",
      start: "top 0%",
      end: "top -100%",
      // markers: true,
      scrub: true,
    },
  });

  tl.to(".page8", {
    scrollTrigger: {
      trigger: ".page8",
      scroller: "#main",
      start: "top 0%",
      end: "top -50%",
      // markers: true,
      scrub: true,
      pin: true,
    },
  });

  tl.to(".half1", {
    y: "-100%",
    scrollTrigger: {
      trigger: ".page8",
      scroller: "#main",
      start: "top 0%",
      end: "top -50%",
      // markers: true,
      scrub: true,
    },
  });

  tl.to(".half2", {
    y: "100%",
    scrollTrigger: {
      trigger: ".page8",
      scroller: "#main",
      start: "top 0%",
      end: "top -50%",
      // markers: true,
      scrub: true,
    },
  });

  tl.to(".half1 h1", {
    y: "30%",
    scrollTrigger: {
      trigger: ".page8",
      scroller: "#main",
      start: "top -10%",
      end: "top -30%",
      // markers: true,
      scrub: true,
    },
  });

  tl.to(".half2 h1", {
    y: "-30%",
    scrollTrigger: {
      trigger: ".page8",
      scroller: "#main",
      start: "top -10%",
      end: "top -30%",
      // markers: true,
      scrub: true,
    },
  });

  tl.from("#brand1", {
    x: "-50%",
    opacity: 0,
    scrollTrigger: {
      trigger: ".page8",
      scroller: "#main",
      start: "top 0%",
      end: "top -60%",
      // markers: true,
      scrub: true,
    },
  });

  tl.from("#brand2", {
    y: "-50%",
    opacity: 0,
    scrollTrigger: {
      trigger: ".page8",
      scroller: "#main",
      start: "top 0%",
      end: "top -60%",
      // markers: true,
      scrub: true,
    },
  });

  tl.from("#brand3", {
    x: "50%",
    opacity: 0,
    scrollTrigger: {
      trigger: ".page8",
      scroller: "#main",
      start: "top 0%",
      end: "top -60%",
      // markers: true,
      scrub: true,
    },
  });

  tl.from(".brands h1", {
    y: "100%",
    opacity: 0,
    scrollTrigger: {
      trigger: ".page8",
      scroller: "#main",
      start: "top 0%",
      end: "top -60%",
      // markers: true,
      scrub: true,
    },
  });

  tl.to(".parallex", {
    height: "70vh",
    width: "100%",
    transform: "rotate(0deg)",
    scrollTrigger: {
      trigger: ".page9",
      scroller: "#main",
      start: "top 10%",
      end: "top -20%",
      // markers: true,
      scrub: true,
    },
  });

  tl.to(".topview h1", {
    fontSize: "18vw",
    x: "-200%",
    scrollTrigger: {
      trigger: ".page9",
      scroller: "#main",
      start: "top 10%",
      end: "top -20%",
      // markers: true,
      scrub: true,
    },
  });

  tl.to(".topview h2", {
    fontSize: "18vw",
    x: "100%",
    scrollTrigger: {
      trigger: ".page9",
      scroller: "#main",
      start: "top 10%",
      end: "top -20%",
      // markers: true,
      scrub: true,
    },
  });

}
function HoverVideo() {
  let visual1 = document.querySelector("#visual1");
  let visual2 = document.querySelector("#visual2");
  let visual3 = document.querySelector("#visual3");
  let video1 = document.querySelector("#visual1 video");
  let video2 = document.querySelector("#visual2 video");
  let video3 = document.querySelector("#visual3 video");

  visual1.addEventListener("mouseenter", () => {
    video1.style.zIndex = "1";
    video1.play();
    video1.load();
  });
  visual1.addEventListener("mouseleave", () => {
    video1.style.zIndex = "-1";
    video1.pause();
  });

  visual2.addEventListener("mouseenter", () => {
    video2.style.zIndex = "1";
    video2.play();
    video2.load();
  });
  visual2.addEventListener("mouseleave", () => {
    video2.style.zIndex = "-1";
    video2.pause();
  });

  visual3.addEventListener("mouseenter", () => {
    video3.style.zIndex = "1";
    video3.play();
    video3.load();
  });
  visual3.addEventListener("mouseleave", () => {
    video3.style.zIndex = "-1";
    video3.pause();
  });
}
function tilt() {
  const image = document.querySelector(".logo img");

  document.addEventListener("mousemove", (event) => {
    const { clientX, clientY } = event;
    const { offsetWidth, offsetHeight } = image;

    const x = ((clientX - offsetWidth / 2) / (offsetWidth / 2)) * 8; // Adjust tilt strength
    const y = ((clientY - offsetHeight / 2) / (offsetHeight / 2)) * 8; // Adjust tilt strength

    image.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  });

  document.addEventListener("mouseleave", () => {
    image.style.transform = "rotateY(0deg) rotateX(0deg)";
  });
}
function cursor() {
  let crsr = document.querySelector(".cursor");
  let crsr2 = document.querySelector(".cursor2");
  let hero = document.querySelector("#hero");
  let page6 = document.querySelector(".page6");

  hero.addEventListener("mousemove", (e) => {
    gsap.to(crsr, {
      x: e.x - 10,
      y: e.y - 10,
    });
  });

  hero.addEventListener("mouseenter", () => {
    crsr.style.scale = "1";
  });

  hero.addEventListener("mouseleave", () => {
    crsr.style.scale = "0";
  });

  page6.addEventListener("mousemove", (e) => {
    gsap.to(crsr2, {
      x: e.x - 60,
      y: e.y - 60,
    });
  });

  page6.addEventListener("mouseenter", () => {
    crsr2.style.scale = "1";
  });

  page6.addEventListener("mouseleave", () => {
    crsr2.style.scale = "0";
  });
}
function clickEvents() {
  let next1 = document.querySelector("#next1");
  let next2 = document.querySelector("#next2");
  let next3 = document.querySelector("#next3");
  let three2 = document.querySelector(".three2");
  let three3 = document.querySelector(".three3");

  next1.addEventListener("click", () => {
    three2.classList.add("active");
  });

  next2.addEventListener("click", () => {
    three3.classList.add("active");
  });

  next3.addEventListener("click", () => {
    three2.classList.remove("active");
    three3.classList.remove("active");
  });

  let hero = document.querySelector("#hero");
  hero.addEventListener("click", () => {
    hero.style.top = "-100%";
  });
}
locomotiveAnimation();
elements();
elements2();
elements3();
HoverEffect();
gsapAnimation();
HoverVideo();
tilt();
cursor();
clickEvents();
