'use client';
import { useRef, useEffect, useState } from 'react';
import Tooltip from '@/components/partyInfo/MemberTooltip';
import { getPartyScreenInfo, getMemberInfo } from '@/api/process';
import { Member, Elixirs, Elixir, Transcendence } from '@/types/member';
import { TooltipType } from '@/types/partyInfo';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Check, Edit } from 'lucide-react';
import { gemGrade } from '@/constants/gem';

const PartyInfo: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editName, setEditName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [memberLoading, setMemberLoading] = useState<boolean[]>([]);
  const [loadingText, setLoadingText] = useState<string>('파티원 정보를 받아오는 중입니다.');
  const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);
  const recordedData = useRef<Blob[]>([]);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const screenRecordingStream = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [inputWidth, setInputWidth] = useState<number>(0);
  const isAnyMemberLoading = memberLoading.some((loading) => loading);
  const [tooltip, setTooltip] = useState<TooltipType>({
    visible: false,
    content: null,
    x: 0,
    y: 0,
  });

  const gemBackgroundColor = (gemType: string) => {
    if (gemGrade.uncommon.includes(gemType)) {
      return 'bg-[#3d5e12]';
    } else if (gemGrade.rare.includes(gemType)) {
      return 'bg-[#113e5e]';
    } else if (gemGrade.epic.includes(gemType)) {
      return 'bg-[#540f6a]';
    } else if (gemGrade.legendary.includes(gemType)) {
      return 'bg-[#b16800]';
    } else if (gemGrade.mythic.includes(gemType)) {
      return 'bg-[#a53f03]';
    } else if (gemGrade.ancient.includes(gemType)) {
      return 'bg-[#d1b87d]';
    } else {
      return 'bg-[#5c5c5c]';
    }
  };

  const handleMouseEnter = (event: React.MouseEvent, idx: number | null, member: (typeof members)[0]) => {
    if (editIndex !== idx && member.data !== null) {
      const { clientX, clientY } = event;
      const scrollX = window.scrollX || 0;
      const scrollY = window.scrollY || 0;

      // 기본 툴팁 위치 설정
      let tooltipX = clientX + 10 + scrollX;
      let tooltipY = clientY - 250 + scrollY;

      setTooltip({
        visible: true,
        content: (
          <div className='rounded-md p-2.5 text-sm'>
            <div className='mb-2'>
              <strong>{member.name} 님의 정보</strong>
              <br />
              {member.isBlacklisted && <span className='text-red-500'>블랙리스트에 등록되어 있는 유저입니다.</span>}
            </div>
            {/* 무기 정보 */}
            <div className='mb-2'>
              <strong>무기: </strong>
              <div className='flex items-center'>
                {member.data.weapon.level} ({member.data.weapon.refinement} [상급재련:{' '}
                {member.data.weapon.advancedReforging}])
                <img src='/icons/transcendence.png' alt='Transcendence Icon' className='ml-1 h-4 w-4' />
                <span className='ml-1'>{member.data.transcendence.weapon}</span>
              </div>
            </div>

            {/* 장비 정보 */}
            <div className='mb-2'>
              <strong>장비:</strong>
              <ul className='list-none pl-0'>
                {[
                  { name: '투구', key: 'helmet' },
                  { name: '어깨', key: 'shoulder' },
                  { name: '상의', key: 'top' },
                  { name: '하의', key: 'pants' },
                  { name: '장갑', key: 'gloves' },
                ].map(({ name, key }) => (
                  <li key={key} className='flex items-center'>
                    <span>{name}:</span>
                    <img src='/icons/transcendence.png' alt='Transcendence Icon' className='ml-1 h-4 w-4' />
                    <span className='ml-1'>{member.data.transcendence[key as keyof Transcendence]}</span>
                    <span className='ml-2'>{(member.data.elixir[key as keyof Elixirs] as Elixir).elixir1}</span>
                    <small className='mx-1 px-1'>
                      {(member.data.elixir[key as keyof Elixirs] as Elixir).elixir1Level}
                    </small>
                    <span className='ml-2'>{(member.data.elixir[key as keyof Elixirs] as Elixir).elixir2}</span>
                    <small className='mx-1 px-1'>
                      {(member.data.elixir[key as keyof Elixirs] as Elixir).elixir2Level}
                    </small>
                  </li>
                ))}
              </ul>
            </div>

            {/* 아크패시브 포인트 */}
            <div className='mb-2'>
              <strong>아크패시브 포인트: </strong>
              <span className='text-[#f2d694]'>{member.data.arkPassivePoints[0]}</span>/
              <span className='text-[#83e9ff]'>{member.data.arkPassivePoints[1]}</span>/
              <span className='text-[#c1e955]'>{member.data.arkPassivePoints[2]}</span>
            </div>

            {/* 보석 정보 */}
            <div className='mb-2'>
              <strong>보석:</strong>
              <div className='flex flex-wrap gap-2'>
                {Object.entries(member.data.gems).map(([gemType, count]) => (
                  <div key={gemType} className={`rounded-xl px-2 ${gemBackgroundColor(gemType)} px-1 py-0.5`}>
                    <strong className='text-[11px] text-white'>
                      {gemType} {count}개
                    </strong>
                  </div>
                ))}
              </div>
            </div>

            {/* 각인 정보 */}
            <div className='mb-2'>
              <strong>각인:</strong>
              <ul className='list-none pl-0'>
                {member.data.engravings.map((engraving, index) => (
                  <li key={index} className='mb-1 flex items-center'>
                    {engraving.name} - {engraving.grade} (Level {engraving.gradeLevel})
                    {engraving.abilityStoneLevel !== null && (
                      <>
                        <img src='/icons/engrave.png' alt='Engrave Icon' className='ml-1 h-4 w-4' />
                        <span className='ml-1'>Lv. {engraving.abilityStoneLevel}</span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* 악세사리 정보 */}
            <div className='mb-2'>
              <strong>악세사리:</strong>
              <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                <li>
                  공용: 상 {member.data.accessories.upperGeneralCount}, 중 {member.data.accessories.middleGeneralCount},
                  하 {member.data.accessories.lowerGeneralCount}
                </li>
                <li>
                  특옵: 상 {member.data.accessories.upperSpecialCount}, 중 {member.data.accessories.middleSpecialCount},
                  하 {member.data.accessories.lowerSpecialCount}
                </li>
              </ul>
            </div>

            {/* 팔찌 정보 */}
            <div className='mb-2'>
              <strong>팔찌:</strong>
              {member.data.bracelet.length > 0 ? (
                <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                  {member.data.bracelet.map((effect, index) => (
                    <li key={index} style={{ marginBottom: '5px' }}>
                      {effect}
                    </li>
                  ))}
                </ul>
              ) : (
                '효과 없음'
              )}
            </div>
          </div>
        ),
        x: tooltipX,
        y: tooltipY,
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  const getTextWidth = (text: string): number => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const font = '18px Pretendard';
    if (!context) return 0;
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width; // 텍스트의 실제 너비 반환
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    const width = getTextWidth(text);
    setEditName(text);
    setInputWidth(width);
  };

  const handleEditName = (idx: number, name: string) => {
    const width = getTextWidth(name);
    setEditName(name);
    setInputWidth(width);
    setEditIndex(idx); // 수정 중인 멤버의 인덱스 설정
  };

  const handleSaveName = async (idx: number, name: string) => {
    setMemberLoading((prev) => {
      const newLoading = [...prev];
      newLoading[idx] = true;
      return newLoading;
    });
    setMembers((prevMembers) => {
      const updatedMembers = [...prevMembers];
      updatedMembers[idx] = { ...updatedMembers[idx], name }; // name만 업데이트
      return updatedMembers;
    });

    try {
      // API 요청으로 닉네임 저장
      const response = await getMemberInfo(name);
      console.log(response);
      const updatedMembers = [...members];
      updatedMembers[idx] = response.data;
      setMembers(updatedMembers);
    } catch (error) {
      console.error('닉네임 저장 중 오류 발생:', error);
    } finally {
      // 해당 파티원의 로딩 상태를 false로 설정
      setMemberLoading((prev) => {
        const newLoading = [...prev];
        newLoading[idx] = false;
        return newLoading;
      });
      setEditIndex(null); // 수정 모드 종료
    }
  };

  useEffect(() => {
    console.log(members);
  }, [members]);

  const startScreenSharing = async () => {
    const stream = await requestPermissionFromUserToAccessScreen();
    recordedData.current = [];
    recorderRef.current = new MediaRecorder(stream);
    recorderRef.current.addEventListener('dataavailable', collectVideoData);
    recorderRef.current.addEventListener('stop', () => setIsScreenSharing(false));
    recorderRef.current.addEventListener('start', () => setIsScreenSharing(true));
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

  const stopScreenSharing = async () => {
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
      toast.error('비디오 요소를 찾을 수 없습니다.');
      return;
    }

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) {
      toast.error('캔버스를 생성할 수 없습니다.');
      return;
    }

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    try {
      const base64Data = canvas.toDataURL('image/png');
      setMembers([]);
      setIsLoading(true);

      // Base64 데이터를 파이썬 백엔드로 전송
      const response = await getPartyScreenInfo(base64Data);
      console.log(response);
      const memberData: Member[] = response.members;

      // 상태 업데이트
      setMembers(memberData);
    } catch (error) {
      toast.error('파티원 정보를 받아오는 도중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setMemberLoading(new Array(members.length).fill(false));
  }, [members]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isLoading || isAnyMemberLoading) {
      interval = setInterval(() => {
        setLoadingText((prev) => {
          if (prev.endsWith('...')) {
            return '파티원 정보를 받아오는 중입니다.';
          }
          return prev + '.';
        });
      }, 500); // 0.5초마다 텍스트 업데이트
    }

    return () => {
      if (interval) {
        clearInterval(interval); // 인터벌 정리
      }
    };
  }, [isLoading, isAnyMemberLoading]);

  return (
    <div className='min-h-screen bg-black1 text-gray-100'>
      <section className='container mx-auto px-4 py-16'>
        {/* 타이틀 애니메이션 적용 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mb-8'
        >
          <h2 className='text-3xl font-bold text-lostark-400'>파티원 정보</h2>
        </motion.div>

        <div className='relative flex flex-col gap-4 md:flex-row'>
          {/* 화면 공유 카드 애니메이션 적용 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='h-[560px] flex-1 rounded-lg bg-gradient-to-br from-black2 to-black1 p-6 shadow-lg'
          >
            <h3 className='mb-4 text-xl font-semibold text-lostark-400'>화면 공유</h3>
            <div className='relative mb-2 h-[calc(100%-170px)] w-full overflow-hidden rounded-lg bg-black'>
              <video ref={videoRef} className='object-cozntain mb-4 h-full w-full rounded-lg' muted></video>
            </div>
            <button
              className='mt-2 w-full cursor-pointer rounded-lg border border-lostark-500 bg-lostark-400 px-6 py-3 text-white transition-all duration-300 hover:bg-lostark-500 disabled:cursor-not-allowed disabled:border disabled:border-lostark-500 disabled:bg-transparent disabled:text-lostark-400 disabled:outline-none'
              onClick={isScreenSharing ? stopScreenSharing : startScreenSharing}
              disabled={isLoading}
            >
              {isScreenSharing ? '화면 공유 종료' : '화면 공유 시작'}
            </button>
            {isScreenSharing && (
              <button
                className='mt-2 w-full cursor-pointer rounded-lg border border-lostark-500 bg-lostark-400 px-6 py-3 text-white transition-all duration-300 hover:bg-lostark-500 disabled:cursor-not-allowed disabled:border disabled:border-lostark-500 disabled:bg-transparent disabled:text-lostark-400 disabled:outline-none'
                onClick={handleFetchPartyInfo}
                disabled={!isScreenSharing || isLoading}
              >
                {isLoading ? '처리 중...' : '화면으로부터 파티원 정보 받아오기'}
              </button>
            )}
          </motion.div>

          {/* 파티원 정보 카드 애니메이션 적용 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='h-[560px] flex-1 rounded-lg bg-gradient-to-br from-black2 to-black1 p-6 shadow-lg'
          >
            <h3 className='mb-4 text-xl font-semibold text-lostark-400'>파티원 정보</h3>
            <div className='h-full max-h-[calc(100%-48px)] overflow-y-auto'>
              {Array.isArray(members) && members.length > 0 ? (
                members.map((data, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onMouseEnter={(e) => handleMouseEnter(e, idx, data)}
                    onMouseLeave={handleMouseLeave}
                    className='mb-2 rounded-lg border border-lostark-400/20 bg-black2/50 p-4 backdrop-blur-md transition-all duration-300 hover:border-lostark-400/50'
                  >
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center'>
                        {editIndex === idx ? (
                          <>
                            <input
                              className='border-b bg-transparent text-lg font-semibold focus:border-b-yellow-500 focus:outline-none'
                              type='text'
                              defaultValue={data.name}
                              maxLength={12}
                              style={{ width: `${Math.max(inputWidth, 60)}px` }}
                              onChange={handleInputChange}
                            />
                            <button
                              className='rounded-full p-1.5 text-lostark-400 transition duration-200 hover:bg-white/10'
                              onClick={() => handleSaveName(idx, editName)}
                            >
                              <Check size={24} />
                            </button>
                          </>
                        ) : (
                          <>
                            <div
                              className={`text-lg font-semibold ${
                                data.isBlacklisted ? 'text-red-500' : 'text-lostark-300'
                              }`}
                            >
                              {data.name}
                            </div>
                            <button
                              className='rounded-full p-1.5 text-lostark-400 transition duration-200 hover:bg-white/10'
                              onClick={() => handleEditName(idx, data.name)}
                              disabled={memberLoading[idx]}
                            >
                              <Edit size={20} />
                            </button>
                          </>
                        )}
                      </div>
                      {data.data && <div className='text-sm text-gray-400'>{data.data.itemLevel}</div>}
                    </div>

                    {memberLoading[idx] ? (
                      <div className='text-sm text-gray-400'>{loadingText}</div>
                    ) : data.data ? (
                      <div className='text-sm text-gray-400'>
                        {data.data.enlightenmentStyle} | 세구빛 30각 | {data.data.elixir?.total}엘 |{' '}
                        {data.data.transcendence?.total}초
                      </div>
                    ) : (
                      <div className='text-sm text-gray-400'>파티원 정보가 존재하지 않습니다.</div>
                    )}
                  </motion.div>
                ))
              ) : (
                <div className='rounded-lg bg-black2 p-6 text-center text-gray-400'>
                  {isLoading ? loadingText : '파티원을 기다리는 중입니다...'}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tooltip */}
      <Tooltip content={tooltip.content} position={{ x: tooltip.x, y: tooltip.y }} visible={tooltip.visible} />

      {/* Footer */}
      <footer className='border-t border-lostark-400/10 bg-black1 py-16'>
        <div className='container mx-auto px-4'>
          <div className='mb-12 flex flex-wrap justify-center gap-8'>
            {['이용약관', '개인정보처리방침', '문의하기', '후원하기'].map((item) => (
              <motion.a
                key={item}
                whileHover={{ scale: 1.05 }}
                className='relative text-white/70 transition-all duration-300 hover:text-lostark-400'
              >
                {item}
              </motion.a>
            ))}
          </div>
          <p className='text-center text-white/50'>© 2024 로스트아크 파티파인더. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PartyInfo;
