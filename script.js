let x,y;
let myfunc=new Array(x);
let board=new Array(x);
let mygraph;
let ngraph=[];
let trav=[];
class Node{
    left;
    right;
    up;
    down;
    constructor(id,value){
        this.id=id;
        this.value=value;
    }
    
}
grid=()=>{
    x=document.getElementById("x").value;
    y=document.getElementById("y").value;
    if(isNaN(x)==false && isNaN(y)==false){
        if(x>11){x=11;}
        if(y>11){y=11;}
        if(x<0){x=2;}
        if(y<0){y=2;}
        create();

    }
    
}

create=()=>{
    for(let i=0;i<x;i++){
        for(let j=0;j<y;j++){
            id=i+""+j;
            var canvas=document.getElementById("myspace");
            canvas.innerHTML=canvas.innerHTML+"<span id="+id+"></span>";
        }
        canvas.innerHTML=canvas.innerHTML+"<br>";
    }
    make();
}
make=()=>{
    for(let i=0;i<x;i++){
        for(let j=0;j<y;j++){
            id=i+""+j;
            var canvas=document.getElementById(id);
            canvas.innerHTML="<button onclick=myfunc["+i+"]["+j+"]() class=btn-dark>XX</button>";
        }
    }
    
    myfunctions();
    
}
matrix=()=>{
    for(let i=0;i<x;i++){
        board[i]=new Array(y);
        for(let j=0;j<y;j++){
            id=i+""+j;
            let mynode=new Node(id,0)
            board[i][j]=mynode;
        }
    }
}
myfunctions=()=>{
    matrix();
    for(let i=0;i<x;i++){
        myfunc[i]=new Array(y);
        for(let j=0;j<y;j++){
            myfunc[i][j]=()=>{
                id=i+""+j;
                let k=i;
                let l=j;
                if(k>=10){
                    if(k==10){k="$";}
                    if(k==11){k="$";}
                }
                if(l>=10){
                    if(l==10){l="$";}
                    if(l==11){l="$";}
                }
                nid=k+""+l;
                var canvas=document.getElementById(id);
                if(board[i][j].value==0)
                {   board[i][j].value=1;
                    canvas.innerHTML="<button onclick=myfunc["+i+"]["+j+"]() class=btn-success>"+nid+"</button>";
                }
                else
                {   board[i][j].value=0;
                    canvas.innerHTML="<button onclick=myfunc["+i+"]["+j+"]() class=btn-dark>XX</button>";
                }
            }
        }
    }
}

function play(){
    for(let i=0;i<x;i++){
        for(let j=0;j<y;j++){
            z=makegraph(board[i][j],i,j);
            if(z!=undefined)ngraph.push(z);
        }
    }
    let val=dfs(ngraph[0]);
    animate(val);
    out("<br>")
    out("It will traverse from : ")
    for( i of val){
       
        out(i+" ");
    }
    
     myfunc=new Array(x);
     board=new Array(x);
     mygraph;
     ngraph=[];
     trav=[];
     
}
function pausecomp(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}

function animate(trav){
    console.log(trav)
    for(let i of trav){
        pausecomp(10);
        var nbutton=document.getElementById(i);
        nbutton.innerHTML="<button class=btn-danger>"+i+"</button>";
        
    }
}
function doSetTimeout(i) {
    setTimeout(frames, 350,id);
  }
function Reset(){
  var myspace=document.getElementById("myspace");
  myspace.innerHTML="";
  var mpath=document.getElementById("path");
  mpath.innerHTML="";
}



function dfs(stack){
    const map=new Map();
    let nstack=[];
    let val=[];
    nstack.push(stack);
    while(nstack.length>0){
        if(map.has(nstack[0])){
            
            nstack.shift();
        }
        else{
            val.push(nstack[0].id);
            map.set(nstack[0],true);
            if(nstack[0].left!=undefined){
                nstack.push(nstack[0].left);
                
            }
            if(nstack[0].right!=undefined){
                nstack.push(nstack[0].right);
                
            }
            if(nstack[0].up!=undefined){
                nstack.push(nstack[0].up);
               
            }
            if(nstack[0].down!=undefined){
                nstack.push(nstack[0].down);
                
            }
            
        }
    }    
    return val;
}
function out(val){
    var print=document.getElementById("path");
    print.innerHTML=print.innerHTML+" "+val;
}



function makegraph(node,i,j){
    if(node.value==1){
    try {
        if(board[i-1][j].value==1){
            node.up=board[i-1][j];
        }
    } catch (error) {
        
    }
    try {
        if(board[i+1][j].value==1){
            node.down=board[i+1][j];
        }
    } catch (error) {
        
    }
    try {
        if(board[i][j-1].value==1){
            node.left=board[i][j-1];
        }
    } catch (error) {
        
    }
    try {
        if(board[i][j+1].value==1){
            node.right=board[i][j+1];
        }
    } catch (error) {
        
    }
    return node;}
}
