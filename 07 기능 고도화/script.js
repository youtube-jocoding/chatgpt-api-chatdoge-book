// 변수 생성
let userMessages = [];
let assistantMessages = [];
let myDateTime = '';

function start() {
    const date = document.getElementById('date').value;
    const hour = document.getElementById('hour').value;
    if (date === '') {
        alert('생년월일을 입력해주세요.');
        return;
    }
    myDateTime = date + hour;

    document.getElementById("intro").style.display = "none";
    document.getElementById("chat").style.display = "block";
}

async function sendMessage() {
    //로딩 아이콘 보여주기
    document.getElementById('loader').style.display = "block";

    //사용자의 메시지 가져옴
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;  

    //채팅 말풍선에 사용자의 메시지 출력
    const userBubble = document.createElement('div');
    userBubble.className = 'chat-bubble user-bubble';
    userBubble.textContent = message;
    document.getElementById('fortuneResponse').appendChild(userBubble);
    
    //Push
    userMessages.push(messageInput.value);

    //입력 필드 초기화
    messageInput.value = '';

    //백엔드 서버에 메시지를 보내고 응답 출력
    try {
        const response = await fetch('http://localhost:3000/fortuneTell', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                myDateTime: myDateTime,
                userMessages: userMessages,
                assistantMessages: assistantMessages,
            })
        });

        if (!response.ok) {
            throw new Error('Request failed with status ' + response.status);
        }

        const data = await response.json();
        
        //로딩 아이콘 숨기기
        document.getElementById('loader').style.display = "none";
        
        //Push
        assistantMessages.push(data.assistant);
        console.log('Response:', data);

        //채팅 말풍선에 챗GPT 응답 출력
        const botBubble = document.createElement('div');
        botBubble.className = 'chat-bubble bot-bubble';
        botBubble.textContent = data.assistant;
        document.getElementById('fortuneResponse').appendChild(botBubble);
        
    
    } catch (error) {
        console.error('Error:', error);
    }
}