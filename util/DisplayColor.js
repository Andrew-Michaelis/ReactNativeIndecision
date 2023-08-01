import { GlobalStyles } from "../constants/styles";

export default function DisplayCol(col) {
  const isDark = true;

  if (isDark) {
    switch(col) {
      case 'background':
        return GlobalStyles.dark.background;
      case 'accent':
        return GlobalStyles.dark.accent;
      case 'primary100':
        return GlobalStyles.dark.primary100;
      case 'primary300':
        return GlobalStyles.dark.primary300;
      case 'primary500':
        return GlobalStyles.dark.primary500;
      case 'primary700':
        return GlobalStyles.dark.primary700;
      case 'primary900':
        return GlobalStyles.dark.primary900;
      case 'secondary':
        return GlobalStyles.dark.secondary;
      case 'text':
        return GlobalStyles.dark.text;
    }
  }else{
    switch(col) {
      case 'background':
        return GlobalStyles.light.background;
      case 'accent':
        return GlobalStyles.light.accent;
      case 'primary100':
        return GlobalStyles.light.primary100;
      case 'primary300':
        return GlobalStyles.light.primary300;
      case 'primary500':
        return GlobalStyles.light.primary500;
      case 'primary700':
        return GlobalStyles.light.primary700;
      case 'primary900':
        return GlobalStyles.light.primary900;
      case 'secondary':
        return GlobalStyles.light.secondary;
      case 'text':
        return GlobalStyles.light.text;
    }
  }
}