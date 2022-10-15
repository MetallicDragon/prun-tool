export default class FIOApi {
    static rootURL = 'https://rest.fnar.net/';

    static async get(path: string) {
        const response = await fetch(FIOApi.rootURL + path);
        
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(response.statusText);
        }
    }
}