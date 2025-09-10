// post data
export async function postData<T>(url: string, data: FormData): Promise<T> {
    const response = await fetch(url, {
        method: "POST",
        body: data,
    })

    const jsonResponse = await response.json()
    console.log(`///////////////////// response: ${jsonResponse}`)

    if (!response.ok) {
        throw new Error(`${jsonResponse.error} || something went wrong`)
    }

    return jsonResponse
}

// fetch data
export async function fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url)

    const jsonResponse = await response.json()

    if (!response.ok) {
        throw new Error(`${jsonResponse.error}`)
    }

    return jsonResponse
}

// update data
export async function updateData<T>(url: string, data: FormData): Promise<T> {
    const response = await fetch(url, {
        method: "PUT",
        body: data,
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
    })

    const jsonResponse = await response.json()

    if (!response.ok) {
        throw new Error(`${jsonResponse.error}`)
    }

    return jsonResponse
}