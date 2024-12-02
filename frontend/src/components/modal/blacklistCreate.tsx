'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import NavigationBar from '@/components/common/navigationBar';
import '../../styles/pages/blacklist.css';

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
    { id: 1, name: '사용자 1', reason: '욕설 사용' },
    { id: 2, name: '사용자 2', reason: '숙코 행동' },
    { id: 3, name: '사용자 3', reason: '부적절한 행동' },
  ]);

  const [newUser, setNewUser] = useState<BlacklistUser>({ id: 0, name: '', reason: '' });

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
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
      setNewUser({ id: 0, name: '', reason: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
      <h1 className="mb-6 text-3xl font-bold">블랙리스트</h1>
      <table className="min-w-full rounded-lg bg-gray-800 text-white shadow-md">
        <thead>
          <tr className="border-b border-gray-600">
            <th className="px-6 py-3 text-left">이름</th>
            <th className="px-6 py-3 text-left">사유</th>
            <th className="px-6 py-3 text-left">동작</th>
          </tr>
        </thead>
        <tbody>
          {blacklist.map((user) => (
            <tr key={user.id} className="border-b border-gray-600">
              <td className="px-6 py-3">{user.name}</td>
              <td className="px-6 py-3">{user.reason}</td>
              <td className="flex items-center justify-end px-6 py-3 text-center">
                <button
                  onClick={() => handleRemove(user.id)}
                  className="rounded-lg bg-red-500 px-4 py-1 text-white transition duration-200 hover:bg-red-400"
                >
                  제거
                </button>
              </td>
            </tr>
          ))}

          <tr className="border-b border-gray-600">
            <td className="px-6 py-3">
              <input
                type="text"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                placeholder="이름"
                className="rounded bg-gray-700 px-2 py-1 text-white"
              />
            </td>
            <td className="px-6 py-3">
              <input
                type="text"
                value={newUser.reason}
                onChange={(e) => setNewUser({ ...newUser, reason: e.target.value })}
                placeholder="사유"
                className="rounded bg-gray-700 px-2 py-1 text-white"
              />
            </td>
            <td className="px-6 py-3 text-center">
              <button
                onClick={handleAdd}
                className="rounded-lg bg-green-500 px-4 py-1 text-white transition duration-200 hover:bg-green-400"
              >
                추가
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        onClick={handleClose}
        className="mt-4 rounded-lg bg-red-500 px-4 py-1 text-white transition duration-200 hover:bg-red-400"
      >
        닫기
      </button>
    </div>
  );
};

export default BlacklistCreateModal;
