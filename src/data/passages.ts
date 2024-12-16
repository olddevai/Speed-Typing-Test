export const passages = [
  "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet at least once. Pangrams are often used to display font samples and test keyboards and printers.",
  "In the bustling city streets, people hurry past one another, each lost in their own thoughts and destinations. The morning sun casts long shadows between the towering buildings, creating a dramatic urban landscape.",
  "Technology continues to evolve at an unprecedented rate, transforming how we live, work, and communicate. Each new innovation brings both opportunities and challenges for society to consider and address.",
  // Add more passages here...
];

export const getRandomPassage = () => {
  return passages[Math.floor(Math.random() * passages.length)];
};