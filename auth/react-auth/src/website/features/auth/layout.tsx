import React from 'react'

export default function AdminAuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className='flex flex-row h-fit min-h-screen w-full overflow-y-auto bg-amber-200'>
            {/* Left section */}
            <div className="hidden lg:flex flex-1 bg-primary-dark items-center justify-center">
                <div className="flex flex-col items-center space-x-2">
                    <span>
                        <div className='px-2 py-2 flex-1 w-full'>
                            <h1 className='font-bold text-lg'>Authentication</h1>
                        </div>
                    </span>
                </div>
            </div>
            {/* Right Section */}
            <div className="flex-1 min-h-screen flex flex-col">
                {/* Mobile Header */}
                <div className="lg:hidden shrink-0 bg-primary-dark flex items-center justify-center py-4">
                    <div className="flex items-center space-x-2">
                        <span>
                            <div className='px-2 py-2 flex-1 w-full'>
                                <h1 className='font-bold text-sm'>Authentication</h1>
                            </div>
                        </span>
                    </div>
                </div>
                {/* Main Form */}
                <div className="flex-1 bg-primary">
                    {children}
                </div>
            </div>
        </div>
    )
}
