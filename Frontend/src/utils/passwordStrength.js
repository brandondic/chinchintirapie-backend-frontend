// src/utils/passwordStrength.js
export const PASSWORD_RULES = {
  len:    { test: (v) => v.length >= 8,              label: '8+ chars'  },
  letter: { test: (v) => /[a-zA-Z]/.test(v),         label: 'letra'     },
  num:    { test: (v) => /\d/.test(v),                label: 'número'    },
  sym:    { test: (v) => /[@$!%*?&_\-#]/.test(v),    label: 'símbolo'   },
};

// Devuelve { score: 0-4, level: 'weak'|'medium'|'strong', rules: {len, letter, num, sym} }
export function getPasswordStrength(value) {
  const rules = Object.fromEntries(
    Object.entries(PASSWORD_RULES).map(([k, r]) => [k, r.test(value)])
  );
  const score = Object.values(rules).filter(Boolean).length;
  const level = score <= 1 ? 'weak' : score <= 3 ? 'medium' : 'strong';
  return { score, level, rules };
}

// Valida que cumple todos los requisitos (para el submit)
export function isPasswordValid(value) {
  return Object.values(PASSWORD_RULES).every((r) => r.test(value));
}