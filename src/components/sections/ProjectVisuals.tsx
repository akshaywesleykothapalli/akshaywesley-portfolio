import { Reveal, MotionCurve } from '@/components/motion/MotionSystem'
/** Illustrative product concepts and architecture. No simulated live data. */
const paths: Record<string, string[]> = {
  ringside: ['Voice', 'Transcription', 'Analysis', 'Guidance'],
  exoplanet: ['Kepler / TESS', 'Data', 'RF Ensemble', 'Detection', 'Exoplanet'],
  niyam: ['Government document', 'OCR', 'Structured extraction', 'Semantic search / RAG', 'Knowledge graph', 'Policy intelligence'],
  'wesley-flow': ['Voice', 'Intelligence', 'Action'],
}
function SignalPath({ id }: { id: string }) {
  return <ol className={`signal-path path-${id}`} aria-label="System pipeline">{paths[id].map((label, i) => <Reveal as="li" key={label} delay={i * .045} kind="fade"><span className="path-number">{String(i + 1).padStart(2, '0')}</span><span>{label}</span></Reveal>)}</ol>
}
function RingsidePreview() {
  return <div className="call-workspace">
    <div className="workspace-top"><span className="call-mark" aria-hidden="true">R /</span><span>Negotiation workspace</span><span className="preview-badge">CONCEPT</span></div>
    <div className="call-session"><span className="eyebrow">VOICE INTELLIGENCE</span><h4>Stay in the conversation.</h4><p>Let the system surface the context.</p></div>
    <div className="call-panels"><div className="transcript-panel"><span className="eyebrow">ILLUSTRATIVE TRANSCRIPT</span><Reveal as="p" kind="fade"><small>COUNTERPART</small>“The timeline matters more to us than the initial price.”</Reveal><Reveal as="p" delay={.08} kind="fade"><small>YOU</small>“Let’s explore a delivery schedule that works for both sides.”</Reveal></div><div className="intelligence-panel"><span className="eyebrow">INTELLIGENCE</span><dl><div><dt>Sentiment</dt><dd>Constructive</dd></div><div><dt>Keywords</dt><dd>Timeline · Price · Delivery</dd></div></dl><Reveal className="guidance-note" delay={.16} kind="fade"><span className="eyebrow">STRATEGIC GUIDANCE</span><p>Clarify the delivery constraints before discussing price.</p></Reveal></div></div>
  </div>
}
function ObservatoryPreview() {
  // Deterministic synthetic light curve, explicitly labeled as illustrative.
  const points = Array.from({ length: 101 }, (_, i) => {
    const x = 45 + i * 7.1
    const dip = Math.abs(i - 50) < 9 ? 72 * (1 - Math.pow((i - 50) / 9, 4)) : 0
    return `${x},${92 + Math.sin(i * 2.7) * 3 + Math.cos(i * 1.3) * 2 + dip}`
  }).join(' ')
  return <div className="observatory-figure"><div className="figure-heading"><div><span className="eyebrow">TRANSIT PHOTOMETRY</span><h4>A world leaves a signal.</h4></div><span className="figure-tag">KEPLER / TESS</span></div><svg viewBox="0 0 800 250" role="img" aria-label="Illustrative light curve: a temporary dip in stellar brightness indicates a possible exoplanet transit."><g className="chart-grid">{[60, 100, 140, 180].map(y => <line key={y} x1="45" x2="755" y1={y} y2={y} />)}{[45, 187, 329, 471, 613, 755].map(x => <line key={x} x1={x} x2={x} y1="45" y2="195" />)}</g><rect x="336" y="45" width="128" height="150" fill="#aac4dc" opacity=".05" /><MotionCurve points={points} /><path d="M 400 176 V 205" stroke="#c5b695" /><g className="chart-text"><text x="45" y="28">RELATIVE BRIGHTNESS</text><text x="45" y="229">TIME →</text><text x="430" y="216">TRANSIT CANDIDATE</text></g></svg><div className="model-caption"><span>RF ENSEMBLE</span><p>Light curves → candidate detection → planetary characterization</p></div></div>
}
const documentStages = [
  ['Government document', 'Schemes, policies & source material'],
  ['OCR', 'PaddleOCR · PyMuPDF · OpenCV'],
  ['Structured extraction', 'Text, layout & document structure'],
  ['Semantic search / RAG', 'FAISS · pgvector · retrieved evidence'],
  ['Knowledge graph', 'Neo4j · scheme relationships'],
  ['Policy intelligence', 'Discovery & change detection'],
]
function NiyamPreview() {
  return <div className="document-architecture"><div className="architecture-heading"><span className="eyebrow">DOCUMENT INTELLIGENCE</span><h4>From source to understanding.</h4></div><ol className="document-stages">{documentStages.map(([title, note], i) => <Reveal as="li" key={title} delay={i * .045}><span className="stage-index">{String(i + 1).padStart(2, '0')}</span><div><h5>{title}</h5><p>{note}</p></div><span className="stage-arrow" aria-hidden="true">{i < documentStages.length - 1 ? '↓' : '↳'}</span></Reveal>)}</ol><p className="architecture-target">SCOPE / Targeting 550+ central schemes</p></div>
}
function FlowPreview() {
  return <div className="flow-desktop"><div className="flow-menu"><span>Wesley Flow</span><span>VOICE / LOCAL AI</span></div><Reveal className="flow-hud" kind="visual"><div className="hud-heading"><span className="voice-symbol" aria-hidden="true">⌘</span><span>Voice → Intelligence → Action</span></div><span className="eyebrow">ILLUSTRATIVE VOICE COMMAND</span><p className="voice-command">“Start my writing workflow.”</p><div className="flow-routing"><Reveal delay={.06} kind="fade"><span>01 / UNDERSTAND</span><p>Native speech recognition</p></Reveal><Reveal delay={.12} kind="fade"><span>02 / REASON</span><p>Local model inference</p></Reveal><Reveal delay={.18} kind="fade"><span>03 / ACT</span><p>macOS automation</p></Reveal></div><div className="hud-footer"><span>ON-DEVICE INTELLIGENCE</span><span>SwiftUI / macOS</span></div></Reveal><p className="flow-principle">Your voice. Your machine. Your workflow.</p></div>
}
export function ProjectVisual({ id, index }: { id: string; index: number }) {
  return <Reveal as="figure" className={`project-visual visual-${id}`} kind="visual"><div className="instrument-label"><span>{id === 'wesley-flow' ? <span className="native-window-controls" aria-hidden="true"><i /><i /><i /></span> : 'SYSTEM / PRODUCT STUDY'}</span><span>FIG. {String(index + 2).padStart(3, '0')}</span></div>{id === 'ringside' && <RingsidePreview />}{id === 'exoplanet' && <ObservatoryPreview />}{id === 'niyam' && <NiyamPreview />}{id === 'wesley-flow' && <FlowPreview />}{id !== 'niyam' && <SignalPath id={id} />}<figcaption className="visual-disclaimer">{id === 'exoplanet' ? 'Illustrative transit signal; verified project results are shown above.' : id === 'niyam' ? 'Architecture overview · source documents to policy intelligence.' : 'Illustrative interface concept · not a product screenshot.'}</figcaption></Reveal>
}
