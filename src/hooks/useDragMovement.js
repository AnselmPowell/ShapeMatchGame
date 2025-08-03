import { useState, useRef, useCallback } from 'react';
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
  
  // Start dragging a box (wrapped in useCallback to maintain reference)
  const handleDragStart = useCallback((row, col, clientX) => {
    console.log(`START DRAG: row=${row}, col=${col}, x=${clientX}`);
    
    if (isAnimating || isGravityAnimating || isOutOfMoves) {
      console.log("Can't start drag - animations or out of moves");
      return;
    }
    
    if (grid[row][col] === null || grid[row][col].type === 'blocker') {
      console.log("Can't start drag - empty cell or blocker");
      return;
    }
    
    // Set the selected box to show valid move targets
    setSelectedBox({ row, col });
    
    setIsDragging(true);
    setDragBox({ row, col });
    setDragDirection(null);
    startXRef.current = clientX;
    currentXRef.current = clientX;
    
    console.log("Drag started successfully");
  }, [grid, setSelectedBox, isAnimating, isGravityAnimating, isOutOfMoves]);
  
  // Update drag direction based on movement (wrapped in useCallback)
  const handleDragMove = useCallback((clientX) => {
    if (!isDragging || !dragBox) {
      console.log("Move ignored - not dragging or no drag box");
      return;
    }
    
    currentXRef.current = clientX;
    
    // Calculate horizontal movement
    const deltaX = currentXRef.current - startXRef.current;
    console.log(`DRAG MOVE: deltaX=${deltaX}`);
    
    // Determine direction if it exceeds threshold
    if (Math.abs(deltaX) > DIRECTION_THRESHOLD) {
      const newDirection = deltaX > 0 ? 'right' : 'left';
      console.log(`Setting direction to: ${newDirection}`);
      setDragDirection(newDirection);
    } else {
      console.log("Below threshold, no direction");
      setDragDirection(null);
    }
  }, [isDragging, dragBox]);
  
  // End dragging and execute move if valid (wrapped in useCallback)
  const handleDragEnd = useCallback(() => {
    console.log("DRAG END called");
    console.log("isDragging:", isDragging);
    console.log("dragBox:", dragBox);
    console.log("dragDirection:", dragDirection);
    
    if (!isDragging || !dragBox) {
      console.log("Early exit - not dragging or no drag box");
      resetDragState();
      return;
    }
    
    const { row, col } = dragBox;
    
    // Only execute move if we have a valid direction
    if (dragDirection) {
      const targetCol = col + (dragDirection === 'right' ? 1 : -1);
      
      console.log(`Checking move to: row=${row}, col=${targetCol}`);
      console.log("Is in bounds:", targetCol >= 0 && targetCol < GRID_CONFIG.COLS);
      console.log("Target cell exists:", !!grid[row]);
      console.log("Target cell is empty:", grid[row] && grid[row][targetCol] === null);
      
      // Check if the target cell is valid
      if (
        targetCol >= 0 && 
        targetCol < GRID_CONFIG.COLS && 
        grid[row] && 
        grid[row][targetCol] === null
      ) {
        console.log("EXECUTING MOVE!");
        // Execute move
        moveBox(row, col, row, targetCol);
      } else {
        // If not a valid move, just clear selection
        console.log("Invalid move target, clearing selection");
        setSelectedBox(null);
      }
    } else {
      // No direction chosen, treat as a selection (keep selected box)
      console.log("No direction chosen");
    }
    
    // Reset drag state
    resetDragState();
  }, [isDragging, dragBox, dragDirection, grid, moveBox, setSelectedBox]);
  
  // Reset all drag-related state
  const resetDragState = useCallback(() => {
    console.log("Resetting drag state");
    setIsDragging(false);
    setDragBox(null);
    setDragDirection(null);
  }, []);
  
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