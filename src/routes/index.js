const express = require( "express" );
const router = express.Router();

const Tasks = require( "../models/tasks" );


router.get( "/", async ( req, res ) => {
    const tasks = await Tasks.find();
    console.log( tasks );
    res.render( "index", {
        tasks
    });
});

router.post( "/add", async ( req, res ) => {
    const tasks = new Tasks( req.body );
    await tasks.save();
    res.redirect( "/" );
});

router.get( "/turn/:id", async ( req, res ) => {
    const { id } = req.params;
    const task = await Tasks.findById( id );
    task.status = !task.status;
    await task.save();
    res.redirect( "/" );
});

router.get( "/edit/:id", async ( req, res ) => {
    const { id } = req.params;
    const task = await Tasks.findById( id );
    res.render( "edit", {
        task
    });
});

router.post( "/edit/:id", async ( req, res ) => {
    const { id } = req.params;
    await Tasks.update({ _id: id }, req.body );
    res.redirect( "/" );
});

router.get( "/delete/:id", async ( req, res ) => {
    const { id } = req.params;
    await Tasks.deleteOne({ _id: id });
    res.redirect( "/" );
});

module.exports = router;