chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === 'cropImage') {
        const img = new Image();
        img.crossOrigin = "anonymous"; // 用于避免CORS问题，确保图片允许跨域访问
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const cropHeight = this.height * 0.9;  // 裁剪后保留顶部90%

            canvas.width = this.width;
            canvas.height = cropHeight;

            // 正确裁剪图像的顶部90%，从(0, 0)开始，宽度为this.width，高度为cropHeight
            ctx.drawImage(this, 0, 0, this.width, this.height * 0.9, 0, 0, this.width, cropHeight);

            // 使用toBlob方法进行裁剪并触发下载
            // canvas.toBlob(function(blob) {
            //     const url = URL.createObjectURL(blob);
            //     const a = document.createElement('a');
            //     a.href = url;
            //     a.download = 'cropped-image.png';  // 设置下载的文件名
            //     document.body.appendChild(a);
            //     a.click();  // 模拟点击以下载
            //     document.body.removeChild(a);  // 清理DOM
            //     URL.revokeObjectURL(url);  // 释放URL对象
            // }, 'image/png');
            const imageDataUrl = canvas.toDataURL('image/png');

            // 创建一个新窗口并在其中显示裁剪后的图像
            const imageWindow = window.open('', '_blank');
            imageWindow.document.write('<img src="' + imageDataUrl + '" style="width:100%; height:auto;">');
            imageWindow.document.title = "Cropped Image"; // 给新窗口设置标题
        };
        img.onerror = function() {
            console.error("Failed to load image for cropping.");
        };
        img.src = request.url;
    }else if (request.type === 'downloadCropped') {
        console.log("123")
        const img = new Image();
        img.crossOrigin = "anonymous"; // 用于避免CORS问题，确保图片允许跨域访问
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const cropHeight = this.height * 0.9;  // 裁剪后保留顶部90%

            canvas.width = this.width;
            canvas.height = cropHeight;

            // 正确裁剪图像的顶部90%，从(0, 0)开始，宽度为this.width，高度为cropHeight
            ctx.drawImage(this, 0, 0, this.width, this.height * 0.9, 0, 0, this.width, cropHeight);

            // 使用toBlob方法进行裁剪并触发下载
            canvas.toBlob(function(blob) {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'cropped-image.png';  // 设置下载的文件名
                document.body.appendChild(a);
                a.click();  // 模拟点击以下载
                document.body.removeChild(a);  // 清理DOM
                URL.revokeObjectURL(url);  // 释放URL对象
            }, 'image/png');
        };
        img.onerror = function() {
            console.error("Failed to load image for cropping.");
        };
        img.src = request.url;
    }
});
