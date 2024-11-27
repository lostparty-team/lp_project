"use client";

import React from "react";
import { toast } from "react-toastify";
import NavigationBar from "@/components/common/navigationBar";
import "../globals.css";

const MainPage: React.FC = () => {
  const handleButtonClick = () => {
    toast.success("버튼 클릭");
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <main className="max-w-screen-xl mx-auto flex flex-col gap-10 px-20">
        <section className="w-auto text-center pt-20">
          <h2>캐릭터 검색하기</h2>
        </section>

        <section className="flex justify-center pt-0">
          <input
            type="text"
            placeholder="검색어를 입력하세요..."
            className="w-full max-w-3xl p-4 bg-gray-700 text-gray-100 rounded-lg shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </section>

        <section className="pt-20 pb-5">
          <h2>주요 기능 바로가기</h2>
        </section>

        <section className="grid grid-cols-4 gap-8">
          <button
            className="w-full aspect-square bg-gray-700 text-gray-100 rounded-lg hover:bg-gray-600 transition duration-300"
            onClick={handleButtonClick}
          >
            파티원 정보
          </button>
          <button
            className="w-full aspect-square bg-gray-700 text-gray-100 rounded-lg hover:bg-gray-600 transition duration-300"
            onClick={handleButtonClick}
          >
            실시간
          </button>
          <button
            className="w-full aspect-square bg-gray-700 text-gray-100 rounded-lg hover:bg-gray-600 transition duration-300"
            onClick={handleButtonClick}
          >
            블랙리스트
          </button>
          <button
            className="w-full aspect-square bg-gray-700 text-gray-100 rounded-lg hover:bg-gray-600 transition duration-300"
            onClick={handleButtonClick}
          >
            여분 버튼
          </button>
        </section>

        <section className="pt-20 pb-5">
          <h2>커뮤니티</h2>
        </section>

        <section className="flex gap-8">
          {/* 공격대 박스 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">공격대</h2>
              <button className="text-sm text-blue-400 hover:text-blue-300">더보기</button>
            </div>
            <ul className="space-y-4">
              <li>
                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300">
                  <span className="flex items-center space-x-3">
                    <img src="https://via.placeholder.com/40" alt="Player" className="w-10 h-10 rounded-full" />
                    <span>플레이어 1</span>
                  </span>
                  <span className="text-gray-400">4시간 전</span>
                </button>
              </li>
              <li>
                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300">
                  <span className="flex items-center space-x-3">
                    <img src="https://via.placeholder.com/40" alt="Player" className="w-10 h-10 rounded-full" />
                    <span>플레이어 2</span>
                  </span>
                  <span className="ml-5 text-gray-400">5시간 전</span>
                </button>
              </li>
            </ul>
          </div>

          {/* 공지사항 박스 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md flex-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">공지사항</h2>
              <button className="text-sm text-blue-400 hover:text-blue-300">더보기</button>
            </div>
            <ul className="space-y-4">
              <li>
                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300">
                  <span className="flex items-center space-x-2">
                    <span className="text-blue-400">🏆</span>
                    <span>공지사항 1</span>
                  </span>
                  <span className="text-gray-400">10일 전</span>
                </button>
              </li>
              <li>
                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300">
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
        <footer className="bg-transparent text-gray-400 py-20 mt-auto">
          <div className="max-w-screen-xl mx-auto flex flex-col items-center justify-center">
            {/* 링크들 */}
            <div className="flex space-x-8 mb-4">
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
