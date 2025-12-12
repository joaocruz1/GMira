/**
 * Gera um slug a partir de uma string
 * Converte para lowercase, remove acentos e caracteres especiais
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD") // Normaliza caracteres Unicode
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/[^a-z0-9\s-]/g, "") // Remove caracteres especiais
    .trim()
    .replace(/\s+/g, "-") // Substitui espaços por hífens
    .replace(/-+/g, "-") // Remove hífens duplicados
}





