import React from 'react'
import TimelineItem from "../../components/common/TimelineItem";
import { FaChartLine } from "react-icons/fa";

const Journey = ({ timelineData }) => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <FaChartLine className="text-brand" />
          Professional Journey
        </h3>
        <div className="space-y-2">
          {timelineData.map((item, index) => (
            <TimelineItem
              key={index}
              {...item}
              isLast={index === timelineData.length - 1}
            />
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-brand/10 to-brand-dark/10 p-8 rounded-2xl border border-brand/30">
        <h4 className="text-xl font-semibold mb-4">Current Focus</h4>
        <p className="text-gray-300 leading-relaxed">
          Currently expanding expertise in cloud-native development, microservices architecture, 
          and advanced TypeScript patterns. Working on performance optimization techniques 
          and accessibility best practices.
        </p>
      </div>
    </div>
  )
}

export default Journey