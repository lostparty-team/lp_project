export default function BackgroundVideo() {
  return (
    <>
      <div className='absolute inset-0 -z-10'>
        <video
          autoPlay
          loop
          muted
          playsInline
          className='absolute inset-0 h-full w-full object-cover object-right brightness-[0.5] contrast-200'
        >
          <source src='/videos/background.mp4' type='video/mp4' />
        </video>
      </div>
      <div className='absolute inset-0 -z-10 bg-black1/70' />
    </>
  );
}
