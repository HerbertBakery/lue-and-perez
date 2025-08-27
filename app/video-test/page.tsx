export const metadata = { title: 'Video Test' }
export default function Page(){
  return (
    <main style={{padding:24}}>
      <h1>Video Test</h1>
      <video
        src="/media/hero.mp4"
        controls
        autoPlay
        muted
        playsInline
        style={{width:'100%', maxWidth:900, borderRadius:16, outline:'1px solid #ddd'}}
      />
    </main>
  )
}
