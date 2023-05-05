// @ts-nocheck
// TypeScript will not perform type-checking for this file
import {Job} from '../models';
export const AdminLogin = async(req, res, next) =>{
  const {email, password} = req.body;
		try{
			if(email === "admin123@gmail.com" && password === "kryptonite@2056"){
				return res.json({isAdmin: true, status: 200});
        console.log("sdfsad")
			}
			else{
				return res.json({isAdmin: false, status: 400})
			}
		}
		catch(err){
		 console.log(err)
		}

}



export const GetAllJobs = async(req, res, next)=>{

  
    try{
      const jobs = await Job.find().sort({date: -1})
                  .populate('business',['location','companyDescription','contactEmail','contactName']);
      
      return res.json(jobs);

    }catch(err){
      return res.status(500).json({err: err})
    }
  
}




export const DeleteJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Delete the job
    await job.remove();

    return res.status(200).json({ message: 'Job deleted successfully', isDeleted: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};








