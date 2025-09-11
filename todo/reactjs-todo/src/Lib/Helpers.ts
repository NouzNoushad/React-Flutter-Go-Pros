export const formatDate = (isoString: string) => {
    const date = new Date(isoString)
    const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    })

    return formattedDate
}

export const formatTime = (isoString: string) => {
    const date = new Date(isoString)
    const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    })

    return formattedTime
}