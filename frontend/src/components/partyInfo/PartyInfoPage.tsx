'use client';
import { useRef, useEffect, useState } from 'react';
import Tooltip from '@/components/partyInfo/MemberTooltip';
import { postProcess } from '@/api/process';
import { Member } from '@/types/member';


const PartyInfo: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);

  const [isRecording, setIsRecording] = useState(false);
  const recordedData = useRef<Blob[]>([]);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const screenRecordingStream = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [tooltip, setTooltip] = useState({
    visible: false,
    content: null,
    x: 0,
    y: 0,
  });

  const handleMouseEnter = (event: React.MouseEvent, member: (typeof members)[0]) => {
    const { clientX, clientY } = event;
    setTooltip({
      visible: true,
      content: (
        <div>
          <div>
            <strong>서버:</strong> {member.server}
          </div>
          <div>
            <strong>이름:</strong> {member.name}
          </div>
          <div>
            <strong>레벨:</strong> {member.level}
          </div>
          <div>
            <strong>아이템 레벨:</strong> {member.itemLevel}
          </div>
        </div>
      ),
      x: clientX + 10,
      y: clientY + 10,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

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
    if (!videoRef.current) {
      alert('비디오 요소를 찾을 수 없습니다.');
      return;
    }

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) {
      alert('캔버스를 생성할 수 없습니다.');
      return;
    }

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    try {
      const base64Data = canvas.toDataURL('image/png');

      // Base64 데이터를 파이썬 백엔드로 전송
      const response = await postProcess({ image: base64Data });
      const memberData: Member[] = response.data.members;

      // 상태 업데이트
      setMembers(memberData);
      console.log(response);
      // 테스트용 코드 (추후 삭제)
      // const testResponse = await postProcessTest();
      // const partyData = testResponse.data.data;

      // console.log('서버 응답:', response.data, testResponse.data);
    } catch (error) {
      console.error('Base64 변환 또는 통신 중 오류 발생:', error);
    }
  };

  return (
    <div className='min-h-screen bg-black1 text-gray-100'>
      <section className='container mx-auto px-4 py-16'>
        <h2 className='mb-8 text-3xl font-bold text-lostark-400'>파티원 정보</h2>
        <div className='relative flex flex-col gap-4 md:flex-row'>
          {/* 화면 공유 */}
          <div className='flex-1 rounded-lg bg-gradient-to-br from-black2 to-black1 p-6 shadow-lg'>
            <div>
              <h3 className='mb-4 text-xl font-semibold text-lostark-400'>화면 공유</h3>
              <video ref={videoRef} width='100%' className='mb-4 rounded-lg' muted></video>
            </div>
            <div>
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
          </div>

          {/* 파티원 정보 */}
          <div className='flex-1 rounded-lg bg-gradient-to-br from-black2 to-black1 p-6 shadow-lg'>
            <h3 className='mb-4 text-xl font-semibold text-lostark-400'>파티원 정보</h3>
            <div className='h-full max-h-[calc(100%-48px)] overflow-y-auto'>
              {Array.isArray(members) && members.map((data, index) => (
                <div
                  key={index}
                  onMouseEnter={(e) => handleMouseEnter(e, data)}
                  onMouseLeave={handleMouseLeave}
                  className='mb-2 rounded-lg bg-gradient-to-br from-black2 to-black1 p-4 shadow-lg'
                >
                  <div className='flex items-center justify-between'>
                    <div className='text-lg font-semibold text-lostark-300'>{data.name}</div>
                    <div className='text-sm text-gray-400'>1680</div>
                  </div>
                  <div className='text-sm text-gray-400'>세구빛 30각 | 40엘 | 126초</div>
                </div>
              ))}
              <div className='rounded-lg bg-black2 p-6 text-center text-gray-400'>파티원을 기다리는 중입니다...</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tooltip */}
      <Tooltip content={tooltip.content} position={{ x: tooltip.x, y: tooltip.y }} visible={tooltip.visible} />

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
