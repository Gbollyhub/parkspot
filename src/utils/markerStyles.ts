
export const createMarkerElement = (isSelected: boolean = false) => {
  const el = document.createElement('div');
  el.className = 'marker';
  el.style.backgroundColor = '#10B981';
  el.style.width = '36px';
  el.style.height = '36px';
  el.style.borderRadius = '50%';
  el.style.border = isSelected ? '3px solid #3B82F6' : '3px solid white';
  el.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
  el.style.cursor = 'pointer';
  el.style.display = 'flex';
  el.style.justifyContent = 'center';
  el.style.alignItems = 'center';
  el.style.color = 'white';
  el.style.fontWeight = 'bold';
  el.style.fontSize = '16px';
  el.style.zIndex = '1000';
  el.innerHTML = `<span>P</span>`;
  
  if (isSelected) {
    el.style.animation = 'pulse 1.5s infinite';
    addPulseAnimation();
  }
  
  return el;
};

export const updateMarkerColor = (el: HTMLElement, availableSpaces: number, totalSpaces: number) => {
  let color = '#10B981';
  
  if (availableSpaces === 0) {
    color = '#EF4444';
  } else if (availableSpaces / totalSpaces < 0.2) {
    color = '#F59E0B';
  }
  
  el.style.backgroundColor = color;
  return color;
};

export const createUserLocationElement = () => {
  const el = document.createElement('div');
  el.className = 'user-location-marker';
  el.style.backgroundColor = '#3B82F6';
  el.style.width = '24px';
  el.style.height = '24px';
  el.style.borderRadius = '50%';
  el.style.border = '3px solid white';
  el.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
  el.style.animation = 'pulse 2s infinite';
  el.style.zIndex = '1001';
  
  addUserMarkerAnimation();
  return el;
};

const addPulseAnimation = () => {
  if (!document.getElementById('marker-pulse-style')) {
    const style = document.createElement('style');
    style.id = 'marker-pulse-style';
    style.innerHTML = `
      @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
        70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
        100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
      }
    `;
    document.head.appendChild(style);
  }
};

const addUserMarkerAnimation = () => {
  if (!document.getElementById('user-marker-style')) {
    const style = document.createElement('style');
    style.id = 'user-marker-style';
    style.innerHTML = `
      @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
        70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
        100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
      }
    `;
    document.head.appendChild(style);
  }
};
