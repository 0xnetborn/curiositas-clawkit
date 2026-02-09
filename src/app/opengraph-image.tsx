import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'CurioKit AI Orchestration';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#050505',
          backgroundImage: 'linear-gradient(to right, #111 1px, transparent 1px), linear-gradient(to bottom, #111 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          color: 'white',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
          }}
        >
          {/* Simulated Logo Shape */}
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 50px rgba(20, 184, 166, 0.4)',
            }}
          >
            <div style={{ fontSize: '48px', color: 'white' }}>C</div>
          </div>
        </div>

        <div
          style={{
            fontSize: '80px',
            fontWeight: 'bold',
            letterSpacing: '-0.05em',
            background: 'linear-gradient(to bottom, #fff, #888)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: '20px',
          }}
        >
          CurioKit
        </div>

        <div
          style={{
            fontSize: '32px',
            color: '#666',
            fontFamily: 'monospace',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          AI Orchestration for Founders
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
          }}
        >
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#14B8A6' }}></div>
          <div style={{ fontSize: '20px', color: '#444', fontFamily: 'monospace' }}>SYSTEM OPERATIONAL</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
