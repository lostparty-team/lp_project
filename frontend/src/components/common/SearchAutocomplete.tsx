'use client';
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SearchIcon } from '@/styles/icons';
import { useBlacklistStore } from '@/stores/blacklistStore';
import { useRouter } from 'next/navigation';
import { BlacklistUser } from '@/types/blacklist';
import { ArrowRight } from 'lucide-react';
import { useOutsideClick } from '@/hooks/useOutsideClick';

interface Props {
  suggestions: BlacklistUser[];
  onSearch: (term: string) => void;
}

const SearchAutocomplete = ({ suggestions, onSearch }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<BlacklistUser[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { setSearchTerm } = useBlacklistStore();

  // 외부 클릭 시, idx 초기화
  useEffect(() => {
    if (!isOpen) {
      setSelectedIndex(-1);
    }
  }, [isOpen]);

  // 외부 클릭 감지
  useOutsideClick(containerRef, () => {
    setIsOpen(false);
  });

  useEffect(() => {
    const filtered = suggestions
      .filter((item) => item.title?.toLowerCase().includes(inputValue.toLowerCase()))
      .slice(0, 10); // 최대 표시 개수
    setFilteredSuggestions(filtered);
  }, [inputValue, suggestions]);

  // 검색어 위치 스크롤 조정
  useEffect(() => {
    if (selectedIndex >= 0 && suggestionsRef.current) {
      const container = suggestionsRef.current;
      const selectedElement = container.children[selectedIndex + 1] as HTMLElement;
      if (selectedElement) {
        const containerHeight = container.clientHeight;
        const scrollPosition = container.scrollTop;
        const elementOffset = selectedElement.offsetTop;
        const elementHeight = selectedElement.offsetHeight;

        // 스크롤 영역 검증
        if (elementOffset < scrollPosition) {
          // 위로 스크롤
          container.scrollTo({
            top: elementOffset,
            behavior: 'smooth',
          });
        } else if (elementOffset + elementHeight > scrollPosition + containerHeight) {
          // 아래로 스크롤
          container.scrollTo({
            top: elementOffset + elementHeight - containerHeight,
            behavior: 'smooth',
          });
        }
      }
    }
  }, [selectedIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(inputValue);
    router.push('/blacklist');
  };

  const handleSuggestionClick = (suggestion: BlacklistUser) => {
    setInputValue(suggestion.title || '');
    setSearchTerm(suggestion.title || '');
    setIsOpen(false);
    router.push('/blacklist');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        setIsOpen(true);
        if (filteredSuggestions.length > 0) {
          setSelectedIndex(e.key === 'ArrowDown' ? 0 : filteredSuggestions.length - 1);
        }
        return;
      }
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filteredSuggestions.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          const selected = filteredSuggestions[selectedIndex];
          handleSuggestionClick(selected);
        } else {
          handleSubmit(e as any);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // 검색어 입력 시 선택 인덱스 초기화
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsOpen(true);
    setSelectedIndex(-1); // 입력 값이 변경될 때도 선택 인덱스 초기화
  };

  return (
    <div ref={containerRef} className='relative w-full max-w-2xl'>
      <form onSubmit={handleSubmit} className='relative'>
        <input
          ref={inputRef}
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder='파티원을 검색하세요...'
          className='w-full rounded-xl border-2 border-transparent bg-black2/40 px-6 py-4 text-base text-white/90 shadow-sm backdrop-blur-md transition-all duration-300 placeholder:text-white/40 hover:bg-black2/50 focus:border-lostark-400/50 focus:bg-black2/60 focus:shadow-none focus:outline-none'
        />
        <button
          type='submit'
          className='absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-lostark-400/20 p-2.5 text-lostark-400 transition-all duration-300 hover:bg-lostark-400/30'
        >
          <SearchIcon className='h-4 w-4' />
        </button>
      </form>

      <AnimatePresence>
        {isOpen && filteredSuggestions.length > 0 && (
          <motion.div
            ref={suggestionsRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className='scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 absolute z-50 mt-2 max-h-[280px] w-full overflow-y-auto rounded-lg border border-white/5 bg-black2/95 p-1.5 shadow-lg backdrop-blur-md'
          >
            <div className='px-3 py-2 text-xs font-medium text-white/40'>추천 검색어</div>
            {filteredSuggestions.map((suggestion, index) => (
              <motion.button
                key={suggestion.id}
                whileHover={{ x: 2 }}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`flex w-full items-center rounded-md px-3 py-2 text-left transition-all duration-200 ${
                  index === selectedIndex ? 'bg-lostark-400/10 text-white' : 'hover:bg-white/5'
                }`}
              >
                <div className='flex-1 truncate'>
                  <p className='truncate text-sm font-medium text-white/90'>{suggestion.title}</p>
                  <p className='truncate text-xs text-white/40'>{suggestion.author}</p>
                </div>
                <ArrowRight
                  className={`ml-2 h-3 w-3 transform text-white/20 transition-all duration-200 ${index === selectedIndex ? 'translate-x-1 text-white/40' : ''}`}
                />
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchAutocomplete;
