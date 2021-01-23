const SCORE_LIMIT = 5;

function displayGameScore() {
    let scoreToDisplay = prepareDataScore();

    context.font = '20px Comic Sans MS';   
    context.fillStyle = 'black';
    context.textAlign = 'center';

    let textX = 50;
    let textY = 40;
    for (const score of scoreToDisplay) {
        context.fillText(score, textX, textY);
        textY += 20;
    }
}

function createScoreTable(topScores) {
    let scoreToDisplay = [];
    for (const index in topScores) {
        scoreToDisplay.push(`Ball: ${topScores[index]}`);
    }
    return scoreToDisplay;
}

const checkScores = (some, biggest, top) => (some > biggest && !top.includes(some)) ? some : biggest;

function prepareDataScore() {
    const topScores = [];
    for (let i = 0; i < SCORE_LIMIT; i++) {
        let biggestScore = 0;
        for (const enemy of enemies) {
            if (enemy !== playerBall) {
                biggestScore = checkScores(enemy.lastScore, biggestScore, topScores);
            }
         }
         topScores.push(biggestScore);
    }
    return createScoreTable(topScores);
}
