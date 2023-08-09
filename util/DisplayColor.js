import { GlobalStyles } from "../constants/styles";
import { useSelector } from "react-redux";

function DisplayCol(col) {

  // const displayMode = useSelector((state) => state.setting.display);
  let displayMode = 'dark';

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
    }
  }
}

export default DisplayCol;