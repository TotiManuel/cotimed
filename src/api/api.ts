const API_URL = import.meta.env.VITE_API_URL;


interface RequestOptions {
    headers?: Record<string, string>;
    body?: unknown;
}


const request = async (
    endpoint: string,
    method: string,
    options: RequestOptions = {}
) => {

    const token = localStorage.getItem("token");

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...options.headers,
    };


    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }


    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            method,
            headers,
            body:
                options.body !== undefined
                    ? JSON.stringify(options.body)
                    : undefined,
        }
    );


    let data: any = null;

    const contentType = response.headers.get(
        "content-type"
    );


    if (
        contentType &&
        contentType.includes("application/json")
    ) {
        data = await response.json();
    }


    if (!response.ok) {

        const message =
            data?.message ||
            `Error ${response.status}: ${response.statusText}`;

        throw new Error(message);
    }


    return data;
};


// =========================================================
// API
// =========================================================

const api = {

    // -----------------------------------------------------
    // GET
    // -----------------------------------------------------

    get: async (endpoint: string) => {
        return await request(
            endpoint,
            "GET"
        );
    },


    // -----------------------------------------------------
    // POST
    // -----------------------------------------------------

    post: async (
        endpoint: string,
        body?: unknown
    ) => {
        return await request(
            endpoint,
            "POST",
            {
                body,
            }
        );
    },


    // -----------------------------------------------------
    // PUT
    // -----------------------------------------------------

    put: async (
        endpoint: string,
        body?: unknown
    ) => {
        return await request(
            endpoint,
            "PUT",
            {
                body,
            }
        );
    },


    // -----------------------------------------------------
    // PATCH
    // -----------------------------------------------------

    patch: async (
        endpoint: string,
        body?: unknown
    ) => {
        return await request(
            endpoint,
            "PATCH",
            {
                body,
            }
        );
    },


    // -----------------------------------------------------
    // DELETE
    // -----------------------------------------------------

    delete: async (
        endpoint: string
    ) => {
        return await request(
            endpoint,
            "DELETE"
        );
    },

};


export default api;