export const formatDuration = (sec: number) => {
    const minutes = Math.floor(sec / 60)
    const seconds = Math.floor(sec % 60)

    return `${minutes}:${seconds.toString().padStart(2, '0')}`
}