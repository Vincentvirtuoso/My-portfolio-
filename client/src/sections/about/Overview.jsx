import React from 'react'
import { FaAward, FaUserTie } from 'react-icons/fa'

const Overview = ({ coreValues }) => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <FaUserTie className="text-brand" />
          Professional Overview
        </h3>
        <div className="space-y-4">
          <p className="text-lg text-gray-300 leading-relaxed">
            I'm a passionate full-stack developer with 3+ years of experience building scalable web applications. 
            My expertise spans the entire development lifecycle, from concept to deployment.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            I believe in creating digital experiences that are not only functional but also delightful to use. 
            My approach combines technical excellence with creative problem-solving.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div>
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <FaAward className="text-brand" />
          Core Values
        </h3>
        <div className="grid sm:grid-cols-2 gap-6">
          {coreValues.map((value, index) => (
            <div key={index} className="bg-white/5 p-6 rounded-2xl border border-gray-800/50">
              <value.icon className="text-brand text-3xl mb-4" />
              <h4 className="text-xl font-semibold mb-2">{value.title}</h4>
              <p className="text-gray-400">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Overview