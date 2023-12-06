import { useRouter } from 'next/router';
import { ChevronLeft } from 'react-feather';

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="rounded-full transition bg-slate-800 hover:bg-slate-400 p- w-16 h-16 flex justify-center items-center absolute left-10 top-12 text-white"
    >
      <ChevronLeft />
    </button>
  );
};

export default BackButton;
