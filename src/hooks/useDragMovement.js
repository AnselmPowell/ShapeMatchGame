import { useState, useRef } from 'react';
import { GRID_CONFIG } from '../utils/gameConstants';

/**
 * Custom hook for handling drag movement of boxes
 * Adds swipe/drag functionality that works alongside the click-based system
 */
export const useDragMovement = (gameState, gameLogic) => {
  const { 
    grid, 
    isAnimating, 
    isGravityAnimating, 
    isOutOfMoves 
  } = gameState;
  
  const { moveBox } = gameLogic;
  
  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [dragBox, setDragBox] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const startXRef = useRef(0);
  const boxRef = useRef(null);
  
  // Threshold for considering a move (in pixels)
  const MOVE_THRESHOLD = GRID_CONFIG.CELL_SIZE * 0.4;
  
  // Start dragging a box
  const handleDragStart = (row, col, clientX, boxElement) => {
    if (isAnimating || isGravityAnimating || isOutOfMoves) return;
    if (grid[row][col] === null || grid[row][col].type === 'blocker') return;
    
    setIsDragging(true);
    setDragBox({ row, col });
    setDragOffset(0);
    startXRef.current = clientX;
    boxRef.current = boxElement;
  };
  
  // Update drag position
  const handleDragMove = (clientX) => {
    if (!isDragging || !dragBox) return;
    
    // Calculate horizontal offset (positive = right, negative = left)
    const rawOffset = clientX - startXRef.current;
    
    // Apply elasticity effect - movement gets harder as you pull further
    const elasticOffset = Math.sign(rawOffset) * Math.min(
      Math.abs(rawOffset) * 0.8, 
      GRID_CONFIG.CELL_SIZE * 0.9
    );
    
    setDragOffset(elasticOffset);
    
    // Apply transform to the dragged element
    if (boxRef.current) {
      boxRef.current.style.transform = `translateX(${elasticOffset}px) scale(1.05)`;
      boxRef.current.style.zIndex = '10';
      boxRef.current.style.transition = 'none';
    }
  };
  
  // End dragging and check if it's a valid move
  const handleDragEnd = () => {
    if (!isDragging || !dragBox) return;
    
    const { row, col } = dragBox;
    let moved = false;
    
    // Check if drag exceeded threshold and if destination is valid
    if (Math.abs(dragOffset) >= MOVE_THRESHOLD) {
      const direction = dragOffset > 0 ? 1 : -1;
      const newCol = col + direction;
      
      // Validate move using same rules as click movement
      if (
        newCol >= 0 && 
        newCol < GRID_CONFIG.COLS && 
        grid[row][newCol] === null
      ) {
        // Execute move using existing game logic
        moveBox(row, col, row, newCol);
        moved = true;
      }
    }
    
    // If not moved, animate box back to original position
    if (!moved && boxRef.current) {
      boxRef.current.style.transform = 'translateX(0) scale(1)';
      boxRef.current.style.transition = 'transform 0.2s ease-out';
      boxRef.current.style.zIndex = '1';
    }
    
    // Reset drag state
    setTimeout(() => {
      setIsDragging(false);
      setDragBox(null);
      setDragOffset(0);
      boxRef.current = null;
    }, 50);
  };
  
  return {
    isDragging,
    dragBox,
    dragOffset,
    handleDragStart,
    handleDragMove,
    handleDragEnd
  };
};