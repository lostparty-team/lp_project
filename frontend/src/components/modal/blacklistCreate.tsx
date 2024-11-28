"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import NavigationBar from "@/components/common/navigationBar";
import "../../styles/pages/blacklist.css";

interface BlacklistUser {
  id: number;
  name: string;
  reason: string;
}

type ChildProps = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

const BlacklistCreateModal = ({ setModalOpen }: ChildProps) => {
  const [blacklist, setBlacklist] = useState<BlacklistUser[]>([
    { id: 1, name: "사용자 1", reason: "욕설 사용" },
    { id: 2, name: "사용자 2", reason: "숙코 행동" },
    { id: 3, name: "사용자 3", reason: "부적절한 행동" },
  ]);

  const [newUser, setNewUser] = useState<BlacklistUser>({ id: 0, name: "", reason: "" });

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [setModalOpen]);

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleRemove = (id: number) => {
    setBlacklist(blacklist.filter((user) => user.id !== id));
  };

  const handleAdd = () => {
    if (newUser.name && newUser.reason) {
      setBlacklist([...blacklist, { ...newUser, id: blacklist.length + 1 }]);
      setNewUser({ id: 0, name: "", reason: "" });
    }
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">블랙리스트</h1>
      <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-md">
        <thead>
          <tr className="border-b border-gray-600">
            <th className="py-3 px-6 text-left">이름</th>
            <th className="py-3 px-6 text-left">사유</th>
            <th className="py-3 px-6 text-left">동작</th>
          </tr>
        </thead>
        <tbody>
          {blacklist.map((user) => (
            <tr key={user.id} className="border-b border-gray-600">
              <td className="py-3 px-6">{user.name}</td>
              <td className="py-3 px-6">{user.reason}</td>
              <td className="py-3 px-6 text-center flex items-center justify-end">
                <button
                  onClick={() => handleRemove(user.id)}
                  className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-400 transition duration-200"
                >
                  제거
                </button>
              </td>
            </tr>
          ))}

          <tr className="border-b border-gray-600">
            <td className="py-3 px-6">
              <input
                type="text"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                placeholder="이름"
                className="bg-gray-700 text-white px-2 py-1 rounded"
              />
            </td>
            <td className="py-3 px-6">
              <input
                type="text"
                value={newUser.reason}
                onChange={(e) => setNewUser({ ...newUser, reason: e.target.value })}
                placeholder="사유"
                className="bg-gray-700 text-white px-2 py-1 rounded"
              />
            </td>
            <td className="py-3 px-6 text-center">
              <button
                onClick={handleAdd}
                className="bg-green-500 text-white py-1 px-4 rounded-lg hover:bg-green-400 transition duration-200"
              >
                추가
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        onClick={handleClose}
        className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-400 transition duration-200 mt-4"
      >
        닫기
      </button>
    </div>
  );
};

export default BlacklistCreateModal;
