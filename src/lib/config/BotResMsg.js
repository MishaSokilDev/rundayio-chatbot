const BotResMsg = (status, blocks) => {
    let res = {}
    switch (status) {
        case ('/menu'):
            res = [
                {
                    message: '👋 Hey there, nice to meet you! I’m Sunny and I’d like to welcome you  to [business name]. Let me know if you have any questions or need help with anything and I’ll be happy to help!'
                }, {
                    commands: ['Create Meeting']
                }
            ]
            break
        case ('/create-meeting'):
            res = [
                {
                    message: 'Please input your email adress for meeting.'
                }
            ]
            break
        case ('/create-meeting:error'):
            res = [
                {
                    message: '⛔Enter valid email⛔'
                }
            ]
            break
        case ('/create-meeting:name'):
            res = [
                {
                    message: 'Please input your Name like {first last}.'
                }
            ]
            break
        case ('/create-meeting:name:error'): 
            res = [
                {
                    message: '⛔Enter valid name like this John Doe⛔'
                }
            ]
            break
        case ('/create-meeting:time'): 
            res = [
                {
                    message: 'Use the calendar below to select the best time and day for meeting'
                }
            ]
            break
        case ('/create-meeting:success'): 
            res = [
                {
                    message: 'You created the meeting'
                },
                ...blocks
            ]
            break
        default:
            res = [
                {
                    message: "😵‍💫 Oops! Sorry, I didn't understand your question. Please rephrase it or click the button below to go back to the menu."
                }, {
                    commands: ['Menu']
                }
            ]     
    }

    return res
}

export default BotResMsg