export function stringToRgb(str:string) {
    let hash = 0;
  
    // Crée un hachage à partir de la chaîne
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    // Convertit le hachage en composantes RGB
    const r = (hash >> 16) & 0xFF;
    const g = (hash >> 8) & 0xFF;
    const b = hash & 0xFF;
  
    return `rgb(${r}, ${g}, ${b})`;
}

export function stringToColor(str: string) {
    let hash = 0;
  
    // Crée un hachage à partir de la chaîne
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    // Convertit le hachage en couleur HEX
    let color = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      color += ("00" + value.toString(16)).slice(-2);
    }
  
    return color;
}


export function stringToSubtleColor(str: string) {
    let hash = 0;
  
    // Étape 1 : Créer un hachage unique à partir du string
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    // Étape 2 : Calculer les valeurs HSL
    const hue = Math.abs(hash) % 360; // Teinte : 0-360°
    const saturation = 30 + (Math.abs(hash) % 20); // Saturation : 30-50%
    const lightness = 65 + (Math.abs(hash) % 10); // Luminosité : 65-75% (fade)
  
    // Couleur HSL subtile
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  
    // Étape 3 : Déterminer la couleur du texte (noir ou blanc)
    // Luminosité moyenne > 50% => texte noir, sinon texte blanc
    const textColor = lightness > 60 ? "black" : "white";
  
    return { backgroundColor: color, textColor };
  }
  