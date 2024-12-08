const input = document.getElementById('repo-input');
const suggestions = document.getElementById('suggestions');
const repoList = document.getElementById('repo-list');
let timeout;

input.addEventListener('input', () => {
    clearTimeout(timeout);
    const query = input.value.trim();

    if (query === '') {
        suggestions.innerHTML = '';
        return;
    }

    timeout = setTimeout(() => {
        fetch(`https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc`)
            .then(response => response.json())
            .then(data => {
                showSuggestions(data.items);
            });
    }, 300); 
});

function showSuggestions(repos) {
    suggestions.innerHTML = '';
    repos.slice(0, 5).forEach(repo => {
        const li = document.createElement('li');
        li.textContent = repo.name;
        li.onclick = () => addRepo(repo);
        suggestions.appendChild(li);
    });
}

function addRepo(repo) {
    const li = document.createElement('li');
    li.className = 'repo-item';
    li.innerHTML = ` Name: ${repo.name} <br> Owner: (${repo.owner.login}) <br> Stars: ${repo.stargazers_count} 
        <button class="remove-btn" onclick="removeRepo(this)"></button>`;
    repoList.appendChild(li);
    input.value = ''; 
    suggestions.innerHTML = ''; 
}

function removeRepo(button) {
    const repoItem = button.parentElement;
    repoList.removeChild(repoItem);
}