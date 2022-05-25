const userId = 'aXb2Xnr'

const getTime = async () => {
    try {
        const response = await fetch(
            `https://runday.s3.us-west-2.amazonaws.com/userCache/${userId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                method: 'GET'
            }
        );
    
        if (response.status !== 200) throw new Error("Can't get meeting data");
    
        const data = await response.json();
    
        if (!data) throw new Error('Unable to load data');

        return data
    } catch (error) {
        console.log(error)
    }
}

export default getTime