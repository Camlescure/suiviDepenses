export async function getAllDepenses(){
    try {
        const response = await fetch('http://localhost:4000/depenses');
        return await response.json();
    } catch(error) {
        return []
    }
}