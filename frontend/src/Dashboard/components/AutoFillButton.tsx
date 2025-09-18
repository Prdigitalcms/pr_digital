import React, { useState } from 'react';
import { Zap, Check, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFormStorage } from '../hooks/useFormStorage';

interface AutoFillButtonProps {
  onAutoFill: (data: any) => void;
  formType: string;
  className?: string;
}

export function AutoFillButton({ onAutoFill, formType, className = '' }: AutoFillButtonProps) {
  const { getAutoFillData, userProfile } = useFormStorage(formType);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAutoFill = () => {
    const autoFillData = getAutoFillData();
    
    if (Object.keys(autoFillData).length === 0) {
      return;
    }

    setIsAnimating(true);
    onAutoFill(autoFillData);
    
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const hasData = Object.keys(userProfile).length > 0;

  if (!hasData) {
    return null;
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleAutoFill}
      disabled={isAnimating}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
        ${isAnimating 
          ? 'bg-green-500 text-white' 
          : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white'
        }
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      <motion.div
        animate={isAnimating ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 0.5 }}
      >
        {isAnimating ? <Check className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
      </motion.div>
      <span className="text-sm font-medium">
        {isAnimating ? 'Auto-filled!' : 'Auto Fill'}
      </span>
    </motion.button>
  );
}