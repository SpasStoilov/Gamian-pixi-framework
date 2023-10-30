const baseURL = 'http://localhost:3000/'

export async function fetchME (path, options={}) {
    try {
     
        let res = await fetch(baseURL + path, options)

        if (!res.ok){
            let err = await res.json()
            throw new Error(err)
        }

        if (res.status == 204) {
            return []
        }

        return res.json()
            
    }
    catch (err) {
        alert(err.message)
        throw err
    }
}