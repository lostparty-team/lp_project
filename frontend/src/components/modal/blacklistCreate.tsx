'use client';

import { Dispatch, SetStateAction, useEffect, useState, useRef } from 'react';
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
  const [blacklist, setBlacklist] = useState<BlacklistUser[]>([]);

  const [newUser, setNewUser] = useState<BlacklistUser>({ id: 0, name: '', reason: '' });

  const [title, setTitle] = useState('새로운 블랙리스트');
  const [isEditing, setIsEditing] = useState(false); // 제목 수정 여부
  const inputRef = useRef<HTMLInputElement | null>(null);

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

  useEffect(() => {
    if (inputRef.current) {
      // 텍스트의 길이에 맞게 input의 너비를 설정
      inputRef.current.style.width = `${title.length + 4}ch`; // +1은 여유 공간을 주기 위해 추가
    }
  }, [title, isEditing]);

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
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='w-full max-w-3xl rounded-lg bg-gradient-to-br from-black2 to-black1 shadow-2xl'>
        {/* Header Section */}
        <div className='flex items-center justify-between rounded-t-lg bg-lostark-900 p-4'>
          <h2 className='m-2 text-3xl font-bold text-lostark-400'>블랙리스트 명단 생성</h2>
          <button
            onClick={handleClose}
            className='mr-2 text-3xl text-lostark-300 transition duration-200 hover:text-white'
          >
            ✕
          </button>
        </div>
        {/* Main Content Section */}
        <div className='p-6'>
          <div className='justify-left flex items-center pb-4'>
            <h2 className='text-3xl font-bold text-lostark-400'>
              {isEditing ? (
                <input
                  ref={inputRef}
                  type='text'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className='min-w-[150px] rounded-md bg-gray-700 px-4 py-2 text-gray-100 placeholder-gray-400 transition-all duration-100 focus:outline-none focus:ring-2 focus:ring-lostark-400'
                  placeholder='제목 입력'
                />
              ) : (
                title
              )}
            </h2>
            <button
              onClick={() => {
                if (!isEditing) {
                  setTitle(title);
                }
                setIsEditing(!isEditing);
              }}
              className='ml-2 rounded-full p-2 text-3xl text-gray-300 transition-colors duration-300 hover:text-white'
              aria-label='Edit Title'
            >
              ✎
            </button>
          </div>
          {/* Table Section */}
          <div className='w-full overflow-hidden rounded-lg bg-black2'>
            <table className='w-full table-fixed rounded-lg text-gray-100 shadow-md'>
              {/* Header */}
              <thead className='bg-gray-700 text-lostark-300'>
                <tr>
                  <th className='w-2/5 px-6 py-4 text-left'>이름</th>
                  <th className='w-2/5 px-6 py-4 text-left'>사유</th>
                  <th className='w-1/5 px-6 py-4 text-center'></th>
                </tr>
              </thead>
            </table>
            <div className='h-96 overflow-y-auto'>
              <table className='w-full table-fixed rounded-lg text-gray-100 shadow-md'>
                <tbody>
                  {blacklist.length !== 0 ? (
                    blacklist.map((user) => (
                      <tr key={user.id} className='w-full border-b border-gray-700 transition hover:bg-gray-800'>
                        <td className='w-2/5 px-6 py-4'>{user.name}</td>
                        <td className='w-2/5 px-6 py-4'>{user.reason}</td>
                        <td className='w-1/5 px-6 py-4 text-center'>
                          <button
                            onClick={() => handleRemove(user.id)}
                            className='rounded-lg bg-red-500 px-4 py-1 text-white transition-colors duration-300 hover:bg-red-400'
                          >
                            제거
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr key='1' className='w-full border-b border-gray-700 transition hover:bg-gray-800'>
                      <td className='w-2/5 px-6 py-4 text-slate-300'>ex) 홍길동</td>
                      <td className='w-2/5 px-6 py-4 text-slate-300'>ex) 숙코 행동</td>
                      <td className='w-1/5 px-6 py-4 text-center'></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <table className='w-full table-fixed rounded-lg text-gray-100 shadow-md'>
              <tfoot>
                <tr className='border-t border-gray-700 bg-gray-800'>
                  <td className='w-2/5 px-6 py-4'>
                    <input
                      type='text'
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      placeholder='이름'
                      className='w-full rounded-md bg-gray-700 px-4 py-2 text-gray-100 placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-lostark-400'
                    />
                  </td>
                  <td className='w-2/5 px-6 py-4'>
                    <input
                      type='text'
                      value={newUser.reason}
                      onChange={(e) => setNewUser({ ...newUser, reason: e.target.value })}
                      placeholder='사유'
                      className='w-full rounded-md bg-gray-700 px-4 py-2 text-gray-100 placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-lostark-400'
                    />
                  </td>
                  <td className='w-1/5 px-6 py-4 text-center'>
                    <button
                      onClick={handleAdd}
                      className='rounded-lg bg-green-500 px-4 py-1 text-white transition-colors duration-300 hover:bg-green-400'
                    >
                      추가
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <button className='mt-6 h-[48px] w-full rounded-lg bg-lostark-400 px-4 py-1 text-black1 transition-colors duration-300 hover:bg-lostark-300'>
            만들기
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlacklistCreateModal;
