/**
 * Validaciones para el Checkout
 */

// Barrios de Bogotá (para referencia y validación)
export const BOGOTA_NEIGHBORHOODS = [
  'Usaquén',
  'Chapinero',
  'Santa Bárbara',
  'Teusaquillo',
  'Los Mártires',
  'La Candelaria',
  'Puente Aranda',
  'La Sabana',
  'Bosa',
  'Kennedy',
  'Fontibón',
  'Engativá',
  'Suba',
  'Barrios Unidos',
  'Mártires',
  'Antonio Nariño',
  'Tunjuelito',
  'Raffael Uribe Umaña',
  'Ciudad Bolívar',
  'Sumapaz'
];

/**
 * Validar email
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validar teléfono colombiano
 * Acepta: +57 312 1234567, 57 312 1234567, 312 1234567, 3121234567
 */
export function validatePhoneColombia(phone: string): boolean {
  const phoneRegex = /^(\+57|0057|57)?[1-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
}

/**
 * Validar dirección (mínimo 10 caracteres)
 */
export function validateAddress(address: string): boolean {
  return address.trim().length >= 10;
}

/**
 * Validar barrio (no vacío)
 */
export function validateNeighborhood(neighborhood: string): boolean {
  return neighborhood.trim().length > 0;
}

/**
 * Validar nombre completo (mínimo 3 caracteres)
 */
export function validateFullName(name: string): boolean {
  return name.trim().length >= 3;
}

/**
 * Validar todos los campos del checkout
 */
export function validateCheckoutForm(data: {
  fullName: string;
  phone: string;
  address: string;
  neighborhood: string;
  email: string;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!validateFullName(data.fullName)) {
    errors.push('Nombre completo debe tener al menos 3 caracteres');
  }

  if (!validatePhoneColombia(data.phone)) {
    errors.push('Teléfono debe ser un número válido de Colombia');
  }

  if (!validateAddress(data.address)) {
    errors.push('Dirección debe tener al menos 10 caracteres');
  }

  if (!validateNeighborhood(data.neighborhood)) {
    errors.push('Barrio/Localidad es requerido');
  }

  if (!validateEmail(data.email)) {
    errors.push('Email debe ser válido');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Formatear teléfono colombiano
 */
export function formatPhoneColombia(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  const last10 = cleaned.slice(-10);
  return `+57 ${last10.slice(0, 3)} ${last10.slice(3, 6)} ${last10.slice(6)}`;
}

/**
 * Sanitizar entrada de usuario
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remover < y >
    .substring(0, 255); // Limitar a 255 caracteres
}
