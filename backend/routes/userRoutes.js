const express=require("express");
const zod=require("zod")
const jwt=require("jsonwebtoken");
const JWT_SECRET=require("../config/jwt")
const {User }=require("../models/User")
const {authMiddleware} =require("../middleware/authMiddleware");


const userRouter=express.Router();

// input validation
const userSignupSchema =zod.object({
        email:zod.string().email(),
        firstName:zod.string(),
        lastName:zod.string(),
        password:zod.string(),
        role: zod.string(),
})
const userSigninSchema =zod.object({
    email:zod.string().email(),
    password:zod.string(),
})
const userUpdateSchema =zod.object({
        firstName:zod.string().optional(),
        lastName:zod.string().optional(),
        password:zod.string().optional(),
})

userRouter.post('/signup',async function (req,res) {
    const inputFromUser={
        email:req.body.email,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.password,
        role: req.body.role || 'user',
    } 
    const result =userSignupSchema.safeParse(inputFromUser);
    
    if (!result.success ) {
       return res.status(411).json({
            message:"Email already taken  1 / Incorrect inputs"
        })
    }
    try {
        const isValid= await User.findOne({
            email:inputFromUser.email,
        })
        if (isValid) {
            return res.status(411).json({
                message: "Email already taken 2 /Incorrect inputs"
            })
        }

        const user =  await User.create(inputFromUser);
     const token = jwt.sign({
        userId : user._id,
    },JWT_SECRET);
        res.status(200).json({
            message:"user created successfully",
            token:token,
            _id: user._id,
        })
    } catch (error) {
        res.status(411).json({
            message:error
        })
    }
})

userRouter.post("/signin",async function (req,res) {
    const userInput ={
        email:req.body.email,
        password:req.body.password,
    }
    const result = userSigninSchema.safeParse(userInput);
    if (!result.success) {
       return  res.status(411).json({
            message: "Error while logging in"
        })
    }
    try {
        const user =await User.findOne({
            email:userInput.email,
            password:userInput.password,
        })
        
        if (user) {

            //admin role
            // const userRole = user.role;
            // if (userRole=="admin") {    
            // } 

            const token =jwt.sign({
                userId : user._id,
            },JWT_SECRET)
    
            res.status(200).json({
                token: token,
            })
        }else{
            res.status(411).json({
            message: "Error while logging in"
            })
        }
    } catch (error) {
        console.log("error in signin page"+error);
    }
   
})



userRouter.put("/",authMiddleware,async function (req,res) {
    const userInput = req.body;
    
    const isValid = userUpdateSchema.safeParse(userInput);
    if (!isValid.success) {
       return res.status(411).json({
            essage: "Error while updating information",
        })
    }
    try {
        // console.log(" is it correct ?"+res.userId);
        await User.updateOne({ _id: res.userId }, { $set: userInput });
        res.status(200).json({
            message: "Updated successfully",
        });
    } catch (error) {
        console.log("error in /page update page"+ error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
})



// for user Dashboard
userRouter.get("/username",authMiddleware,async function (req,res) {
  const user=  await User.findOne({
        _id:res.userId
    })
    res.status(200).json({
        _id:user._id,
        user:user.firstName,
        role:user.role,
    })
})

// Add a family member for the logged-in user
userRouter.post('/user/:userId/family', async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, relation, age } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newMember = { name, relation, age };
    user.familyMembers.push(newMember);
    await user.save();

    res.status(200).json({ message: 'Family member added', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add family member' });
  }
});

module.exports =userRouter;