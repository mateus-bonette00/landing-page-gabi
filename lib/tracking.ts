/**
 * Funções de tracking de eventos
 * Integrado com Meta Pixel (Facebook)
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
 * Envia evento para a Conversions API (server-side) para melhor rastreamento
 */
function sendServerEvent(eventName: string, data?: TrackingData): void {
  if (typeof window === 'undefined') return;

  // Pega cookies _fbc e _fbp para deduplicação
  const getCookie = (name: string) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : undefined;
  };

  fetch('/api/fb-event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event_name: eventName,
      event_source_url: window.location.href,
      custom_data: data,
      fbc: getCookie('_fbc'),
      fbp: getCookie('_fbp'),
    }),
  }).catch((err) => console.error('Server event error:', err));
}

/**
 * Helper para chamar o Facebook Pixel
 */
function fbqTrack(eventName: string, data?: TrackingData): void {
  if (typeof window !== 'undefined' && window.fbq) {
    if (data) {
      window.fbq('track', eventName, data);
    } else {
      window.fbq('track', eventName);
    }
  }
}

function fbqTrackCustom(eventName: string, data?: TrackingData): void {
  if (typeof window !== 'undefined' && window.fbq) {
    if (data) {
      window.fbq('trackCustom', eventName, data);
    } else {
      window.fbq('trackCustom', eventName);
    }
  }
}

/**
 * Função principal de tracking
 */
function track(event: TrackingEvent, data?: TrackingData): void {
  if (typeof window === 'undefined') return;

  console.log('📊 Tracking Event:', event, data || {});

  // Mapear eventos para eventos do Facebook Pixel (client + server)
  switch (event) {
    case 'quiz_start':
      fbqTrackCustom('QuizStart', data);
      sendServerEvent('QuizStart', data);
      break;
    case 'quiz_complete':
      fbqTrack('CompleteRegistration', data);
      sendServerEvent('CompleteRegistration', data);
      break;
    case 'view_landing':
      fbqTrack('ViewContent', {
        content_name: 'Landing Page - Desafio Pilates 8GX',
        ...data,
      });
      sendServerEvent('ViewContent', {
        content_name: 'Landing Page - Desafio Pilates 8GX',
        ...data,
      });
      break;
    case 'cta_click':
      fbqTrackCustom('CTAClick', data);
      sendServerEvent('CTAClick', data);
      break;
    case 'purchase_click':
      fbqTrack('InitiateCheckout', {
        content_name: 'Desafio Pilates 8GX',
        currency: 'BRL',
        ...data,
      });
      sendServerEvent('InitiateCheckout', {
        content_name: 'Desafio Pilates 8GX',
        currency: 'BRL',
        ...data,
      });
      break;
  }
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
