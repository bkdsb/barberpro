import Image from 'next/image';
import { JourneyModules } from '@/components/journey-modules';

const checkoutLink =
  'https://pay.kiwify.com.br/2EF44sD?utm_source=ig&utm_medium=social&utm_content=link_in_bio';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://barbergestaopro.com.br';
const whatsappNumber = '5542998069368';
const whatsappDisplay = '+55 (42) 99806-9368';
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  'Opa, quero saber mais sobre o curso Barber Gestão Pro!',
)}`;

const challengeCards = [
  {
    title: 'Falta de visão como dono',
    text: 'Aprenda a enxergar o seu negócio e transformar decisões em ações maduras e estratégicas.',
  },
  {
    title: 'Falta de ideias para Marketing',
    text: 'Conquiste clientes e fidelize sua marca com posicionamento além de ofertas promocionais.',
  },
  {
    title: 'Liderança que não transforma',
    text: 'Influencie equipe, cobre resultados, delegue da forma certa e mantenha engajamento alto.',
  },
  {
    title: 'Falta de gestão financeira',
    text: 'Precifique com critério, controle dados e entenda o potencial das finanças do seu negócio.',
  },
  {
    title: 'Necessidade de processos claros',
    text: 'Padronize rotinas para ensinar sua equipe a trabalhar com ordem e excelência.',
  },
];

const baseTrainings = [
  {
    title: 'Financeiro',
    text: 'Métodos para estruturar as finanças, fortalecer a saúde do negócio e maximizar resultados.',
    image: '/negocio.png',
    imagePosition: '50% 23%',
  },
  {
    title: 'Pessoas',
    text: 'Desenvolvimento de equipe com cultura, comunicação eficiente, liderança e treinamento.',
    image: '/fotocomtime.jpg',
    imagePosition: '50% 44%',
  },
  {
    title: 'Processos',
    text: 'Organize tarefas, padronize execução e mantenha a operação eficiente todos os dias.',
    image: '/ensinando.jpeg',
    imagePosition: '50% 23%',
  },
  {
    title: 'Marketing',
    text: 'Estratégias para atrair, persuadir e encantar clientes com agenda cheia e marca forte.',
    image: '/mentorfotocomspray.jpeg',
    imagePosition: '50% 23%',
  },
];

const extraTrainings = [
  { title: 'Mentor experiente', image: '/alunos3.jpeg', imagePosition: '50% 50%' },
  { title: 'Método validado', image: '/alunos2.jpeg', imagePosition: '50% 30%' },
  { title: 'Alunos comprovam', image: '/alunos.jpeg', imagePosition: '50% 21%' },
];

const courseModules = [
  {
    title: 'Introdução',
    text: 'Fundamentos para começar com visão de dono, posicionamento e direção estratégica.',
    image: '/modulo1.jpeg',
  },
  {
    title: 'Abrindo uma barbearia',
    text: 'Passo a passo para estruturar o início sem improviso e com base financeira segura.',
    image: '/modulo2.jpeg',
  },
  {
    title: 'Gerenciando a barbearia',
    text: 'Rotina de gestão, equipe, processos e indicadores para manter resultado previsível.',
    image: '/modulo3.jpeg',
  },
  {
    title: 'Expandindo a barbearia',
    text: 'Método para escalar com segurança e preparar a operação para uma segunda unidade.',
    image: '/modulo4.jpeg',
  },
];

const advantages = [
  {
    title: 'Aulas atualizadas',
    text: 'Novos conhecimentos e atualizações para o seu sucesso.',
  },
  {
    title: 'App exclusivo',
    text: 'Estude de onde estiver com acesso rápido.',
  },
  {
    title: 'Suporte personalizado',
    text: 'Dúvidas de aulas e estratégia no WhatsApp.',
  },
  {
    title: 'Playlists de estudo',
    text: 'Trilhas por tema para acelerar execução.',
  },
];

const rootsGallery = [
  {
    title: 'O começo',
    subtitle: 'Ninguém acredita em você até que...',
    image: '/ninguemacreditameninochorando.jpeg',
    imagePosition: '50% 50%',
  },
  {
    title: 'Na televisão',
    subtitle: 'Visibilidade local e autoridade',
    image: '/antigamasnatelevisao.jpeg',
    imagePosition: '50% 50%',
  },
  {
    title: 'Na rádio local',
    subtitle: 'Comunicação e posicionamento',
    image: '/mentorradio.jpeg',
    imagePosition: '50% 32%',
  },
];

const audience = [
  'Donos de barbearia que querem evoluir visão, faturamento e estratégia de gestão.',
  'Empreendedores iniciantes que desejam sair da operação e estruturar crescimento.',
  'Barbeiros que desejam abrir a própria unidade com base sólida.',
  'Donos que já têm equipe, mas enfrentam dificuldade em liderança e padrão.',
];

const faqItems = [
  {
    q: '1 - Formas de pagamento',
    a: 'Cartão de crédito, boleto ou pix.',
  },
  {
    q: '2 - Valor e pagamento',
    a: 'Acesso por R$67,00 em pagamento único, com aulas, bônus, suporte e comunidade.',
  },
  {
    q: '3 - Garantia',
    a: 'Garantia incondicional de 7 dias. Se não fizer sentido para você, devolvemos 100%.',
  },
  {
    q: '4 - Fidelidade',
    a: 'Sem fidelidade forçada. Você pode cancelar a qualquer momento.',
  },
];

const marqueeText = new Array(26).fill('Barber Gestão Pro');

const courseJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Barber Gestão Pro',
  description:
    'Curso prático com Carlos Copetti para estruturar operação, liderança, marketing e financeiro da barbearia.',
  provider: {
    '@type': 'Organization',
    name: "Copetti's Barbershop",
    url: siteUrl,
    sameAs: ['https://www.instagram.com/copettisbarbershop/'],
  },
  instructor: {
    '@type': 'Person',
    name: 'Carlos Copetti',
  },
  inLanguage: 'pt-BR',
  offers: {
    '@type': 'Offer',
    url: checkoutLink,
    price: '67.00',
    priceCurrency: 'BRL',
    availability: 'https://schema.org/InStock',
    category: 'Course',
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

export default function Home() {
  return (
    <main className="lp">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([courseJsonLd, faqJsonLd]) }}
      />
      <div className="bg-grid" aria-hidden="true" />

      <section className="hero section" id="inicio">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1 className="hero-title">
              <span className="hero-line">A construção de um negocio</span>
              <span className="hero-line">lucrativo e autêntico começa</span>
              <span className="hero-line">
                aqui no <span className="hero-highlight">Barber Gestão Pro</span>
              </span>
            </h1>
            <p>
              Aprenda a desenvolver equipe engajada, clientes fiéis à sua marca e um negócio que funciona sem depender
              de você na operação.
            </p>
            <a href={checkoutLink} target="_blank" rel="noreferrer" className="btn btn-primary">
              Transforme seu negócio hoje
            </a>
          </div>

          <div className="hero-photo-wrap">
            <div className="hero-dots" aria-hidden="true" />
            <div className="hero-halo" aria-hidden="true" />
            <Image
              src="/hero-v2.png"
              alt="Carlos Copetti em pose lateral"
              width={1272}
              height={1424}
              preload
              sizes="(max-width: 1024px) 88vw, 42vw"
              className="hero-photo"
            />
          </div>
        </div>
      </section>

      <section className="section problems" id="solucoes">
        <div className="wrap section-head center problems-head">
          <p className="tag">Soluções Personalizadas</p>
          <h2 className="problems-title">
            No Barber Gestão Pro você aprende <span className="problems-accent">estratégias poderosas</span> para
            resolver os principais desafios de um negócio.
          </h2>
        </div>

        <div className="wrap problems-grid">
          {challengeCards.map((card) => (
            <article key={card.title} className="problem-card">
              <span className="problem-mark">X</span>
              <h3>{card.title}:</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>

        <div className="wrap center-cta">
          <a href={checkoutLink} target="_blank" rel="noreferrer" className="btn btn-primary">
            Transforme seu negócio hoje
          </a>
        </div>
      </section>

      <section className="marquee" aria-label="Barber Gestão Pro">
        <div className="marquee-track">
          {marqueeText.map((item, index) => (
            <span key={`m1-${index}`}>
              {item} <b>•</b>
            </span>
          ))}
          {marqueeText.map((item, index) => (
            <span key={`m2-${index}`}>
              {item} <b>•</b>
            </span>
          ))}
        </div>
      </section>

      <section className="section trainings" id="treinamentos">
        <div className="wrap trainings-top">
          <div className="trainings-word" data-text="BARBER PRO" aria-hidden="true">
            BARBER PRO
          </div>
          <Image
            src="/carlos1-v2.png"
            alt="Carlos Copetti"
            width={721}
            height={1065}
            sizes="(max-width: 720px) 60vw, 384px"
            className="laptop"
          />
          <h2>Os treinamentos base do Barber Gestão Pro garantem ferramentas para impulsionar sua operação.</h2>
        </div>

        <div className="wrap base-grid">
          {baseTrainings.map((item) => (
            <article className="base-card" key={item.title}>
              <Image
                src={item.image}
                alt={item.title}
                width={640}
                height={420}
                sizes="(max-width: 720px) 100vw, (max-width: 1080px) 50vw, 25vw"
                quality={82}
                className="base-image"
                style={{ objectPosition: item.imagePosition }}
              />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section extras" id="extras">
        <div className="wrap section-head center">
          <h2>Uma escola sempre atualizada com treinamentos extras para acelerar áreas indispensáveis.</h2>
        </div>

        <div className="wrap extras-grid">
          {extraTrainings.map((item) => (
            <article className="extra-card" key={item.title}>
              <Image
                src={item.image}
                alt={item.title}
                width={520}
                height={720}
                sizes="(max-width: 720px) 100vw, (max-width: 1080px) 33vw, 33vw"
                quality={82}
                className="extra-image"
                style={{ objectPosition: item.imagePosition }}
              />
              <h3>{item.title}</h3>
            </article>
          ))}
        </div>

        <div className="wrap center-cta">
          <a href={checkoutLink} target="_blank" rel="noreferrer" className="btn btn-primary">
            Quero fazer parte do Barber Gestão Pro
          </a>
        </div>
      </section>

      <section className="section journey" id="modulos">
        <div className="wrap section-head center">
          <p className="tag">Trilha completa do curso</p>
          <h2 className="journey-title">
            <span>19 aulas completas:</span>
            <span>do começo à expansão</span>
            <span>da sua barbearia</span>
          </h2>
          <p className="journey-copy">
            Se você está começando agora ou já tem barbearia e pensa em abrir um segundo espaço, o Barber Gestão Pro
            entrega um caminho direto, com começo, meio e expansão para acelerar sua evolução sem tentativa e erro.
          </p>
        </div>
        <div className="wrap journey-grid">
          <JourneyModules modules={courseModules} />
        </div>
      </section>

      <section className="section advantages" id="vantagens">
        <div className="wrap section-head center">
          <h2>Vantagens oferecidas pela nossa plataforma</h2>
        </div>
        <div className="wrap advantages-grid">
          {advantages.map((item) => (
            <article className="adv-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <div className="wrap center-cta">
          <a href={checkoutLink} target="_blank" rel="noreferrer" className="btn btn-primary">
            Comprar agora Barber Gestão Pro
          </a>
        </div>
      </section>

      <section className="marquee" aria-label="Barber Gestão Pro repetição 2">
        <div className="marquee-track reverse">
          {marqueeText.map((item, index) => (
            <span key={`rm1-${index}`}>
              {item} <b>•</b>
            </span>
          ))}
          {marqueeText.map((item, index) => (
            <span key={`rm2-${index}`}>
              {item} <b>•</b>
            </span>
          ))}
        </div>
      </section>

      <section className="section about" id="sobre">
        <div className="wrap about-grid">
          <div>
            <p className="tag">Sobre o Carlos Copetti</p>
            <h2>Carlos Copetti e a Copetti&apos;s Barbershop</h2>
            <p className="bio">
              Em 7 anos de experiência, Carlos Copetti impactou milhares de clientes e construiu uma barbearia sólida,
              com mais de 3.000 clientes fidelizados.
            </p>
            <p className="bio">
              Fundador, barbeiro e proprietário da Copetti&apos;s Barbershop, com duas unidades ativas em Foz do Iguaçu,
              ele consolidou uma experiência masculina completa: técnica, ambiente e atendimento. Esse repertório
              sustenta o curso Barber Gestão Pro.
            </p>
            <p className="bio">
              Hoje, Copetti compartilha estratégias práticas sobre gestão, leis, precificação, equipe e financeiro, os
              mesmos pilares que sustentam suas unidades com crescimento consistente.
            </p>

            <div className="units">
              <article>
                <h3>Unidade 01</h3>
                <p>Vila Yolanda</p>
                <p>Av. Felipe Wandscheer, 805</p>
              </article>
              <article>
                <h3>Unidade 02</h3>
                <p>Jardim Naipi</p>
                <p>Foz do Iguaçu • PR</p>
              </article>
            </div>

            <p className="positioning">
              Posicionamento: <strong>&quot;Mais que uma barbearia, um lugar de transformação.&quot;</strong>
            </p>

            <p className="handle">@copettisbarbershop • Mentor desde 2019</p>
          </div>

          <div className="about-photo-wrap">
            <div className="about-photo-glow" aria-hidden="true" />
            <Image
              src="/negocio.png"
              alt="Carlos Copetti mentor"
              width={721}
              height={1065}
              sizes="(max-width: 1080px) 100vw, 42vw"
              quality={84}
              className="about-photo"
            />
          </div>
        </div>

        <div className="wrap roots">
          <p className="tag">Raízes</p>
          <h2>História real, sem romantizar.</h2>
          <p className="roots-copy">
            Do começo simples às primeiras oportunidades, visibilidade local, experiência prática e construção de
            autoridade.
          </p>

          <div className="roots-grid">
            {rootsGallery.map((item) => (
              <article className="root-card" key={item.title}>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={540}
                  height={420}
                  sizes="(max-width: 720px) 100vw, (max-width: 1080px) 50vw, 33vw"
                  quality={82}
                  className="root-image"
                  style={{ objectPosition: item.imagePosition }}
                />
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section offer" id="oferta">
        <div className="wrap offer-grid">
          <div className="offer-left">
            <p className="tag">Condicionais especiais para se inscrever hoje</p>
            <ul>
              <li>Aulas atualizadas</li>
              <li>Curso exclusivo</li>
              <li>Apoio e suporte</li>
            </ul>
            <p className="limited">Condição especial por tempo limitado</p>
          </div>

          <article className="price-card">
            <span className="price-kicker">Por apenas</span>
            <h2 className="price-value">
              <small>R$</small>
              67
              <em>,00</em>
            </h2>
            <a href={checkoutLink} target="_blank" rel="noreferrer" className="btn btn-primary">
              Comprar agora
            </a>
          </article>
        </div>
      </section>

      <section className="section audience" id="para-quem">
        <div className="wrap audience-grid">
          <div className="aud-photo">
            <Image
              src="/cadeiradelado2-v2.png"
              alt="Carlos Copetti em mentoria"
              width={1080}
              height={1350}
              sizes="(max-width: 1080px) 100vw, 48vw"
              quality={84}
            />
          </div>

          <div className="aud-content">
            <div className="aud-head">
              <h2>
                O curso Barber Gestão Pro revoluciona sua barbearia ao solucionar desafios reais de operação,
                liderança e crescimento.
              </h2>
            </div>

            <div className="aud-points">
              <ul className="aud-list">
                {audience.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="guarantee-card">
              <p>
                Garantia de 7 dias: acesse o treinamento e teste com calma.
                <br />
                Se não fizer sentido para você, devolvemos 100% do valor.
              </p>
              <a href={checkoutLink} target="_blank" rel="noreferrer" className="btn btn-primary">
                Comprar agora Barber Gestão Pro
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section faq" id="faq">
        <div className="wrap faq-wrap">
          <h2>Perguntas Frequentes</h2>
          <div className="faq-list">
            {faqItems.map((item) => (
              <details key={item.q} className="faq-item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
          <p className="faq-help">Alguma outra dúvida?</p>
          <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
            Fale conosco no WhatsApp
          </a>
          <p className="support-number">Suporte direto: {whatsappDisplay}</p>
        </div>
      </section>

      <footer className="footer">
        <p>Copyright 2026 – Barber Gestão Pro ® Todos os direitos reservados.</p>
      </footer>

      <a
        className="floating-wa"
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com suporte no WhatsApp"
      >
        <svg
          className="floating-wa-icon"
          viewBox="0 0 24 24"
          role="img"
          aria-label="WhatsApp"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M16.75 13.96c-.25-.13-1.47-.72-1.7-.8-.23-.09-.4-.13-.57.12-.17.25-.65.8-.8.96-.15.17-.3.19-.55.07-.25-.13-1.06-.39-2.02-1.26-.74-.66-1.25-1.48-1.4-1.73-.15-.25-.02-.38.11-.51.11-.11.25-.3.38-.45.12-.15.16-.25.25-.42.08-.17.04-.32-.02-.45-.07-.13-.57-1.37-.78-1.88-.2-.49-.41-.42-.57-.42h-.48c-.17 0-.45.06-.69.32-.23.25-.9.88-.9 2.15s.93 2.5 1.06 2.67c.13.17 1.82 2.78 4.41 3.9.62.27 1.11.43 1.49.55.63.2 1.2.17 1.65.1.5-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.3Z"
          />
          <path
            fill="currentColor"
            d="M20.52 3.45A11.88 11.88 0 0 0 12.07 0C5.5 0 .16 5.34.16 11.91c0 2.1.55 4.14 1.6 5.94L.05 24l6.31-1.65a11.82 11.82 0 0 0 5.71 1.45h.01c6.57 0 11.92-5.34 11.92-11.91 0-3.18-1.24-6.17-3.48-8.44Zm-8.45 18.34h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.22-3.75.98 1-3.65-.24-.37a9.84 9.84 0 0 1-1.5-5.24c0-5.44 4.43-9.87 9.89-9.87 2.64 0 5.12 1.03 6.98 2.89a9.8 9.8 0 0 1 2.89 6.99c0 5.45-4.44 9.87-9.87 9.87Z"
          />
        </svg>
        <span>Falar com suporte</span>
      </a>
    </main>
  );
}
