import { useMemo, useState, useRef, useEffect } from "react";
import { Renderer, Program, Triangle, Mesh } from "ogl";
import GradualBlur from "@components/ui/GradualBlur";

type RaysOrigin =
  | "top-center"
  | "top-left"
  | "top-right"
  | "right"
  | "left"
  | "bottom-center"
  | "bottom-right"
  | "bottom-left";

interface LightRaysProps {
  raysOrigin?: RaysOrigin;
  raysColor?: string;
  raysSpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  pulsating?: boolean;
  fadeDistance?: number;
  saturation?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  noiseAmount?: number;
  distortion?: number;
  className?: string;
}

const hexToRgb = (hex: string): [number, number, number] => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255]
    : [1, 1, 1];
};

const getAnchorAndDir = (
  origin: RaysOrigin,
  w: number,
  h: number,
): { anchor: [number, number]; dir: [number, number] } => {
  const outside = 0.2;
  switch (origin) {
    case "top-left":
      return { anchor: [0, -outside * h], dir: [0, 1] };
    case "top-right":
      return { anchor: [w, -outside * h], dir: [0, 1] };
    case "left":
      return { anchor: [-outside * w, 0.5 * h], dir: [1, 0] };
    case "right":
      return { anchor: [(1 + outside) * w, 0.5 * h], dir: [-1, 0] };
    case "bottom-left":
      return { anchor: [0, (1 + outside) * h], dir: [0, -1] };
    case "bottom-center":
      return { anchor: [0.5 * w, (1 + outside) * h], dir: [0, -1] };
    case "bottom-right":
      return { anchor: [w, (1 + outside) * h], dir: [0, -1] };
    default:
      return { anchor: [0.5 * w, -outside * h], dir: [0, 1] };
  }
};

const LightRays: React.FC<LightRaysProps> = ({
  raysOrigin = "top-center",
  raysColor = "#ffffff",
  raysSpeed = 1,
  lightSpread = 1,
  rayLength = 2,
  pulsating = false,
  fadeDistance = 1.0,
  saturation = 1.0,
  followMouse = false,
  mouseInfluence = 0.0,
  noiseAmount = 0.0,
  distortion = 0.0,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniformsRef = useRef<any>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });
  const animationIdRef = useRef<number | null>(null);
  const meshRef = useRef<Mesh | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new IntersectionObserver(([e]) => setIsVisible(e.isIntersecting), {
      threshold: 0.1,
    });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;
    cleanupRef.current?.();
    cleanupRef.current = null;

    const init = async () => {
      if (!containerRef.current) return;
      await new Promise((r) => setTimeout(r, 10));
      if (!containerRef.current) return;

      const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 2), alpha: true });
      rendererRef.current = renderer;
      const gl = renderer.gl;
      gl.canvas.style.width = "100%";
      gl.canvas.style.height = "100%";
      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
      containerRef.current.appendChild(gl.canvas);

      const vert = `
attribute vec2 position;
varying vec2 vUv;
void main(){vUv=position*.5+.5;gl_Position=vec4(position,0.,1.);}`;

      const frag = `precision highp float;
uniform float iTime;uniform vec2 iResolution;uniform vec2 rayPos;uniform vec2 rayDir;
uniform vec3 raysColor;uniform float raysSpeed;uniform float lightSpread;uniform float rayLength;
uniform float pulsating;uniform float fadeDistance;uniform float saturation;
uniform vec2 mousePos;uniform float mouseInfluence;uniform float noiseAmount;uniform float distortion;
varying vec2 vUv;
float noise(vec2 st){return fract(sin(dot(st,vec2(12.9898,78.233)))*43758.5453123);}
float rayStrength(vec2 src,vec2 refDir,vec2 coord,float sA,float sB,float spd){
  vec2 s2c=coord-src;vec2 dn=normalize(s2c);float ca=dot(dn,refDir);
  float da=ca+distortion*sin(iTime*2.+length(s2c)*.01)*.2;
  float sf=pow(max(da,0.),1./max(lightSpread,.001));
  float dist=length(s2c);float md=iResolution.x*rayLength;
  float lf=clamp((md-dist)/md,0.,1.);
  float ff=clamp((iResolution.x*fadeDistance-dist)/(iResolution.x*fadeDistance),.5,1.);
  float pulse=pulsating>.5?(0.8+0.2*sin(iTime*spd*3.)):1.;
  float bs=clamp((0.45+0.15*sin(da*sA+iTime*spd))+(0.3+0.2*cos(-da*sB+iTime*spd)),0.,1.);
  return bs*lf*ff*sf*pulse;}
void mainImage(out vec4 fc,in vec2 coord){
  vec2 c=vec2(coord.x,iResolution.y-coord.y);
  vec2 frd=rayDir;
  if(mouseInfluence>0.){vec2 mp=mousePos*iResolution.xy;vec2 md=normalize(mp-rayPos);frd=normalize(mix(rayDir,md,mouseInfluence));}
  vec4 r1=vec4(1.)*rayStrength(rayPos,frd,c,36.2214,21.11349,1.5*raysSpeed);
  vec4 r2=vec4(1.)*rayStrength(rayPos,frd,c,22.3991,18.0234,1.1*raysSpeed);
  fc=r1*.5+r2*.4;
  if(noiseAmount>0.){float n=noise(c*.01+iTime*.1);fc.rgb*=(1.-noiseAmount+noiseAmount*n);}
  float br=1.-(c.y/iResolution.y);
  fc.x*=.1+br*.8;fc.y*=.3+br*.6;fc.z*=.5+br*.5;
  if(saturation!=1.){float g=dot(fc.rgb,vec3(.299,.587,.114));fc.rgb=mix(vec3(g),fc.rgb,saturation);}
  fc.rgb*=raysColor;}
void main(){vec4 color;mainImage(color,gl_FragCoord.xy);gl_FragColor=color;}`;

      const uniforms: any = {
        iTime: { value: 0 },
        iResolution: { value: [1, 1] as [number, number] },
        rayPos: { value: [0, 0] as [number, number] },
        rayDir: { value: [0, 1] as [number, number] },
        raysColor: { value: hexToRgb(raysColor) },
        raysSpeed: { value: raysSpeed },
        lightSpread: { value: lightSpread },
        rayLength: { value: rayLength },
        pulsating: { value: pulsating ? 1.0 : 0.0 },
        fadeDistance: { value: fadeDistance },
        saturation: { value: saturation },
        mousePos: { value: [0.5, 0.5] as [number, number] },
        mouseInfluence: { value: mouseInfluence },
        noiseAmount: { value: noiseAmount },
        distortion: { value: distortion },
      };
      uniformsRef.current = uniforms;

      const geometry = new Triangle(gl);
      const program = new Program(gl, { vertex: vert, fragment: frag, uniforms });
      const mesh = new Mesh(gl, { geometry, program });
      meshRef.current = mesh;

      const updatePlacement = () => {
        if (!containerRef.current || !renderer) return;
        renderer.dpr = Math.min(window.devicePixelRatio, 2);
        const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;
        renderer.setSize(wCSS, hCSS);
        const dpr = renderer.dpr;
        const w = wCSS * dpr,
          h = hCSS * dpr;
        uniforms.iResolution.value = [w, h];
        const { anchor, dir } = getAnchorAndDir(raysOrigin, w, h);
        uniforms.rayPos.value = anchor;
        uniforms.rayDir.value = dir;
      };

      const loop = (t: number) => {
        if (!rendererRef.current || !uniformsRef.current || !meshRef.current) return;
        uniforms.iTime.value = t * 0.001;
        if (followMouse && mouseInfluence > 0) {
          const sm = 0.92;
          smoothMouseRef.current.x = smoothMouseRef.current.x * sm + mouseRef.current.x * (1 - sm);
          smoothMouseRef.current.y = smoothMouseRef.current.y * sm + mouseRef.current.y * (1 - sm);
          uniforms.mousePos.value = [smoothMouseRef.current.x, smoothMouseRef.current.y];
        }
        try {
          renderer.render({ scene: mesh });
          animationIdRef.current = requestAnimationFrame(loop);
        } catch {
          return;
        }
      };

      const resizeObserver =
        typeof ResizeObserver !== "undefined"
          ? new ResizeObserver(() => updatePlacement())
          : null;
      resizeObserver?.observe(containerRef.current);

      window.addEventListener("resize", updatePlacement);
      updatePlacement();
      animationIdRef.current = requestAnimationFrame(loop);

      cleanupRef.current = () => {
        if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
        window.removeEventListener("resize", updatePlacement);
        resizeObserver?.disconnect();
        try {
          const canvas = renderer.gl.canvas;
          renderer.gl.getExtension("WEBGL_lose_context")?.loseContext();
          canvas?.parentNode?.removeChild(canvas);
        } catch {}
        rendererRef.current = uniformsRef.current = meshRef.current = null;
      };
    };

    init();
    return () => {
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [
    isVisible,
    raysOrigin,
    raysColor,
    raysSpeed,
    lightSpread,
    rayLength,
    pulsating,
    fadeDistance,
    saturation,
    followMouse,
    mouseInfluence,
    noiseAmount,
    distortion,
  ]);

  useEffect(() => {
    if (!followMouse) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [followMouse]);

  return <div ref={containerRef} className={`light-rays-canvas ${className}`.trim()} />;
};

const FAQ_ITEMS = [
  {
    id: "faq-1",
    question: "How much does a static website or app cost?",
    answer:
      "Static site pricing depends on page count, design complexity, and content volume. Smaller presentation sites are more affordable, while more sections, custom illustrations, and advanced animations increase the budget.",
  },
  {
    id: "faq-2",
    question: "How much does a dynamic web application cost?",
    answer:
      "Dynamic apps include databases, user accounts, admin panels, and integrations. With added functionality and security, pricing is higher and is usually set after a brief requirements review.",
  },
  {
    id: "faq-3",
    question: "How long does a web project take?",
    answer:
      "Timelines depend on scope. Simple sites can be done in 1-2 weeks, while complex apps often take 4-8+ weeks across design, development, and testing phases.",
  },
  {
    id: "faq-4",
    question: "Does pricing vary by project complexity?",
    answer:
      "Yes. Feature count, automation level, integrations (payments, APIs, CRM), and UX complexity all impact the budget. Every quote is tailored to the project.",
  },
  {
    id: "faq-5",
    question: "What affects the final price the most?",
    answer:
      "Scope, design quality, number of screens, animations, and needs like SEO, performance optimization, and multi-language support are the biggest factors.",
  },
  {
    id: "faq-6",
    question: "Do you offer maintenance and updates?",
    answer:
      "Yes. After launch I provide maintenance, security updates, and small changes by agreement, with the option of a monthly support package.",
  },
];

export function FAQ() {
  const [openItems, setOpenItems] = useState<string[]>(["faq-1"]);
  const openSet = useMemo(() => new Set(openItems), [openItems]);
  const leftItems = FAQ_ITEMS.slice(0, 3);
  const rightItems = FAQ_ITEMS.slice(3);

  const toggleItem = (id: string) =>
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));

  return (
    <section id="faq" className="faq-section">
      <LightRays
        raysOrigin="top-center"
        raysColor="#ffffff"
        raysSpeed={0.6}
        lightSpread={0.6}
        rayLength={2.5}
        followMouse={false}
        mouseInfluence={0}
        noiseAmount={0.05}
        distortion={0.1}
        fadeDistance={1.2}
        saturation={0.8}
        pulsating={false}
        className="faq-light-rays"
      />
      <GradualBlur
        target="parent"
        position="bottom"
        height="7rem"
        strength={2}
        divCount={6}
        curve="bezier"
        exponential
        opacity={1}
        className="faq-gradual-blur"
      />

      <div className="faq-content">
        <div className="faq-header">
          <span className="faq-label">FAQ</span>
          <p className="faq-subtitle">
            Most common questions about pricing, development time, and many more.
          </p>
        </div>

        <div className="faq-grid">
          {[leftItems, rightItems].map((group, gi) => (
            <div key={gi} className="faq-column">
              {group.map((item) => {
                const isOpen = openSet.has(item.id);
                return (
                  <article key={item.id} className={`faq-item${isOpen ? " is-open" : ""}`}>
                    <button
                      className="faq-trigger"
                      onClick={() => toggleItem(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={`${item.id}-panel`}
                      id={`${item.id}-trigger`}
                      type="button"
                    >
                      <span className="faq-question">{item.question}</span>
                      <span className="faq-icon" aria-hidden="true">
                        +
                      </span>
                    </button>
                    <div
                      className="faq-panel"
                      role="region"
                      id={`${item.id}-panel`}
                      aria-labelledby={`${item.id}-trigger`}
                    >
                      <div className="faq-panel-inner">
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
