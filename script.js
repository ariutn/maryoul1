let clubs = [];
let timerInterval;
let timeLeft = 15 * 60; // 15 minutes in seconds
const alarmSound = document.getElementById('alarmSound');

function renderClubs() {
    const clubsList = document.getElementById('clubsList');
    clubsList.innerHTML = '';
    clubs.forEach((club, index) => {
        const clubItem = document.createElement('div');
        clubItem.classList.add('club-item');
        clubItem.innerHTML = `
            ${club.logo ? `<img src="${club.logo}" alt="شعار ${club.name}">` : ''}
            <div class="club-info">
                <h3>${club.name}</h3>
                <div class="club-score-controls">
                    <button class="win" onclick="updateScore(${index}, 'win')"><i class="fas fa-plus"></i></button>
                    <button class="draw" onclick="updateScore(${index}, 'draw')"><i class="fas fa-equals"></i></button>
                    <button class="lose" onclick="updateScore(${index}, 'lose')"><i class="fas fa-minus"></i></button>
                    <span class="club-score" id="score-${index}">${club.score}</span>
                    <span>نقطة</span>
                </div>
            </div>
        `;
        clubsList.appendChild(clubItem);
    });
}

function addClub() {
    const clubNameInput = document.getElementById('clubNameInput');
    const clubLogoInput = document.getElementById('clubLogoInput');
    const clubName = clubNameInput.value.trim();
    const clubLogoFile = clubLogoInput.files[0];

    if (clubName === '') {
        alert('الرجاء إدخال اسم النادي.');
        return;
    }

    let clubLogoUrl = '';
    if (clubLogoFile) {
        clubLogoUrl = URL.createObjectURL(clubLogoFile);
    }

    clubs.push({
        name: clubName,
        logo: clubLogoUrl,
        score: 0
    });
    clubNameInput.value = '';
    clubLogoInput.value = ''; // Clear the file input
    renderClubs();
}

function updateScore(index, type) {
    if (index >= 0 && index < clubs.length) {
        switch (type) {
            case 'win':
                clubs[index].score += 3;
                break;
            case 'draw':
                clubs[index].score += 1;
                break;
            case 'lose':
                clubs[index].score -= 0; // Or whatever logic you want for a loss (e.g., -1 point)
                break;
        }
        document.getElementById(`score-${index}`).innerText = clubs[index].score;
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (timerInterval) return; // Prevent multiple intervals

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timerDisplay').innerText = formatTime(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            alarmSound.play();
            alert('انتهى وقت المباراة!');
            timeLeft = 15 * 60; // Reset timer for next match
            document.getElementById('timerDisplay').innerText = formatTime(timeLeft);
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    // Optionally, you can reset the timer here or just pause it
    // timeLeft = 15 * 60; // Uncomment to reset on stop
    // document.getElementById('timerDisplay').innerText = formatTime(timeLeft);
}

// Initial render
renderClubs();
