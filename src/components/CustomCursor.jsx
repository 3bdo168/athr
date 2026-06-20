import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

/**
 * CustomCursor - An elite, agency-standard interactive cursor.
 * Features:
 * - Difference mix-blend-mode for automatic inversion.
 * - Morphing shape based on interactive states.
 * - Label support via data-cursor attribute.
 * - Fluid spring physics for a premium feel.
 */
export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');
  const { dark } = useTheme();

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // physics configurations
  const ringConfig = { damping: 28, stiffness: 300, mass: 0.5 };
  const ringX = useSpring(mouseX, ringConfig);
  const ringY = useSpring(mouseY, ringConfig);

  const trailConfig = { damping: 40, stiffness: 200, mass: 0.8 };
  const trailX = useSpring(mouseX, trailConfig);
  const trailY = useSpring(mouseY, trailConfig);

  useEffect(() => {
    // Hide cursor on touch devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor], .cursor-hover, [role="button"]');
      if (target) {
        setHovered(true);
        const text = target.getAttribute('data-cursor');
        if (text) {
          setCursorText(text);
          setCursorVariant('text');
        } else {
          setCursorVariant('hover');
        }
      } else {
        setHovered(false);
        setCursorText('');
        setCursorVariant('default');
      }
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', () => setVisible(false));
    window.addEventListener('mouseenter', () => setVisible(true));

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [visible]);

  if (isTouchDevice) return null;

  const variants = {
    default: {
      width: 24,
      height: 24,
      backgroundColor: dark ? 'rgba(255, 255, 255, 1)' : 'rgba(37, 99, 235, 1)',
      mixBlendMode: dark ? 'difference' : 'normal',
      borderRadius: '50%',
      border: dark ? 'none' : '2px solid rgba(255, 255, 255, 0.5)',
    },
    hover: {
      width: 60,
      height: 60,
      backgroundColor: dark ? 'rgba(255, 255, 255, 1)' : 'rgba(37, 99, 235, 0.15)',
      mixBlendMode: dark ? 'difference' : 'normal',
      borderRadius: '50%',
      border: dark ? 'none' : '2px solid rgba(37, 99, 235, 1)',
    },
    text: {
      width: 84,
      height: 84,
      backgroundColor: dark ? 'rgba(255, 255, 255, 1)' : 'rgba(37, 99, 235, 1)',
      mixBlendMode: 'normal',
      borderRadius: '50%',
      boxShadow: dark ? 'none' : '0 10px 30px rgba(37, 99, 235, 0.3)',
    }
  };

  return (
    <div style={{ pointerEvents: 'none', position: 'fixed', top: 0, left: 0, zIndex: 999999 }}>
      {/* Outer Glow / Trail */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          position: 'absolute',
          width: 44,
          height: 44,
          borderRadius: '50%',
          border: `1px solid ${dark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(37, 99, 235, 0.3)'}`,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible && cursorVariant === 'default' ? 0.6 : 0,
        }}
      />

      {/* Main Cursor Ring */}
      <motion.div
        className="custom-cursor-main"
        style={{
          x: ringX,
          y: ringY,
          position: 'absolute',
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: clicked ? '0 0 20px rgba(255,255,255,0.3)' : 'none',
        }}
        animate={variants[cursorVariant]}
        transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
      >
        <AnimatePresence>
          {cursorVariant === 'text' && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{
                color: dark ? '#000' : '#fff',
                fontSize: '11px',
                fontWeight: '900',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                fontFamily: 'system-ui, sans-serif',
                textAlign: 'center',
                padding: '0 4px'
              }}
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Internal Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          position: 'absolute',
          width: 6,
          height: 6,
          backgroundColor: dark ? '#fff' : '#2563eb',
          borderRadius: '50%',
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: 'difference',
          opacity: visible && cursorVariant !== 'text' ? 1 : 0,
          scale: clicked ? 0.6 : 1,
        }}
      />
    </div>
  );
}
