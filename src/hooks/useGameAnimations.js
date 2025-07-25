import { 
  calculateFallPaths, 
  calculateAnimationDuration 
} from '../utils/animationUtils';
import { 
  applyGravity, 
  findAllMatches, 
  removeMatches 
} from '../utils/gameLogicUtils';
import { ANIMATION_CONFIG } from '../utils/gameConstants';

/**
 * Animation orchestration hook
 */
export const useGameAnimations = (gameState) => {
  const {
    setGrid,
    setFallingBoxes,
    setIsGravityAnimating,
    setMatchingBoxes,
    setIsAnimating
  } = gameState;

  /**
   * Animate gravity with visual effects
   */
  const animateGravity = (currentGrid) => {
    const fallPaths = calculateFallPaths(currentGrid);
    
    if (fallPaths.length === 0) {
      // No gravity needed, proceed to match checking
      setTimeout(() => cascadeMatches(currentGrid), ANIMATION_CONFIG.SETTLE_DELAY);
      return currentGrid;
    }

    console.log("Starting gravity animation for", fallPaths.length, "boxes");
    
    // Set falling boxes for animation
    setFallingBoxes(fallPaths);
    setIsGravityAnimating(true);
    
    // Calculate final grid state
    const finalGrid = applyGravity(currentGrid);
    
    // Wait for animation to complete, then update grid
    const animationDuration = calculateAnimationDuration(fallPaths);
    
    setTimeout(() => {
      setGrid(finalGrid);
      setFallingBoxes([]);
      setIsGravityAnimating(false);
      
      // Start match checking after gravity settles
      setTimeout(() => cascadeMatches(finalGrid), ANIMATION_CONFIG.SETTLE_DELAY);
    }, animationDuration);
    
    return currentGrid;
  };

  /**
   * Handle cascade matching with chain reactions
   */
  const cascadeMatches = (currentGrid) => {
    const matches = findAllMatches(currentGrid);
    
    if (matches.length === 0) return; // Stable - no more matches
    
    console.log(`Found ${matches.length} matches, starting cascade`);
    
    // Show match animation
    setMatchingBoxes(matches.flat());
    setIsAnimating(true);
    
    // Remove matches after animation
    setTimeout(() => {
      const clearedGrid = removeMatches(currentGrid, matches);
      const settledGrid = applyGravity(clearedGrid);
      
      setGrid(settledGrid);
      setMatchingBoxes([]);
      setIsAnimating(false);
      
      // Continue cascading
      setTimeout(() => cascadeMatches(settledGrid), ANIMATION_CONFIG.CASCADE_DELAY);
    }, ANIMATION_CONFIG.MATCH_DURATION);
  };

  return {
    animateGravity,
    cascadeMatches
  };
};
