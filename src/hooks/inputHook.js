import toast from "react-hot-toast";

export const useInputHook = ()=>{

    const inputData = async(obj)=>{
      
    console.log(obj)
    const {gameId,pos,inputid} = obj
    console.log(gameId,pos,inputid)
    const data = await fetch("https://tic-tac-toe-bcakend.onrender.com/api/v1/inputHandler", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({gameId,pos,inputid}),
    });
    if (!data.ok) {
  
      const res= await data.json()
      toast.error(res.message)
      return
   
    }
    const response = await data.json()
    toast.success("Room Created")
  
    return response
    }

    return inputData
}