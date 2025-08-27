export const metadata = { title: 'Video Test' }
export default function Page(){
  return (
    <main style={{padding:24}}>
      <h1>Video Test</h1>
     <video
  poster="/media/hero-poster.jpg?v=8"
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
  style={{
    width: '100%',
    maxWidth: 900,
    borderRadius: 16,
    outline: '1px solid #ddd',
    objectFit: 'cover',
    background: '#0e0e0e'
  }}
>
  {/* H.264 first for Chrome/Firefox/Edge, HEVC as fallback for Safari */}
  <source src="/media/hero-h264.mp4?v=8" type='video/mp4; codecs="avc1.64001f, mp4a.40.2"' />
  <source src="/media/hero.mp4?v=8"      type='video/mp4; codecs="hvc1"' />
</video>

    </main>
  )
}
