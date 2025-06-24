import React from 'react'

const SidebarSkeleton = () => {
  return (
    <div
  className={`md:max-w-[30vw] w-full
    ${selectedUser && "hidden"}
    md:flex flex-col border-r border-base-300 overflow-y-auto animate-pulse`}
>
  {/* Header Skeleton */}
  <div className="p-6 border-b border-base-300 shrink-0">
    <div className="flex justify-between items-center mb-4">
      <div className="h-5 w-24 bg-base-300 rounded"></div>
      <div className="h-5 w-32 bg-base-300 rounded"></div>
    </div>
    <div className="relative flex w-full items-center">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 bg-base-300 rounded"></div>
      <div className="h-10 w-full pl-11 bg-base-300 rounded"></div>
    </div>
  </div>

  {/* Contact Items Skeleton */}
  <div className="overflow-y-auto flex-1 space-y-2 px-4 py-4">
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="flex items-center gap-4 px-4 py-3 border-b border-base-200"
      >
        <div className="w-12 h-12 bg-base-300 rounded-full"></div>
        <div className="flex-1">
          <div className="flex justify-between mb-1">
            <div className="h-4 w-32 bg-base-300 rounded"></div>
            <div className="h-3 w-12 bg-base-300 rounded"></div>
          </div>
          <div className="h-3 w-40 bg-base-300 rounded"></div>
        </div>
      </div>
    ))}
  </div>
</div>

  )
}

export default SidebarSkeleton