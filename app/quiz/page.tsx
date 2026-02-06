'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.css';
import Button from '@/components/Button';
import Card from '@/components/Card';
import ProgressBar from '@/components/ProgressBar';
import Container from '@/components/Container';
import { QuizProfile, QuizGoal, QuizLevel, QuizRoutine, QuizPreference, QuizLocation, QuizSex, QuizBodyType, QuizDifficulties } from '@/lib/profile';
import { saveQuizProfile } from '@/lib/storage';
import { trackQuizStart, trackQuizComplete } from '@/lib/tracking';

type QuizStep =
  | 'peso'
  | 'altura'
  | 'idade'
  | 'sexo'
  | 'tipoCorpo'
  | 'objetivo'
  | 'nivel'
  | 'rotina'
  | 'preferencia'
  | 'local'
  | 'dificuldades'
  | 'resultado';

const TOTAL_STEPS = 11;

const stepOrder: QuizStep[] = [
  'peso',
  'altura',
  'idade',
  'sexo',
  'tipoCorpo',
  'objetivo',
  'nivel',
  'rotina',
  'preferencia',
  'local',
  'dificuldades'
];

export default function QuizPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<QuizStep>('peso');
  const [hasStarted, setHasStarted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Estados do formulário
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState<QuizSex | ''>('');
  const [tipoCorpo, setTipoCorpo] = useState<QuizBodyType | ''>('');
  const [objetivo, setObjetivo] = useState<QuizGoal[]>([]);
  const [nivel, setNivel] = useState<QuizLevel | ''>('');
  const [rotina, setRotina] = useState<QuizRoutine | ''>(''  );
  const [preferencia, setPreferencia] = useState<QuizPreference | ''>('');
  const [local, setLocal] = useState<QuizLocation | ''>('');
  const [dificuldades, setDificuldades] = useState<QuizDifficulties>({});

  useEffect(() => {
    if (hasStarted) {
      trackQuizStart();
    }
  }, [hasStarted]);

  const getCurrentStepNumber = () => {
    if (currentStep === 'resultado') return TOTAL_STEPS;
    return stepOrder.indexOf(currentStep) + 1;
  };

  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case 'peso':
        const pesoNum = parseFloat(peso);
        if (!peso || isNaN(pesoNum) || pesoNum < 30 || pesoNum > 300) {
          newErrors.peso = 'Por favor, insira um peso válido entre 30 e 300 kg';
        }
        break;
      case 'altura':
        const alturaNum = parseFloat(altura);
        if (!altura || isNaN(alturaNum) || alturaNum < 100 || alturaNum > 250) {
          newErrors.altura = 'Por favor, insira uma altura válida entre 100 e 250 cm';
        }
        break;
      case 'idade':
        const idadeNum = parseInt(idade);
        if (!idade || isNaN(idadeNum) || idadeNum < 14 || idadeNum > 100) {
          newErrors.idade = 'Por favor, insira uma idade válida entre 14 e 100 anos';
        }
        break;
      case 'sexo':
        if (!sexo) {
          newErrors.sexo = 'Por favor, selecione uma opção';
        }
        break;
      case 'tipoCorpo':
        // Permite pular se escolheu "prefiro não dizer"
        if (!tipoCorpo && sexo !== 'prefiro-nao-dizer') {
          newErrors.tipoCorpo = 'Por favor, selecione uma imagem';
        }
        break;
      case 'objetivo':
        if (objetivo.length === 0) {
          newErrors.objetivo = 'Por favor, selecione pelo menos um objetivo';
        }
        break;
      case 'nivel':
        if (!nivel) {
          newErrors.nivel = 'Por favor, selecione seu nível';
        }
        break;
      case 'rotina':
        if (!rotina) {
          newErrors.rotina = 'Por favor, selecione o tempo disponível';
        }
        break;
      case 'preferencia':
        if (!preferencia) {
          newErrors.preferencia = 'Por favor, selecione uma preferência';
        }
        break;
      case 'local':
        if (!local) {
          newErrors.local = 'Por favor, selecione um local';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;

    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    } else {
      setCurrentStep('resultado');
    }
  };

  const handleBack = () => {
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
      setErrors({});
    }
  };

  const handleToggleDifficulty = (key: keyof QuizDifficulties) => {
    setDificuldades(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleToggleObjetivo = (obj: QuizGoal) => {
    setObjetivo(prev => {
      if (prev.includes(obj)) {
        return prev.filter(o => o !== obj);
      } else {
        return [...prev, obj];
      }
    });
  };

  const handleComplete = () => {
    const profile: QuizProfile = {
      peso: parseFloat(peso),
      altura: parseFloat(altura),
      idade: parseInt(idade),
      sexo: sexo as QuizSex,
      tipoCorpo: tipoCorpo as QuizBodyType,
      objetivo: objetivo,
      nivel: nivel as QuizLevel,
      rotina: rotina as QuizRoutine,
      preferencia: preferencia as QuizPreference,
      local: local as QuizLocation,
      dificuldades,
      timestamp: Date.now()
    };

    saveQuizProfile(profile);
    trackQuizComplete(profile);
    router.push('/landing');
  };

  if (!hasStarted) {
    return (
      <div className={styles.welcomeContainer}>
        <Container>
          <Card className={styles.welcomeCard}>
            <h1 className={styles.welcomeTitle}>Descubra o Pilates Ideal para Você</h1>
            <p className={styles.welcomeText}>
              Responda algumas perguntas rápidas para recebermos um plano personalizado de exercícios de Pilates,
              adaptado ao seu objetivo, nível e rotina.
            </p>
            <ul className={styles.welcomeList}>
              <li>Apenas 11 perguntas simples</li>
              <li>Resultado personalizado instantâneo</li>
              <li>Recomendações baseadas em seus objetivos</li>
            </ul>
            <div className={styles.welcomeButtons}>
              <Button size="large" fullWidth onClick={() => setHasStarted(true)}>
                Começar Agora
              </Button>
              <Button
                size="large"
                fullWidth
                variant="secondary"
                onClick={() => router.push('/landing')}
              >
                Pular Quiz
              </Button>
            </div>
          </Card>
        </Container>
      </div>
    );
  }

  if (currentStep === 'resultado') {
    const nivelText: Record<QuizLevel, string> = {
      iniciante: 'Iniciante',
      intermediario: 'Intermediário',
      avancado: 'Avançado'
    };

    const objetivoText: Record<QuizGoal, string> = {
      postura: 'Melhorar Postura',
      dores: 'Reduzir Dores',
      core: 'Fortalecer Core',
      flexibilidade: 'Ganhar Flexibilidade',
      mobilidade: 'Aumentar Mobilidade',
      retomar: 'Retomar Atividade Física',
      definir: 'Definir Corpo'
    };

    return (
      <div className={styles.resultContainer}>
        <Container>
          <Card className={styles.resultCard}>
            <div className={styles.resultIcon}>✓</div>
            <h1 className={styles.resultTitle}>Seu Perfil Está Pronto!</h1>
            <p className={styles.resultSubtitle}>
              Identificamos o plano ideal baseado nas suas respostas
            </p>

            <div className={styles.profileSummary}>
              <h3>Seu Perfil:</h3>
              <ul className={styles.profileList}>
                <li><strong>Objetivos:</strong> {objetivo.map(obj => objetivoText[obj]).join(', ')}</li>
                <li><strong>Nível:</strong> {nivelText[nivel as QuizLevel]}</li>
                <li><strong>Tempo disponível:</strong> {rotina} minutos por dia</li>
              </ul>
            </div>

            <div className={styles.resultBullets}>
              <h3>O que preparamos para você:</h3>
              <ul>
                <li>Plano de exercícios personalizado para seu objetivo</li>
                <li>Videoaulas adequadas ao seu nível de experiência</li>
                <li>Rotinas de {rotina} minutos que cabem na sua agenda</li>
              </ul>
            </div>

            <Button size="large" fullWidth onClick={handleComplete}>
              Ver o Plano Ideal para Mim
            </Button>
          </Card>
        </Container>
      </div>
    );
  }

  return (
    <div className={styles.quizContainer}>
      <Container>
        <div className={styles.quizContent}>
          <ProgressBar current={getCurrentStepNumber()} total={TOTAL_STEPS} />

          <Card className={styles.questionCard}>
            {/* Pergunta: Peso */}
            {currentStep === 'peso' && (
              <div className={styles.question}>
                <h2>Qual é o seu peso?</h2>
                <input
                  type="number"
                  className={styles.input}
                  placeholder="Ex: 70"
                  value={peso}
                  onChange={(e) => setPeso(e.target.value)}
                  autoFocus
                />
                <span className={styles.inputSuffix}>kg</span>
                {errors.peso && <p className={styles.error}>{errors.peso}</p>}
              </div>
            )}

            {/* Pergunta: Altura */}
            {currentStep === 'altura' && (
              <div className={styles.question}>
                <h2>Qual é a sua altura?</h2>
                <input
                  type="number"
                  className={styles.input}
                  placeholder="Ex: 165"
                  value={altura}
                  onChange={(e) => setAltura(e.target.value)}
                  autoFocus
                />
                <span className={styles.inputSuffix}>cm</span>
                {errors.altura && <p className={styles.error}>{errors.altura}</p>}
              </div>
            )}

            {/* Pergunta: Idade */}
            {currentStep === 'idade' && (
              <div className={styles.question}>
                <h2>Qual é a sua idade?</h2>
                <input
                  type="number"
                  className={styles.input}
                  placeholder="Ex: 35"
                  value={idade}
                  onChange={(e) => setIdade(e.target.value)}
                  autoFocus
                />
                <span className={styles.inputSuffix}>anos</span>
                {errors.idade && <p className={styles.error}>{errors.idade}</p>}
              </div>
            )}

            {/* Pergunta: Sexo */}
            {currentStep === 'sexo' && (
              <div className={styles.question}>
                <h2>Sexo:</h2>
                <div className={styles.options}>
                  <button
                    className={`${styles.option} ${sexo === 'masculino' ? styles.selected : ''}`}
                    onClick={() => setSexo('masculino')}
                  >
                    Masculino
                  </button>
                  <button
                    className={`${styles.option} ${sexo === 'feminino' ? styles.selected : ''}`}
                    onClick={() => setSexo('feminino')}
                  >
                    Feminino
                  </button>
                  <button
                    className={`${styles.option} ${sexo === 'prefiro-nao-dizer' ? styles.selected : ''}`}
                    onClick={() => setSexo('prefiro-nao-dizer')}
                  >
                    Prefiro não dizer
                  </button>
                </div>
                {errors.sexo && <p className={styles.error}>{errors.sexo}</p>}
              </div>
            )}

            {/* Pergunta: Tipo Corporal */}
            {currentStep === 'tipoCorpo' && (
              <div className={styles.question}>
                <h2>Qual destas 3 imagens representa como está seu corpo atualmente?</h2>
                <div className={styles.bodyTypeGrid}>
                  {sexo === 'masculino' && (
                    <>
                      <button
                        className={`${styles.bodyTypeOption} ${tipoCorpo === 'magro' ? styles.selected : ''}`}
                        onClick={() => setTipoCorpo('magro')}
                      >
                        <Image
                          src="/masculino-magro.png"
                          alt="Corpo magro"
                          width={200}
                          height={300}
                          className={styles.bodyImage}
                        />
                        <span className={styles.bodyLabel}>Magro</span>
                      </button>
                      <button
                        className={`${styles.bodyTypeOption} ${tipoCorpo === 'semi-gordo' ? styles.selected : ''}`}
                        onClick={() => setTipoCorpo('semi-gordo')}
                      >
                        <Image
                          src="/masculino-semi-gordo.png"
                          alt="Corpo intermediário"
                          width={200}
                          height={300}
                          className={styles.bodyImage}
                        />
                        <span className={styles.bodyLabel}>Intermediário</span>
                      </button>
                      <button
                        className={`${styles.bodyTypeOption} ${tipoCorpo === 'gordo' ? styles.selected : ''}`}
                        onClick={() => setTipoCorpo('gordo')}
                      >
                        <Image
                          src="/masculino-gordo.png"
                          alt="Corpo com sobrepeso"
                          width={200}
                          height={300}
                          className={styles.bodyImage}
                        />
                        <span className={styles.bodyLabel}>Sobrepeso</span>
                      </button>
                    </>
                  )}
                  {sexo === 'feminino' && (
                    <>
                      <button
                        className={`${styles.bodyTypeOption} ${tipoCorpo === 'magro' ? styles.selected : ''}`}
                        onClick={() => setTipoCorpo('magro')}
                      >
                        <Image
                          src="/feminino-magro.png"
                          alt="Corpo magro"
                          width={200}
                          height={300}
                          className={styles.bodyImage}
                        />
                        <span className={styles.bodyLabel}>Magra</span>
                      </button>
                      <button
                        className={`${styles.bodyTypeOption} ${tipoCorpo === 'semi-gordo' ? styles.selected : ''}`}
                        onClick={() => setTipoCorpo('semi-gordo')}
                      >
                        <Image
                          src="/feminino-semi-gordo.png"
                          alt="Corpo intermediário"
                          width={200}
                          height={300}
                          className={styles.bodyImage}
                        />
                        <span className={styles.bodyLabel}>Intermediária</span>
                      </button>
                      <button
                        className={`${styles.bodyTypeOption} ${tipoCorpo === 'gordo' ? styles.selected : ''}`}
                        onClick={() => setTipoCorpo('gordo')}
                      >
                        <Image
                          src="/feminino-gordo.png"
                          alt="Corpo com sobrepeso"
                          width={200}
                          height={300}
                          className={styles.bodyImage}
                        />
                        <span className={styles.bodyLabel}>Sobrepeso</span>
                      </button>
                    </>
                  )}
                  {sexo === 'prefiro-nao-dizer' && (
                    <p className={styles.infoText}>
                      Você pode pular esta pergunta ou escolher a imagem que melhor representa seu corpo atual.
                    </p>
                  )}
                </div>
                {errors.tipoCorpo && <p className={styles.error}>{errors.tipoCorpo}</p>}
              </div>
            )}

            {/* Pergunta: Objetivo */}
            {currentStep === 'objetivo' && (
              <div className={styles.question}>
                <h2>Qual é o seu objetivo principal?</h2>
                <p className={styles.questionSubtext}>(Selecione quantas opções quiser)</p>
                <div className={styles.options}>
                  <button
                    className={`${styles.option} ${objetivo.includes('postura') ? styles.selected : ''}`}
                    onClick={() => handleToggleObjetivo('postura')}
                  >
                    Melhorar postura
                  </button>
                  <button
                    className={`${styles.option} ${objetivo.includes('dores') ? styles.selected : ''}`}
                    onClick={() => handleToggleObjetivo('dores')}
                  >
                    Reduzir dores e desconfortos
                  </button>
                  <button
                    className={`${styles.option} ${objetivo.includes('core') ? styles.selected : ''}`}
                    onClick={() => handleToggleObjetivo('core')}
                  >
                    Fortalecer core/abdômen
                  </button>
                  <button
                    className={`${styles.option} ${objetivo.includes('flexibilidade') ? styles.selected : ''}`}
                    onClick={() => handleToggleObjetivo('flexibilidade')}
                  >
                    Ganhar flexibilidade
                  </button>
                  <button
                    className={`${styles.option} ${objetivo.includes('mobilidade') ? styles.selected : ''}`}
                    onClick={() => handleToggleObjetivo('mobilidade')}
                  >
                    Aumentar mobilidade
                  </button>
                  <button
                    className={`${styles.option} ${objetivo.includes('retomar') ? styles.selected : ''}`}
                    onClick={() => handleToggleObjetivo('retomar')}
                  >
                    Retomar atividade física com segurança
                  </button>
                  <button
                    className={`${styles.option} ${objetivo.includes('definir') ? styles.selected : ''}`}
                    onClick={() => handleToggleObjetivo('definir')}
                  >
                    Definir corpo e resistência
                  </button>
                </div>
                {errors.objetivo && <p className={styles.error}>{errors.objetivo}</p>}
              </div>
            )}

            {/* Pergunta: Nível */}
            {currentStep === 'nivel' && (
              <div className={styles.question}>
                <h2>Qual é o seu nível de experiência?</h2>
                <div className={styles.options}>
                  <button
                    className={`${styles.option} ${nivel === 'iniciante' ? styles.selected : ''}`}
                    onClick={() => setNivel('iniciante')}
                  >
                    <strong>Iniciante</strong>
                    <span className={styles.optionDesc}>Nunca ou raramente pratiquei Pilates</span>
                  </button>
                  <button
                    className={`${styles.option} ${nivel === 'intermediario' ? styles.selected : ''}`}
                    onClick={() => setNivel('intermediario')}
                  >
                    <strong>Intermediário</strong>
                    <span className={styles.optionDesc}>Já pratiquei algumas vezes</span>
                  </button>
                  <button
                    className={`${styles.option} ${nivel === 'avancado' ? styles.selected : ''}`}
                    onClick={() => setNivel('avancado')}
                  >
                    <strong>Avançado</strong>
                    <span className={styles.optionDesc}>Pratico regularmente</span>
                  </button>
                </div>
                {errors.nivel && <p className={styles.error}>{errors.nivel}</p>}
              </div>
            )}

            {/* Pergunta: Rotina */}
            {currentStep === 'rotina' && (
              <div className={styles.question}>
                <h2>Quanto tempo você tem disponível por dia?</h2>
                <div className={styles.options}>
                  <button
                    className={`${styles.option} ${rotina === 10 ? styles.selected : ''}`}
                    onClick={() => setRotina(10)}
                  >
                    10 minutos
                  </button>
                  <button
                    className={`${styles.option} ${rotina === 20 ? styles.selected : ''}`}
                    onClick={() => setRotina(20)}
                  >
                    20 minutos
                  </button>
                  <button
                    className={`${styles.option} ${rotina === 30 ? styles.selected : ''}`}
                    onClick={() => setRotina(30)}
                  >
                    30 minutos
                  </button>
                  <button
                    className={`${styles.option} ${rotina === 45 ? styles.selected : ''}`}
                    onClick={() => setRotina(45)}
                  >
                    45 minutos
                  </button>
                </div>
                {errors.rotina && <p className={styles.error}>{errors.rotina}</p>}
              </div>
            )}

            {/* Pergunta: Preferência */}
            {currentStep === 'preferencia' && (
              <div className={styles.question}>
                <h2>Você prefere treinos:</h2>
                <div className={styles.options}>
                  <button
                    className={`${styles.option} ${preferencia === 'sem-equipamentos' ? styles.selected : ''}`}
                    onClick={() => setPreferencia('sem-equipamentos')}
                  >
                    Sem equipamentos
                  </button>
                  <button
                    className={`${styles.option} ${preferencia === 'com-equipamentos' ? styles.selected : ''}`}
                    onClick={() => setPreferencia('com-equipamentos')}
                  >
                    Com equipamentos
                  </button>
                </div>
                {errors.preferencia && <p className={styles.error}>{errors.preferencia}</p>}
              </div>
            )}

            {/* Pergunta: Local */}
            {currentStep === 'local' && (
              <div className={styles.question}>
                <h2>Onde você pretende praticar?</h2>
                <div className={styles.options}>
                  <button
                    className={`${styles.option} ${local === 'casa' ? styles.selected : ''}`}
                    onClick={() => setLocal('casa')}
                  >
                    Em casa
                  </button>
                  <button
                    className={`${styles.option} ${local === 'academia' ? styles.selected : ''}`}
                    onClick={() => setLocal('academia')}
                  >
                    Na academia
                  </button>
                </div>
                {errors.local && <p className={styles.error}>{errors.local}</p>}
              </div>
            )}

            {/* Pergunta: Dificuldades */}
            {currentStep === 'dificuldades' && (
              <div className={styles.question}>
                <h2>Quais são suas principais dificuldades hoje?</h2>
                <p className={styles.questionSubtext}>(Selecione quantas quiser)</p>
                <div className={styles.checkboxOptions}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={dificuldades.faltaTempo || false}
                      onChange={() => handleToggleDifficulty('faltaTempo')}
                    />
                    <span>Falta de tempo</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={dificuldades.faltaMotivacao || false}
                      onChange={() => handleToggleDifficulty('faltaMotivacao')}
                    />
                    <span>Falta de motivação</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={dificuldades.dorCronica || false}
                      onChange={() => handleToggleDifficulty('dorCronica')}
                    />
                    <span>Dor crônica</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={dificuldades.naoSabePorOnde || false}
                      onChange={() => handleToggleDifficulty('naoSabePorOnde')}
                    />
                    <span>Não sei por onde começar</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={dificuldades.miedoLesao || false}
                      onChange={() => handleToggleDifficulty('miedoLesao')}
                    />
                    <span>Medo de lesão</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={dificuldades.resultadosLentos || false}
                      onChange={() => handleToggleDifficulty('resultadosLentos')}
                    />
                    <span>Resultados lentos</span>
                  </label>
                </div>
              </div>
            )}

            <div className={styles.navigation}>
              {getCurrentStepNumber() > 1 && (
                <Button variant="secondary" onClick={handleBack}>
                  Voltar
                </Button>
              )}
              <Button onClick={handleNext}>
                {getCurrentStepNumber() === TOTAL_STEPS ? 'Finalizar' : 'Continuar'}
              </Button>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}
