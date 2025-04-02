async function fetchChain() {
    const response = await fetch('/chain');
    const chain = await response.json();
    document.getElementById('output').textContent = JSON.stringify(chain, null, 2);
}