export function getRotationMatrix(angle) {
  const radian = angle * Math.PI / 180;
  const cos = Math.cos(radian).toFixed(5);
  const sin = Math.sin(radian).toFixed(5);
  return `${cos} ${sin} ${-sin} ${cos} 0 0`;
}

function isPositive(value) {
  return value !== undefined && parseFloat(value) > 0;
}

export function isGeneralValid(masu) {
  return masu !== undefined && isPositive(masu.length) && isPositive(masu.width) && isPositive(masu.height);
}

export function getTexts(masu) {
  return Object.keys(masu.box.texts).map(k => masu.box.texts[k]);
}

export function getFonts(masu) {
  if (masu === undefined) {
    return [];
  }
  else {
    let fonts = getTexts(masu).map(t => t.family).map(t => t === '' ? 'Open Sans' : t).sort();
    return [...new Set(fonts)];
  }
}

export function configureFace(text, l_2, w_2, h_2) {
  let configuration = { horiX: 0, horiY: 0, vertX: 0, vertY: 0 };
  let style = {};

  switch (text.face) {
    case 'front':
      configuration.x = 0;
      configuration.y = l_2 + h_2;
      configuration.rotate = 180;
      configuration.horiX = -w_2;
      configuration.vertY = -h_2;
      break;
    case 'back':
      configuration.x = 0;
      configuration.y = -l_2 - h_2;
      configuration.rotate = 0;
      configuration.horiX = w_2;
      configuration.vertY = h_2;
      break;
    case 'left':
      configuration.x = w_2 + h_2;
      configuration.y = 0;
      configuration.rotate = 90;
      configuration.horiY = l_2;
      configuration.vertX = -h_2;
      break;
    case 'right':
      configuration.x = -w_2 - h_2;
      configuration.y = 0;
      configuration.rotate = -90;
      configuration.horiY = -l_2;
      configuration.vertX = h_2;
      break;
    default:
      console.log(`text.face '${text.face}' not supported`);
  }

  switch (text.horizontal) {
    case 'left':
      style.textAnchor = 'start';
      configuration.x -= configuration.horiX;
      configuration.y -= configuration.horiY;
      break;
    case 'center':
      style.textAnchor = 'middle';
      break;
    case 'right':
      style.textAnchor = 'end';
      configuration.x += configuration.horiX;
      configuration.y += configuration.horiY;
      break;
  }

  switch (text.vertical) {
    case 'top':
      style.dominantBaseline = 'text-before-edge';
      configuration.x -= configuration.vertX;
      configuration.y -= configuration.vertY;
      break;
    case 'middle':
      style.dominantBaseline = 'central';
      break;
    case 'bottom':
      style.dominantBaseline = 'text-after-edge';
      configuration.x += configuration.vertX;
      configuration.y += configuration.vertY;
      break;
  }

  return { configuration, style };
}
