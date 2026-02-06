'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import Section from '@/components/Section';
import Container from '@/components/Container';
import Button from '@/components/Button';
import Card from '@/components/Card';
import VideoBlock from '@/components/VideoBlock';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import FAQ from '@/components/FAQ';
import StickyMobileCTA from '@/components/StickyMobileCTA';
import { getQuizProfile } from '@/lib/storage';
import { generatePersonalizedContent, QuizProfile } from '@/lib/profile';
import { trackViewLanding, trackCTAClick, trackPurchaseClick } from '@/lib/tracking';
import { CHECKOUT_URL } from '@/config/urls';
import { BookIcon, VideoIcon, ClockIcon, TrendingUpIcon, InfinityIcon, UsersIcon, ShieldIcon, CheckIcon, ZapIcon } from '@/components/Icons';

export default function LandingPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<QuizProfile | null>(null);
  const [personalized, setPersonalized] = useState({
    headline: 'Transforme seu Corpo com o Método Pilates',
    bullets: [
      'Exercícios completos para todos os níveis',
      'Videoaulas profissionais e detalhadas',
      'Resultados comprovados e duradouros'
    ],
    seal: 'Programa Completo de Pilates Online'
  });

  // Cronômetro de 3 horas
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const loadedProfile = getQuizProfile();

    if (loadedProfile) {
      setProfile(loadedProfile);
      const content = generatePersonalizedContent(loadedProfile);
      setPersonalized(content);
    }

    trackViewLanding(!!loadedProfile);
  }, []);

  // Atualiza o cronômetro a cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
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

  const scrollToOffer = () => {
    trackCTAClick('Ver oferta', 'hero');
    const offerSection = document.getElementById('oferta');
    if (offerSection) {
      offerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToVideo = () => {
    trackCTAClick('Ver como funciona', 'hero');
    const videoSection = document.getElementById('video');
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePurchase = () => {
    trackPurchaseClick(29.90);
    window.open(CHECKOUT_URL, '_blank');
  };

  const handleQuizRedirect = () => {
    router.push('/quiz');
  };

  // Dados dos depoimentos
  const testimonials = [
    {
      name: 'Isabel Garcia',
      rating: 5,
      comment: 'Iniciei minhas aulas de pilates em dezembro de 2024, indicação do médico ortopedista... Estou com problemas nos quadris, graças a Deus minhas dores estão parando devido as aulas que estou fazendo... Estou dormindo bem tbm, até parei de tomar clonazepan... Estou muito satisfeita e feliz... Só tenho a agradecer Pilates e vida!'
    },
    {
      name: 'Andréa Fonseca Freitas de Souza',
      rating: 5,
      comment: 'Me ajudou muito a ter mais flexibilidade, melhorou minhas dores e me deu mais disposição para o dia a dia. As aulas são excelentes e os resultados aparecem rapidamente!'
    },
    {
      name: 'Maria De Castro',
      rating: 5,
      comment: 'Gabi é uma profissional que admiro pela dedicação e comprometimento, além de ser uma pessoa autêntica, amável e simples. É um prazer praticar pilates neste curso completo e bem estruturado.'
    },
    {
      name: 'Janaina Carvalho',
      rating: 5,
      comment: 'Eu amo de paixão fazer pilates! As aulas são super dinâmicas e não tem nada de moleza não. Pra quem acha que pilates é só alongamento, sugiro uma aula experimental!'
    },
    {
      name: 'Elaine',
      rating: 5,
      comment: 'Não vivo mais sem!! Recomendo!! Os exercícios são incríveis e os resultados são visíveis. Minha qualidade de vida melhorou muito desde que comecei.'
    },
    {
      name: 'Mara Costa',
      rating: 5,
      comment: 'Adoro fazer pilates! Gabriela é muito atenciosa, muito batalhadora, uma pessoa muito capacitada. Ela cumpre todos os protocolos de segurança. Indico muito a todos que quizerem fazer pilates e transformar sua saúde.'
    },
    {
      name: 'Julia Bustamante',
      rating: 5,
      comment: 'Aulas dinâmicas, sempre com muita variação nos exercícios, permitindo uma evolução diária. Ambiente saudável e equipe muito qualificada. Nota 10!'
    },
    {
      name: 'Izabel Cristina Ribeiro',
      rating: 5,
      comment: 'Excelente! Profissional atendendo com muito cuidado a necessidade de cada pessoa. Muito dedicada e atenciosa. Parabéns pelo trabalho!'
    },
    {
      name: 'Andressa Santos',
      rating: 5,
      comment: 'Melhor Pilates do mundo, professores atenciosos. Nunca mais tive dor nas costas desde que comecei. Os exercícios são completos e realmente funcionam!'
    },
    {
      name: 'Fernanda Lima',
      rating: 5,
      comment: 'Comecei o curso há 6 meses e minha postura melhorou drasticamente. Trabalho em home office e sofria muito com dores. Hoje me sinto outra pessoa!'
    },
    {
      name: 'Camila Rodrigues',
      rating: 5,
      comment: 'As videoaulas são perfeitas! Consigo fazer os exercícios no meu ritmo e a explicação de cada movimento é muito clara. Já perdi 8kg e ganhei muita disposição!'
    },
    {
      name: 'Roberta Alves',
      rating: 5,
      comment: 'Sofria com dores crônicas há anos. Depois de 4 meses praticando pilates com este curso, finalmente consegui alívio. Não consigo mais viver sem!'
    }
  ];

  // Dados do FAQ
  const faqItems = [
    {
      question: 'Para quem é este curso?',
      answer: 'O curso é para qualquer pessoa que deseja melhorar sua saúde, postura, flexibilidade e força através do Pilates. Atende desde iniciantes completos até praticantes avançados, com módulos específicos para cada nível.'
    },
    {
      question: 'Preciso de equipamentos?',
      answer: 'Não! O curso oferece rotinas completas sem equipamentos, que podem ser feitas em casa. Também há módulos opcionais com equipamentos para quem desejar avançar ainda mais.'
    },
    {
      question: 'Quanto tempo duram as aulas?',
      answer: 'As aulas variam de 10 a 45 minutos, permitindo que você escolha rotinas que se encaixem na sua agenda. Você pode treinar no seu próprio ritmo e horário.'
    },
    {
      question: 'Por quanto tempo terei acesso?',
      answer: 'Você terá acesso vitalício a todo o conteúdo do curso, incluindo futuras atualizações. Aprenda no seu ritmo, sem pressa.'
    },
    {
      question: 'Existe garantia?',
      answer: 'Sim! Oferecemos garantia incondicional de 7 dias. Se você não ficar satisfeito por qualquer motivo, devolvemos 100% do seu investimento.'
    },
    {
      question: 'Como funciona o suporte?',
      answer: 'Você terá acesso à nossa comunidade exclusiva onde pode tirar dúvidas, compartilhar resultados e receber orientações diretas da equipe.'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <Container>
          <div className={styles.heroContent}>
            {profile && (
              <div className={styles.badge}>
                {personalized.seal}
              </div>
            )}

            <h1 className={styles.heroTitle}>
              {personalized.headline}
            </h1>

            <p className={styles.heroSubtitle}>
              Curso online completo de Pilates com videoaulas profissionais.
              Transforme seu corpo, elimine dores e ganhe qualidade de vida.
            </p>

            <ul className={styles.heroBullets}>
              {personalized.bullets.map((bullet, index) => (
                <li key={index}>{bullet}</li>
              ))}
            </ul>

            <div className={styles.heroCTAs}>
              <Button size="large" onClick={scrollToOffer}>
                Quero Acesso ao Curso
              </Button>
              <Button variant="secondary" size="large" onClick={scrollToVideo}>
                Ver Como Funciona
              </Button>
            </div>

            {!profile && (
              <p className={styles.quizPrompt}>
                Quer um plano personalizado?{' '}
                <button className={styles.quizLink} onClick={handleQuizRedirect}>
                  Faça nosso quiz rápido
                </button>
              </p>
            )}
          </div>
        </Container>
      </section>

      {/* Vídeo Principal */}
      <Section id="video" background="white">
        <VideoBlock
          title="Conheça a Gabi Xavier"
          description="Fisioterapeuta e instrutora de Pilates com mais de 10 anos de experiência. Descubra como o método Pilates pode transformar sua saúde e bem-estar, com técnicas validadas e resultados comprovados."
          thumbnailUrl=""
        />
      </Section>

      {/* O que você vai receber */}
      <Section background="light">
        <h2 className={styles.sectionTitle}>O Que Você Vai Receber</h2>
        <div className={styles.benefitsGrid}>
          <Card hover>
            <h3 className={styles.benefitTitle}>
              <BookIcon size={28} /> 12 Módulos Completos
            </h3>
            <p>
              Desde exercícios básicos até avançados, com progressão estruturada
              para você evoluir com segurança.
            </p>
          </Card>
          <Card hover>
            <h3 className={styles.benefitTitle}>
              <VideoIcon size={28} /> 50+ Videoaulas
            </h3>
            <p>
              Aulas em alta definição com explicações detalhadas de cada movimento
              e correções posturais.
            </p>
          </Card>
          <Card hover>
            <h3 className={styles.benefitTitle}>
              <ClockIcon size={28} /> Rotinas por Tempo
            </h3>
            <p>
              Treinos de 10, 20, 30 e 45 minutos para você encaixar na sua rotina,
              sem desculpas.
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
              Participe da nossa comunidade de alunos, tire dúvidas e compartilhe
              sua evolução.
            </p>
          </Card>
        </div>
      </Section>

      {/* Benefícios */}
      <Section background="white">
        <h2 className={styles.sectionTitle}>Benefícios do Pilates</h2>
        <div className={styles.twoColumns}>
          <div>
            <h3 className={styles.columnTitle}>Benefícios Físicos</h3>
            <ul className={styles.benefitsList}>
              <li>Fortalecimento muscular profundo</li>
              <li>Melhora da postura e alinhamento</li>
              <li>Aumento da flexibilidade</li>
              <li>Redução de dores crônicas</li>
              <li>Maior mobilidade articular</li>
              <li>Definição muscular</li>
            </ul>
          </div>
          <div>
            <h3 className={styles.columnTitle}>Benefícios Práticos</h3>
            <ul className={styles.benefitsList}>
              <li>Exercícios de baixo impacto</li>
              <li>Seguro para todas as idades</li>
              <li>Previne lesões</li>
              <li>Melhora qualidade de vida</li>
              <li>Aumenta consciência corporal</li>
              <li>Reduz estresse e ansiedade</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Demonstração de Exercícios */}
      <Section background="light">
        <h2 className={styles.sectionTitle}>Prévia dos Exercícios</h2>
        <div className={styles.exercisesGrid}>
          <Card hover>
            <div className={styles.exerciseImage}>
              <div className={styles.exercisePlaceholder}>🧘‍♀️</div>
            </div>
            <h4>Hundred</h4>
            <p>Exercício clássico para fortalecimento do core e aquecimento</p>
          </Card>
          <Card hover>
            <div className={styles.exerciseImage}>
              <div className={styles.exercisePlaceholder}>💪</div>
            </div>
            <h4>Roll Up</h4>
            <p>Fortalece abdômen e melhora flexibilidade da coluna</p>
          </Card>
          <Card hover>
            <div className={styles.exerciseImage}>
              <div className={styles.exercisePlaceholder}>🦵</div>
            </div>
            <h4>Single Leg Stretch</h4>
            <p>Trabalha core, coordenação e estabilidade</p>
          </Card>
        </div>
      </Section>

      {/* Depoimentos */}
      <Section background="white">
        <h2 className={styles.sectionTitle}>O Que Nossos Alunos e Alunas Dizem</h2>
        <TestimonialsCarousel testimonials={testimonials} />
      </Section>

      {/* Oferta e Preço */}
      <Section id="oferta" background="light">
        <div className={styles.offerContainer}>
          <Card className={styles.offerCard}>
            <h2 className={styles.offerTitle}>Curso Completo de Pilates Online</h2>

            {/* Cronômetro de Desconto */}
            <div className={styles.countdown}>
              <div className={styles.countdownTitle}>
                <ZapIcon size={20} className={styles.zapIcon} /> Oferta por Tempo Limitado <ZapIcon size={20} className={styles.zapIcon} />
              </div>
              <div className={styles.countdownTimer}>
                <div className={styles.countdownUnit}>
                  <div className={styles.countdownNumber}>{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div className={styles.countdownLabel}>Horas</div>
                </div>
                <div className={styles.countdownUnit}>
                  <div className={styles.countdownNumber}>{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div className={styles.countdownLabel}>Minutos</div>
                </div>
                <div className={styles.countdownUnit}>
                  <div className={styles.countdownNumber}>{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div className={styles.countdownLabel}>Segundos</div>
                </div>
              </div>
            </div>

            <div className={styles.priceContainer}>
              <div className={styles.priceOld}>12x de R$ 97,00</div>
              <div className={styles.price}>
                <span className={styles.priceText}>12x de</span>
              </div>
              <div className={styles.priceMain}>
                <span className={styles.currency}>R$</span>
                <span className={styles.amount}>29,90</span>
              </div>
              <div className={styles.installments}>sem juros</div>
            </div>

            <div className={styles.offerIncludes}>
              <h3>Inclui:</h3>
              <ul>
                <li><CheckIcon size={18} className={styles.checkIcon} /> 12 Módulos completos de Pilates</li>
                <li><CheckIcon size={18} className={styles.checkIcon} /> 50+ videoaulas em HD</li>
                <li><CheckIcon size={18} className={styles.checkIcon} /> Rotinas de 10 a 45 minutos</li>
                <li><CheckIcon size={18} className={styles.checkIcon} /> Acesso vitalício</li>
                <li><CheckIcon size={18} className={styles.checkIcon} /> Comunidade exclusiva</li>
                <li><CheckIcon size={18} className={styles.checkIcon} /> Suporte da equipe</li>
                <li><CheckIcon size={18} className={styles.checkIcon} /> Atualizações gratuitas</li>
                <li><CheckIcon size={18} className={styles.checkIcon} /> Garantia de 7 dias</li>
              </ul>
            </div>

            <Button size="large" fullWidth onClick={handlePurchase}>
              Ir para o Pagamento Seguro
            </Button>

            <div className={styles.guarantee}>
              <strong><ShieldIcon size={20} className={styles.shieldIcon} /> Garantia Incondicional de 7 Dias</strong>
              <p>
                Se você não ficar 100% satisfeito, devolvemos seu dinheiro.
                Sem perguntas, sem burocracia.
              </p>
            </div>
          </Card>
        </div>
      </Section>

      {/* FAQ */}
      <Section background="white">
        <h2 className={styles.sectionTitle}>Perguntas Frequentes</h2>
        <FAQ items={faqItems} />
      </Section>

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

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA text="Quero Acesso" onClick={handlePurchase} />
    </>
  );
}
