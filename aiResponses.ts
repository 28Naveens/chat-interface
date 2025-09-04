// Simulated AI responses for construction-related queries
export const constructionResponses: { [key: string]: string } = {
  foundation: "For residential foundations, concrete slab-on-grade is most common and cost-effective. Ensure proper soil preparation, moisture barriers, and reinforcement with rebar. Consider local frost line depth for footings.",
  
  materials: "Popular construction materials include: Concrete (versatile, durable), Steel (high strength-to-weight ratio), Wood (renewable, good insulation), and Masonry (fire-resistant, thermal mass). Choose based on climate, budget, and local codes.",
  
  safety: "Essential construction safety practices: 1) Always wear PPE (hard hats, safety glasses, steel-toed boots), 2) Implement fall protection systems, 3) Conduct daily safety meetings, 4) Maintain clean work sites, 5) Follow OSHA regulations.",
  
  tools: "Essential construction tools include: Power drill, circular saw, level, tape measure, hammer, safety equipment, and measuring tools. For larger projects, consider renting specialized equipment like excavators or concrete mixers.",
  
  planning: "Successful construction planning involves: 1) Detailed blueprints and permits, 2) Material scheduling and procurement, 3) Labor resource allocation, 4) Weather contingency plans, 5) Quality control checkpoints, 6) Budget tracking systems.",
  
  default: "I'm ConstructBot, your AI assistant for all construction-related questions. I can help with materials, safety protocols, building techniques, tools, project planning, and industry best practices. What construction topic would you like to discuss?"
};

export function generateAIResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();
  
  if (message.includes('foundation') || message.includes('concrete') || message.includes('slab')) {
    return constructionResponses.foundation;
  } else if (message.includes('material') || message.includes('steel') || message.includes('wood')) {
    return constructionResponses.materials;
  } else if (message.includes('safety') || message.includes('ppe') || message.includes('osha')) {
    return constructionResponses.safety;
  } else if (message.includes('tool') || message.includes('equipment') || message.includes('drill')) {
    return constructionResponses.tools;
  } else if (message.includes('plan') || message.includes('project') || message.includes('schedule')) {
    return constructionResponses.planning;
  } else if (message.includes('hello') || message.includes('hi') || message.includes('help')) {
    return constructionResponses.default;
  } else {
    return "I specialize in construction-related topics including building materials, safety protocols, tools, project planning, and construction techniques. Could you please rephrase your question to focus on a construction-related topic? For example, you could ask about foundation types, safety requirements, or material selection.";
  }
}