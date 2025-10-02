// post data
export async function postData<T>(url: string, data: FormData): Promise<T> {
    const response = await fetch(url, {
        method: "POST",
        body: data,
    })

    const jsonResponse = await response.json()
    if (!response.ok) {
        throw new Error(`${jsonResponse.error}`)
    }

    return jsonResponse
}