import React from "react";

const NavigationBar: React.FC = () => {
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
      <div className="absolute top-0 left-0 w-full flex items-center justify-between px-8 py-4">
        <h1 className="text-3xl font-bold">LostArk Party</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="/" className="text-gray-200 hover:text-white">
                홈
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-200 hover:text-white">
                공지사항
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-200 hover:text-white">
                파티원 정보
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-200 hover:text-white">
                실시간
              </a>
            </li>
            <li>
              <a href="/blacklist" className="text-gray-200 hover:text-white">
                블랙리스트
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavigationBar;
