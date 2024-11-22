console.log("Hello via Bun!");

export interface Profile {
  name: string;
  email: string;
}

export interface Result {
  name: string;
  email: string;
  buddy: string;
}

export const reArrange = (profiles: Profile[]): Result[] => {
  if (profiles.length === 0) {
    return [];
  }

  // Clone the profiles array to avoid modifying the original array
  const shuffled = [...profiles];

  // Fisher-Yates shuffle algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Ensure no one is their own buddy
  for (let i = 0; i < profiles.length; i++) {
    if (profiles[i].name === shuffled[i].name) {
      // If the buddy assignment has a match, swap with the next element (or first if at the end)
      const swapIndex = (i === profiles.length - 1) ? 0 : i + 1;
      [shuffled[i], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[i]];
    }
  }

  // Create the result with buddy assignments
  return profiles.map((person, index) => ({
    ...person,
    buddy: shuffled[index].name
  }));
}