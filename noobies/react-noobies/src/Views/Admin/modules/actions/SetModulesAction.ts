import { useModulesStore } from "../../../../Store/Admin/ModuleStore"

export const SetModulesAction = () => {
    const { currentPage, limit, modules } = useModulesStore()

    const sortModules = [...modules].sort((a, b) => b.created_at.localeCompare(a.created_at))

    const paginatedItems = sortModules.slice(
        (currentPage - 1) * limit,
        currentPage * limit
    )

    return {
        sortModules,
        paginatedItems,
    }
}