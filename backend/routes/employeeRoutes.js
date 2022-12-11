import express from "express";
import { PrismaClient } from '@prisma/client'
import * as bcrypt from "bcrypt"
const prisma = new PrismaClient()

const route = express.Router();

route.get('/', async (req,res)=>{
  const employees = await prisma.employee.findMany({})
  res.json(employees)
})


route.post('/newEmployee', async(req,res)=>{
  const employee = await prisma.employee.create({
    data: {
      employeeName: req.body.employeeName,
      adress: req.body.adress,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      personalNumber: req.body.personalNumber,
      accountNumber: req.body.accountNumber,
      role:req.body.role,
      password: await bcrypt.hash(req.body.password,10),
      
   
  }});
  res.json(employee);
})

export default route