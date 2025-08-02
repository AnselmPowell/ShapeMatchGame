import { useState, useRef } from 'react';
import { GRID_CONFIG } from '../utils/gameConstants';

/**
 * Custom hook for handling drag/swipe movement of boxes
 * Shows valid moves and executes movement on release
 */
export const useDragMovement = (gameState, gameLogic) => {
  const { 
    grid, 
    setSelectedBox,
    isAnimating, 
    isGravityAnimating, 
    isOutOfMoves 
  } = gameState;
  
  const { moveBox, isValidMoveTarget } = gameLogic;
  
  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [dragBox, setDragBox] = useState(null);
  const [dragDirection, setDragDirection] = useState(null); // 'left', 'right', or null
  const startXRef = useRef(0);
  const currentXRef = useRef(0);
  
  // Threshold for determining direction (in pixels)
  const DIRECTION_THRESHOLD = 20;
  
  // Start dragging a box
  const handleDragStart = (row, col, clientX) => {
    if (isAnimating || isGravityAnimating || isOutOfMoves) return;
    if (grid[row][col] === null || grid[row][col].type === 'blocker') return;
    
    // Set the selected box to show valid move targets
    setSelectedBox({ row, col });
    
    setIsDragging(true);
    setDragBox({ row, col });
    setDragDirection(null);
    startXRef.current = clientX;
    currentXRef.current = clientX;
  };
  
  // Update drag direction based on movement
  const handleDragMove = (clientX) => {
    if (!isDragging || !dragBox) return;
    
    currentXRef.current = clientX;
    
    // Calculate horizontal movement
    const deltaX = currentXRef.current - startXRef.current;
    
    // Determine direction if it exceeds threshold
    if (Math.abs(deltaX) > DIRECTION_THRESHOLD) {
      const newDirection = deltaX > 0 ? 'right' : 'left';
      setDragDirection(newDirection);
    } else {
      setDragDirection(null);
    }
  };
  
  // End dragging and execute move if valid
  const handleDragEnd = () => {
    if (!isDragging || !dragBox) {
      resetDragState();
      return;
    }
    
    const { row, col } = dragBox;
    
    // Only execute move if we have a valid direction
    if (dragDirection) {
      const targetCol = col + (dragDirection === 'right' ? 1 : -1);
      
      // Check if the target cell is valid
      if (
        targetCol >= 0 && 
        targetCol < GRID_CONFIG.COLS && 
        grid[row][targetCol] === null
      ) {
        // Execute move
        moveBox(row, col, row, targetCol);
      } else {
        // If not a valid move, just clear selection
        setSelectedBox(null);
      }
    } else {
      // No direction chosen, treat as a selection (keep selected box)
    }
    
    // Reset drag state
    resetDragState();
  };
  
  // Reset all drag-related state
  const resetDragState = () => {
    setIsDragging(false);
    setDragBox(null);
    setDragDirection(null);
  };
  
  return {
    isDragging,
    dragBox,
    dragDirection,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    resetDragState
  };
};