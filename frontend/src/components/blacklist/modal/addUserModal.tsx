'use client';
import { useState } from 'react';

interface AddUserModalProps {
  onClose: () => void; // 모달 닫기 함수
}

const AddUserModal: React.FC<AddUserModalProps> = ({ onClose }) => {
  const [name, setName] = useState<string>('');
  const [reason, setReason] = useState<string>('');

  const handleSubmit = () => {
    // 사용자 추가 로직 처리
    console.log('추가된 사용자:', name, reason);
    onClose(); // 모달 닫기
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50'>
      <div className='w-1/3 rounded-lg bg-white p-6 shadow-lg'>
        <h2 className='mb-4 text-2xl font-bold'>사용자 추가</h2>
        <div className='mb-4'>
          <label htmlFor='name' className='block text-gray-700'>
            이름
          </label>
          <input
            id='name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='mt-2 w-full rounded-lg border border-gray-300 p-2'
            placeholder='사용자 이름'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='reason' className='block text-gray-700'>
            사유
          </label>
          <input
            id='reason'
            type='text'
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className='mt-2 w-full rounded-lg border border-gray-300 p-2'
            placeholder='사유'
          />
        </div>
        <div className='flex justify-end gap-4'>
          <button onClick={onClose} className='rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-400'>
            취소
          </button>
          <button onClick={handleSubmit} className='rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-400'>
            추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
