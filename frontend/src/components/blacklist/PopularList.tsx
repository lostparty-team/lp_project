import { BlacklistUser } from '@/types/blacklist';
interface PopularListProps {
  blacklist: BlacklistUser[];
  onItemClick: (data: BlacklistUser) => void;
}

const PopularList: React.FC<PopularListProps> = ({ blacklist, onItemClick }) => {
  return (
    <div className='grid grid-cols-3 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {blacklist
        .sort((a, b) => b.bad - a.bad)
        .slice(0, 3)
        .map((data, index) => (
          <button
            key={data.id}
            onClick={() => onItemClick(data)}
            className='relative overflow-hidden rounded-lg bg-gradient-to-br from-black2 to-black1 p-6 text-left shadow-lg transition-all duration-300 hover:scale-105'
          >
            <span className='absolute right-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-sm text-white'>
              #{index + 1}
            </span>
            <h3 className='mb-2 text-xl font-bold text-lostark-300'>{data.title}</h3>
            <p className='text-sm text-gray-400'>{data.author}</p>
          </button>
        ))}
    </div>
  );
};

export default PopularList;
