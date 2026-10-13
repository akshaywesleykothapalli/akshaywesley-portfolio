const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const presentations = {
  ringside: { image: `${basePath}/projects/ringside.jpg`, width: 1440, height: 1000, name: 'Ringside', category: 'VOICE / AI', description: 'An AI negotiation agent for live calls, guided by your target and limits.', tags: ['React', 'Node.js', 'Twilio'], source: 'https://github.com/AnuragTummapudi/Ringside' },
  exoplanet: { image: `${basePath}/projects/exoplanet.jpg`, width: 1280, height: 720, name: 'ExoPlanet', category: 'MACHINE LEARNING', description: 'An interactive exoplanet classifier with parameter analysis and model explainability.', tags: ['Python', 'Flask', 'scikit-learn'], source: 'https://github.com/akshaywesleykothapalli/exoplanet-detector-ai' },
  niyam: { image: `${basePath}/projects/niyam.jpg`, width: 1274, height: 717, name: 'NIYAM', category: 'POLICY / INTELLIGENCE', description: 'Government policy search and document workflows in one workspace.', tags: ['React', 'FastAPI', 'PostgreSQL'], source: 'https://github.com/akshaywesleykothapalli/Government-Intelligence-Platform' },
  dailyops: { image: '', width: 1120, height: 772, name: 'DailyOps', category: 'NATIVE / AUTOMATION', description: 'A local-first macOS assistant for dictation and structured daily workflows.', tags: ['Swift', 'SwiftUI', 'macOS'], source: 'https://github.com/akshaywesleykothapalli/dailyops' },
} as const
export type PresentationId = keyof typeof presentations

export const projectDetails = {
 ringside: { heading: 'A brief becomes a conversation.', body: 'Set a goal and boundaries, then follow the negotiation through its call dashboard.', points: ['Negotiation setup', 'Call dashboard', 'Conversation history'] },
 exoplanet: { heading: 'Explore what drives a prediction.', body: 'Adjust orbital and transit parameters to inspect classification confidence and feature importance.', points: ['Parameter analysis', 'Classification confidence', 'Feature importance'] },
 niyam: { heading: 'Find the policy. Follow the workflow.', body: 'A policy workspace designed to make government information easier to navigate.', points: ['Policy search', 'Policy context', 'Document workflows'] },
 dailyops: { heading: 'Speak your work. See the plan.', body: 'Turn daily goals into structured tasks, follow their progress, and restore unfinished sessions from saved checkpoints.', points: ['Local dictation', 'Role-aware workspace', 'Session checkpoints'] },
} as const
