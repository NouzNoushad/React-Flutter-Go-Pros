// post data
export async function postData<T>(url: string, data: FormData | object): Promise<T> {
    const isFormData = data instanceof FormData

    const response = await fetch(url, {
        method: "POST",
        body: isFormData ? data : JSON.stringify(data),
        credentials: "include",
        headers: isFormData ? undefined : {
            "Content-Type": "application/json",
        }
    })

    const jsonResponse = await response.json()

    if (!response.ok) {
        throw new Error(`${jsonResponse.error || "Something went wrong"}`)
    }

    return jsonResponse
}

// fetch data
export async function fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url, { credentials: "include" })
    const jsonResponse = await response.json()
    console.log(`///////////////////////////// response: ${jsonResponse}`)
    if (!response.ok) {
        throw new Error(`${jsonResponse.error}`)
    }

    return jsonResponse
}

// update data
export async function updateData<T>(url: string, data: FormData | object): Promise<T> {
    const isFormData = data instanceof FormData

    const response = await fetch(url, {
        method: "PUT",
        body: isFormData ? data : JSON.stringify(data),
        credentials: "include",
        headers: isFormData ? undefined : {
            "Content-Type": "application/json",
        }
    })

    const jsonResponse = await response.json()

    if (!response.ok) {
        throw new Error(`${jsonResponse.error}`)
    }

    return jsonResponse
}

// delete data
export async function deleteData<T>(url: string): Promise<T> {
    const response = await fetch(url, {
        method: "DELETE",
        credentials: "include"
    },)

    const jsonResponse = await response.json()

    if (!response.ok) {
        throw new Error(`${jsonResponse.error}`)
    }

    return jsonResponse
}