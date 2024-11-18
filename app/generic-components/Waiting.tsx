import React from 'react'

const Waiting = () => {
  return (
      <div className="flex flex-col items-center justify-center space-y-4 bg-white p-6 h-96">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-700 font-medium text-lg">Loading, please wait...</p>
      </div>
  )
}

export default Waiting