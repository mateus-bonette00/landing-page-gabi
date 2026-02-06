/**
 * Tipos e funções para geração de perfil personalizado
 */

export type QuizGoal =
  | 'postura'
  | 'dores'
  | 'core'
  | 'flexibilidade'
  | 'mobilidade'
  | 'retomar'
  | 'definir';

export type QuizLevel = 'iniciante' | 'intermediario' | 'avancado';

export type QuizRoutine = 10 | 20 | 30 | 45;

export type QuizPreference = 'com-equipamentos' | 'sem-equipamentos';

export type QuizLocation = 'casa' | 'academia';

export type QuizSex = 'masculino' | 'feminino' | 'prefiro-nao-dizer';

export type QuizBodyType = 'magro' | 'semi-gordo' | 'gordo';

export interface QuizDifficulties {
  faltaTempo?: boolean;
  faltaMotivacao?: boolean;
  dorCronica?: boolean;
  naoSabePorOnde?: boolean;
  miedoLesao?: boolean;
  resultadosLentos?: boolean;
}

export interface QuizProfile {
  peso: number;
  altura: number;
  idade: number;
  sexo: QuizSex;
  tipoCorpo?: QuizBodyType;
  objetivo: QuizGoal[];
  nivel: QuizLevel;
  rotina: QuizRoutine;
  preferencia: QuizPreference;
  local: QuizLocation;
  dificuldades: QuizDifficulties;
  timestamp: number;
}

interface PersonalizedContent {
  headline: string;
  bullets: string[];
  seal: string;
}

/**
 * Gera conteúdo personalizado baseado no perfil do quiz
 */
export function generatePersonalizedContent(profile: QuizProfile): PersonalizedContent {
  const headlines: Record<QuizGoal, string> = {
    postura: 'Conquiste uma Postura Impecável e Livre de Dores',
    dores: 'Liberte-se das Dores e Recupere seu Bem-Estar',
    core: 'Fortaleça seu Core e Transforme seu Abdômen',
    flexibilidade: 'Ganhe Flexibilidade e Mova-se com Liberdade',
    mobilidade: 'Aumente sua Mobilidade e Qualidade de Vida',
    retomar: 'Retome a Atividade Física com Segurança e Confiança',
    definir: 'Defina seu Corpo e Ganhe Resistência Muscular'
  };

  const bulletsByGoal: Record<QuizGoal, string[]> = {
    postura: [
      'Exercícios específicos para alinhamento postural e consciência corporal',
      'Fortalecimento da musculatura estabilizadora da coluna',
      'Redução de dores causadas por má postura no dia a dia'
    ],
    dores: [
      'Técnicas comprovadas para alívio de dores crônicas e desconfortos',
      'Fortalecimento muscular progressivo sem sobrecarga',
      'Exercícios terapêuticos validados por fisioterapeutas'
    ],
    core: [
      'Protocolo completo de fortalecimento do core e abdômen',
      'Exercícios de Pilates clássico e contemporâneo',
      'Progressão de intensidade conforme sua evolução'
    ],
    flexibilidade: [
      'Rotinas de alongamento ativo e passivo para ganho de amplitude',
      'Exercícios de mobilidade articular e fascial',
      'Técnicas respiratórias para potencializar a flexibilidade'
    ],
    mobilidade: [
      'Exercícios funcionais para melhorar movimentos do cotidiano',
      'Trabalho de mobilidade articular completo',
      'Prevenção de lesões e melhora da qualidade de vida'
    ],
    retomar: [
      'Protocolo seguro para iniciantes ou retorno após pausa',
      'Exercícios de baixo impacto com progressão gradual',
      'Orientações de fisioterapeuta para evitar lesões'
    ],
    definir: [
      'Treinos de Pilates avançado para definição muscular',
      'Exercícios de resistência e endurance',
      'Combinação de força, controle e consciência corporal'
    ]
  };

  const nivelText: Record<QuizLevel, string> = {
    iniciante: 'Iniciante',
    intermediario: 'Intermediário',
    avancado: 'Avançado'
  };

  const focoText: Record<QuizGoal, string> = {
    postura: 'Postura',
    dores: 'Alívio de Dores',
    core: 'Core & Abdômen',
    flexibilidade: 'Flexibilidade',
    mobilidade: 'Mobilidade',
    retomar: 'Retomar Atividade',
    definir: 'Definição & Resistência'
  };

  // Pega o primeiro objetivo para personalização (se houver múltiplos)
  const objetivoPrincipal = profile.objetivo[0] || 'postura';

  return {
    headline: headlines[objetivoPrincipal],
    bullets: bulletsByGoal[objetivoPrincipal],
    seal: `Plano sugerido: ${profile.rotina} min/dia • ${nivelText[profile.nivel]} • ${focoText[objetivoPrincipal]}`
  };
}

/**
 * Valida se o perfil está completo
 */
export function isValidProfile(profile: any): profile is QuizProfile {
  return (
    profile &&
    typeof profile.peso === 'number' &&
    typeof profile.altura === 'number' &&
    typeof profile.idade === 'number' &&
    typeof profile.sexo === 'string' &&
    typeof profile.objetivo === 'string' &&
    typeof profile.nivel === 'string' &&
    typeof profile.rotina === 'number' &&
    typeof profile.preferencia === 'string' &&
    typeof profile.local === 'string' &&
    typeof profile.dificuldades === 'object'
  );
}
