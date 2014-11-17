# Simple Retina
==========

_Break down [Retina.js](http://imulus.github.io/retinajs/) and extract functionality for small specific syntax project_
### How to use?
1. prepare 2 images named "_image.jpg_" and "_image@2x.jpg_"  
	"__@2x__" have to be added between filename( image ) and extension( .jpg ) 
2. put them on the same level (the same folder)
3. put this library right before closing `</body>` tag
4. your images will be swapped automatically
5. if your retina image doesn't exist, original image won't be swapped

### Example 
* Original :  
`<img src="image.jpg" alt=""/>`  

* Swapped :  
`<img src="image@2x.jpg" alt="" />`  
*__Note that you need to use `<img>` tag to swap your image in this library__
