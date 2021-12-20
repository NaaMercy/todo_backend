import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import TodoModel from './schema/todo_schema.js';



//configuring  dotenv to use environment variables stored in .env file
dotenv.config();

//creating an instance of express server
const app = express();

//using the cors middleware to get the body of our request in json format
app.use(cors());
app.use(express.json());

//assigning port number to server
const port = process.env.PORT || 4050;

//assigning our database url to a variable
const db = process.env.DB_URL;

//creating a new todo
app.post('/todo', async (req, res)=>{
    const {title,description, date_time} = req.body;
    console.log('New todo created', {title, description, date_time});
    const todoModel = await TodoModel.create({
        title,
        description,
        date_time,
    })
if(todoModel){
    res.status(201).json({
        status: true,
        message: "Todo created successfully",
        data:todoModel
    })
}else{
     res.status(400).json({
        status: false,
        message: "Todo was not created",
    })
}
})

//getting all todos
app.get('/todos/', async (req, res) =>{
    const {status} = req.params;
    console.log('Fetching all todos', status);
    const todoModel = await TodoModel.find({});
    if(todoModel){
        res.status(201).json({
            status: true,
            message: "Todos fetched successfully",
            data:todoModel
        })
    }else{
         res.status(400).json({
            status: false,
            message: "Todos were not fetched",
        })
    }
})

//getting one todo
app.get('todos/:id', async (req, res)=> {
    const{id} = req.params;
    console.log('Todo feteched succesfully', id)
    const todoModel = await TodoModel.findById({}, id);
    if(todoModel){
        res.status(201).json({
            status: true,
            message: "Todo fetched successfully",
            data:todoModel
        })
    }else{
         res.status(400).json({
            status: false,
            message: "Todo was not fetched",
        })
    }
})










//deleting a todo
//patching todo

//connecting to MongoDB database
mongoose.connect(db, {
    useNewURLParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Connected to db');
}).catch((error)=>{console.log(error);})

//listening to port of server
app.listen(port, ()=>{console.log('Server is up and running')});