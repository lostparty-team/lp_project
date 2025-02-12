'use client';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  content: React.ReactNode;
  position?: { x: number; y: number };
  visible: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ content, position, visible }) => {
  if (!visible || typeof window === 'undefined') return null;

  const tooltipStyle = {
    position: 'absolute',
    top: position?.y || 0,
    left: position?.x || 0,
    zIndex: 10000, // 가장 상단에 위치
    backgroundColor: 'black',
    color: 'white',
    padding: '8px',
    borderRadius: '4px',
    pointerEvents: 'none',
  } as React.CSSProperties;

  return createPortal(
    <div style={tooltipStyle}>{content}</div>,
    document.getElementById('tooltip-portal') as HTMLElement,
  );
};

export default Tooltip;
