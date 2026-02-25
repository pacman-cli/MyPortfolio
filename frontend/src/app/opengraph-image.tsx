import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'MD Ashikur Rahman Puspo | Backend Engineer & Software Developer'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

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
          backgroundColor: '#020817', // Dark background
          backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.15) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(16, 185, 129, 0.15) 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          {/* Logo / Brand Name */}
          <div
            style={{
              fontSize: 80,
              fontWeight: 900,
              color: '#fff',
              marginBottom: 20,
              letterSpacing: '-2px',
            }}
          >
            MD Ashikur Rahman Puspo
          </div>
        </div>

        <div
          style={{
            fontSize: 48,
            fontWeight: 600,
            background: 'linear-gradient(to right, #34d399, #2dd4bf)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: 20,
            letterSpacing: '-1px',
          }}
        >
          Backend Engineer & Software Developer
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            marginTop: 40,
          }}
        >
          {['Spring Boot', 'Go', 'AWS', 'Docker'].map((tech) => (
            <div
              key={tech}
              style={{
                backgroundColor: 'rgba(52, 211, 153, 0.1)',
                color: '#34d399',
                padding: '10px 20px',
                borderRadius: '100px',
                fontSize: 24,
                fontWeight: 500,
                border: '1px solid rgba(52, 211, 153, 0.2)',
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
