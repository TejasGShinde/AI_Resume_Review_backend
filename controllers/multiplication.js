exports.multiply = async (req,res)=>{
    try{
        const {a,b} = req.query;
        const answer = a*b;
        if(a>1000){
            throw new Error("INternal error you have too big dreams")
          //  res.status(404).json({success:false,message:"error 404"})
        }
        res.status(200).json({success:true,message:"Multiplication is this",answer})
    }
    catch(error){
        res.status(500).json({success:false,meassage:"error internal error"})
    }
  
}