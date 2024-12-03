import Link from 'next/link';

const NavigationBar = () => {
  return (
    <header className="relative">
      <div
        className="h-72 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://via.placeholder.com/1920x400')", // 헤더 이미지 URL (임시로 해둠)
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      <div className="absolute left-0 top-0 flex w-full items-center justify-between px-8 py-4">
        <h1 className="text-3xl font-bold">LostArk Party</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="text-gray-200 hover:text-white">
                홈
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-200 hover:text-white">
                공지사항
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-200 hover:text-white">
                파티원 정보
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-200 hover:text-white">
                실시간
              </Link>
            </li>
            <li>
              <Link href="/blacklist" className="text-gray-200 hover:text-white">
                블랙리스트
              </Link>
            </li>
            <li>
              <Link href="/login" className="text-gray-200 hover:text-white">
                로그인 (임시)
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavigationBar;
