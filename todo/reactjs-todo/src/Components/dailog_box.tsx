/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useEffect, useRef } from 'react'

interface CustomDialogProps {
    isOpen: boolean
    onClose: () => void
    onConfirm?: () => void
    title: string
    description: string
    children?: React.ReactNode
}

export default function CustomDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    children,
}: CustomDialogProps) {
    const dialogRef = useRef<HTMLDivElement>(null)

    // Escape key handler
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown)
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, onClose])

    // Outside click handler
    const handleClickOutside = (event: MouseEvent) => {
        if (
            dialogRef.current &&
            !dialogRef.current.contains(event.target as Node)
        ) {
            onClose()
        }
    }

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div
                ref={dialogRef}
                className="bg-primaryColor text-white rounded-lg shadow-lg lg:max-w-[400px] max-w-xs p-6"
            >
                <h2 className="text-center text-[17px] font-medium">{title}</h2>
                <p className="text-center text-sm mt-2">{description}</p>
                {
                    children ? (
                        <div className="mt-4">{children}</div>
                    ) : <div className="mt-6 flex justify-center space-x-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm rounded bg-gray-200 text-black hover:bg-gray-300 cursor-pointer"
                        >
                            Cancel
                        </button>
                        {onConfirm && (
                            <button
                                onClick={onConfirm}
                                className="px-4 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                            >
                                Confirm
                            </button>
                        )}
                    </div>
                }
            </div>
        </div>
    )
}
