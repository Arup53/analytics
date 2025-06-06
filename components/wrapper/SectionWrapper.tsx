interface Props {
  title: string;
}

const SectionBadge = ({ title }: Props) => {
  return (
    <div className="flex items-center justify-center space-x-2 bg-[#1a1a1a]  px-3 py-1 rounded-full">
      <span className="relative flex justify-center items-center h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C05D5D] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C05D5D]"></span>
      </span>
      <span className="bg-clip-text bg-gradient-to-r from-[#fe8989] to-[#C05D5D] font-medium text-transparent text-xs">
        {title}
      </span>
    </div>
  );
};

export default SectionBadge;
