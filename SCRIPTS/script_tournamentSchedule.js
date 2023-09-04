let teams = [];
let matches = [];
let matchNumber = 1;

document.addEventListener('DOMContentLoaded', function() {
    const addTeamButton = document.getElementById('addTeamButton');
    addTeamButton.addEventListener('click', addTeam);
});

function addTeam() {
    const teamName = document.getElementById('teamName').value.trim();
    if (teamName !== '') {
        teams.push(teamName);
        document.getElementById('teamName').value = '';
        updateMatches();
    }
}

function updateMatches() {
    matches = [];

    matchNumber = 1; // Reset matchNumber when teams are updated

    const shuffledTeams = shuffleTeams(teams.slice());
    let previousMatches = [];

    for (let i = 0; i < shuffledTeams.length - 1; i++) {
        for (let j = i + 1; j < shuffledTeams.length; j++) {
            const team1 = shuffledTeams[i];
            const team2 = shuffledTeams[j];

            if (!hasPlayedConsecutively(team1, team2, previousMatches)) {
                const match = {
                    number: matchNumber,
                    team1: team1,
                    team2: team2
                };
                matches.push(match);
                matchNumber++;
                previousMatches.push([team1, team2]);
            }
        }
    }

    shuffleMatches();
    assignOrderedNumbers();
    displayMatches();
}

function shuffleTeams(teamsArray) {
    for (let i = teamsArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [teamsArray[i], teamsArray[j]] = [teamsArray[j], teamsArray[i]];
    }
    return teamsArray;
}

function hasPlayedConsecutively(team1, team2, previousMatches) {
    for (let i = previousMatches.length - 1; i >= 0; i--) {
        const [prevTeam1, prevTeam2] = previousMatches[i];
        if (
            (team1 === prevTeam1 || team1 === prevTeam2) &&
            (team2 === prevTeam1 || team2 === prevTeam2)
        ) {
            return true;
        }
    }
    return false;
}



function shuffleMatches() {
    for (let i = matches.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = matches[i];
        matches[i] = matches[j];
        matches[j] = temp;
    }
}

function assignOrderedNumbers() {
    for (let i = 0; i < matches.length; i++) {
        matches[i].number = i + 1;
    }
}


function displayMatches() {
    const matchTable = document.getElementById('matchTable');
    matchTable.innerHTML = '';

    for (const match of matches) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${match.number}</td>
            <td>${match.team1}</td>
            <td>${match.team2}</td>
        `;
        matchTable.appendChild(newRow);
    }
}
