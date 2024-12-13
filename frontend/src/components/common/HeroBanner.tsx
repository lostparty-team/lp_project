export default function HeroBanner() {
  return (
    <div className='relative h-72 bg-cover bg-center' style={{ backgroundImage: "url('/bg_loa.jpg')" }}>
      <div className='absolute inset-0 bg-black bg-opacity-30' />
    </div>
  );
}
