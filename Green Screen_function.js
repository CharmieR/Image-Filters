var fgimage=null;
var bgimage=null;
var fgcanvas;
var bgcanvas;

function fgupload()
{var finput=document.getElementById("up1");
  fgcanvas=document.getElementById("can1");
  fgimage=new SimpleImage(finput);
  fgimage.drawTo(fgcanvas);
}

function bgupload()
{var finput=document.getElementById("up2");
  bgcanvas=document.getElementById("can2");
  bgimage=new SimpleImage(finput);
  bgimage.drawTo(bgcanvas);
}

function dogreen()
{

  var output=new SimpleImage(fgimage.getWidth(),fgimage.getHeight());
  
  for(var pixel of fgimage.values())
    {var x=pixel.getX();
     var y=pixel.getY(); 
      if(pixel.getGreen()>(pixel.getRed()+pixel.getBlue()))
        {
          var bgPixel=bgimage.getPixel(x,y);
          output.setPixel(x,y,bgPixel);
        }
     else
       output.setPixel(x,y,pixel);
    }

return output;
   
}


function composite()
{
  if(fgimage==null||!fgimage.complete())
    alert("Foreground Image not yet loaded");
   if(bgimage==null||!bgimage.complete())
    alert("Background Image not yet loaded");
  
if(fgimage.getWidth()<bgimage.getWidth()||fgimage.getHeight()<bgimage.getHeight())
{
bgimage=crop();
}
else
if(fgimage.getWidth()>bgimage.getWidth()||fgimage.getHeight()>bgimage.getHeight())
{   
bgimage=resize();
}
  
  clearcanvas();
  var final=dogreen();
  final.drawTo(fgcanvas);
}

function crop()
{
   var output=new SimpleImage(fgimage.getWidth(),fgimage.getHeight());
   for(var pixel of output.values())
   { var x=pixel.getX();
     var y=pixel.getY();
     var pix=bgimage.getPixel(x,y);
     output.setPixel(x,y,pix);
   }
   return output;
}

function resize()
{
var output=bgimage; output.setSize(fgimage.getWidth(),fgimage.getHeight());
  return output;
}

function clearcanvas()
{
   doClear(fgcanvas);
  doClear(bgcanvas);
}

function doClear(canvas)
{var context=canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
}

function download()
{
   var link = document.createElement('a');
  link.download = 'Composite_Image.png';
  link.href = document.getElementById('can1').toDataURL(); //href is used to get location
  link.click();
}
