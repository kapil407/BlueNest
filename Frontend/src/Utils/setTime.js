export const FormateMessageTime=(date)=>{
    return new Date(date).toLocaleString("en-us",{
        hour:"2-digit",
        minute:"2-digit",
        hour12:"true",
    })
}