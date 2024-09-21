document.getElementById('downloadBtn').addEventListener('click', function() {
    const timetable = document.getElementById('timetable');

    html2canvas(timetable, {
        scale: 2,
    }).then(function(canvas) {
        const originalWidth = canvas.width;
        const originalHeight = canvas.height;

        const desiredWidth = 2028;
        const desiredHeight = 948;

        const scale = Math.min(desiredWidth / originalWidth, desiredHeight / originalHeight);

        const newWidth = originalWidth * scale;
        const newHeight = originalHeight * scale;

        const outputCanvas = document.createElement('canvas');
        outputCanvas.width = desiredWidth;
        outputCanvas.height = desiredHeight;
        const ctx = outputCanvas.getContext('2d');

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, desiredWidth, desiredHeight);

        const offsetX = (desiredWidth - newWidth) / 2;
        const offsetY = (desiredHeight - newHeight) / 2;

        ctx.drawImage(canvas, offsetX, offsetY, newWidth, newHeight);

        const link = document.createElement('a');
        link.download = 'timetable.png';
        link.href = outputCanvas.toDataURL('image/png');
        link.click();
    }).catch(function(error) {
        console.error("Error generating the canvas:", error);
    });
});
