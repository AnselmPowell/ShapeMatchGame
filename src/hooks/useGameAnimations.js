import { 
  calculateFallPaths, 
  calculateAnimationDuration 
} from '../utils/animationUtils';
import { 
  applyGravity, 
  findAllMatches, 
  removeMatches,
  findPairedPortal,
  removePortalPair
} from '../utils/gameLogicUtils';
import { ANIMATION_CONFIG } from '../utils/gameConstants';
import { cloneGrid } from '../utils/gridUtils';

/**
 * Animation orchestration hook
 */
export const useGameAnimations = (gameState) => {
  const {
    setGrid,
    setFallingBoxes,
    setIsGravityAnimating,
    setMatchingBoxes,
    setIsAnimating,
    setIsTeleporting,
    setTeleportingBoxes,
    setPortalEnterAnimation,
    setPortalConnectAnimation,
    setPortalExitAnimation,
    setActivePortals
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
    
    // Calculate final grid state with possible portal entries
    const gravityResult = applyGravity(currentGrid);
    const finalGrid = gravityResult.grid;
    const portalEntries = gravityResult.portalEntries || [];
    
    // Handle any boxes that fell onto portals
    if (portalEntries.length > 0) {
      console.log(`${portalEntries.length} boxes fell onto portals`);
      
      // Wait for animation to complete, then handle portal entries
      const animationDuration = calculateAnimationDuration(fallPaths);
      
      setTimeout(() => {
        setGrid(finalGrid);
        setFallingBoxes([]);
        setIsGravityAnimating(false);
        
        // Process portal entries one at a time (in case there are multiple)
        processNextPortalEntry(finalGrid, portalEntries, 0);
      }, animationDuration);
    } else {
      // No portal entries, proceed with normal gravity animation
      const animationDuration = calculateAnimationDuration(fallPaths);
      
      setTimeout(() => {
        setGrid(finalGrid);
        setFallingBoxes([]);
        setIsGravityAnimating(false);
        
        // Start match checking after gravity settles
        setTimeout(() => cascadeMatches(finalGrid), ANIMATION_CONFIG.SETTLE_DELAY);
      }, animationDuration);
    }
    
    return currentGrid;
  };
  
  /**
   * Process boxes that have landed on portals
   */
  const processNextPortalEntry = (grid, portalEntries, index) => {
    // If we've processed all entries, continue with cascade matches
    if (index >= portalEntries.length) {
      setTimeout(() => cascadeMatches(grid), ANIMATION_CONFIG.SETTLE_DELAY);
      return;
    }
    
    const entry = portalEntries[index];
    const newGrid = cloneGrid(grid);
    
    // Find the paired portal
    const pairedPortal = findPairedPortal(newGrid, entry.portalId, entry.portalRow, entry.portalCol);
    
    if (pairedPortal) {
      console.log(`Box fell onto portal ${entry.portalId} at (${entry.portalRow},${entry.portalCol})`);
      console.log(`Found paired portal at (${pairedPortal.row},${pairedPortal.col})`);
      
      // Mark source and destination portals as active
      setActivePortals([
        { row: entry.portalRow, col: entry.portalCol, portalId: entry.portalId },
        { row: pairedPortal.row, col: pairedPortal.col, portalId: entry.portalId }
      ]);
      
      // Set up teleportation data
      setTeleportingBoxes([{
        fromRow: entry.fromRow,
        fromCol: entry.fromCol,
        enterRow: entry.portalRow, 
        enterCol: entry.portalCol,
        exitRow: pairedPortal.row, 
        exitCol: pairedPortal.col,
        portalId: entry.portalId
      }]);
      
      // PHASE 1: Box enters portal animation
      setIsTeleporting(true);
      setPortalEnterAnimation(true);
      
      setTimeout(() => {
        // PHASE 2: Portal connection animation
        setPortalEnterAnimation(false);
        setPortalConnectAnimation(true);
        
        setTimeout(() => {
          // PHASE 3: Box exits from destination portal
          setPortalConnectAnimation(false);
          setPortalExitAnimation(true);
          
          // Move the box to the destination portal
          newGrid[pairedPortal.row][pairedPortal.col] = entry.box;
          setGrid(newGrid);
          
          setTimeout(() => {
            // PHASE 4: Animation complete, remove portals
            setPortalExitAnimation(false);
            
            // Remove the portals from the grid
            const portalClearedGrid = cloneGrid(newGrid);
            removePortalPair(portalClearedGrid, entry.portalId);
            setGrid(portalClearedGrid);
            
            // Reset animation states
            setIsTeleporting(false);
            setTeleportingBoxes([]);
            setActivePortals([]);
            
            // Process the next portal entry if any
            processNextPortalEntry(portalClearedGrid, portalEntries, index + 1);
          }, ANIMATION_CONFIG.PORTAL_EXIT_DURATION);
        }, ANIMATION_CONFIG.PORTAL_CONNECTION_DURATION);
      }, ANIMATION_CONFIG.PORTAL_ENTER_DURATION);
    } else {
      // If no paired portal found, just continue with the next entry
      processNextPortalEntry(newGrid, portalEntries, index + 1);
    }
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
