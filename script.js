async function updateStatus() {
    try {
        const response = await fetch(
            `https://api.thingspeak.com/channels/${channelId}/feeds/last.json?api_key=${apiKey}`
        );
        const data = await response.json();
        
        if (data) {
            document.getElementById('current-temp').textContent = `${data.field1}°C`;
            document.getElementById('current-humidity').textContent = `${data.field2}%`;
            document.getElementById('relay-status').textContent = 
                data.field3 === '1' ? 'Ligado' : 'Desligado';
        }
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

// Função para atualizar o status do dispositivo
document.addEventListener('DOMContentLoaded', () => {
    updateStatus();
    setInterval(updateStatus, 15000); // Atualiza a cada 15 segundos
});
