const subjects = [];

document.getElementById('subjectInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const subject = this.value.trim();
        if (subject && !subjects.includes(subject)) {
            subjects.push(subject);
            this.value = '';
            displaySavedSubjects();
        }
        event.preventDefault();
    }
});

function displaySavedSubjects() {
    const savedSubjectsDiv = document.getElementById('savedSubjects');
    savedSubjectsDiv.innerHTML = '';

    subjects.forEach((subject, index) => {
        const subjectDiv = document.createElement('div');
        subjectDiv.className = 'subject';
        subjectDiv.textContent = subject;

        const removeGlyph = document.createElement('span');
        removeGlyph.className = 'remove';
        removeGlyph.textContent = '✖';
        removeGlyph.addEventListener('click', function() {
            subjects.splice(index, 1);
            displaySavedSubjects();
        });

        subjectDiv.appendChild(removeGlyph);
        savedSubjectsDiv.appendChild(subjectDiv);
    });
}

const timetableCells = document.querySelectorAll('#timetable td');

timetableCells.forEach(cell => {
    cell.addEventListener('click', function() {

        const existingDropdown = document.querySelector('.dropdown');
        if (existingDropdown) existingDropdown.remove();

        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown';

        subjects.forEach(subject => {
            const option = document.createElement('div');
            option.className = 'dropdown-option';
            option.textContent = subject;
            option.addEventListener('click', function() {
                cell.textContent = this.textContent;
                dropdown.remove();
            });
            dropdown.appendChild(option);
        });

        const rect = cell.getBoundingClientRect();
        dropdown.style.top = `${rect.bottom + window.scrollY}px`;
        dropdown.style.left = `${rect.left + window.scrollX}px`;

        document.body.appendChild(dropdown);
        dropdown.style.display = 'block';

        dropdown.addEventListener('blur', function() {
            dropdown.remove();
        });
    });
});

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
