const TimelineItem = ({ year, title, description, isLast }) => (
  <div className="flex gap-6">
    {/* Timeline line */}
    <div className="flex flex-col items-center">
      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-brand to-brand-dark" />
      {!isLast && <div className="w-0.5 h-full bg-gradient-to-b from-brand/50 to-transparent mt-2" />}
    </div>
    
    {/* Content */}
    <div className="pb-8 flex-1">
      <div className="inline-block px-4 py-1 bg-brand/10 rounded-full text-brand text-sm font-semibold mb-2">
        {year}
      </div>
      <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  </div>
);

export default TimelineItem