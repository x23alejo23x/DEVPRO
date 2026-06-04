import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './RotatingText.css';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const RotatingText = forwardRef((props, ref) => {
  const {
    texts,
    transition = { type: 'spring', damping: 25, stiffness: 300 },
    initial = { y: '100%', opacity: 0 },
    animate = { y: 0, opacity: 1 },
    exit = { y: '-120%', opacity: 0 },
    animatePresenceMode = 'wait',
    animatePresenceInitial = false,
    rotationInterval = 2000,
    staggerDuration = 0,
    staggerFrom = 'first',
    loop = true,
    auto = true,
    splitBy = 'characters',
    onNext,
    mainClassName,
    splitLevelClassName,
    elementLevelClassName,
    // props heredadas para compatibilidad con nuestro uso anterior
    words, interval, letterClass, stagger,
    ...rest
  } = props;

  // compatibilidad: si pasan `words` en lugar de `texts`
  const resolvedTexts = texts ?? words ?? [];
  const resolvedInterval = rotationInterval ?? interval ?? 2000;
  const resolvedStagger = staggerDuration ?? (stagger ? stagger * 1000 : 0);

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const splitIntoCharacters = (text) => {
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
      return Array.from(segmenter.segment(text), s => s.segment);
    }
    return Array.from(text);
  };

  const elements = useMemo(() => {
    const currentText = resolvedTexts[currentTextIndex] ?? '';
    if (splitBy === 'characters') {
      const wordsArr = currentText.split(' ');
      return wordsArr.map((word, i) => ({
        characters: splitIntoCharacters(word),
        needsSpace: i !== wordsArr.length - 1,
      }));
    }
    if (splitBy === 'words') {
      return currentText.split(' ').map((word, i, arr) => ({
        characters: [word],
        needsSpace: i !== arr.length - 1,
      }));
    }
    return currentText.split(splitBy).map((part, i, arr) => ({
      characters: [part],
      needsSpace: i !== arr.length - 1,
    }));
  }, [resolvedTexts, currentTextIndex, splitBy]);

  const getStaggerDelay = useCallback(
    (index, totalChars) => {
      if (staggerFrom === 'first') return index * resolvedStagger;
      if (staggerFrom === 'last') return (totalChars - 1 - index) * resolvedStagger;
      if (staggerFrom === 'center') {
        const center = Math.floor(totalChars / 2);
        return Math.abs(center - index) * resolvedStagger;
      }
      return Math.abs(staggerFrom - index) * resolvedStagger;
    },
    [staggerFrom, resolvedStagger]
  );

  const handleIndexChange = useCallback((newIndex) => {
    setCurrentTextIndex(newIndex);
    if (onNext) onNext(newIndex);
  }, [onNext]);

  const next = useCallback(() => {
    const nextIndex = currentTextIndex === resolvedTexts.length - 1
      ? (loop ? 0 : currentTextIndex)
      : currentTextIndex + 1;
    if (nextIndex !== currentTextIndex) handleIndexChange(nextIndex);
  }, [currentTextIndex, resolvedTexts.length, loop, handleIndexChange]);

  const previous = useCallback(() => {
    const prevIndex = currentTextIndex === 0
      ? (loop ? resolvedTexts.length - 1 : currentTextIndex)
      : currentTextIndex - 1;
    if (prevIndex !== currentTextIndex) handleIndexChange(prevIndex);
  }, [currentTextIndex, resolvedTexts.length, loop, handleIndexChange]);

  const jumpTo = useCallback((index) => {
    const valid = Math.max(0, Math.min(index, resolvedTexts.length - 1));
    if (valid !== currentTextIndex) handleIndexChange(valid);
  }, [resolvedTexts.length, currentTextIndex, handleIndexChange]);

  const reset = useCallback(() => {
    if (currentTextIndex !== 0) handleIndexChange(0);
  }, [currentTextIndex, handleIndexChange]);

  useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [next, previous, jumpTo, reset]);

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(next, resolvedInterval);
    return () => clearInterval(id);
  }, [next, resolvedInterval, auto]);

  return (
    <motion.span className={cn('text-rotate', mainClassName)} {...rest} layout transition={transition}>
      <span className="text-rotate-sr-only">{resolvedTexts[currentTextIndex]}</span>
      <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
        <motion.span
          key={currentTextIndex}
          className="text-rotate"
          layout
          aria-hidden="true"
        >
          {elements.map((wordObj, wordIndex, array) => {
            const prevCharsCount = array
              .slice(0, wordIndex)
              .reduce((sum, w) => sum + w.characters.length, 0);
            const totalChars = array.reduce((sum, w) => sum + w.characters.length, 0);

            return (
              <span key={wordIndex} className={cn('text-rotate-word', splitLevelClassName)}>
                {wordObj.characters.map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    transition={{
                      ...transition,
                      delay: getStaggerDelay(prevCharsCount + charIndex, totalChars),
                    }}
                    className={cn('text-rotate-element', elementLevelClassName, letterClass)}
                  >
                    {char}
                  </motion.span>
                ))}
                {wordObj.needsSpace && <span className="text-rotate-space"> </span>}
              </span>
            );
          })}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
});

RotatingText.displayName = 'RotatingText';
export default RotatingText;
