/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from "react"
import { debounce } from "lodash"
import type { Module } from "../../../Lib/APINetwork/APIResponse"
import { PaginationLimit } from "../../../Lib/Constants"
import { useModulesStore } from "../../../Store/Admin/ModuleStore"

export const ModulesSearchAction = (originalModules: Module[]) => {

    const { searchQuery, setSearchQuery, setModules, setLimit } = useModulesStore()

    // search modules
    const searchModules = useCallback(
        debounce((query: string, modules: Module[]) => {
            const searchList = modules.filter((module) => {
                const sQuery = query.trim().toLowerCase()

                const userName = module.module_title.trim().toLowerCase()

                return (
                    userName.includes(sQuery)
                )
            })

            setModules(searchList)

        }, 300), [searchQuery]
    )

    useEffect(() => {
        searchModules(searchQuery, originalModules)
        return () => searchModules.cancel()
    }, [searchQuery, originalModules])

    useEffect(() => {
        setLimit(PaginationLimit)
        setSearchQuery('')
    }, [])

    return {
        setSearchQuery,
    }
}