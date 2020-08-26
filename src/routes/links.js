const express = require('express');
const router = express.Router();

const pool = require('../database');
const {isLoggedIn} = require('../lib/auth');

const { route } = require('.');

router.get('/add', isLoggedIn, (req,res) => {
    res.render('links/add');
});

router.post('/add', isLoggedIn ,async(req,res) => {
    const {title,url,description} = req.body;
    const newLink = {
        title,
        url,
        description,
        user_id
    };
    await pool.query('INSERT INTO links set ?',[newLink]);
    req.flash('success', 'Link agregado');
    res.redirect('/links');
});

router.get('/', isLoggedIn ,async(req,res) => {
   const links = await pool.query('SELECT * FROM links');
   console.log(links);
   res.render('links/list', {links});
});


router.get('/delete/:id', isLoggedIn ,async (req,res) => {
    const {id} = req.params;
    await pool.query('DELETE FROM links where ID = ?', [id]);
    req.flash('success', 'Enlace removido sastisfactoriamente')
    res.redirect('/links')
});

router.get('/edit/:id', isLoggedIn ,async (req,res) => {
    const {id} = req.params;
    const links = await pool.query('SELECT * from links where id = ?', [id]);
    console.log(links[0]);
    res.render('links/edit', {links:links[0]});

});

router.post('/edit/:id', isLoggedIn ,async (req,res) => {
    const {id} = req.params;
    const { title, description, url } = req.body;
    const newLink = {
        title,
        description,
        url
    };
    console.log(newLink);
    await pool.query('UPDATE links set ? where id = ?', [newLink,id]);
    req.flash('success','Link editado satisfactoriamente')
    res.redirect('/links');
});

module.exports = router;