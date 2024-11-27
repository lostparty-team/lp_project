"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "../../styles/pages/blacklist.css";
import BlacklistCreateModal from "@/components/modal/blacklistCreate";

interface BlacklistUser {
  id: number;
  name: string;
  createdBy: string;
}

const BlacklistPage: React.FC = () => {
  const router = useRouter();

  // 초기 데이터
  const [blacklist, setBlacklist] = useState<BlacklistUser[]>([
    { id: 1, name: "사용자 1", createdBy: "관리자 1" },
    { id: 2, name: "사용자 2", createdBy: "관리자 2" },
    { id: 3, name: "사용자 3", createdBy: "관리자 3" },
  ]);

  const [selectedBlacklist, setSelectedBlacklist] = useState<BlacklistUser[]>([]);

  const [isModalOpen, setModalOpen] = useState<Boolean>(false);

  const handleCreateBlacklist = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // 항목 추가
  const handleAddToSelected = (user: BlacklistUser) => {
    setSelectedBlacklist((prev) => [...prev, user]);
    setBlacklist((prev) => prev.filter((item) => item.id !== user.id));
  };

  return (
    <div className="flex bg-gray-900 text-gray-100 min-h-screen p-8">
      {/* 왼쪽 박스 */}
      <div className="w-1/2 bg-gray-800 rounded-lg shadow-md p-6 mr-4">
        <h2 className="text-xl font-bold mb-4">전체 블랙리스트</h2>
        <ul className="space-y-4">
          {blacklist.map((user) => (
            <li key={user.id} className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
              <div>
                <p className="text-lg font-semibold">{user.name}</p>
                <p className="text-sm text-gray-400">생성자: {user.createdBy}</p>
              </div>
              <button
                onClick={() => handleAddToSelected(user)}
                className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-400 transition duration-200"
              >
                +
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 오른쪽 박스 */}
      <div className="w-1/2 bg-gray-800 rounded-lg shadow-md p-6 ml-4">
        <h2 className="text-xl font-bold mb-4">내 블랙리스트</h2>
        <ul className="space-y-4">
          {selectedBlacklist.map((user) => (
            <li key={user.id} className="bg-gray-700 p-4 rounded-lg text-lg font-semibold">
              {user.name}
            </li>
          ))}
        </ul>
      </div>

      {/* "블랙리스트 명단 만들기" 버튼 */}
      <div className="fixed bottom-8 right-8">
        <button
          onClick={handleCreateBlacklist}
          className="bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-green-400 transition duration-300"
        >
          블랙리스트 명단 만들기
        </button>
      </div>
      {/* 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden max-w-3xl w-full">
            <div className="flex justify-between items-center p-4 bg-gray-700 text-white">
              <h2 className="text-xl font-bold">블랙리스트 명단 만들기</h2>
              <button onClick={handleCloseModal} className="text-gray-300 hover:text-white transition duration-200">
                ✕
              </button>
            </div>
            <div className="p-4">
              <BlacklistCreateModal />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlacklistPage;
