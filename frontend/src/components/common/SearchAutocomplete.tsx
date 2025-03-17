'use client';
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SearchIcon } from '@/styles/icons';
import { useBlacklistStore } from '@/stores/blacklistStore';
import { useRouter } from 'next/navigation';
import { BlacklistUser } from '@/types/blacklist';
import { ArrowRight } from 'lucide-react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { getSearchSuggestions } from '@/api/blacklist';
import { useDebounce } from '@/hooks/useDebounce';
import { toast } from 'react-toastify';

interface SuggestionProps {
  suggestions: BlacklistUser[];
}

const SearchAutocomplete = ({ suggestions: initialSuggestions }: SuggestionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<BlacklistUser[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { setSearchTerm } = useBlacklistStore();

  // 검색 디바운싱 (100ms)
  const debouncedSearchTerm = useDebounce<string>(inputValue, 100);

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

  // 자동완성
  useEffect(() => {
    const fetchSearchSuggestions = async () => {
      if (debouncedSearchTerm.length < 1) {
        const filtered = initialSuggestions.slice(0, 10);
        setFilteredSuggestions(filtered);
        return;
      }

      try {
        setLoading(true);
        const result = await getSearchSuggestions(debouncedSearchTerm);
        const combinedResults = [...(result.data || [])];
        const uniqueResults = Array.from(new Map(combinedResults.map((item) => [item.id, item])).values());
        setFilteredSuggestions(uniqueResults.slice(0, 10));
      } catch (error) {
        toast.error('검색어 자동완성 오류');
        const filtered = initialSuggestions
          .filter((item) => item.title?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
          .slice(0, 10);
        setFilteredSuggestions(filtered);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchSuggestions();
  }, [debouncedSearchTerm, initialSuggestions]);

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

    // 검색
    if (inputValue && inputValue.trim()) {
      router.push(`/blacklist?search=${encodeURIComponent(inputValue.trim())}`);
    } else {
      router.push('/blacklist');
    }
  };

  const handleSuggestionClick = (suggestion: BlacklistUser) => {
    setInputValue(suggestion.title || '');
    setSearchTerm(suggestion.title || '');
    setIsOpen(false);
    router.push(`/blacklist/${suggestion.id}`, { scroll: false });
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

  // 검색어 입력 시 인덱스 초기화
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsOpen(true);
    setSelectedIndex(-1);
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
          placeholder='검색어를 입력해 주세요.'
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
        {isOpen && (
          <motion.div
            ref={suggestionsRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className='scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 absolute z-50 mt-2 max-h-[280px] w-full overflow-y-auto rounded-lg border border-white/5 bg-black2/95 p-1.5 shadow-lg backdrop-blur-md'
          >
            <div className='px-3 py-2 text-xs font-medium text-white/40'>
              {loading ? '검색 중...' : inputValue ? '검색 결과' : '최근 게시글'}
            </div>

            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((suggestion, index) => (
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
                  </div>
                  <ArrowRight
                    className={`ml-2 h-3 w-3 transform text-white/20 transition-all duration-200 ${index === selectedIndex ? 'translate-x-1 text-white/40' : ''}`}
                  />
                </motion.button>
              ))
            ) : (
              <div className='px-3 py-2 text-sm text-white/60'>
                {inputValue ? '검색 결과가 없습니다.' : '최근 게시글이 없습니다.'}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchAutocomplete;
