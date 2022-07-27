export default{
    async getDogs(){
        const response = await fetch('https://barkwireapi.brooks.now.sh/dogs');
        return await response.json();
    },
    async getDog(id){
        const response = await fetch(`https://barkwireapi.brooks.now.sh/dogs/${id}`);
        return await response.json();
    }
}