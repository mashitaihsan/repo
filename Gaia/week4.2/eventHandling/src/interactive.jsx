import { useState } from 'react';

function InteractiveButton() {
  const [clickCount, setClickCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: isPressed ? '#0056b3' : isHovered ? '#0069d9' : '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transform: isPressed ? 'scale(0.95)' : 'scale(1)',
    transition: 'all 0.1s ease'
  };

  return (
    <div>
      <button
        style={buttonStyle}
        onClick={() => setClickCount(prev => prev + 1)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
      >
        Click me! ({clickCount})
      </button>
      <p>Status: {isPressed ? 'Pressed' : isHovered ? 'Hovered' : 'Normal'}</p>
    </div>
  );
}

export default InteractiveButton;