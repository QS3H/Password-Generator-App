# Frontend Mentor - Password generator app solution

This is my solution to the [Password generator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/password-generator-app-Mr8CLycqjh).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Generate a password based on the selected inclusion options
- Copy the generated password to the computer's clipboard
- See a strength rating for their generated password
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./assets/preview.jpg)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- [React](https://reactjs.org/) - JavaScript library
- [TypeScript](https://www.typescriptlang.org/) - For type safety
- [Vite](https://vitejs.dev/) - Build tool and development server
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

### What I learned

This project was a great opportunity to practice several key React and TypeScript concepts:

**Custom Hooks Pattern:**
I created a `usePasswordGenerator` hook to encapsulate all password-related state and logic, making the code more modular and reusable:

```typescript
const { password, options, strength, setOptions, generateNewPassword } =
  usePasswordGenerator();
```

**Cryptographically Secure Random Generation:**
I learned to use the Web Crypto API (`crypto.getRandomValues`) instead of `Math.random()` for generating secure passwords:

```typescript
const randomArray = new Uint32Array(1);
crypto.getRandomValues(randomArray);
const randomIndex = randomArray[0] % charSet.length;
```

**Password Strength Calculation:**
Implemented a comprehensive strength calculation algorithm that considers both password length and character variety:

```typescript
export const calculatePasswordStrength = (
  password: string,
  options: PasswordOptions
): StrengthResult => {
  // Calculates strength based on length and character variety
  // Returns level (0-4) and label (TOO WEAK to VERY STRONG)
};
```

**Keyboard Shortcuts:**
Added keyboard shortcut support (Ctrl+G / Cmd+G) for generating new passwords, improving user experience:

```typescript
useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "g") {
      event.preventDefault();
      generateNewPassword();
    }
  };
  // ...
}, [generateNewPassword, options]);
```

**Clipboard API Integration:**
Implemented modern clipboard functionality with proper error handling and user feedback:

```typescript
await navigator.clipboard.writeText(password);
setCopied(true);
```

**Component Architecture:**
Organized the application into reusable, focused components:

- `PasswordDisplay` - Shows password and handles copying
- `PasswordOptions` - Manages configuration options
- `StrengthIndicator` - Displays password strength
- `GenerateButton` - Triggers password generation
- `ErrorBoundary` - Handles runtime errors gracefully

### Continued development

Areas I'd like to continue improving:

- **Accessibility**: Further enhance ARIA labels and keyboard navigation
- **Testing**: Add unit tests for password generation logic and component behavior
- **Performance**: Optimize re-renders and consider memoization strategies
- **Features**: Add password history, export functionality, or password validation rules
- **Security**: Consider adding entropy calculation and additional security metrics

## Author

- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
