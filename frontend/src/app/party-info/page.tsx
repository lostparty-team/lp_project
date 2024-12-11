'use client';

import '../../styles/pages/party-info.css';
import React, { useState, useRef } from 'react';
import { postProcess } from '@/api/process';

const PartyInfo: React.FC = () => {
  const members = [
    { server: '카단', name: 'HaeSungs', level: 70, itemLevel: 1676.67 },
    { server: '아만', name: '낟찔', level: 60, itemLevel: 1660 },
    { server: '아만', name: '애니츠의겨울은너무추워', level: 60, itemLevel: 1430 },
  ];

  const [isRecording, setIsRecording] = useState(false);
  const recordedData = useRef<Blob[]>([]);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const screenRecordingStream = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startRecording = async () => {
    const stream = await requestPermissionFromUserToAccessScreen();
    recordedData.current = [];
    recorderRef.current = new MediaRecorder(stream);
    recorderRef.current.addEventListener('dataavailable', collectVideoData);
    recorderRef.current.addEventListener('stop', () => setIsRecording(false));
    recorderRef.current.addEventListener('start', () => setIsRecording(true));
    recorderRef.current.start(100);
  };

  const requestPermissionFromUserToAccessScreen = async () => {
    const stream: MediaStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: {
        noiseSuppression: true,
      },
    });
    screenRecordingStream.current = stream;
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
    return stream;
  };

  const collectVideoData = (ev: BlobEvent) => {
    recordedData.current.push(ev.data);
  };

  const stopRecording = async () => {
    const recorder = recorderRef.current;
    if (recorder && videoRef.current) {
      recorder.stop();
      screenRecordingStream.current?.getTracks().map((track) => {
        track.stop();
        return;
      });
      videoRef.current.srcObject = null;
      console.log(recordedData);
    }
  };

  const handleFetchPartyInfo = async () => {
    console.log('aa');
    if (recordedData.current.length === 0) {
      alert('먼저 녹화를 시작한 후 중지해 주세요.');
      return;
    }

    // Blob 데이터를 병합하여 서버로 전송
    const finalBlob = new Blob(recordedData.current, { type: 'video/webm' });
    try {
      const response = await postProcess({ image: finalBlob });
      console.log('서버 응답:', response.data);
    } catch (error) {
      console.error('통신 중 오류 발생:', error);
    }
  };

  return (
    <div className='min-h-screen bg-black1 text-gray-100'>
      <section className='container mx-auto px-4 py-16'>
        <h2 className='mb-8 text-3xl font-bold text-lostark-400'>파티원 정보</h2>
        <div className='relative flex flex-col gap-8 md:flex-row'>
          {/* 화면 공유 */}
          <div className='flex-1 rounded-lg bg-gradient-to-br from-black2 to-black1 p-6 shadow-lg'>
            <h3 className='mb-4 text-xl font-semibold text-lostark-400'>화면 공유</h3>
            <video ref={videoRef} width='100%' className='mb-4 rounded-lg' muted></video>
            <button
              className={`w-full rounded-lg bg-lostark-400 px-6 py-3 text-black hover:bg-lostark-300`}
              onClick={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? '화면 공유 종료' : '화면 공유 시작'}
            </button>
            {isRecording && (
              <button
                className={`mt-4 w-full cursor-pointer rounded-lg bg-lostark-400 px-6 py-3 text-black hover:bg-lostark-300`}
                onClick={handleFetchPartyInfo}
                disabled={!isRecording}
              >
                화면으로부터 파티원 정보 받아오기
              </button>
            )}
          </div>

          {/* 파티원 정보 */}
          <div className='flex-1 space-y-4'>
            {members.map((data, index) => (
              <div
                key={index}
                className='flex items-center justify-between rounded-lg bg-gradient-to-br from-black2 to-black1 p-6 shadow-lg'
              >
                <div>
                  <div className='text-lg font-semibold text-lostark-300'>{data.name}</div>
                  <div className='text-sm text-gray-400'>레벨 {data.level}</div>
                  <div className='text-sm text-gray-400'>아이템 레벨 {data.itemLevel}</div>
                </div>
                <div className='text-right'>
                  <div className='text-sm text-gray-400'>{data.server} 서버</div>
                </div>
              </div>
            ))}
            <div className='rounded-lg bg-black2 p-6 text-center text-gray-400'>파티원을 기다리는 중입니다...</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='border-t border-black2 py-12'>
        <div className='mx-auto px-4'>
          <div className='mb-8 flex justify-center space-x-12'>
            {['이용약관', '개인정보처리방침', '문의하기', '후원하기'].map((item) => (
              <a key={item} className='relative text-white/50 transition-all duration-300 hover:text-lostark-400'>
                {item}
              </a>
            ))}
          </div>
          <p className='text-center text-white/50'>Copyright © All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PartyInfo;
