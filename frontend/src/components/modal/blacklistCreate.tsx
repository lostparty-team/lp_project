"use client";

import React, { useState } from "react";
import NavigationBar from "@/components/common/navigationBar";
import "../../styles/pages/blacklist.css";

interface BlacklistUser {
  id: number;
  name: string;
  reason: string;
}

const BlacklistCreateModal: React.FC = () => {
  const blacklist = [
    { id: 1, name: "사용자 1", reason: "욕설 사용" },
    { id: 2, name: "사용자 2", reason: "숙코 행동" },
    { id: 3, name: "사용자 3", reason: "부적절한 행동" },
  ];

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">블랙리스트</h1>
      <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-md">
        <thead>
          <tr className="border-b border-gray-600">
            <th className="py-3 px-6 text-left">이름</th>
            <th className="py-3 px-6 text-left">사유</th>
          </tr>
        </thead>
        <tbody>
          {blacklist.map((user) => (
            <tr key={user.id} className="border-b border-gray-600">
              <td className="py-3 px-6">{user.name}</td>
              <td className="py-3 px-6">{user.reason}</td>
              <td className="py-3 px-6 text-center flex items-center justify-end">
                <button className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-400 transition duration-200">
                  제거
                </button>
              </td>
            </tr>
          ))}

          <tr className="border-b border-gray-600">
            <td colSpan={3} className="py-3 px-6 text-center">
              <button className="bg-transparent text-white w-full py-2 px-6 rounded-lg hover:bg-gray-400 transition duration-200">
                추가
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BlacklistCreateModal;