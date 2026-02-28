"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Section from "@/components/Section";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Card from "@/components/Card";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import FAQ from "@/components/FAQ";
import { getQuizProfile } from "@/lib/storage";
import {
  generatePersonalizedContent,
  QuizProfile,
  QuizGoal,
  QuizLevel,
  QuizPreference,
  QuizLocation,
  QuizDifficulties,
} from "@/lib/profile";
import {
  trackViewLanding,
  trackCTAClick,
  trackPurchaseClick,
} from "@/lib/tracking";
import { CHECKOUT_BASICO_URL, CHECKOUT_PLUS_URL } from "@/config/urls";
import {
  BookIcon,
  VideoIcon,
  ClockIcon,
  TrendingUpIcon,
  InfinityIcon,
  UsersIcon,
  ShieldIcon,
  CheckIcon,
  ZapIcon,
  StarIcon,
  MessageIcon,
  GiftIcon,
} from "@/components/Icons";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Image from "next/image";

const QUIZ_MODAL_SESSION_KEY = "gx_show_quiz_modal";
const SECTION_TITLE = "Desafio Pilates em Casa 8GX Transformação em 90 dias";
const SECTION_SUBTITLE = "Com a Professora Gabi Xavier";

const GOAL_LABELS: Record<QuizGoal, string> = {
  postura: "Melhorar postura",
  dores: "Reduzir dores",
  core: "Fortalecer o core",
  flexibilidade: "Ganhar flexibilidade",
  mobilidade: "Aumentar mobilidade",
  retomar: "Retomar atividade física",
  definir: "Definir o corpo",
};

const LEVEL_LABELS: Record<QuizLevel, string> = {
  iniciante: "Iniciante",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

const PREFERENCE_LABELS: Record<QuizPreference, string> = {
  "com-equipamentos": "Com equipamentos",
  "sem-equipamentos": "Sem equipamentos",
};

const LOCATION_LABELS: Record<QuizLocation, string> = {
  casa: "Em casa",
  academia: "Na academia",
};

const DIFFICULTY_LABELS: Record<keyof QuizDifficulties, string> = {
  faltaTempo: "Falta de tempo",
  faltaMotivacao: "Falta de motivação",
  dorCronica: "Dor crônica",
  naoSabePorOnde: "Não saber por onde começar",
  miedoLesao: "Medo de lesão",
  resultadosLentos: "Resultados lentos",
};

export default function LandingPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<QuizProfile | null>(null);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const [showModalBackdoorButton, setShowModalBackdoorButton] = useState(false);
  const [personalized, setPersonalized] = useState({
    headline: "Transforme seu Corpo com o Método Pilates",
    bullets: [
      "Exercícios completos para todos os níveis",
      "Videoaulas profissionais e detalhadas",
      "Resultados comprovados e duradouros",
    ],
    seal: "Desafio Pilates 8 GX: Transformação em Casa",
  });

  // Cronômetro de 3 horas
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const loadedProfile = getQuizProfile();
    const urlParams = new URLSearchParams(window.location.search);
    const shouldForceModal =
      urlParams.get("modalPreview") === "1" ||
      urlParams.get("testModal") === "1";
    const shouldExposeBackdoor =
      urlParams.get("modalBackdoor") === "1" || shouldForceModal;
    const shouldOpenFromQuiz =
      loadedProfile &&
      window.sessionStorage.getItem(QUIZ_MODAL_SESSION_KEY) === "1";

    if (loadedProfile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration from localStorage after mount
      setProfile(loadedProfile);
      const content = generatePersonalizedContent(loadedProfile);
      setPersonalized(content);
    }

    if (shouldOpenFromQuiz) {
      window.sessionStorage.removeItem(QUIZ_MODAL_SESSION_KEY);
      setIsWelcomeModalOpen(true);
    } else if (shouldForceModal) {
      setIsWelcomeModalOpen(true);
    }

    setShowModalBackdoorButton(shouldExposeBackdoor);
    trackViewLanding(!!loadedProfile);
  }, []);

  useEffect(() => {
    if (!isWelcomeModalOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsWelcomeModalOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isWelcomeModalOpen]);

  // Atualiza o cronômetro a cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev; // Tempo esgotado
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToOfferSection = () => {
    const offerSection = document.getElementById("oferta");
    if (offerSection) {
      offerSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToOffer = () => {
    trackCTAClick("Ver oferta", "hero");
    scrollToOfferSection();
  };

  const handlePurchaseBasico = () => {
    trackPurchaseClick(137); // Preço à vista
    window.open(CHECKOUT_BASICO_URL, "_blank");
  };

  const handlePurchasePlus = () => {
    trackPurchaseClick(297); // Preço à vista
    window.open(CHECKOUT_PLUS_URL, "_blank");
  };

  const handleQuizRedirect = (origin = "hero") => {
    trackCTAClick("Ir para quiz", origin);
    router.push("/quiz");
  };

  const handleOpenModalBackdoor = () => {
    setIsWelcomeModalOpen(true);
  };

  const handleCloseWelcomeModal = () => {
    setIsWelcomeModalOpen(false);
  };

  const handleWelcomeModalCTA = () => {
    trackCTAClick("Ver oferta", "modal_boas_vindas");
    setIsWelcomeModalOpen(false);
    window.setTimeout(() => {
      scrollToOfferSection();
    }, 180);
  };

  const selectedGoals =
    profile?.objetivo.map((goal) => GOAL_LABELS[goal]).join(", ") ||
    "Melhorar postura, reduzir dores e ganhar mobilidade";
  const selectedLevel = profile ? LEVEL_LABELS[profile.nivel] : "Iniciante";
  const selectedRoutine = profile
    ? `${profile.rotina} minutos por dia`
    : "20 minutos por dia";
  const selectedPreference = profile
    ? PREFERENCE_LABELS[profile.preferencia]
    : "Sem equipamentos";
  const selectedLocation = profile ? LOCATION_LABELS[profile.local] : "Em casa";

  const highlightedDifficulties = profile
    ? (Object.entries(profile.dificuldades)
        .filter(([, active]) => Boolean(active))
        .map(([key]) => DIFFICULTY_LABELS[key as keyof QuizDifficulties])
        .slice(0, 2) as string[])
    : ["Falta de tempo", "Falta de motivação"];

  const difficultyText =
    highlightedDifficulties.length > 0
      ? highlightedDifficulties.join(" e ").toLowerCase()
      : "seus principais desafios";

  const quizHeaderMessage = profile
    ? "Seu resultado já está salvo. Quer atualizar seu plano ideal?"
    : "Descubra em 1 minuto o Pilates ideal para sua rotina.";
  const quizHeaderButtonLabel = profile ? "Refazer quiz" : "Fazer quiz gratuito";

  // Dados dos depoimentos
  const testimonials = [
    {
      name: "Isabel Garcia",
      rating: 5,
      comment:
        "Iniciei minhas aulas de pilates em dezembro de 2024, indicação do médico ortopedista... Estou com problemas nos quadris, graças a Deus minhas dores estão parando devido as aulas que estou fazendo... Estou dormindo bem tbm, até parei de tomar clonazepan... Estou muito satisfeita e feliz... Só tenho a agradecer Pilates e vida!",
    },
    {
      name: "Andréa Fonseca Freitas de Souza",
      rating: 5,
      comment:
        "Me ajudou muito a ter mais flexibilidade, melhorou minhas dores e me deu mais disposição para o dia a dia. As aulas são excelentes e os resultados aparecem rapidamente!",
    },
    {
      name: "Maria De Castro",
      rating: 5,
      comment:
        "Gabi é uma profissional que admiro pela dedicação e comprometimento, além de ser uma pessoa autêntica, amável e simples. É um prazer praticar pilates neste curso completo e bem estruturado.",
    },
    {
      name: "Janaina Carvalho",
      rating: 5,
      comment:
        "Eu amo de paixão fazer pilates! As aulas são super dinâmicas e não tem nada de moleza não. Pra quem acha que pilates é só alongamento, sugiro uma aula experimental!",
    },
    {
      name: "Elaine",
      rating: 5,
      comment:
        "Não vivo mais sem!! Recomendo!! Os exercícios são incríveis e os resultados são visíveis. Minha qualidade de vida melhorou muito desde que comecei.",
    },
    {
      name: "Mara Costa",
      rating: 5,
      comment:
        "Adoro fazer pilates! Gabriela é muito atenciosa, muito batalhadora, uma pessoa muito capacitada. Ela cumpre todos os protocolos de segurança. Indico muito a todos que quizerem fazer pilates e transformar sua saúde.",
    },
    {
      name: "Julia Bustamante",
      rating: 5,
      comment:
        "Aulas dinâmicas, sempre com muita variação nos exercícios, permitindo uma evolução diária. Ambiente saudável e equipe muito qualificada. Nota 10!",
    },
    {
      name: "Izabel Cristina Ribeiro",
      rating: 5,
      comment:
        "Excelente! Profissional atendendo com muito cuidado a necessidade de cada pessoa. Muito dedicada e atenciosa. Parabéns pelo trabalho!",
    },
    {
      name: "Andressa Santos",
      rating: 5,
      comment:
        "Melhor Pilates do mundo, professores atenciosos. Nunca mais tive dor nas costas desde que comecei. Os exercícios são completos e realmente funcionam!",
    },
    {
      name: "Fernanda Lima",
      rating: 5,
      comment:
        "Comecei o curso há 6 meses e minha postura melhorou drasticamente. Trabalho em home office e sofria muito com dores. Hoje me sinto outra pessoa!",
    },
    {
      name: "Camila Rodrigues",
      rating: 5,
      comment:
        "As videoaulas são perfeitas! Consigo fazer os exercícios no meu ritmo e a explicação de cada movimento é muito clara. Já perdi 8kg e ganhei muita disposição!",
    },
    {
      name: "Roberta Alves",
      rating: 5,
      comment:
        "Sofria com dores crônicas há anos. Depois de 4 meses praticando pilates com este curso, finalmente consegui alívio. Não consigo mais viver sem!",
    },
  ];

  // Dados do FAQ
  const faqItems = [
    {
      question: "Para quem é este curso?",
      answer:
        "O curso é para qualquer pessoa que deseja melhorar sua saúde, postura, flexibilidade e força através do Pilates. Atende desde iniciantes completos até praticantes avançados, com módulos específicos para cada nível.",
    },
    {
      question: "Preciso de equipamentos?",
      answer:
        "Não! O curso oferece rotinas completas sem equipamentos, que podem ser feitas em casa. Também há módulos opcionais com equipamentos para quem desejar avançar ainda mais.",
    },
    {
      question: "Quanto tempo duram as aulas?",
      answer:
        "As aulas variam de 10 a 45 minutos, permitindo que você escolha rotinas que se encaixem na sua agenda. Você pode treinar no seu próprio ritmo e horário.",
    },
    {
      question: "Por quanto tempo terei acesso?",
      answer:
        "Você terá acesso vitalício a todo o conteúdo do curso, incluindo futuras atualizações. Aprenda no seu ritmo, sem pressa.",
    },
    {
      question: "Existe garantia?",
      answer:
        "Sim! Oferecemos garantia incondicional de 7 dias. Se você não ficar satisfeito por qualquer motivo, devolvemos 100% do seu investimento.",
    },
    {
      question: "Como funciona o suporte?",
      answer:
        "Você terá acesso à nossa comunidade exclusiva onde pode tirar dúvidas, compartilhar resultados e receber orientações diretas da equipe.",
    },
  ];

  return (
    <>
      {isWelcomeModalOpen && (
        <div
          className={styles.welcomeModalOverlay}
          onClick={handleCloseWelcomeModal}
        >
          <div
            className={styles.welcomeModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.welcomeModalClose}
              onClick={handleCloseWelcomeModal}
              aria-label="Fechar modal"
            >
              ×
            </button>

            <p className={styles.welcomeModalChip}>Resultado do seu quiz</p>
            <h2 id="welcome-modal-title" className={styles.welcomeModalTitle}>
              Bem-vindo(a) ao {SECTION_TITLE}
            </h2>
            <p className={styles.welcomeModalSubtitle}>{SECTION_SUBTITLE}</p>

            <div className={styles.welcomeModalResult}>
              <h3>Seu resultado personalizado</h3>
              <ul>
                <li>
                  <strong>Objetivos:</strong> {selectedGoals}
                </li>
                <li>
                  <strong>Nível atual:</strong> {selectedLevel}
                </li>
                <li>
                  <strong>Rotina ideal:</strong> {selectedRoutine}
                </li>
                <li>
                  <strong>Formato:</strong> {selectedPreference} •{" "}
                  {selectedLocation}
                </li>
                <li>
                  <strong>Plano sugerido:</strong> {personalized.seal}
                </li>
              </ul>
            </div>

            <p className={styles.welcomeModalMarketing}>
              Pelo seu perfil, este curso é perfeito para você. Preparamos uma
              jornada prática para vencer {difficultyText} com consistência e
              resultado real em até 90 dias.
            </p>
            <p className={styles.welcomeModalMarketing}>
              {personalized.headline}. Você vai receber orientação clara,
              progressão segura e aulas que cabem no seu dia.
            </p>

            <div className={styles.welcomeModalActions}>
              <Button size="large" onClick={handleWelcomeModalCTA}>
                Quero ver meu plano ideal
              </Button>
              <button
                type="button"
                className={styles.welcomeModalSecondaryAction}
                onClick={handleCloseWelcomeModal}
              >
                Continuar navegando
              </button>
            </div>
          </div>
        </div>
      )}

      {showModalBackdoorButton && !isWelcomeModalOpen && (
        <button
          type="button"
          className={styles.modalBackdoorButton}
          onClick={handleOpenModalBackdoor}
        >
          Abrir modal (teste)
        </button>
      )}

      {/* Countdown Banner */}
      <div className={styles.countdownBanner}>
        <span className={styles.bannerZap}>⚡</span>
        <span className={styles.bannerText}>
          {" "}
          OFERTA EXCLUSIVA TERMINA EM:{" "}
        </span>
        <span className={styles.bannerTimer}>
          {String(timeLeft.hours).padStart(2, "0")}:
          {String(timeLeft.minutes).padStart(2, "0")}:
          {String(timeLeft.seconds).padStart(2, "0")}
        </span>
      </div>

      {/* Hero Section */}
      <section className={styles.hero}>
        <Container>
          <header className={styles.heroHeader}>
            <div className={styles.heroHeaderTextBlock}>
              <span className={styles.heroHeaderEyebrow}>Quiz de Perfil</span>
              <p className={styles.heroHeaderText}>{quizHeaderMessage}</p>
            </div>
            <Button
              size="small"
              className={styles.heroHeaderButton}
              onClick={() => handleQuizRedirect("hero_header")}
            >
              {quizHeaderButtonLabel}
            </Button>
          </header>

          <div className={styles.heroSplit}>
            <div className={styles.heroLeft}>
              <div className={styles.heroBadge}>
                PILATES EM CASA - 100% ONLINE
              </div>
              <h1 className={styles.heroTitle}>
                SEU CORPO
                <br />
                <span className={styles.heroHighlight}>MERECE</span>
                ESSE CUIDADO
              </h1>
              <p className={styles.heroSubtitle}>
                Pratique Pilates no conforto da sua casa com acompanhamento
                profissional. Mais força, mais flexibilidade, mais qualidade de
                vida.
              </p>
              <p className={styles.heroAccentText}>
                <em>Do zero ao avançado — eu te guio em cada movimento!</em>
              </p>
              <div className={styles.heroCTAWrapper}>
                <Button size="large" onClick={scrollToOffer}>
                  QUERO COMEÇAR AGORA
                </Button>
              </div>
              {!profile && (
                <p className={styles.quizPrompt}>
                  Quer um plano personalizado?{" "}
                  <button
                    className={styles.quizLink}
                    onClick={() => handleQuizRedirect("hero_prompt")}
                  >
                    Faça nosso quiz rápido
                  </button>
                </p>
              )}
            </div>
            <div className={styles.heroRight}>
              <div className={styles.phoneFrame}>
                <Image
                  src="/quem-e-gabi.JPG"
                  alt="Gabi Xavier - Pilates"
                  fill
                  className={styles.phoneImage}
                  priority
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Vídeo + Quem é Gabi Xavier */}
      <section id="video" className={styles.whoSection}>
        <Container>
          <div className={styles.videoBioLayout}>
            {/* Vídeo centralizado */}
            <div className={styles.videoCentered}>
              <video
                controls
                preload="metadata"
                playsInline
                poster="/thumbnail.png"
              >
                <source src="/VideoApresentacaoGabi.mp4" />
              </video>
            </div>

            {/* Bio abaixo */}
            <div className={styles.bioContent}>
              <h2 className={styles.bioTitle}>QUEM É GABI XAVIER?</h2>

              <p>
                Sou Gabi Xavier, instrutora de Pilates há mais de 11 anos,
                apaixonada por transformar vidas através do movimento.
              </p>

              <p>
                Ao longo da minha trajetória, ministrei aulas em Minas Gerais,
                levando ritmo, energia e confiança para milhares de alunos. Já
                tive a honra de realizar cursos em que obtive experiências que
                ampliaram minha visão e fortaleceram ainda mais minha conexão
                com o Pilates.
              </p>

              <p>
                Hoje, uso toda essa bagagem para ensinar você a ter mais força,
                mobilidade, leveza, muito mais alegria sem dores. Acredito que
                Pilates vai muito além de exercícios: é sobre{" "}
                <strong>Controle, consciência e conexão</strong>.
              </p>

              <p>
                Com uma comunidade de mais de{" "}
                <strong>1 milhão de seguidores</strong>, minha missão é clara:
                ajudar pessoas comuns a se expressarem sem medo, se sentirem
                seguras e descobrirem o poder transformador do Pilates.
              </p>

              <div className={styles.bioHighlight}>
                Se você quer aprender de verdade, se fortalecer e viver o
                Pilates com intensidade, eu estou aqui para te guiar nessa
                jornada.
              </div>
            </div>

            {/* Stats */}
            <div className={styles.statsGrid}>
              <div className={styles.stat}>
                <div className={styles.statNumber}>11+</div>
                <div className={styles.statLabel}>Anos de Pilates</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>1MI+</div>
                <div className={styles.statLabel}>Seguidores</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>160+</div>
                <div className={styles.statLabel}>Aulas Mensais</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>100%</div>
                <div className={styles.statLabel}>Energia</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* O que você vai receber */}
      <Section background="light">
        <h2 className={styles.sectionTitle}>O Que Você Vai Receber</h2>
        <div className={styles.benefitsGrid}>
          <Card hover>
            <h3 className={styles.benefitTitle}>
              <BookIcon size={28} /> 3 Módulos Completos
            </h3>
            <p>
              Desde exercícios básicos até avançados, com progressão estruturada
              para você evoluir com segurança.
            </p>
          </Card>
          <Card hover>
            <h3 className={styles.benefitTitle}>
              <VideoIcon size={28} /> 15+ Videoaulas
            </h3>
            <p>
              Aulas em alta definição com explicações detalhadas de cada
              movimento e correções posturais.
            </p>
          </Card>
          <Card hover>
            <h3 className={styles.benefitTitle}>
              <ClockIcon size={28} /> Rotinas por Tempo
            </h3>
            <p>
              Treinos de 10, 20, 30 e 45 minutos para você encaixar na sua
              rotina, sem desculpas.
            </p>
          </Card>
          <Card hover>
            <h3 className={styles.benefitTitle}>
              <TrendingUpIcon size={28} /> Progressão por Nível
            </h3>
            <p>
              Iniciante, intermediário e avançado. Comece do seu nível e evolua
              no seu ritmo.
            </p>
          </Card>
          <Card hover>
            <h3 className={styles.benefitTitle}>
              <InfinityIcon size={28} /> Acesso Vitalício
            </h3>
            <p>
              Pague uma única vez e tenha acesso para sempre, incluindo todas as
              atualizações futuras.
            </p>
          </Card>
          <Card hover>
            <h3 className={styles.benefitTitle}>
              <UsersIcon size={28} /> Comunidade Exclusiva
            </h3>
            <p>
              Participe da nossa comunidade de alunos, tire dúvidas e
              compartilhe sua evolução.
            </p>
          </Card>
        </div>
      </Section>

      {/* O Que Cada Módulo Traz */}
      <Section background="white">
        <h2 className={styles.sectionTitle}>O Que Cada Módulo Traz</h2>
        <div className={styles.modulesGrid}>
          {/* Módulo 1 */}
          <div className={styles.moduleCard}>
            <div className={styles.moduleNumber}>01</div>
            <h3 className={styles.moduleTitle}>Fortalecimento do Corpo Todo</h3>
            <p className={styles.moduleDescription}>
              Videoaulas completas focadas no fortalecimento integral do seu
              corpo, trabalhando todos os grupos musculares.
            </p>
            <div className={styles.moduleObjectives}>
              <h4>Objetivos:</h4>
              <ul>
                <li>Fortalecer a musculatura de forma global</li>
                <li>Melhorar a resistência e o condicionamento físico</li>
                <li>Aumentar a estabilidade e o equilíbrio corporal</li>
                <li>Desenvolver consciência corporal completa</li>
              </ul>
            </div>
          </div>

          {/* Módulo 2 */}
          <div className={styles.moduleCard}>
            <div className={styles.moduleNumber}>02</div>
            <h3 className={styles.moduleTitle}>Braços e Pernas</h3>
            <p className={styles.moduleDescription}>
              Videoaulas direcionadas para o fortalecimento e definição de
              membros superiores e inferiores.
            </p>
            <div className={styles.moduleObjectives}>
              <h4>Objetivos:</h4>
              <ul>
                <li>Tonificar e definir braços, ombros e costas</li>
                <li>Fortalecer pernas, glúteos e panturrilhas</li>
                <li>Melhorar a firmeza e a sustentação muscular</li>
                <li>Ganhar força funcional para o dia a dia</li>
              </ul>
            </div>
          </div>

          {/* Módulo 3 */}
          <div className={styles.moduleCard}>
            <div className={styles.moduleNumber}>03</div>
            <h3 className={styles.moduleTitle}>Pilates Funcional</h3>
            <p className={styles.moduleDescription}>
              Exercícios que combinam o Pilates clássico com movimentos
              funcionais para resultados ainda mais completos.
            </p>
            <div className={styles.moduleObjectives}>
              <h4>Objetivos:</h4>
              <ul>
                <li>Integrar força, mobilidade e coordenação</li>
                <li>Melhorar a postura e o alinhamento corporal</li>
                <li>Aumentar a flexibilidade e a amplitude de movimento</li>
                <li>Prevenir lesões e reduzir dores crônicas</li>
              </ul>
            </div>
          </div>

          {/* Módulo 4 - Bônus */}
          <div className={`${styles.moduleCard} ${styles.moduleCardBonus}`}>
            <div className={styles.moduleBonusBadge}>
              <StarIcon size={12} /> BÔNUS — EXCLUSIVO PLANO PLUS
            </div>
            <div className={styles.moduleNumber}>04</div>
            <h3 className={styles.moduleTitle}>Exercícios de Abdômen</h3>
            <p className={styles.moduleDescription}>
              Módulo especial focado no fortalecimento e definição do core e
              abdômen, disponível apenas no pacote Plus.
            </p>
            <div className={styles.moduleObjectives}>
              <h4>Objetivos:</h4>
              <ul>
                <li>Fortalecer profundamente o core e o abdômen</li>
                <li>Definir e tonificar a região abdominal</li>
                <li>Melhorar a sustentação da coluna e postura</li>
                <li>Reduzir dores lombares com musculatura fortalecida</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

     

      {/* Demonstração de Exercícios */}
      <Section background="light">
        <h2 className={styles.sectionTitle}>Prévia dos Exercícios</h2>
        <div className={styles.exercisesGrid}>
          <Card hover>
            <div className={styles.exerciseImage}>
              <Image
                src="/hundred.jpeg"
                alt="Exercício Hundred - Fortalecimento do core"
                width={400}
                height={300}
                className={styles.exerciseImg}
              />
            </div>
            <h4>Hundred</h4>
            <p>Exercício clássico para fortalecimento do core e aquecimento</p>
          </Card>
          <Card hover>
            <div className={styles.exerciseImage}>
              <Image
                src="/roll-up.jpeg"
                alt="Exercício Teaser"
                width={400}
                height={300}
                className={styles.exerciseImg}
              />
            </div>
            <h4>Teaser</h4>
            <p>Fortalece o abdômen, melhora o equilíbrio e a estabilidade.</p>
          </Card>
          <Card hover>
            <div className={styles.exerciseImage}>
              <Image
                src="/single-leg-stretch.jpeg"
                alt="Exercício Single Leg Stretch - Core e coordenação"
                width={400}
                height={300}
                className={styles.exerciseImg}
              />
            </div>
            <h4>Single Leg Stretch</h4>
            <p>Trabalha core, coordenação e estabilidade</p>
          </Card>
        </div>
      </Section>

      {/* Depoimentos */}
      <Section background="white">
        <h2 className={styles.sectionTitle}>
          O Que Nossos Alunos e Alunas Dizem
        </h2>
        <TestimonialsCarousel testimonials={testimonials} />
      </Section>

      {/* Oferta e Preço */}
      <Section id="oferta" background="light">
        <h2 className={styles.sectionTitle}>{SECTION_TITLE}</h2>
        <p className={styles.sectionSubtitle}>{SECTION_SUBTITLE}</p>

        {/* Cronômetro de Desconto */}
        <div className={styles.countdownWrapper}>
          <div className={styles.countdown}>
            <div className={styles.countdownTitle}>
              <ZapIcon size={20} className={styles.zapIcon} /> Oferta por Tempo
              Limitado <ZapIcon size={20} className={styles.zapIcon} />
            </div>
            <div className={styles.countdownTimer}>
              <div className={styles.countdownUnit}>
                <div className={styles.countdownNumber}>
                  {String(timeLeft.hours).padStart(2, "0")}
                </div>
                <div className={styles.countdownLabel}>Horas</div>
              </div>
              <div className={styles.countdownUnit}>
                <div className={styles.countdownNumber}>
                  {String(timeLeft.minutes).padStart(2, "0")}
                </div>
                <div className={styles.countdownLabel}>Minutos</div>
              </div>
              <div className={styles.countdownUnit}>
                <div className={styles.countdownNumber}>
                  {String(timeLeft.seconds).padStart(2, "0")}
                </div>
                <div className={styles.countdownLabel}>Segundos</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.plansGrid}>
          {/* Plano Básico */}
          <div className={styles.planCard}>
            <div className={styles.planHeader}>
              <h3 className={styles.planName}>Plano Basic (trimestral)</h3>
            </div>

            <div className={styles.priceContainer}>
              <div className={styles.priceInstallment}>3x de R$ 47,90</div>
              <div className={styles.priceInstallmentSub}>ou</div>
              <div className={styles.priceCash}>• R$ 137 à vista</div>
            </div>

            <div className={styles.offerIncludes}>
              <h3>Inclui:</h3>
              <ul>
                <li>
                  <CheckIcon size={16} className={styles.checkIcon} /> 3
                  Módulos completos de Pilates
                </li>
                <li>
                  <CheckIcon size={16} className={styles.checkIcon} /> 12+
                  videoaulas em HD
                </li>
                <li>
                  <CheckIcon size={16} className={styles.checkIcon} /> Rotinas
                  de 10 a 45 minutos
                </li>
                <li>
                  <CheckIcon size={16} className={styles.checkIcon} /> Acesso
                  vitalício
                </li>
                <li>
                  <CheckIcon size={16} className={styles.checkIcon} />{" "}
                  Comunidade exclusiva
                </li>
                <li>
                  <CheckIcon size={16} className={styles.checkIcon} /> Suporte
                  da equipe
                </li>
                <li>
                  <CheckIcon size={16} className={styles.checkIcon} />{" "}
                  Atualizações gratuitas
                </li>
                <li>
                  <CheckIcon size={16} className={styles.checkIcon} /> Garantia
                  de 7 dias
                </li>
              </ul>
            </div>

            <button className={styles.planCta} onClick={handlePurchaseBasico}>
              Escolher Plano Básico
            </button>
          </div>

          {/* Plano Plus */}
          <div className={`${styles.planCard} ${styles.planCardPlus}`}>
            <div className={styles.planBadge}>
              <StarIcon size={12} /> MAIS POPULAR
            </div>
            <div className={styles.planHeader}>
              <h3 className={styles.planNamePlus}>Plano Plus (trimestral)</h3>
            </div>

            <div className={styles.priceContainer}>
              <div className={styles.priceInstallment}>3x de R$ 97</div>
              <div className={styles.priceInstallmentSub}>ou</div>
              <div className={styles.priceCash}>• R$ 297 à vista</div>
            </div>

            <div className={styles.offerIncludes}>
              <h3>Plano Plus inclui:</h3>
              <ul>
                <li>
                  <CheckIcon size={16} className={styles.checkIcon} /> 3
                  módulos
                </li>
                <li>
                  <CheckIcon size={16} className={styles.checkIcon} /> Bônus
                  +1 módulo
                </li>
                <li>
                  <CheckIcon size={16} className={styles.checkIcon} /> 12
                  vídeos
                </li>
                <li>
                  <CheckIcon size={16} className={styles.checkIcon} /> Bônus
                  +4 vídeos
                </li>
                <li>
                  <CheckIcon size={16} className={styles.checkIcon} /> Acesso
                  vitalício
                </li>
              </ul>
              <div className={styles.plusExtras}>
                <h3>Exclusivo Plus:</h3>
                <ul>
                  <li>
                    <VideoIcon size={16} className={styles.plusIcon} /> 1 aula
                    online por mês com a Professora Gabi Xavier pelo Google Meet
                  </li>
                  <li>
                    <MessageIcon size={16} className={styles.plusIcon} /> Acesso
                    ao WhatsApp da Gabi Xavier para dúvidas
                  </li>
                  <li>
                    <GiftIcon size={16} className={styles.plusIcon} /> Pacotes
                    exclusivos de exercícios
                  </li>
                  <li>
                    <StarIcon size={16} className={styles.plusIcon} /> Acesso
                    aos melhores amigos (close friends do Instagram), com dicas
                    e sugestões
                  </li>
                </ul>
              </div>
            </div>

            <button className={styles.planCta} onClick={handlePurchasePlus}>
              Escolher Plano Plus
            </button>
          </div>
        </div>

        <div className={styles.guarantee}>
          <strong>
            <ShieldIcon size={20} className={styles.shieldIcon} /> Garantia
            Incondicional de 7 Dias
          </strong>
          <p>
            Se você não ficar 100% satisfeito, devolvemos seu dinheiro. Sem
            perguntas, sem burocracia.
          </p>
        </div>
      </Section>

      {/* FAQ */}
      <Section background="white">
        <h2 className={styles.sectionTitle}>Perguntas Frequentes</h2>
        <FAQ items={faqItems} />
      </Section>

      <WhatsAppFloat />

      {/* Footer */}
      <footer className={styles.footer}>
        <Container>
          <div className={styles.footerContent}>
            <div className={styles.footerBrand}>
              <h3>Gabi Xavier</h3>
              <p>Studio de Pilates e Fisioterapia</p>
            </div>
            <div className={styles.footerLinks}>
              <a href="mailto:gab_xavier@hotmail.com">gab_xavier@hotmail.com</a>
              <p>© 2024 Gabi Xavier. Todos os direitos reservados.</p>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
}
