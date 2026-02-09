'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, stagger, createTimeline } from 'animejs';

// Agent Data with Relationships
const agents = [
  // Layer 1: Strategy & Control
  { id: 'ATHENA', role: 'STRATEGIST', type: 'BRAIN', x: 50, y: 15, connections: ['CALLIOPE', 'DAEDALUS'] },
  { id: 'HERA', role: 'OPERATOR', type: 'BRAIN', x: 20, y: 15, connections: ['ARGUS', 'HERACLES'] },
  
  // Layer 2: Execution & Creation
  { id: 'CALLIOPE', role: 'WRITER', type: 'CREATIVE', x: 50, y: 40, connections: ['THEMIS', 'HERMES'] },
  { id: 'ARGUS', role: 'RESEARCH', type: 'SCANNER', x: 20, y: 40, connections: ['PROMETHEUS'] },
  { id: 'PROMETHEUS', role: 'BUILDER', type: 'CREATIVE', x: 35, y: 55, connections: ['THEMIS'] },
  { id: 'DAEDALUS', role: 'PM', type: 'CONTROL', x: 80, y: 30, connections: ['CHRONOS', 'HERACLES'] },

  // Layer 3: Quality & Interface
  { id: 'THEMIS', role: 'QUALITY', type: 'AUDIT', x: 50, y: 65, connections: ['MNEMOSYNE', 'SYNC'] },
  { id: 'HESTIA', role: 'TRIAGE', type: 'RELAY', x: 80, y: 65, connections: ['HERACLES'] },
  
  // Layer 4: Output & Storage
  { id: 'HERMES', role: 'AMPLIFIER', type: 'NETWORK', x: 65, y: 85, connections: ['MNEMOSYNE'] },
  { id: 'MNEMOSYNE', role: 'MEMORY', type: 'STORAGE', x: 50, y: 90, connections: [] },
  { id: 'CHRONOS', role: 'ANALYTICS', type: 'DATA', x: 85, y: 90, connections: [] },
  { id: 'HERACLES', role: 'UNBLOCKER', type: 'WORKER', x: 20, y: 70, connections: [] },
];

const setDashoffset = (el: any) => {
  const pathLength = el.getTotalLength();
  el.setAttribute('stroke-dasharray', pathLength);
  return pathLength;
};

export default function SquadPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedAgent, setSelectedAgent] = useState<typeof agents[0] | null>(null);
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = createTimeline({
      defaults: { ease: 'outExpo', duration: 1200 }
    });

    // Intro Animation
    tl.add('.agent-node', {
      scale: [0, 1],
      opacity: [0, 1],
      delay: stagger(50, { from: 'center' }),
    })
    .add('.connection-path', {
      strokeDashoffset: [setDashoffset, 0],
      opacity: [0, 0.2],
      delay: stagger(20),
    }, '-=1000');

  }, []);

  // Handle Selection
  const handleAgentClick = (agent: typeof agents[0]) => {
    setSelectedAgent(agent);
    
    // Animate Panel Entry
    animate('.agent-panel', {
      translateX: ['100%', '0%'],
      opacity: [0, 1],
      duration: 600,
      ease: 'outExpo'
    });
  };

  return (
    <div ref={containerRef} className="h-full flex relative overflow-hidden bg-black">
      
      {/* Main Network Graph */}
      <div className={`flex-1 relative transition-all duration-500 ${selectedAgent ? 'mr-80' : ''}`}>
        <header className="absolute top-0 left-0 p-8 z-10 pointer-events-none">
          <h1 className="text-2xl font-light text-white mb-2">Neural Hive</h1>
          <p className="text-xs font-mono text-white/40">INTERACTIVE AGENT MESH</p>
        </header>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full max-w-4xl max-h-[800px] p-12">
            
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
              {/* Connections */}
              {agents.map((source) => 
                source.connections.map((targetId) => {
                  const target = agents.find(a => a.id === targetId);
                  if (!target) return null;
                  
                  const isHighlighted = hoveredAgent && (hoveredAgent === source.id || hoveredAgent === target.id);
                  const isDimmed = hoveredAgent && !isHighlighted;

                  return (
                    <line
                      key={`${source.id}-${target.id}`}
                      x1={source.x} y1={source.y}
                      x2={target.x} y2={target.y}
                      stroke={isHighlighted ? '#14B8A6' : '#333'}
                      strokeWidth={isHighlighted ? 0.4 : 0.2}
                      className={`connection-path transition-all duration-300 ${isDimmed ? 'opacity-10' : 'opacity-30'}`}
                    />
                  );
                })
              )}

              {/* Agents */}
              {agents.map((agent) => {
                const isSelected = selectedAgent?.id === agent.id;
                const isHovered = hoveredAgent === agent.id;
                const isDimmed = hoveredAgent && !isHovered && !agent.connections.includes(hoveredAgent!) && !agents.find(a => a.id === hoveredAgent)?.connections.includes(agent.id);

                return (
                  <g 
                    key={agent.id} 
                    className={`agent-node cursor-pointer transition-all duration-300 ${isDimmed ? 'opacity-20' : 'opacity-100'}`}
                    onClick={() => handleAgentClick(agent)}
                    onMouseEnter={() => setHoveredAgent(agent.id)}
                    onMouseLeave={() => setHoveredAgent(null)}
                  >
                    {/* Glow Ring */}
                    <circle 
                      cx={agent.x} cy={agent.y} 
                      r={isSelected ? 6 : isHovered ? 5 : 0} 
                      fill="none" 
                      stroke="#14B8A6" 
                      strokeWidth="0.2" 
                      className="transition-all duration-300"
                      strokeDasharray="1 1"
                    />
                    
                    {/* Core */}
                    <circle 
                      cx={agent.x} cy={agent.y} 
                      r="3" 
                      fill="#000" 
                      stroke={isSelected ? '#14B8A6' : '#333'} 
                      strokeWidth={isSelected ? 0.5 : 0.3}
                      className="transition-colors duration-300"
                    />
                    
                    {/* Status Dot */}
                    <circle cx={agent.x} cy={agent.y} r="1" fill="#14B8A6" className="animate-pulse" />

                    {/* Label */}
                    <text 
                      x={agent.x} y={agent.y + 6} 
                      fontSize="2" 
                      textAnchor="middle" 
                      fill={isSelected ? '#14B8A6' : '#fff'} 
                      fontFamily="monospace" 
                      fontWeight="bold"
                      className="transition-colors duration-300"
                    >
                      {agent.id}
                    </text>
                    <text x={agent.x} y={agent.y + 8} fontSize="1.2" textAnchor="middle" fill="#666" fontFamily="monospace">
                      {agent.role}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* Detail Panel (Slide-in) */}
      {selectedAgent && (
        <div className="agent-panel absolute top-0 right-0 w-80 h-full bg-black/90 border-l border-white/10 backdrop-blur-xl p-8 flex flex-col z-20">
          <button 
            onClick={() => {
              setSelectedAgent(null);
              setHoveredAgent(null);
            }}
            className="absolute top-4 right-4 text-white/40 hover:text-white"
          >
            ✕
          </button>

          <div className="mb-8">
            <div className="inline-block px-2 py-1 bg-teal-500/10 border border-teal-500/20 text-teal-500 text-xs font-mono mb-4">
              {selectedAgent.type}
            </div>
            <h2 className="text-3xl font-bold text-white mb-1">{selectedAgent.id}</h2>
            <p className="text-sm font-mono text-white/40">{selectedAgent.role}</p>
          </div>

          <div className="space-y-6 flex-1 overflow-y-auto">
            <div>
              <h3 className="text-xs font-mono text-white/30 uppercase mb-3">Current Status</h3>
              <div className="flex items-center gap-3 text-sm text-white">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Processing Task #8492
              </div>
            </div>

            <div>
              <h3 className="text-xs font-mono text-white/30 uppercase mb-3">Performance</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-white/60">
                  <span>Success Rate</span>
                  <span>99.8%</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 w-[99.8%]" />
                </div>
                
                <div className="flex justify-between text-xs text-white/60 mt-2">
                  <span>Latency</span>
                  <span>42ms</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 w-[20%]" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-mono text-white/30 uppercase mb-3">Activity Log</h3>
              <div className="font-mono text-[10px] space-y-2 text-white/50">
                <p>10:42:01 - Context Loaded</p>
                <p>10:41:55 - Vector Search Complete</p>
                <p>10:41:42 - Query Received</p>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-white/10">
            <button className="w-full py-3 bg-white text-black font-medium text-xs tracking-wide hover:bg-zinc-200 transition-colors">
              VIEW FULL LOGS
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
