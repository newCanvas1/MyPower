import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native';

const AnimatedSearchInput = ({style, className,onChangeText,searchWords}) => {
  const [placeholder, setPlaceholder] = useState('');

  useEffect(() => {
    let wordIndex = 0;
    let letterIndex = 0;
    let reverse = false;
    
    const interval = setInterval(() => {
      if (reverse) {
        if (letterIndex === 0) {
          // Start the next word
          wordIndex = (wordIndex + 1) % searchWords.length; // Cycle through words
          setPlaceholder('');
          reverse = false;
        } else {
          setPlaceholder(prev => prev.slice(0, -1)); // Remove the last letter
          letterIndex--;
        }
      } else {
        if (letterIndex === searchWords[wordIndex].length) {
          // Start going back
          reverse = true;
        } else {
          setPlaceholder(prev => prev + searchWords[wordIndex][letterIndex]);
          letterIndex++;
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return <TextInput style={style} className={className} placeholder={placeholder} onChangeText={onChangeText} />;
};

export default AnimatedSearchInput;
