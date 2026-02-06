/**
 * Funções seguras para gerenciar localStorage
 */

import { QuizProfile, isValidProfile } from './profile';

const STORAGE_KEY = 'gx_quiz_profile';

/**
 * Verifica se localStorage está disponível (SSR-safe)
 */
function isLocalStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const test = '__localStorage_test__';
    window.localStorage.setItem(test, test);
    window.localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Salva o perfil do quiz no localStorage
 */
export function saveQuizProfile(profile: QuizProfile): boolean {
  if (!isLocalStorageAvailable()) return false;

  try {
    const data = JSON.stringify(profile);
    window.localStorage.setItem(STORAGE_KEY, data);
    return true;
  } catch (error) {
    console.error('Erro ao salvar perfil:', error);
    return false;
  }
}

/**
 * Recupera o perfil do quiz do localStorage
 */
export function getQuizProfile(): QuizProfile | null {
  if (!isLocalStorageAvailable()) return null;

  try {
    const data = window.localStorage.getItem(STORAGE_KEY);
    if (!data) return null;

    const profile = JSON.parse(data);

    // Valida o perfil antes de retornar
    if (!isValidProfile(profile)) {
      console.warn('Perfil inválido encontrado, removendo...');
      clearQuizProfile();
      return null;
    }

    return profile;
  } catch (error) {
    console.error('Erro ao recuperar perfil:', error);
    return null;
  }
}

/**
 * Remove o perfil do quiz do localStorage
 */
export function clearQuizProfile(): boolean {
  if (!isLocalStorageAvailable()) return false;

  try {
    window.localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Erro ao remover perfil:', error);
    return false;
  }
}

/**
 * Verifica se existe um perfil salvo
 */
export function hasQuizProfile(): boolean {
  return getQuizProfile() !== null;
}
