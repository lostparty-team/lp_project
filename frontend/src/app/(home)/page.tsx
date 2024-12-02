'use client';
import { toast } from 'react-toastify';
import NavigationBar from '@/components/common/navigationBar';

const MainPage: React.FC = () => {
  const handleButtonClick = () => {
    toast.success('버튼 클릭');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <main className="mx-auto flex max-w-screen-xl flex-col gap-10 px-20">
        <section className="w-auto pt-20 text-center">
          <h2>캐릭터 검색하기</h2>
        </section>

        <section className="flex justify-center pt-0">
          <input
            type="text"
            placeholder="검색어를 입력하세요..."
            className="w-full max-w-3xl rounded-lg bg-gray-700 p-4 text-gray-100 placeholder-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </section>

        <section className="pb-5 pt-20">
          <h2>주요 기능 바로가기</h2>
        </section>

        <section className="grid grid-cols-4 gap-8">
          <button
            className="aspect-square w-full rounded-lg bg-gray-700 text-gray-100 transition duration-300 hover:bg-gray-600"
            onClick={handleButtonClick}
          >
            파티원 정보
          </button>
          <button
            className="aspect-square w-full rounded-lg bg-gray-700 text-gray-100 transition duration-300 hover:bg-gray-600"
            onClick={handleButtonClick}
          >
            실시간
          </button>
          <button
            className="aspect-square w-full rounded-lg bg-gray-700 text-gray-100 transition duration-300 hover:bg-gray-600"
            onClick={handleButtonClick}
          >
            블랙리스트
          </button>
          <button
            className="aspect-square w-full rounded-lg bg-gray-700 text-gray-100 transition duration-300 hover:bg-gray-600"
            onClick={handleButtonClick}
          >
            여분 버튼
          </button>
        </section>

        <section className="pb-5 pt-20">
          <h2>커뮤니티</h2>
        </section>

        <section className="flex gap-8">
          {/* 공격대 박스 */}
          <div className="rounded-lg bg-gray-800 p-6 shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">공격대</h2>
              <button className="text-sm text-blue-400 hover:text-blue-300">더보기</button>
            </div>
            <ul className="space-y-4">
              <li>
                <button className="flex w-full items-center justify-between rounded-lg bg-gray-700 p-3 transition duration-300 hover:bg-gray-600">
                  <span className="flex items-center space-x-3">
                    <img src="https://via.placeholder.com/40" alt="Player" className="h-10 w-10 rounded-full" />
                    <span>플레이어 1</span>
                  </span>
                  <span className="text-gray-400">4시간 전</span>
                </button>
              </li>
              <li>
                <button className="flex w-full items-center justify-between rounded-lg bg-gray-700 p-3 transition duration-300 hover:bg-gray-600">
                  <span className="flex items-center space-x-3">
                    <img src="https://via.placeholder.com/40" alt="Player" className="h-10 w-10 rounded-full" />
                    <span>플레이어 2</span>
                  </span>
                  <span className="ml-5 text-gray-400">5시간 전</span>
                </button>
              </li>
            </ul>
          </div>

          {/* 공지사항 박스 */}
          <div className="flex-1 rounded-lg bg-gray-800 p-6 shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">공지사항</h2>
              <button className="text-sm text-blue-400 hover:text-blue-300">더보기</button>
            </div>
            <ul className="space-y-4">
              <li>
                <button className="flex w-full items-center justify-between rounded-lg bg-gray-700 p-3 transition duration-300 hover:bg-gray-600">
                  <span className="flex items-center space-x-2">
                    <span className="text-blue-400">🏆</span>
                    <span>공지사항 1</span>
                  </span>
                  <span className="text-gray-400">10일 전</span>
                </button>
              </li>
              <li>
                <button className="flex w-full items-center justify-between rounded-lg bg-gray-700 p-3 transition duration-300 hover:bg-gray-600">
                  <span className="flex items-center space-x-2">
                    <span className="text-blue-400">🏆</span>
                    <span>공지사항 2</span>
                  </span>
                  <span className="text-gray-400">20일 전</span>
                </button>
              </li>
            </ul>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="mt-auto bg-transparent py-20 text-gray-400">
          <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-center">
            {/* 링크들 */}
            <div className="mb-4 flex space-x-8">
              <a href="#" className="text-m hover:text-gray-100">
                이용약관
              </a>
              <a href="#" className="text-m hover:text-gray-100">
                개인정보처리방침
              </a>
              <a href="#" className="text-m hover:text-gray-100">
                문의하기
              </a>
              <a href="#" className="text-m hover:text-gray-100">
                후원하기
              </a>
            </div>
            {/* 저작권 정보 */}
            <div className="text-m text-center">Copyright © All rights reserved.</div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default MainPage;
