/*
 * Reference in
 *  https://github.com/imulus/retinajs
 *
 * Narrow down and extract functionality for small specific syntax project
 *
 */


(function(){

    function isRetina()
    {
        if(window.devicePixelRatio>1)
        {
            return true;
        }
        if (window.matchMedia && window.matchMedia("(-webkit-min-device-pixel-ratio: 1.5),(-moz-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5)").matches)
        {
            return true;
        }

        return false;
    }

    function init()
    {
        window.onload =function(){

            var images = [];
            var imageTags = document.querySelectorAll('img');
            for(var i=0;i<imageTags.length;i++)
            {
                images.push(new getImages(imageTags[i]));
            }
        }
    }

    function getImages(imgTag)
    {
        this.el = imgTag;
        this.path = new saveImagePath(imgTag);
        var that = this;
        this.path.hasRetinaImg(function(hasRetina){
            if(hasRetina)
            {
                that.swap();
            }
        });
    }

    function saveImagePath(imgTag)
    {
        var prefix = '@2x';
        var imgSrc,imgfullName,lastIndex,folderPath,imgName,extention,retinaImgPath;
        imgSrc = imgTag.src;
        imgfullName = imgSrc.split('/').pop().split('.');
        lastIndex = imgSrc.lastIndexOf('/');
        folderPath = imgSrc.substring(0, lastIndex + 1);
        imgName = imgfullName.shift();
        extention = imgfullName.pop();
        retinaImgPath = folderPath + imgName + prefix + '.' + extention;
        this.originalPath = imgSrc;
        this.retinaPath = retinaImgPath;
    }

    saveImagePath.prototype = {
        hasRetinaImg:function(callback)
        {
            var httpObject = new XMLHttpRequest();
            httpObject.onreadystatechange = function () {

                if (httpObject.readyState == 4 && httpObject.status < 400) {
                    var contentType = httpObject.getResponseHeader('Content-Type');
                    // check content type if it is image
                    if (contentType != null || contentType.match(/^image/i)) {
                         //retina image is existing
                        return callback(true);
                    } else {
                        //retina image doesn't exist
                        return callback(false);
                    }
                }
            }
            // just want to know if there is or not, so I use 'HEAD' as a method
            httpObject.open('HEAD', this.retinaPath);
            httpObject.send();
        }
    }

    getImages.prototype = {
        swap:function()
        {
            this.src = this.path.retinaPath;
            // constrain ratio
            this.el.setAttribute('width',this.el.offsetWidth);
            this.el.setAttribute('height',this.el.offsetHeight);
            this.el.src=this.path.retinaPath;
        }
    }

    if(isRetina()){
        init();
    }
})();