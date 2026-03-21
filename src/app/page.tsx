'use client';

import Image from 'next/image';
import { useRef, useEffect, useCallback, type ReactNode } from 'react';
import { LazyMotion, domAnimation, m, useReducedMotion, useMotionValue, useTransform } from 'framer-motion';

const ofertaLink =
  'https://pay.kiwify.com.br/2EF44sD?utm_source=ig&utm_medium=social&utm_content=link_in_bio';

const toolIcons = [
  { src: '/tesoura.svg', label: 'Precisão' },
  { src: '/mustache.svg', label: 'Estilo' },
  { src: '/navalha.svg', label: 'Detalhe' },
];

const metodoCards = [
  {
    title: 'Preço que sustenta lucro',
    text: 'Pare de competir por centavos e construa margem real com posicionamento certo.',
  },
  {
    title: 'Agenda cheia com previsão',
    text: 'Processos de agendamento e experiência que lotam a cadeira.',
  },
  {
    title: 'Equipe com padrão',
    text: 'Treine, acompanhe e padronize atendimento para escalar com consistência.',
  },
  {
    title: 'Marketing de bairro + digital',
    text: 'Conteúdo e prova social que geram fluxo local e autoridade.',
  },
];

const faqItems = [
  {
    q: 'Para quem é o Barber Gestão Pro?',
    a: 'Para barbeiros e donos que querem organizar a operação e crescer com consistência.',
  },
  {
    q: 'O conteúdo é prático?',
    a: "Sim. A base é a rotina real aplicada nas unidades da Copetti's Barbershop.",
  },
  {
    q: 'Preciso ter duas unidades?',
    a: 'Não. O método serve para quem está montando ou já tem uma barbearia em funcionamento.',
  },
];

const HERO_START_IMAGE = '/hero-v2.png';
const HERO_SIDE_IMAGE = '/cadeiradelado2-v2.png';

const MotionSection = ({
  children,
  className,
  delay = 0,
  id,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}) => {
  const reduceMotion = useReducedMotion();

  return (
    <m.section
      id={id}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </m.section>
  );
};

const Tag = ({ children }: { children: ReactNode }) => (
  <span className="uppercase tracking-[0.35em] text-[11px] text-ash/80 font-semibold">{children}</span>
);

export default function Home() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);
  const heroProgress = useMotionValue(0);
  const touchStartY = useRef(0);
  const rafId = useRef(0);
  const targetProgress = useRef(0);
  const isAnimatingProgress = useRef(false);

  // Scroll-hijacking: lock the page during hero transitions
  const SCROLL_SENSITIVITY = 0.0003;
  const MOBILE_SCROLL_BOOST = 2.36; // 18% faster than previous 2x boost
  const HERO_SCROLL_SMOOTHING = 0.22;

  const queueHeroProgressDelta = useCallback((delta: number) => {
    if (!isAnimatingProgress.current) {
      targetProgress.current = heroProgress.get();
    }

    targetProgress.current = Math.max(0, Math.min(1, targetProgress.current + delta));

    if (isAnimatingProgress.current) return;
    isAnimatingProgress.current = true;

    const animateToTarget = () => {
      const current = heroProgress.get();
      const target = targetProgress.current;
      const distance = target - current;

      if (Math.abs(distance) < 0.0015) {
        heroProgress.set(target);
        isAnimatingProgress.current = false;
        rafId.current = 0;
        return;
      }

      heroProgress.set(current + distance * HERO_SCROLL_SMOOTHING);
      rafId.current = requestAnimationFrame(animateToTarget);
    };

    rafId.current = requestAnimationFrame(animateToTarget);
  }, [heroProgress]);

  const handleWheel = useCallback((e: WheelEvent) => {
    const current = heroProgress.get();

    // If user has scrolled past the hero, don't hijack
    if (window.scrollY > 5) return;

    // Hero complete + scrolling down → allow natural page scroll
    if (current >= 1 && e.deltaY > 0) return;

    // All other cases at top of page: hijack scroll for hero transitions
    e.preventDefault();
    queueHeroProgressDelta(e.deltaY * SCROLL_SENSITIVITY);
  }, [heroProgress, queueHeroProgressDelta]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const current = heroProgress.get();
    if (window.scrollY > 5) return;

    const delta = touchStartY.current - e.touches[0].clientY;
    touchStartY.current = e.touches[0].clientY;

    if (current >= 1 && delta > 0) return;

    if (current < 1 || delta < 0) {
      e.preventDefault();
      queueHeroProgressDelta(delta * SCROLL_SENSITIVITY * MOBILE_SCROLL_BOOST);
    }
  }, [heroProgress, queueHeroProgressDelta]);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(rafId.current);
      isAnimatingProgress.current = false;
      targetProgress.current = heroProgress.get();
    };
  }, [handleWheel, handleTouchStart, handleTouchMove, heroProgress]);

  // Image 1 (hero.png): fully visible 0–40%, crossfades out 40–65%
  const startOpacity = useTransform(heroProgress, [0, 0.40, 0.65], [1, 1, 0]);
  const startScale = useTransform(heroProgress, [0, 0.65], [1, 0.97]);

  // Image 2 (cadeiradelado2.png): crossfades in 35–60%, stays 100% visible from 60% to end
  const sideOpacity = useTransform(heroProgress, [0.35, 0.60, 1], [0, 1, 1]);
  const sideScale = useTransform(heroProgress, [0.35, 0.75], [1.04, 1]);

  // Scroll indicator fades out as user starts scrolling
  const scrollIndicatorOpacity = useTransform(heroProgress, [0, 0.08], [1, 0]);

  // Progress bar for visual feedback during locked phase
  const progressBarScale = useTransform(heroProgress, [0, 1], [0, 1]);
  const progressBarOpacity = useTransform(heroProgress, [0, 0.02, 0.95, 1], [0, 1, 1, 0]);

  // Scissors: appears during the crossfade zone, slides left→right across the image
  const scissorX = useTransform(heroProgress, [0.14, 0.34, 0.54], ['-110%', '0%', '110%']);
  const scissorOpacity = useTransform(heroProgress, [0.14, 0.19, 0.34, 0.49, 0.54], [0, 1, 1, 1, 0]);
  const scissorRotate = useTransform(heroProgress, [0.14, 0.34, 0.54], [-12, 0, 12]);
  const cutLineScale = useTransform(heroProgress, [0.16, 0.49], [0, 1]);
  const cutLineOpacity = useTransform(heroProgress, [0.14, 0.19, 0.49, 0.54], [0, 0.6, 0.6, 0]);

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-hero-radial" />
        <div className="absolute inset-0 -z-10 bg-hero-radial-2" />
        <div className="haze-layer -z-10">
          <div className="haze-beam haze-beam-a" />
          <div className="haze-beam haze-beam-b" />
          <div className="haze-beam haze-beam-c" />
        </div>
        <div className="metal-grid pointer-events-none absolute inset-0 -z-10 opacity-40" />

        <header ref={heroRef} className="relative min-h-screen">
          <nav className="fixed left-0 right-0 top-0 z-40">
            <div className="nav-glass mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full border border-white/20 bg-black/50 p-2">
                  <Image src="/navalha.svg" alt="Navalha" width={24} height={24} className="h-full w-full icon-gold" />
                </div>
                <div>
                  <p className="font-display text-xl tracking-widest">BARBER GESTÃO PRO</p>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-ash">Projeto 50K</p>
                </div>
              </div>
              <div className="hidden items-center gap-6 text-xs uppercase tracking-[0.3em] text-ash md:flex">
                <a href="#sobre" className="hover:text-bone">
                  sobre
                </a>
                <a href="#metodo" className="hover:text-bone">
                  método
                </a>
                <a href="#provas" className="hover:text-bone">
                  provas
                </a>
                <a href="#oferta" className="hover:text-bone">
                  oferta
                </a>
              </div>
            </div>
          </nav>

          <div className="flex min-h-screen items-center">
            <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 pb-20 pt-32 grid-cols-1 lg:grid-cols-2 lg:items-center">
              {/* Title block */}
              <div className="order-1">
                <Tag>Mentor de barbearias • Foz do Iguaçu</Tag>
                <h1 className="mt-6 font-display text-[2.95rem] leading-[0.9] tracking-tight text-bone sm:text-[3.55rem]">
                  DE 2 REAIS AO COMANDO DE DUAS BARBEARIAS.
                  <span className="block text-brass">AGORA EU ENSINO VOCÊ A ESCALAR.</span>
                </h1>
              </div>

              {/* Images block */}
              <div className="relative order-2 lg:row-span-2">
                <m.div className="relative">
                  <div className="hero-image-stage relative h-[520px] w-full pointer-events-none select-none">
                    <div className="hero-glow hero-glow-a" />
                    <div className="hero-glow hero-glow-b" />
                    <m.div
                      className="absolute inset-0 z-10"
                      style={{ opacity: startOpacity, scale: startScale, willChange: 'transform, opacity' }}
                    >
                      <Image
                        src={HERO_START_IMAGE}
                        alt="Carlos Copetti na cadeira"
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain"
                      />
                    </m.div>
                    <m.div
                      className="absolute inset-0 z-20"
                      style={{ opacity: sideOpacity, scale: sideScale, willChange: 'transform, opacity' }}
                    >
                      <Image
                        src={HERO_SIDE_IMAGE}
                        alt="Carlos Copetti na cadeira de lado"
                        fill
                        loading="eager"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain"
                      />
                    </m.div>
                    {/* Scissors cut effect during crossfade */}
                    <m.div
                      className="absolute inset-0 z-[25] flex items-center justify-center pointer-events-none"
                      style={{ opacity: scissorOpacity }}
                    >
                      <m.div
                        className="absolute left-[6%] right-[6%] top-1/2 h-px"
                        style={{
                          scaleX: cutLineScale,
                          opacity: cutLineOpacity,
                          background: 'linear-gradient(90deg, transparent, rgba(209, 169, 90, 0.5), transparent)',
                          transformOrigin: '0% 50%',
                        }}
                      />
                      <m.img
                        src="/tesoura.svg"
                        alt=""
                        aria-hidden="true"
                        style={{
                          x: scissorX,
                          rotate: scissorRotate,
                          scaleX: -1,
                          width: 'clamp(140px, 22vw, 280px)',
                          height: 'auto',
                          filter: 'brightness(0) saturate(100%) invert(83%) sepia(22%) saturate(540%) hue-rotate(7deg) brightness(95%) contrast(90%)',
                        }}
                      />
                    </m.div>
                  </div>
                </m.div>
              </div>

              {/* Description + CTA block */}
              <div className="order-3">
                <p className="max-w-xl text-lg text-ash">
                  Barber Gestão Pro é o treinamento direto de Carlos Copetti para donos de barbearia que querem
                  faturamento previsível e uma operação organizada.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={ofertaLink}
                    className="shine rounded-full bg-brass px-7 py-4 text-sm font-semibold uppercase tracking-[0.35em] text-ink shadow-glow transition hover:translate-y-[-2px]"
                  >
                    Entrar por R$ 67,00
                  </a>
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            <m.div
              className="hero-scroll-indicator"
              style={{ opacity: scrollIndicatorOpacity }}
            >
              <span className="hero-scroll-indicator-text">Role para baixo</span>
              <svg className="hero-scroll-indicator-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 4v12M4 12l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </m.div>

            {/* Progress bar – shows transition progress while locked */}
            <m.div
              className="hero-progress-bar"
              style={{ scaleX: progressBarScale, opacity: progressBarOpacity }}
            />
          </div>
        </header>

        <MotionSection className="mx-auto max-w-6xl px-6 pb-16 section-lazy">
          <div className="grid gap-6 md:grid-cols-3">
            {toolIcons.map((tool, index) => (
              <m.div
                key={tool.label}
                initial={reduceMotion ? false : { opacity: 0, y: 26 }}
                whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
                className={`golden-border rounded-3xl ${index === 1 ? 'md:translate-y-6' : ''} ${index === 2 ? 'md:-translate-y-4' : ''
                  }`}
              >
                <div className="icon-card flex items-center justify-between rounded-3xl px-6 py-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-ash">Ferramenta</p>
                    <p className="mt-2 text-xl text-bone">{tool.label}</p>
                  </div>
                  <img
                    src={tool.src}
                    alt={tool.label}
                    className={`icon-gold h-14 w-14 icon-float${index > 0 ? ` icon-float-delay-${index}` : ''}`}
                  />
                </div>
              </m.div>
            ))}
          </div>
        </MotionSection>

        <div className="ticker border-y border-white/10 bg-black/40 py-3 text-sm uppercase tracking-[0.35em] text-ash">
          <span>
            fluxo • precificação • agenda • pós-venda • equipe • experiência • faturamento • posicionamento •
            fluxo • precificação • agenda • pós-venda • equipe • experiência • faturamento • posicionamento
          </span>
        </div>

        <MotionSection id="sobre" className="mx-auto max-w-6xl px-6 py-20 section-lazy">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Tag>Quem lidera</Tag>
              <h2 className="mt-5 font-display text-5xl leading-[0.95] text-bone">
                Carlos Copetti e a Copetti&apos;s Barbershop
              </h2>
              <p className="mt-5 text-lg text-ash">
                Fundador, barbeiro e proprietário da Copetti&apos;s Barbershop, com duas unidades em Foz do Iguaçu. A
                marca ficou conhecida pela experiência masculina completa - técnica, ambiente e atendimento. Esse
                repertório sustenta o Barber Gestão Pro.
              </p>
              <div className="mt-8 space-y-4 border-l border-white/10 pl-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-ash">Unidade 01</p>
                  <p className="mt-2 text-lg text-bone">Vila Yolanda</p>
                  <p className="text-sm text-ash">Av. Felipe Wandscheer, 805</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-ash">Unidade 02</p>
                  <p className="mt-2 text-lg text-bone">Jardim Naipi</p>
                  <p className="text-sm text-ash">Foz do Iguaçu • PR</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="glass rounded-3xl p-6">
                <Tag>Posicionamento</Tag>
                <p className="mt-4 font-serif text-2xl text-bone">“Mais que uma barbearia, um lugar de transformação.”</p>
                <p className="mt-5 text-ash">
                  O curso traduz essa experiência em processos replicáveis, sem perder o estilo masculino que gera
                  fidelidade.
                </p>
                <div className="mt-6 text-xs uppercase tracking-[0.3em] text-ash">@copettisbarbershop</div>
              </div>
              <div className="absolute -bottom-8 -left-6 hidden rounded-full border border-brass/40 px-6 py-3 text-xs uppercase tracking-[0.3em] text-ash lg:block">
                Mentor desde 2019
              </div>
            </div>
          </div>
        </MotionSection>

        <MotionSection id="historia" className="mx-auto max-w-6xl px-6 py-20 section-lazy">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
            <div className="flex h-full flex-col">
              <Tag>Raízes</Tag>
              <h2 className="mt-5 font-display text-5xl leading-[0.95] text-bone">
                História real, sem romantizar.
              </h2>
              <p className="mt-4 text-lg text-ash">
                Uma trajetória de verdade, registrada em momentos-chave.
                <br />
                O foco é mostrar de onde veio a visão que hoje guia o Barber Gestão Pro.
              </p>
              <ul className="mt-8 flex flex-1 flex-col gap-5 text-sm uppercase tracking-[0.35em] text-ash lg:justify-between lg:pb-2">
                <li className="flex items-start gap-3 leading-[1.45]">
                  <span className="mt-[0.52em] h-2 w-2 rounded-full bg-brass" />
                  Da infância simples às primeiras oportunidades.
                </li>
                <li className="flex items-start gap-3 leading-[1.45]">
                  <span className="mt-[0.52em] h-2 w-2 rounded-full bg-brass" />
                  Visibilidade local, experiência prática e construção de autoridade.
                </li>
                <li className="flex items-start gap-3 leading-[1.45]">
                  <span className="mt-[0.52em] h-2 w-2 rounded-full bg-brass" />
                  2 unidades em Foz do Iguaçu
                </li>
                <li className="flex items-start gap-3 leading-[1.45]">
                  <span className="mt-[0.52em] h-2 w-2 rounded-full bg-brass" />
                  Gestão real, barbearia ativa
                </li>
                <li className="flex items-start gap-3 leading-[1.45]">
                  <span className="mt-[0.52em] h-2 w-2 rounded-full bg-brass" />
                  Mentoria de dono para dono
                </li>
              </ul>
            </div>
            <div className="grid gap-4">
              <div className="relative overflow-hidden rounded-3xl border border-white/10">
                <div className="grid grid-cols-2 gap-0">
                  <div className="relative -mr-px">
                    <Image
                      src="/meninopequenoninguemacredita.jpeg"
                      alt="Infância: ninguém acredita em você"
                      width={520}
                      height={520}
                      className="block h-48 w-full object-cover object-[62%_12%]"
                    />
                  </div>
                  <div className="relative -ml-px">
                    <Image
                      src="/ninguemacreditameninochorando.jpeg"
                      alt="Infância"
                      width={520}
                      height={520}
                      className="block h-48 w-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[76%] max-w-[420px] rounded-full border border-brass/40 bg-black/75 px-4 py-1 text-center text-[10px] uppercase tracking-[0.3em] text-ash backdrop-blur-sm">
                  Ninguém acredita em você até que...
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="relative overflow-hidden rounded-3xl border border-white/10">
                  <Image
                    src="/antigamasnatelevisao.jpeg"
                    alt="Aparição na televisão"
                    width={520}
                    height={420}
                    className="h-44 w-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 rounded-full border border-brass/40 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-ash">
                    Na televisão
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-3xl border border-white/10">
                  <Image
                    src="/mentor%20na%20radio.jpeg"
                    alt="Mentor na rádio"
                    width={520}
                    height={420}
                    className="h-44 w-full object-cover object-[55%_50%] md:object-[55%_35%]"
                  />
                  <div className="absolute bottom-3 left-3 rounded-full border border-brass/40 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-ash">
                    Na rádio local
                  </div>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="relative overflow-hidden rounded-3xl border border-white/10">
                  <Image
                    src="/mentorfotonaneve.jpeg"
                    alt="Curtindo férias"
                    width={520}
                    height={420}
                    className="h-44 w-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 rounded-full border border-brass/40 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-ash">
                    Curtindo férias
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-3xl border border-white/10">
                  <Image
                    src="/fotocomtime.jpg"
                    alt="Foto com o time"
                    width={520}
                    height={420}
                    className="h-44 w-full object-cover object-[50%_68%] md:object-center"
                  />
                  <div className="absolute bottom-3 left-3 rounded-full border border-brass/40 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-ash">
                    Com o time
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MotionSection>

        <MotionSection id="metodo" className="methodo-surface mx-auto max-w-6xl px-6 py-20 section-lazy">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="relative overflow-hidden lg:-translate-x-6">
              <Image
                src="/negocio.png"
                alt="Gestão que transforma corte em negócio"
                width={1000}
                height={760}
                className="h-[540px] w-full origin-top object-contain object-top scale-[1.12] sm:h-[600px] lg:h-[620px] lg:scale-[1.16]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink via-ink/72 to-transparent" />
            </div>
            <div className="lg:pl-6">
              <Tag>O que você vai dominar</Tag>
              <h2 className="mt-5 font-display text-5xl leading-[0.95] text-bone">
                Gestão que transforma corte em negócio.
              </h2>
              <p className="mt-4 max-w-xl text-ash">
                Um plano direto para controlar agenda, caixa e experiência do cliente, sem fórmulas genéricas.
              </p>
              <div className="mt-8 space-y-6 border-l border-white/10 pl-6">
                {metodoCards.map((item, index) => (
                  <div
                    key={item.title}
                    className={`metodo-card-hover${reduceMotion ? '' : ''}`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-xs font-semibold uppercase tracking-[0.35em] text-brass">
                        0{index + 1}
                      </span>
                      <div>
                        <p className="text-lg text-bone">{item.title}</p>
                        <p className="mt-1 text-ash">{item.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MotionSection>

        <MotionSection id="provas" className="mx-auto max-w-6xl px-6 py-20 section-lazy">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <Tag>Prova visual</Tag>
                <h2 className="mt-5 font-display text-5xl text-bone">Treinamento com gente real: alunos.</h2>
                <p className="mt-4 max-w-xl text-ash">
                  Fotos dos alunos em aula, mentorias e bastidores. Tudo acontece dentro da barbearia.
                </p>
              </div>
              <div className="glass rounded-full px-6 py-3 text-xs uppercase tracking-[0.3em] text-ash">
                Resultados visíveis
              </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
              <div className="relative lg:-translate-y-6">
                <div className="golden-border rounded-3xl">
                  <div className="relative overflow-hidden rounded-[23px]">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <Image
                      src="/ensinando.jpeg"
                      alt="Mentor ensinando alunos"
                      width={960}
                      height={720}
                      className="h-[420px] w-full object-cover object-[50%_18%]"
                    />
                    <div className="absolute bottom-6 left-6 rounded-full border border-brass/40 px-4 py-2 text-[10px] uppercase tracking-[0.4em] text-ash">
                      Aulas ao vivo
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid gap-4">
                <Image
                  src="/alunos.jpeg"
                  alt="Alunos em aula"
                  width={620}
                  height={460}
                  className="h-56 w-full rounded-3xl border border-white/10 object-cover object-[50%_18%]"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Image
                    src="/alunos2.jpeg"
                    alt="Treinamento ao vivo"
                    width={420}
                    height={340}
                    className="h-44 w-full rounded-3xl border border-white/10 object-cover object-[50%_18%]"
                  />
                  <Image
                    src="/alunos3.jpeg"
                    alt="Alunos em aula"
                    width={420}
                    height={340}
                    className="h-44 w-full rounded-3xl border border-white/10 object-cover object-[50%_18%]"
                  />
                </div>
              </div>
            </div>
          </div>
        </MotionSection>

        <MotionSection className="mx-auto max-w-6xl px-6 py-20 section-lazy" id="oferta">
          <div className="glass relative overflow-hidden rounded-[32px] p-10">
            <div className="absolute right-[-60px] top-[-60px] h-40 w-40 rounded-full bg-brass/30 blur-3xl" />
            <div className="absolute left-[-40px] bottom-[-40px] h-48 w-48 rounded-full bg-brass/14 blur-3xl" />
            <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <Tag>Oferta especial</Tag>
                <h2 className="mt-4 font-display text-5xl text-bone">Acesso completo por R$ 67,00</h2>
                <p className="mt-4 text-ash">
                  Entre hoje e começa a aplicar o método Barber Gestão Pro na sua barbearia.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <a
                    href={ofertaLink}
                    className="shine rounded-full bg-brass px-8 py-4 text-sm font-semibold uppercase tracking-[0.35em] text-ink shadow-glow"
                  >
                    Quero meu acesso
                  </a>
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-black/50 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-ash">Inclui</p>
                <ul className="mt-4 space-y-3 text-ash">
                  <li>Checklist de atendimento e experiência masculina</li>
                  <li>Direcionamento de marketing local e digital</li>
                  <li>Plano de escala com equipe e padrão de serviço</li>
                </ul>
                <div className="mt-6 rounded-2xl border border-brass/30 bg-brass/10 p-4 text-sm text-bone">
                  Copetti&apos;s Barbershop como referência real, não teoria.
                </div>
              </div>
            </div>
          </div>
        </MotionSection>

        <MotionSection className="mx-auto max-w-6xl px-6 pb-20 section-lazy" id="faq">
          <div className="grid gap-6 lg:grid-cols-3">
            {faqItems.map((item) => (
              <div key={item.q} className="glass rounded-2xl p-6">
                <p className="text-lg text-bone">{item.q}</p>
                <p className="mt-3 text-ash">{item.a}</p>
              </div>
            ))}
          </div>
        </MotionSection>

        <footer className="border-t border-white/10 px-6 py-10 text-center text-xs uppercase tracking-[0.3em] text-ash">
          Barber Gestão Pro • Copetti&apos;s Barbershop • Foz do Iguaçu
        </footer>
      </div>
    </LazyMotion>
  );
}
