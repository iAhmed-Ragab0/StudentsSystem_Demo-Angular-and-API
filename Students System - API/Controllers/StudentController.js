
const Student=require("./../Models/StudentSchema");

exports.getAllStudent=(request,response)=>{
    Student.find({}).populate({path:"department" ,  select: {name:1,_id:0}})
              .then(data=>{
                response.status(200).json(data)

              })
              .catch(error=>{
                  next(error);
              })
}

exports.getStudent=(request,response)=>{

    Student.findOne({_id:request.params.id}).populate({path:"department" ,  select: {name:1,_id:0}})
              .then(data=>{
                  if(data==null) next(new Error("Student id not Found"))

                    response.status(200).json(data)
              })
              .catch(error=>{
                  next(error);
              })
}
exports.createStudent=(request,response,next)=>{ 
    console.log("inside");
    // console.log(request.file)
      let object=new  Student({
          _id:request.body._id,
          name: request.body.name,
          department:request.body.department,
        //   image:"http://localhost:8080/images/"+request.file.filename
           image:request.body.image
      })
      object.save()
            .then(data=>{
                response.status(201).json({message:"added",data})

            })
            .catch(error=>next(error))
}

exports.updateStudent=(request,response,next)=>{
    Student.findByIdAndUpdate(request.params.id,{
            $set:{
                name:request.body.name,
                department:request.body.department,
                // image:request.file.filename
                image:request.body.image

            }
        })
                  .then(data=>{
                      if(data==null) throw new Error("Student Is not Found!")
                    response.status(200).json({message:"updated",data})

                  })
                  .catch(error=>next(error))
}

exports.deleteStudent=(request,response,next)=>{
    Student.findByIdAndDelete(request.params.id)
                  .then(data=>{
                      if(data==null) throw new Error("Student Is not Found!")
                      response.status(200).json({message:"deleted"})
                    
                  })
                  .catch(error=>next(error))
}




