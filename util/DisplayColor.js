import { store } from "../src/state/store";
import { GlobalStyles } from "../constants/styles";

function DisplayCol(col, mode) {

  displayMode = mode

  if (displayMode === 'dark') {
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
      case 'hint' :
        return GlobalStyles.dark.hint;
      case 'error100' :
        return GlobalStyles.colors.error100;
      case 'error500' :
        return GlobalStyles.colors.error500;
      case 'flare' :
        return GlobalStyles.colors.flare;
      default:
        return 'black';
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
      case 'hint':
        return GlobalStyles.light.hint;
      case 'error500' :
        return GlobalStyles.colors.error100;
      case 'error100' :
        return GlobalStyles.colors.error500;
      case 'flare' :
        return GlobalStyles.colors.flare;
      default: 
        return 'white';
    }
  }
}

export default DisplayCol;