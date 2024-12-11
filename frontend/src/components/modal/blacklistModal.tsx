'use client';

import { Dispatch, SetStateAction, useEffect, useState, useRef } from 'react';
import '../../styles/pages/blacklist.css';

interface BlacklistUser {
  id: number;
  name: string;
  reason: string;
}

type ChildProps = {
  data: Record<string, any>;
  setModalData: Dispatch<SetStateAction<Record<string, any> | null>>;
};

const BlacklistModal = ({ data, setModalData }: ChildProps) => {
  const [blacklist, setBlacklist] = useState<BlacklistUser[]>([]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalData(null);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [setModalData]);

  const handleClose = () => {
    setModalData(null);
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='w-full max-w-3xl rounded-lg bg-gradient-to-br from-black2 to-black1 shadow-2xl'>
        {/* Header Section */}
        <div className='flex items-center justify-between rounded-t-lg bg-lostark-900 p-4'>
          <h2 className='m-2 text-3xl font-bold text-lostark-400'>{data.name}</h2>
          <button
            onClick={handleClose}
            className='mr-2 text-3xl text-lostark-300 transition duration-200 hover:text-white'
          >
            ✕
          </button>
        </div>
        {/* Main Content Section */}
        <div className='p-6'>
          <div className='flex items-center justify-between pb-4'>
            <h2 className='text-xl font-bold text-lostark-400'>작성자: {data.createdBy}</h2>
            <h2 className='text-l text-lostark-400'>
              작성일 {data.createdAt} | 담은수 {data.add} | 비추천 {data.bad}
            </h2>
          </div>
          {/* Table Section */}
          <div className='w-full overflow-hidden rounded-lg bg-black2'>
            <table className='w-full table-fixed rounded-lg text-gray-100 shadow-md'>
              {/* Header */}
              <thead className='bg-gray-700 text-lostark-300'>
                <tr>
                  <th className='w-2/5 px-6 py-4 text-left'>이름</th>
                  <th className='w-3/5 px-6 py-4 text-left'>사유</th>
                </tr>
              </thead>
            </table>
            <div className='h-96 overflow-y-auto'>
              <table className='w-full table-fixed rounded-lg text-gray-100 shadow-md'>
                <tbody>
                  {blacklist.map((user) => (
                    <tr key={user.id} className='w-full border-b border-gray-700 transition hover:bg-gray-800'>
                      <td className='w-2/5 px-6 py-4'>{user.name}</td>
                      <td className='w-3/5 px-6 py-4'>{user.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlacklistModal;
