/**
 * Funções de tracking de eventos (simuladas)
 * Em produção, integrar com Google Analytics, Meta Pixel, etc.
 */
import { QuizProfile } from './profile';

type TrackingEvent =
  | 'quiz_start'
  | 'quiz_complete'
  | 'view_landing'
  | 'cta_click'
  | 'purchase_click';

interface TrackingData {
  [key: string]: unknown;
}

/**
 * Função principal de tracking
 */
function track(event: TrackingEvent, data?: TrackingData): void {
  if (typeof window === 'undefined') return;

  // Log no console para desenvolvimento
  console.log('📊 Tracking Event:', event, data || {});

  // Aqui você integraria com ferramentas reais:
  // - Google Analytics: gtag('event', event, data)
  // - Meta Pixel: fbq('track', event, data)
  // - Hotmart: etc.

  // Exemplo de integração futura:
  /*
  if (window.gtag) {
    window.gtag('event', event, data);
  }
  if (window.fbq) {
    window.fbq('track', event, data);
  }
  */
}

/**
 * Dispara evento de início do quiz
 */
export function trackQuizStart(): void {
  track('quiz_start', {
    timestamp: Date.now(),
    page: window.location.pathname
  });
}

/**
 * Dispara evento de conclusão do quiz
 */
export function trackQuizComplete(
  profile: Pick<QuizProfile, 'objetivo' | 'nivel' | 'rotina'>
): void {
  track('quiz_complete', {
    timestamp: Date.now(),
    objetivo: profile.objetivo,
    nivel: profile.nivel,
    rotina: profile.rotina
  });
}

/**
 * Dispara evento de visualização da landing
 */
export function trackViewLanding(hasProfile: boolean): void {
  track('view_landing', {
    timestamp: Date.now(),
    has_quiz_profile: hasProfile,
    page: window.location.pathname
  });
}

/**
 * Dispara evento de clique em CTA
 */
export function trackCTAClick(ctaName: string, ctaLocation: string): void {
  track('cta_click', {
    timestamp: Date.now(),
    cta_name: ctaName,
    cta_location: ctaLocation,
    page: window.location.pathname
  });
}

/**
 * Dispara evento de clique em botão de compra
 */
export function trackPurchaseClick(price?: number): void {
  track('purchase_click', {
    timestamp: Date.now(),
    page: window.location.pathname,
    value: price
  });
}
