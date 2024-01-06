// Import React library
import React from "react";

// Create a context for managing the game's 'slug' state across the app
const GameContext = React.createContext({
  slug: "", // Default value for 'slug'
});

// Export GameContext for use in other components
export default GameContext;
