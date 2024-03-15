const http=require('http')
const fs=require('fs')
const path=require('path')
//const querystring=require('querystring')
const booksData = JSON.parse(fs.readFileSync('books.json', 'utf-8'));
let k=0
const server=http.createServer((req,res)=>{
    if(req.url==='/'){
        res.end(`<html>
     <head>
         <title>Yangi kitob qo'shish</title>
     </head>
     <body>
         <form action="/books" method="POST">
             <label >kitob nomi</label>
             <br>
             <input type="text" name="message">
             <br>
             <label >avtor nomi</label>
             <br>
             <input type="text" name="message">
             <br>
             <button>Send </button>
         </form>
     </body>
 </html>`)
 }
//* if(req.url==='/books'&&req.method==='POST'){
   /* let body = '';
    req.on('data', chunk => {
            body += chunk
            console.log(body)
        
    });
   res.end()
 }*/



        if(req.url==='/books'){
            res.end(fs.readFileSync('books.json', 'utf-8')       )
            }
        


   else {  for (let i = 0; i < booksData.length; i++) {
        if(req.url===`/books/${(i+1)}`) {
            res.end(JSON.stringify(booksData[i]))
            k++ 
        }
        else if((i===(booksData.length-1))&&(k===0)){
            res.end('<h1>Bunday id raqamli kitob yo\'q<h1>')
        }
     
    }
    k=0
}
      })      
const PORT=process.env.PORT||3000
server.listen(PORT,()=>{
    console.log('server ishladi')
})
