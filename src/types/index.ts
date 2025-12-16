export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

export interface StrengthResult {
  level: number;
  label: string;
}

export interface CharacterOptions {
  key: keyof PasswordOptions;
  label: string;
  checked: boolean;
}
