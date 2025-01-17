import { useState } from 'react';
import { CustomInput } from './ui/CustomInput';
import { CustomButton } from './ui/CustomButton';
import { toast } from 'react-toastify';
import { setHeader } from '@/utils/header';

interface ApiInputModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApiInputModal = ({ isOpen, onClose }: ApiInputModalProps) => {
  const [apiKey, setApiKey] = useState('');
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      toast.error('API 키를 입력해주세요.');
      return;
    }
    setHeader('Authorization', `Bearer ${apiKey}`);
    localStorage.setItem('lostark-api', apiKey);
    toast.success('API 키가 저장되었습니다.');
    onClose();
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='w-96 rounded-lg bg-black1 p-6'>
        <h2 className='mb-4 text-xl font-bold text-lostark-300'>로스트아크 API 입력</h2>

        <form onSubmit={handleSubmit}>
          <CustomInput
            label='로스트아크 API'
            placeholder='API 키를 입력하세요.'
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <div className='flex justify-end space-x-2'>
            <CustomButton onClick={onClose} size='sm'>
              취소
            </CustomButton>
            <CustomButton type='submit' size='sm'>
              저장
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApiInputModal;
