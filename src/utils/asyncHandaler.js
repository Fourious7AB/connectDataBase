//promesies
const asyncHandeler=()=>{

    (req,res,next)=>{
        Promise.resolve(requstHandeler(req,res,next))
        .catch((error)=>next(error))
        
    }
}
export {asyncHandeler}
//aother type trychatch
//const asyncHandeler =(fun)=>async(req,res,next)=>{
    //code
    //try {
    //await function(req,res,next)
    //    
    //} catch (error) {
    //    resizeBy.status(error.code||500)
    //    .json({
    //        success:false,
    //        meassage:error.meassage
    //    })
    //}
//}