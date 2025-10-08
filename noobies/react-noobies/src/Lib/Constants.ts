export const PaginationLimit = 10

export const getImageFilePath = (path: string) => {
    return path.replaceAll("\\", "/").split("/").slice(-2).join("/")
}