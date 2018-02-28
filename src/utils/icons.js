import thunder    from '../img/thunder.svg';
import rainy7     from '../img/rainy7.svg';
import rainy4     from '../img/rainy4.svg';
import rainy5     from '../img/rainy5.svg';
import rainy6     from '../img/rainy6.svg';
import rainy3     from '../img/rainy3.svg';
import snowy3     from '../img/snowy3.svg';
import snowy5     from '../img/snowy5.svg';
import snowy6     from '../img/snowy6.svg';
import cloudyDay1 from '../img/cloudyDay1.svg';
import day        from '../img/day.svg';
import cloudyDay2 from '../img/cloudyDay2.svg';
import cloudy     from '../img/cloudy.svg';

export const drawIcon = code => {
  let icon = '';
  switch(code) {
    case '200':
    case '201':
    case '202':
    case '230':
    case '231':
    case '232':
    case '233':
      icon = thunder;
      break;
    case '300':
    case '301':
    case '302':
    case '611':
    case '612':
      icon = rainy7;
      break;
    case '500':
    case '520':
      icon = rainy4;
      break;
    case '501':
    case '511':
      icon = rainy5;
      break;
    case '502':
    case '522':
    case '900':
      icon = rainy6;
      break;
    case '521':
      icon = rainy3;
      break;
    case '600':
    case '610':
    case '621':
      icon = snowy3;
      break;
    case '601':
      icon = snowy5;
      break;
    case '602':
    case '622':
    case '623':
      icon = snowy6;
      break;
    case '700':
    case '711':
    case '721':
    case '731':
    case '741':
    case '751':
      icon = cloudyDay1;
      break;
    case '800':
      icon = day;
      break;
    case '801':
    case '802':
    case '803':
      icon = cloudyDay2;
      break;
    case '804':
      icon = cloudy;
      break;
  };
  return `<img src="${icon}">`;
};
